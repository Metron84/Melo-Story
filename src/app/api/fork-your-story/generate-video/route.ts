import { NextRequest, NextResponse } from 'next/server';
import { generateForkTrailerVideo } from '@/lib/pika';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fork } = body;

    // Validate input
    if (!fork || !fork.id || !fork.title || !fork.description) {
      return NextResponse.json(
        { error: 'Fork data is required (id, title, description)' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.FAL_KEY) {
      console.error('FAL_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Video generation service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Production mode - generate real videos via fal.ai
    // Demo mode removed - all videos are generated live

    // Generate video using fal.ai
    let videoResult;
    try {
      videoResult = await generateForkTrailerVideo(fork);
    } catch (videoError: unknown) {
      console.error('Video generation error:', videoError);
      
      const errorMessage = videoError instanceof Error ? videoError.message : String(videoError);
      if (errorMessage.includes('API_KEY')) {
        return NextResponse.json(
          { error: 'Invalid video generation API key. Please check your FAL_KEY configuration.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to generate video. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      videoUrl: videoResult.videoUrl,
      requestId: videoResult.requestId,
      duration: videoResult.duration,
      status: videoResult.status,
    });

  } catch (error) {
    console.error('Video generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}
