/**
 * Replicate (Kling AI) Video Generation Integration
 * 
 * Uses Replicate's Kling v2.1 model for text-to-video generation
 * Model: kwaivgi/kling-v2.1 via Replicate platform
 */

import Replicate from "replicate";

// Initialize Replicate client (server-side only)
let replicate: Replicate | null = null;

if (typeof window === 'undefined') {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (apiToken) {
    replicate = new Replicate({
      auth: apiToken,
    });
  }
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
  startImage?: string; // Optional: image URL for image-to-video
  onProgress?: (update: QueueUpdate) => void;
}

// Kling v2.1 model identifier
const KLING_MODEL = "kwaivgi/kling-v2.1";

/**
 * Generate a video trailer using Kling AI via Replicate
 */
export async function generateVideoTrailer(
  options: VideoGenerationOptions
): Promise<VideoGenerationResult> {
  const { prompt, duration = 5, aspectRatio = '16:9', startImage, onProgress } = options;

  try {
    // Check if API key is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
    }

    if (!replicate) {
      throw new Error('Replicate client not initialized');
    }

    // Kling v2.1 input parameters
    const input: {
      prompt: string;
      start_image?: string;
    } = {
      prompt: prompt,
    };

    // Add optional start_image if provided (for image-to-video)
    if (startImage) {
      input.start_image = startImage;
    }

    // Generate video using Kling v2.1
    const output = await replicate.run(KLING_MODEL, { input });

    // Extract video URL from result
    // Replicate returns a FileOutput object with .url() method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let videoUrl: string;
    
    if (output && typeof output === 'object' && 'url' in output && typeof (output as any).url === 'function') {
      // If output has .url() method (FileOutput)
      videoUrl = (output as any).url();
    } else if (typeof output === 'string') {
      // If output is directly a URL string
      videoUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
      // If output is an array, get first element
      const firstOutput = output[0];
      if (typeof firstOutput === 'string') {
        videoUrl = firstOutput;
      } else if (firstOutput && typeof firstOutput === 'object' && 'url' in firstOutput) {
        videoUrl = typeof (firstOutput as any).url === 'function' 
          ? (firstOutput as any).url() 
          : (firstOutput as any).url;
      } else {
        throw new Error('Video generation failed: Unexpected output format');
      }
    } else {
      throw new Error('Video generation failed: No video URL returned');
    }

    if (!videoUrl || typeof videoUrl !== 'string') {
      throw new Error('Video generation failed: Invalid video URL');
    }

    // Generate a request ID for tracking
    const requestId = `kling_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return {
      videoUrl,
      requestId,
      duration: `${duration}s`,
      status: 'completed',
    };

  } catch (error: unknown) {
    console.error('Replicate/Kling video generation error:', error);
    
    // Handle specific error types
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('API') || errorMessage.includes('401') || errorMessage.includes('auth') || errorMessage.includes('token')) {
      throw new Error('Invalid REPLICATE_API_TOKEN. Please check your Replicate API key.');
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('limit') || errorMessage.includes('credit')) {
      throw new Error('API quota exceeded. Please check your Replicate usage limits.');
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
  );

  return await generateVideoTrailer({
    prompt: videoPrompt,
    duration: 5, // 5 seconds for trailers
    aspectRatio: '16:9',
    onProgress: (update) => {
      // Simulate progress for Kling (Replicate doesn't provide real-time progress)
      if (onProgress) {
        // Kling typically takes 30-90 seconds, so we simulate progress
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          if (currentProgress < 95) {
            onProgress(currentProgress);
          } else {
            clearInterval(interval);
          }
        }, 2000); // Update every 2 seconds
        
        // Clean up interval after completion
        setTimeout(() => clearInterval(interval), 90000);
      }
    },
  });
}
