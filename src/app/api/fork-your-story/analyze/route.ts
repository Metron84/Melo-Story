import { NextRequest, NextResponse } from 'next/server';
import { analyzeStory } from '@/lib/gemini';
import { createClient } from '@supabase/supabase-js';

// Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId, title, content, wordCount, keystrokeData } = body;

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (wordCount < 250 || wordCount > 1500) {
      return NextResponse.json(
        { error: 'Story must be between 250 and 1500 words' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error('❌ GOOGLE_AI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // DEBUG: Verify API key is loaded (only first 10 chars for security)
    const apiKeyPreview = process.env.GOOGLE_AI_API_KEY.substring(0, 10);
    console.log('✅ API Key loaded:', apiKeyPreview + '...');

    // Run real Gemini AI analysis
    let analysis;
    try {
      console.log('🔄 Starting story analysis...');
      analysis = await analyzeStory(title, content, keystrokeData);
      console.log('✅ Analysis completed successfully');
    } catch (geminiError: unknown) {
      console.error('❌ Gemini API error:', geminiError);
      
      // Extract error message
      const errorMessage = geminiError instanceof Error ? geminiError.message : String(geminiError);
      const errorString = String(geminiError);
      
      // Check for specific error types
      if (
        errorMessage.includes('API_KEY') || 
        errorMessage.includes('401') || 
        errorMessage.includes('403') ||
        errorString.includes('API_KEY') ||
        errorString.includes('401') ||
        errorString.includes('403')
      ) {
        console.error('❌ API Key authentication failed');
        return NextResponse.json(
          { 
            error: 'Invalid API key. Please check your Google AI API key configuration.',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
          },
          { status: 500 }
        );
      }
      
      if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        console.error('❌ API quota exceeded');
        return NextResponse.json(
          { 
            error: 'API quota exceeded. Please try again later or check your usage limits.',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
          },
          { status: 500 }
        );
      }
      
      // For other errors, return more helpful message in dev mode
      return NextResponse.json(
        { 
          error: 'Failed to analyze story. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      );
    }

    // Save to Supabase database (if user is logged in)
    try {
      const userId = body.userId || null; // Optional - sent from client if user is logged in
      
      if (userId) {
        // Save story first
        const { error: storyError } = await supabase.from('stories').insert({
          id: storyId,
          user_id: userId,
          title,
          content,
          word_count: wordCount,
          status: 'complete',
          keystroke_data: keystrokeData || null,
        });

        if (storyError) {
          console.error('Error saving story to Supabase:', storyError);
        } else {
          // Save analysis (only if story was saved successfully)
          const { data: analysisData, error: analysisError } = await supabase.from('analyses').insert({
            story_id: storyId,
            is_human: analysis.verification.isHuman,
            authenticity_confidence: analysis.verification.confidence,
            authenticity_analysis: analysis.verification.analysis,
            character_map: analysis.characterMap,
          }).select().single();

          if (analysisError) {
            console.error('Error saving analysis to Supabase:', analysisError);
          } else if (analysisData) {
            const analysisId = analysisData.id;

            // Save historical parallels
            if (analysis.parallels && analysis.parallels.length > 0) {
              const parallelsData = analysis.parallels.map(parallel => ({
                analysis_id: analysisId,
                figure_name: parallel.name,
                figure_era: parallel.era,
                figure_icon: parallel.icon,
                traits: parallel.traits || [],
                quote: parallel.quote || null,
              }));

              await supabase.from('story_parallels').insert(parallelsData);
            }

            // Save narrative forks
            if (analysis.forks && analysis.forks.length > 0) {
              const forksData = analysis.forks.map(fork => ({
                analysis_id: analysisId,
                letter: fork.letter,
                title: fork.title,
                subtitle: fork.subtitle,
                description: fork.description,
                outcome: fork.outcome,
                trailer_duration: fork.trailer?.duration || '0:26',
                trailer_scenes: fork.trailer?.scenes || [],
              }));

              await supabase.from('forks').insert(forksData);
            }
          }
        }
      }
    } catch (dbError) {
      console.error('Database save error (non-fatal):', dbError);
      // Continue - return analysis even if database save fails
    }

    return NextResponse.json({
      success: true,
      storyId,
      analysis,
    });

  } catch (error) {
    console.error('❌ Unexpected error in analyze route:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      type: typeof error,
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}
