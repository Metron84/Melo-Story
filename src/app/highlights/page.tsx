"use client";

import { useState, useEffect } from "react";

const videos = [
  {
    title: "Bulletin",
    description: "Dynamic bulletin-style presentation showcasing key messaging and brand communication",
    poster: "/video-highlights/thumbnails/Bulletin.jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Bulletin.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Bulletin.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Bulletin.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Creative Video Essay",
    description: "Thought-provoking video essay exploring creative concepts and innovative storytelling",
    poster: "/video-highlights/thumbnails/Creative Video Essay.jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Creative%20Video%20Essay.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Creative%20Video%20Essay.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Creative%20Video%20Essay.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Foundernomics Song Commercial",
    description: "Musical commercial for Foundernomics, blending business insights with engaging audio-visual content",
    poster: "/video-highlights/thumbnails/Foundernomics Song Commercial.jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Foundernomics%20Song%20Commercial.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Foundernomics%20Song%20Commercial.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Foundernomics%20Song%20Commercial.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Mock Commercial (Sahara)",
    description: "Creative mock commercial demonstrating advertising concepts and brand storytelling",
    poster: "/video-highlights/thumbnails/Mock Commercial (Sahara).jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Commercial%20%28Sahara%29.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Commercial%20%28Sahara%29.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Commercial%20%28Sahara%29.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Mock Podcast (Tansweer)",
    description: "Engaging podcast-style content exploring business and entrepreneurial topics",
    poster: "/video-highlights/thumbnails/Mock Podcast (Tansweer).jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Podcast%20%28Tanweer%29.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Podcast%20%28Tanweer%29.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Mock%20Podcast%20%28Tanweer%29.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Social Media Creation",
    description: "Professional social media content creation with voiceover and visual storytelling",
    poster: "/video-highlights/thumbnails/Social Media Creation Voiced.jpg",
    sources: [
      // Try MP4 first (most compatible), then WebM, then original MOV as last resort
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Social%20Media%20Creation%20Voiced.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Social%20Media%20Creation%20Voiced.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Social%20Media%20Creation%20Voiced.MOV", type: "video/mp4" }, // Fallback as MP4 type
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Social%20Media%20Creation%20Voiced.ogg", type: "video/ogg" }
    ]
  },
  {
    title: "Client Testimonials",
    description: "Authentic testimonials from satisfied clients sharing their success stories and experiences",
    poster: "/video-highlights/thumbnails/Testiomonials.jpg",
    sources: [
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Testiomonials.mp4", type: "video/mp4" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Testiomonials.webm", type: "video/webm" },
      { src: "https://sgkqgi3mjft1jnni.public.blob.vercel-storage.com/Testiomonials.ogg", type: "video/ogg" }
    ]
  }
];

export default function HighlightsPage() {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices for better optimization
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (window.innerWidth <= 768 && window.innerHeight <= 1024);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoLoad = (index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const handleVideoError = (index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }));
    setErrorStates(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoLoadStart = (index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
            Video Highlights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing excellence in visual storytelling, creative direction, and multimedia production. Each piece represents the pinnacle of craft and strategic communication.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video, index) => (
            <article
              key={index}
              className="group relative bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10"
            >
              <div className="relative aspect-[16/9] w-full">
                {!errorStates[index] ? (
                  <video
                    className="w-full h-full object-cover rounded-t-xl"
                    controls
                    preload={isMobile ? "none" : "metadata"} // Better for mobile bandwidth
                    poster={video.poster}
                    playsInline
                    muted
                    onLoadStart={() => handleVideoLoadStart(index)}
                    onLoadedData={() => handleVideoLoad(index)}
                    onError={() => handleVideoError(index)}
                    crossOrigin="anonymous"
                    // Mobile optimizations
                    disablePictureInPicture
                    disableRemotePlayback
                    // Prevent unwanted fullscreen on mobile
                    style={{
                      maxHeight: '70vh',
                      // Improve touch targets on mobile
                      minHeight: isMobile ? '200px' : 'auto'
                    }}
                    // Mobile-specific attributes
                    {...(isMobile && {
                      // Reduce controls size on mobile for better UX
                      controlsList: "nodownload nofullscreen noremoteplayback"
                    })}
                  >
                    {video.sources.map((source, sourceIndex) => (
                      <source
                        key={sourceIndex}
                        src={source.src}
                        type={source.type}
                      />
                    ))}
                    <track kind="captions" label="No captions available" default />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full bg-black/50 rounded-t-xl flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <div className="text-red-400 text-sm mb-2">⚠️ Video Unavailable</div>
                      <div className="text-xs text-gray-400 mb-3">
                        This video format may not be supported on your device.
                      </div>
                      <div className="text-xs text-yellow-400">
                        Try refreshing the page or contact us for assistance.
                      </div>
                    </div>
                  </div>
                )}

                {loadingStates[index] && !errorStates[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-t-xl">
                    <div className="text-white text-sm">Loading video...</div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-yellow-400/10 border border-yellow-400/20 rounded-full px-6 py-3 mb-6">
            <span className="text-yellow-400 text-sm font-medium">🎬 More Content Available</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Additional video highlights and client work samples available upon request. Contact us to discuss your specific project needs.
          </p>
        </div>
      </div>
    </section>
  );
}


