'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VideoPlayerProps {
  videoSrc: {
    webm: string;
    mp4: string;
  };
  posterSrc: string;
  className?: string;
}

export default function VideoPlayer({ videoSrc, posterSrc, className = '' }: VideoPlayerProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Try to autoplay on desktop
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, show play button
        setShowPlayButton(true);
      });
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      setShowVideo(true);
      setShowPlayButton(false);
      videoRef.current.play().catch((error) => {
        console.warn('Video play failed:', error);
        setShowVideo(false);
        setShowPlayButton(true);
      });
    }
  };

  const handleVideoError = () => {
    console.warn('Video failed to load');
    setShowVideo(false);
    setShowPlayButton(true);
  };

  const handleVideoLoad = () => {
    if (!isMobile) {
      setShowVideo(true);
      setShowPlayButton(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover rounded-xl border border-[color:var(--sand)] md:translate-x-2 ${
          showVideo ? 'block' : 'hidden'
        } [@media_(prefers-reduced-motion:_reduce)]:hidden`}
        autoPlay={!isMobile}
        loop
        muted
        playsInline
        preload={isMobile ? 'none' : 'metadata'}
        poster={posterSrc}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
      >
        <source src={videoSrc.webm} type="video/webm" />
        <source src={videoSrc.mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Poster Image */}
      <Image
        src={posterSrc}
        alt="Hero visual"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`video-poster absolute inset-0 object-cover rounded-xl border border-[color:var(--sand)] md:translate-x-2 ${
          showVideo ? 'hidden' : 'block'
        } [@media_(prefers-reduced-motion:_reduce)]:block`}
        priority
      />

      {/* Mobile/Desktop Play Button */}
      {showPlayButton && (
        <button
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-xl border border-[color:var(--sand)] md:translate-x-2"
          onClick={handlePlayClick}
          aria-label="Play hero video"
        >
          <div className="bg-white/90 rounded-full p-4 shadow-lg">
            <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
