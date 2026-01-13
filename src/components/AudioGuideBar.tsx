"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AudioGuideBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const audio = new Audio("/audio/mrmelo-homepage.mp3");
    audioRef.current = audio;
    audio.preload = "auto";
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onPlay = () => setStarted(true);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    // Try autoplay; may be blocked
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) { a.play().catch(()=>{}); } else { a.pause(); }
  };
  const toggleMute = () => {
    const a = audioRef.current; if (!a) return;
    a.muted = !a.muted; setMuted(a.muted);
  };
  const toggleRate = () => {
    const a = audioRef.current; if (!a) return;
    const next = a.playbackRate === 1 ? 1.25 : 1; a.playbackRate = next; setRate(next);
  };
  const onScrub = (t: number) => {
    const a = audioRef.current; if (!a) return;
    a.currentTime = t; setCurrentTime(a.currentTime);
  };

  return (
    <div className="pointer-events-auto sticky top-[52px] z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-xl border border-[color:var(--sand)] bg-black/70 backdrop-blur px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="font-serif text-base md:text-lg">
              <span className="mr-2">Start Audio Guide</span>
              {!started && (
                <button onClick={togglePlay} className="rounded-full border border-[color:var(--sand)] px-3 py-1 text-xs hover:bg-[color:var(--sand)]/20">Play</button>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={togglePlay} className="rounded-md border border-[color:var(--sand)] px-3 py-1 text-xs">{(audioRef.current?.paused ?? true) ? "Play" : "Pause"}</button>
              <button onClick={toggleMute} className="rounded-md border border-[color:var(--sand)] px-3 py-1 text-xs">{muted ? "Unmute" : "Mute"}</button>
              <button onClick={toggleRate} className="rounded-md border border-[color:var(--sand)] px-3 py-1 text-xs">{rate.toFixed(2)}x</button>
            </div>
            <div className="flex-1 md:max-w-[50%]">
              <input
                aria-label="Audio progress"
                className="w-full accent-[color:var(--accent)]"
                type="range"
                min={0}
                max={duration ? Math.ceil(duration) : 100}
                value={currentTime}
                onChange={(e) => onScrub(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


