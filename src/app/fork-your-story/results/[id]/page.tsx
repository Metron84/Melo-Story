'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Demo results - In production, this would come from the API/database
const DEMO_RESULTS = {
  verification: {
    isHuman: true,
    confidence: 94,
  },
  characterMap: {
    characterSet: 'Confessional lyricist who transforms longing into transcendence',
    mindSet: 'Paradoxical thinker—finding comfort in avoidance, liberation in absence',
    skillSet: 'Sensory saturation, spiritual-erotic fusion, philosophical abstraction',
    toolSet: 'Second-person address, synesthetic imagery, prose poetry form',
  },
  parallels: [
    {
      name: 'Rumi',
      era: '1207–1273',
      icon: '🌹',
      traits: [
        'Fused erotic and spiritual longing into unified expression',
        'Used absence of the beloved as path to divine',
        'Transformed suffering into ecstatic revelation',
      ],
      quote: 'The wound is the place where the Light enters you.',
    },
    {
      name: 'Pablo Neruda',
      era: '1904–1973',
      icon: '🌊',
      traits: [
        'Worshipped the beloved through saturated sensory detail',
        'Made the body a landscape of metaphor',
        'Elevated physical desire to cosmic significance',
      ],
      quote: 'I love you as certain dark things are to be loved, in secret, between the shadow and the soul.',
    },
    {
      name: 'Kahlil Gibran',
      era: '1883–1931',
      icon: '🕯️',
      traits: [
        'Wrote philosophical prose poetry on love and loss',
        'Bridged Eastern mysticism with Western confession',
        'Found wisdom in the ache of separation',
      ],
      quote: 'Ever has it been that love knows not its own depth until the hour of separation.',
    },
  ],
  forks: [
    {
      id: 'pursuit',
      letter: 'A',
      title: 'The Road of Pursuit',
      subtitle: 'Close the distance, risk the mystery',
      description: 'Like Neruda in Twenty Love Poems—move toward the beloved. Let longing become arrival. The sensory worship you\'ve cultivated transforms from imagination to presence. The risk: what you find may not match what you\'ve created in absence. The reward: the thunder becomes touch.',
      outcome: 'High risk. High transformation. The story becomes a manifesto of presence.',
      trailer: {
        duration: '0:26',
        scenes: [
          'EXT. CITY STREET - GOLDEN HOUR',
          'A figure walks with purpose. Shadows lengthen.',
          '"I\'ve memorized the architecture of absence."',
          '"Today, I choose arrival."',
          'Two silhouettes meet. The frame holds.',
          'TITLE CARD: THE ROAD OF PURSUIT',
        ],
      },
    },
    {
      id: 'transmutation',
      letter: 'B',
      title: 'The Road of Transmutation',
      subtitle: 'Let absence become the art itself',
      description: 'Like Rumi after losing Shams—let the longing become the work. The beloved remains unreachable, but the ache generates endless creation. Your "comfort in avoidance" becomes discipline. The separation is not obstacle but fuel. You write your way toward what you cannot touch.',
      outcome: 'Slow burn. Deep resonance. The story becomes a meditation on desire itself.',
      trailer: {
        duration: '0:24',
        scenes: [
          'INT. WRITER\'S ROOM - NIGHT',
          'Pen moves across paper. Ink becomes river.',
          '"What I cannot hold, I will honor."',
          'Pages flutter. Words take flight.',
          'The writer smiles at the distance.',
          'TITLE CARD: THE ROAD OF TRANSMUTATION',
        ],
      },
    },
  ],
};

export default function ResultsPage() {
  const params = useParams();
  const storyId = params.id as string;
  
  const [storyData, setStoryData] = useState<{
    title: string;
    content: string;
    wordCount: number;
  } | null>(null);
  const [analysisData, setAnalysisData] = useState<typeof DEMO_RESULTS | null>(null);
  const [selectedFork, setSelectedFork] = useState<string | null>(null);
  const [playingTrailer, setPlayingTrailer] = useState<typeof DEMO_RESULTS.forks[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load story data from sessionStorage
    const pendingStory = sessionStorage.getItem('pendingStory');
    if (pendingStory) {
      const data = JSON.parse(pendingStory);
      setStoryData(data);
    }

    // Load analysis results from sessionStorage
    const analysisKey = `analysis_${storyId}`;
    const storedAnalysis = sessionStorage.getItem(analysisKey);
    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis);
        setAnalysisData(analysis);
      } catch (err) {
        console.error('Failed to parse analysis data:', err);
        // Fallback to demo if parsing fails
        setAnalysisData(DEMO_RESULTS);
      }
    } else {
      // If no analysis found, use demo (shouldn't happen in normal flow)
      console.warn('No analysis data found, using demo');
      setAnalysisData(DEMO_RESULTS);
    }
    
    setLoading(false);
  }, [storyId]);

  if (loading || !analysisData) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--fys-stone)' }}>Loading results...</p>
      </div>
    );
  }

  return (
    <>
      {/* Trailer Modal */}
      {playingTrailer && (
        <TrailerPlayer 
          fork={playingTrailer} 
          onClose={() => setPlayingTrailer(null)} 
        />
      )}

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--fys-accent)' }}
          >
            Analysis Complete
          </p>
          <h1 
            className="text-4xl md:text-5xl font-normal mb-6 italic"
            style={{ color: 'var(--fys-ivory)' }}
          >
            &quot;{storyData?.title || 'Your Story'}&quot;
          </h1>
          <div className="flex justify-center items-center gap-4">
            <span 
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--fys-stone)' }}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ background: analysisData.verification.isHuman ? '#22c55e' : '#ef4444' }}
              />
              Verified Authentic ({analysisData.verification.confidence}%)
            </span>
            {storyData && (
              <span 
                className="text-sm"
                style={{ color: 'var(--fys-earth)' }}
              >
                · {storyData.wordCount} words
              </span>
            )}
          </div>
        </div>

        {/* Character Map */}
        <section className="mb-20">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--fys-accent)' }}
          >
            Your Character Map
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(analysisData.characterMap).map(([key, value]) => (
              <div 
                key={key}
                className="p-6 border"
                style={{ 
                  borderColor: 'rgba(228, 224, 219, 0.08)',
                  background: 'rgba(228, 224, 219, 0.02)'
                }}
              >
                <p 
                  className="text-xs tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'var(--fys-accent)' }}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--fys-cream)' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Historical Parallels */}
        <section className="mb-20">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--fys-accent)' }}
          >
            Three Who Walked Similar Paths
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisData.parallels.map((figure) => (
              <div 
                key={figure.name}
                className="border overflow-hidden"
                style={{ 
                  borderColor: 'rgba(228, 224, 219, 0.08)',
                  background: 'rgba(228, 224, 219, 0.02)'
                }}
              >
                <div className="p-8">
                  <div 
                    className="flex items-center gap-4 mb-6 pb-6 border-b"
                    style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
                  >
                    <span className="text-4xl">{figure.icon}</span>
                    <div>
                      <p className="text-xl" style={{ color: 'var(--fys-ivory)' }}>{figure.name}</p>
                      <p className="text-base" style={{ color: 'var(--fys-earth)' }}>{figure.era}</p>
                    </div>
                  </div>
                  
                  <p 
                    className="text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: 'var(--fys-accent)' }}
                  >
                    How You&apos;re Similar
                  </p>
                  <ul className="space-y-3">
                    {figure.traits.map((trait, i) => (
                      <li 
                        key={i}
                        className="flex gap-3 text-base leading-relaxed"
                        style={{ color: 'var(--fys-stone)' }}
                      >
                        <span style={{ color: 'var(--fys-accent)' }}>•</span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                <div 
                  className="px-8 py-4 border-t"
                  style={{ 
                    borderColor: 'rgba(228, 224, 219, 0.05)',
                    background: 'rgba(228, 224, 219, 0.01)'
                  }}
                >
                  <p 
                    className="text-sm italic"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    &quot;{figure.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Roads */}
        <section className="mb-20">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: 'var(--fys-accent)' }}
          >
            Your Two Roads
          </p>
          <p 
            className="text-base mb-8"
            style={{ color: 'var(--fys-stone)' }}
          >
            Where your story could go—two paths, respecting the duality of choice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analysisData.forks.map((fork) => (
              <div 
                key={fork.id}
                className={`border overflow-hidden transition-all duration-300 ${
                  selectedFork === fork.id 
                    ? 'border-[var(--fys-accent)]' 
                    : 'border-[rgba(228,224,219,0.08)] hover:border-[rgba(228,224,219,0.15)]'
                }`}
                style={{ background: 'rgba(228, 224, 219, 0.02)' }}
              >
                {/* Trailer Preview */}
                <div 
                  className="aspect-video relative cursor-pointer group"
                  style={{ background: 'linear-gradient(135deg, var(--fys-ink), var(--fys-deep))' }}
                  onClick={() => setPlayingTrailer(fork)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ borderColor: 'rgba(228, 224, 219, 0.3)' }}
                    >
                      <span 
                        className="text-2xl ml-1 transition-colors duration-300 group-hover:text-[var(--fys-accent)]"
                        style={{ color: 'rgba(228, 224, 219, 0.6)' }}
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                  <div 
                    className="absolute bottom-4 left-4 text-xs tracking-wider"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    TRAILER · {fork.trailer.duration}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 
                        className="text-2xl font-normal"
                        style={{ color: 'var(--fys-ivory)' }}
                      >
                        {fork.title}
                      </h3>
                      <p 
                        className="text-base italic"
                        style={{ color: 'var(--fys-accent)' }}
                      >
                        {fork.subtitle}
                      </p>
                    </div>
                    <span 
                      className="text-5xl font-normal leading-none"
                      style={{ color: 'rgba(228, 224, 219, 0.08)' }}
                    >
                      {fork.letter}
                    </span>
                  </div>
                  
                  <p 
                    className="text-base leading-relaxed mb-6"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    {fork.description}
                  </p>
                  
                  <div 
                    className="pt-4 border-t"
                    style={{ borderColor: 'rgba(228, 224, 219, 0.05)' }}
                  >
                    <p 
                      className="text-xs tracking-wider uppercase mb-1"
                      style={{ color: 'var(--fys-earth)' }}
                    >
                      Outcome
                    </p>
                    <p 
                      className="text-base"
                      style={{ color: 'var(--fys-cream)' }}
                    >
                      {fork.outcome}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <button
                    onClick={() => setSelectedFork(fork.id)}
                    className={`w-full py-4 border text-base tracking-[0.15em] uppercase transition-all duration-300 ${
                      selectedFork === fork.id
                        ? 'border-[var(--fys-accent)] bg-[rgba(168,144,128,0.15)]'
                        : 'border-[rgba(228,224,219,0.1)] hover:border-[rgba(228,224,219,0.2)]'
                    }`}
                    style={{ 
                      color: selectedFork === fork.id ? 'var(--fys-accent)' : 'var(--fys-stone)'
                    }}
                  >
                    {selectedFork === fork.id ? 'Path Selected' : 'Choose This Path'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/fork-your-story/write"
            className="px-8 py-4 border text-base tracking-[0.15em] uppercase transition-all duration-300 hover:border-[rgba(228,224,219,0.2)]"
            style={{ 
              borderColor: 'rgba(228, 224, 219, 0.1)',
              color: 'var(--fys-stone)'
            }}
          >
            Write Another
          </Link>
          <Link
            href="/fork-your-story"
            className="px-8 py-4 border text-base tracking-[0.15em] uppercase transition-all duration-300 hover:border-[rgba(228,224,219,0.2)]"
            style={{ 
              borderColor: 'rgba(228, 224, 219, 0.1)',
              color: 'var(--fys-stone)'
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}

function TrailerPlayer({ 
  fork, 
  onClose 
}: { 
  fork: { 
    id: string; 
    letter: string; 
    title: string; 
    subtitle: string; 
    description: string; 
    outcome: string; 
    trailer: { 
      duration: string; 
      scenes: string[];
      videoUrl?: string;
    } 
  };
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(fork.trailer.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate video if it doesn't exist
  useEffect(() => {
    if (!videoUrl && !isGenerating) {
      setIsGenerating(true);
      console.log('🎬 Generating video for fork:', fork.id);
      
      fetch('/api/fork-your-story/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fork }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Video generation failed');
          }
          return res.json();
        })
        .then((data) => {
          if (data.videoUrl) {
            console.log('✅ Video generated:', data.videoUrl);
            setVideoUrl(data.videoUrl);
            setIsGenerating(false);
          } else {
            throw new Error('No video URL returned');
          }
        })
        .catch((error) => {
          console.error('❌ Video generation error:', error);
          setIsGenerating(false);
          setVideoError(true);
        });
    }
  }, [videoUrl, isGenerating, fork]);

  // Check if video URL exists
  const hasVideo = !!videoUrl;

  // Text-based trailer (fallback)
  useEffect(() => {
    if (!hasVideo && !isGenerating) {
      const timer = setInterval(() => {
        setCurrentScene(prev => {
          if (prev >= fork.trailer.scenes.length - 1) {
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [fork.trailer.scenes.length, hasVideo, isGenerating]);

  // Handle video loading
  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setVideoError(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.95)' }}
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-lg tracking-widest transition-colors duration-300 hover:text-white"
        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
      >
        CLOSE ✕
      </button>
      
      <div className="max-w-[900px] w-full px-8">
        <div 
          className="aspect-video border rounded-sm overflow-hidden relative"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a1f, #0a0a0a)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Generating Video State */}
          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mb-4" style={{ borderColor: 'var(--fys-accent)' }}></div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Generating video...</p>
              <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>This may take 30-60 seconds</p>
            </div>
          )}

          {/* Real Video Player (if video URL exists) */}
          {hasVideo && !videoError && !isGenerating && (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading video...</p>
                </div>
              )}
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </>
          )}

          {/* Text-based Trailer (fallback or if no video) */}
          {(!hasVideo || videoError) && !isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p 
                className="text-xl md:text-2xl text-center px-12 leading-relaxed font-mono transition-opacity duration-500"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                {fork.trailer.scenes[currentScene]}
              </p>
            </div>
          )}
          
          {/* Progress bar (for text-based only) */}
          {!hasVideo && !isGenerating && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div 
                className="h-full transition-all duration-1000"
                style={{ 
                  width: `${((currentScene + 1) / fork.trailer.scenes.length) * 100}%`,
                  background: 'var(--fys-accent)'
                }}
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <h3 
            className="text-2xl font-normal tracking-wide"
            style={{ color: 'white' }}
          >
            {fork.title}
          </h3>
          <p 
            className="text-sm font-mono mt-2"
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          >
            TRAILER · {fork.trailer.duration}
            {isGenerating && ' · Generating...'}
          </p>
        </div>
      </div>
    </div>
  );
}
