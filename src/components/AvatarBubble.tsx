"use client";

import React, { useEffect, useRef, useState } from "react";

export function AvatarBubble() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mouthOpen, setMouthOpen] = useState(0);

  useEffect(() => {
    const audio = new Audio("/audio/mrmelo-homepage.mp3");
    audioRef.current = audio;
    audio.preload = "auto";
    let ctx: AudioContext | null = null;
    let src: MediaElementAudioSourceNode | null = null;
    let analyser: AnalyserNode | null = null;
    let raf = 0;
    const levels = new Uint8Array(64);
    const loop = () => {
      if (analyser) {
        analyser.getByteFrequencyData(levels);
        let sum = 0;
        for (let i = 2; i < 16; i++) sum += levels[i];
        const avg = sum / 14;
        setMouthOpen(Math.min(1, avg / 200));
      }
      raf = requestAnimationFrame(loop);
    };
    audio.addEventListener("play", async () => {
      try {
        if (!ctx) {
          type AudioContextCtor = new () => AudioContext;
          type WindowAudio = Window & { webkitAudioContext?: AudioContextCtor; AudioContext?: AudioContextCtor };
          const w = window as WindowAudio;
          const AudioCtor: AudioContextCtor | undefined = w.AudioContext ?? w.webkitAudioContext;
          if (!AudioCtor) return;
          ctx = new AudioCtor();
          src = ctx.createMediaElementSource(audio);
          analyser = ctx.createAnalyser();
          analyser.fftSize = 128;
          src.connect(analyser);
          analyser.connect(ctx.destination);
          loop();
        }
      } catch {
        // ignore init errors
      }
    });
    // Best-effort autoplay
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      if (raf) cancelAnimationFrame(raf);
      try { ctx?.close(); } catch {}
    };
  }, []);

  return (
    <div className="pointer-events-auto fixed bottom-4 left-4 z-50 flex items-center gap-3">
      <div className="relative w-20 h-20 rounded-full border border-[color:var(--sand)] bg-black/70 p-2 shadow-lg">
        <img src="/avatar/guide.png" alt="Guide avatar" className="h-full w-full rounded-full object-cover" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 rounded-full bg-[color:var(--sand)]" style={{ width: `${Math.max(16, Math.floor(16 + mouthOpen*24))}px` }} />
      </div>
      <div className="max-w-xs rounded-xl border border-[color:var(--sand)] bg-black/70 p-3 text-sm">
        <p className="opacity-80">I’ll walk you through the page. Use play/pause or mute anytime.</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => { const a = audioRef.current; if (!a) return; a.paused ? a.play().catch(()=>{}) : a.pause(); }} className="rounded-full border border-[color:var(--sand)] bg-black/70 px-3 py-1 text-xs">Play/Pause</button>
          <button onClick={() => { const a = audioRef.current; if (!a) return; a.muted = !a.muted; }} className="rounded-full border border-[color:var(--sand)] bg-black/70 px-3 py-1 text-xs">Mute</button>
        </div>
      </div>
    </div>
  );
}

export default AvatarBubble;


