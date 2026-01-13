/**
 * Fal.ai (Pika Labs) Video Generation Integration
 * 
 * Uses fal.ai/pika/v2.2/text-to-video for AI video generation
 * Model: Pika Labs v2.2 via fal.ai platform
 */

import { fal } from "@fal-ai/client";

// Configure fal.ai client (server-side only)
if (typeof window === 'undefined') {
  fal.config({
    credentials: process.env.FAL_KEY || '',
  });
}

export interface VideoGenerationResult {
  videoUrl: string;
  requestId: string;
  duration: string;
  status: 'completed' | 'processing' | 'failed';
}

export interface QueueUpdate {
  status: string;
  logs?: Array<{ message: string }>;
}

export interface VideoGenerationOptions {
  prompt: string;
  duration?: number; // seconds (default: 5)
  aspectRatio?: '16:9' | '9:16' | '1:1'; // default: '16:9'
  onProgress?: (update: QueueUpdate) => void;
}

/**
 * Generate a video trailer using Pika Labs via fal.ai
 */
export async function generateVideoTrailer(
  options: VideoGenerationOptions
): Promise<VideoGenerationResult> {
  const { prompt, duration = 5, aspectRatio = '16:9', onProgress } = options;

  try {
    // Check if API key is configured
    if (!process.env.FAL_KEY) {
      throw new Error('FAL_KEY is not set in environment variables');
    }

    // Configure fal.ai (server-side only)
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // Generate video using Pika v2.2
    // Duration must be string "5" or "10" for Pika API
    const durationString = duration === 10 ? "10" : "5";
    const result = await fal.subscribe("fal-ai/pika/v2.2/text-to-video", {
      input: {
        prompt: prompt,
        duration: durationString,
        aspect_ratio: aspectRatio,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && onProgress) {
          update.logs?.map((log) => log.message).forEach(console.log);
          onProgress(update);
        }
      },
    });

    // Extract video URL from result
    // The result structure may vary, so we check multiple possible paths
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultData = result.data as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultAny = result as any;
    const videoUrl = resultData?.video?.url || 
                     resultData?.video_url || 
                     resultAny?.video?.url || 
                     '';
    
    if (!videoUrl) {
      throw new Error('Video generation failed: No video URL returned');
    }

    return {
      videoUrl,
      requestId: result.requestId || '',
      duration: `${duration}s`,
      status: 'completed',
    };

  } catch (error: unknown) {
    console.error('Fal.ai video generation error:', error);
    
    // Handle specific error types
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('API_KEY') || errorMessage.includes('401')) {
      throw new Error('Invalid FAL_KEY. Please check your fal.ai API key.');
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
      throw new Error('API quota exceeded. Please check your fal.ai usage limits.');
    }

    throw new Error(`Video generation failed: ${errorMessage || 'Unknown error'}`);
  }
}

/**
 * Generate a cinematic video prompt from narrative fork description
 */
export function generateVideoPromptFromFork(
  forkTitle: string,
  forkDescription: string
): string {
  // Transform narrative description into cinematic video prompt
  const cinematicPrompt = `Cinematic trailer scene: ${forkTitle}. ${forkDescription.replace(/\./g, ', ')}. Slow dramatic camera movement, atmospheric lighting, cinematic color grading, film grain texture, professional cinematography, 4K quality, smooth motion, dramatic tension, visual storytelling.`;
  
  return cinematicPrompt;
}

/**
 * Generate video for a narrative fork
 */
export async function generateForkTrailerVideo(
  fork: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
  },
  onProgress?: (progress: number) => void
): Promise<VideoGenerationResult> {
  const videoPrompt = generateVideoPromptFromFork(
    fork.title,
    fork.description,
    fork.id
  );

  return await generateVideoTrailer({
    prompt: videoPrompt,
    duration: 5, // 5 seconds for demo
    aspectRatio: '16:9',
    onProgress: (update) => {
      // Pass the update through - the caller can handle progress calculation
      if (onProgress) {
        const progressPercent = update.logs ? (update.logs.length / 10) * 100 : 0;
        onProgress(Math.min(progressPercent, 95)); // Cap at 95% until complete
      }
    },
  });
}
