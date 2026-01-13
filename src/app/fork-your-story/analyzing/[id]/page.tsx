'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ANALYSIS_STAGES = [
  { label: 'Verifying authenticity', duration: 2000 },
  { label: 'Mapping character architecture', duration: 2500 },
  { label: 'Searching historical parallels', duration: 3000 },
  { label: 'Generating narrative forks', duration: 2500 },
  { label: 'Composing visual treatments', duration: 2000 },
];

export default function AnalyzingPage() {
  const router = useRouter();
  useParams(); // Access params for route validation
  const { user } = useAuth();
  
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [storyData, setStoryData] = useState<{
    id: string;
    title: string;
    content: string;
    wordCount: number;
    keystrokeData?: {
      totalKeystrokes: number;
      averageInterval: number;
      typingDuration: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load story data from sessionStorage
    const pendingStory = sessionStorage.getItem('pendingStory');
    if (pendingStory) {
      const data = JSON.parse(pendingStory);
      setStoryData(data);
    } else {
      setError('Story data not found. Please start over.');
    }
  }, []);

  useEffect(() => {
    if (!storyData) return;

    // Call the API to analyze the story
    const analyzeStory = async () => {
      try {
        const response = await fetch('/api/fork-your-story/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            storyId: storyData.id,
            title: storyData.title,
            content: storyData.content,
            wordCount: storyData.wordCount,
            keystrokeData: storyData.keystrokeData,
            userId: user?.id || null, // Pass user ID if logged in
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Analysis failed');
        }

        const result = await response.json();
        
        // Store the analysis results
        sessionStorage.setItem(`analysis_${storyData.id}`, JSON.stringify(result.analysis));
        
        // Navigate to results
        router.push(`/fork-your-story/results/${storyData.id}`);
      } catch (err: unknown) {
        console.error('Analysis error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze story. Please try again.';
        setError(errorMessage);
      }
    };

    // Start analysis
    analyzeStory();

    // Simulate progress while API call is happening
    const totalDuration = ANALYSIS_STAGES.reduce((acc, stage) => acc + stage.duration, 0);
    let elapsed = 0;
    
    const progressInterval = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 95); // Cap at 95% until API completes
      setProgress(newProgress);
      
      // Update current stage
      let stageElapsed = 0;
      for (let i = 0; i < ANALYSIS_STAGES.length; i++) {
        stageElapsed += ANALYSIS_STAGES[i].duration;
        if (elapsed < stageElapsed) {
          setCurrentStage(i);
          break;
        }
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [storyData, router]);

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
      <div className="max-w-[500px] w-full text-center">
        {/* Animated Rings */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          <div 
            className="absolute inset-0 rounded-full border animate-pulse"
            style={{ borderColor: 'rgba(168, 144, 128, 0.3)' }}
          />
          <div 
            className="absolute inset-4 rounded-full border animate-pulse"
            style={{ borderColor: 'rgba(168, 144, 128, 0.5)', animationDelay: '150ms' }}
          />
          <div 
            className="absolute inset-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(168, 144, 128, 0.1)' }}
          >
            <div 
              className="w-4 h-4 rounded-full animate-ping"
              style={{ background: 'var(--fys-accent)' }}
            />
          </div>
        </div>

        {/* Stage Label */}
        <p 
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--fys-accent)' }}
        >
          {ANALYSIS_STAGES[currentStage]?.label || 'Finalizing...'}
        </p>

        {/* Story Title */}
        {storyData && (
          <h2 
            className="text-2xl font-normal mb-8 italic"
            style={{ color: 'var(--fys-ivory)' }}
          >
            &quot;{storyData.title}&quot;
          </h2>
        )}

        {/* Progress Bar */}
        <div 
          className="h-1 w-full rounded-full overflow-hidden mb-8"
          style={{ background: 'rgba(228, 224, 219, 0.1)' }}
        >
          <div 
            className="h-full transition-all duration-300 ease-out rounded-full"
            style={{ 
              width: `${progress}%`,
              background: 'var(--fys-accent)'
            }}
          />
        </div>

        {/* Stage Indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {ANALYSIS_STAGES.map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{ 
                background: i <= currentStage ? 'var(--fys-accent)' : 'rgba(228, 224, 219, 0.1)'
              }}
            />
          ))}
        </div>

        {/* Description */}
        {error ? (
          <div>
            <p 
              className="text-base mb-4"
              style={{ color: '#ef4444' }}
            >
              {error}
            </p>
            <button
              onClick={() => router.push('/fork-your-story/write')}
              className="px-6 py-3 border text-sm tracking-wider uppercase transition-all duration-300 hover:border-[rgba(228,224,219,0.2)]"
              style={{ 
                borderColor: 'rgba(228, 224, 219, 0.1)',
                color: 'var(--fys-stone)'
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <p 
            className="text-base leading-relaxed"
            style={{ color: 'var(--fys-stone)' }}
          >
            We&apos;re analyzing your narrative patterns, searching our archive of historical figures, 
            and crafting two possible paths your story could take.
          </p>
        )}
      </div>
    </div>
  );
}
