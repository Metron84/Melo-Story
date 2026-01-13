'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MIN_WORDS = 250;
const MAX_WORDS = 1500;

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keystrokeData, setKeystrokeData] = useState<{ key: string; time: number; interval: number }[]>([]);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = story.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS && title.trim().length > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!typingStartTime) setTypingStartTime(Date.now());
    setKeystrokeData(prev => [...prev, {
      key: e.key,
      time: Date.now(),
      interval: prev.length > 0 ? Date.now() - prev[prev.length - 1].time : 0
    }]);
  };

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Generate a temporary ID for the story
    const storyId = `story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store story data in sessionStorage for the analyzing page
    sessionStorage.setItem('pendingStory', JSON.stringify({
      id: storyId,
      title,
      content: story,
      wordCount,
      keystrokeData: {
        totalKeystrokes: keystrokeData.length,
        averageInterval: keystrokeData.length > 1 
          ? keystrokeData.slice(1).reduce((acc, k) => acc + k.interval, 0) / (keystrokeData.length - 1)
          : 0,
        typingDuration: typingStartTime ? Date.now() - typingStartTime : 0,
      },
      submittedAt: new Date().toISOString(),
    }));
    
    // Navigate to analyzing page
    router.push(`/fork-your-story/analyzing/${storyId}`);
  };

  return (
    <>
      {/* Back Navigation */}
      <Link 
        href="/fork-your-story"
        className="fixed top-8 left-8 z-20 flex items-center gap-2 text-base tracking-wider transition-colors duration-300 hover:text-[var(--fys-ivory)]"
        style={{ color: 'var(--fys-stone)' }}
      >
        ← Back
      </Link>

      <div className="relative z-10 max-w-[900px] mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--fys-accent)' }}
          >
            Step One
          </p>
          <h1 
            className="text-4xl md:text-5xl font-normal mb-4"
            style={{ color: 'var(--fys-ivory)' }}
          >
            Tell Your Story
          </h1>
          <p 
            className="text-lg leading-relaxed max-w-[600px] mb-4"
            style={{ color: 'var(--fys-stone)' }}
          >
            Share a personal crossroads, a character you&apos;re developing, a story within a story, 
            or any narrative you want to explore. Where could it go?
          </p>
          <div 
            className="p-4 border rounded-sm max-w-[600px]"
            style={{ 
              borderColor: 'var(--fys-accent)',
              background: 'var(--fys-accent-soft)'
            }}
          >
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--fys-ink)' }}
            >
              <strong>Try it free</strong> — No signup required for your first story. 
              After analysis, you&apos;ll see your results immediately. 
              <strong> Sign up free</strong> to save your story to your library, 
              connect it to other stories, and track your creative evolution.
            </p>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a title..."
            className="w-full bg-transparent py-4 text-2xl md:text-3xl font-normal outline-none transition-colors duration-300 border-b placeholder:text-[var(--fys-earth)]"
            style={{ 
              color: 'var(--fys-ivory)',
              borderColor: title ? 'var(--fys-accent)' : 'rgba(228, 224, 219, 0.1)'
            }}
          />
        </div>

        {/* Story Textarea */}
        <div className="relative mb-6">
          <textarea
            ref={textareaRef}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Begin your story here...

Perhaps it's about a moment that changed everything. A decision you're facing. A character whose journey mirrors your own. A world you're building.

Write authentically. We're listening for real voices.`}
            className="w-full h-[450px] p-6 text-lg leading-relaxed resize-none outline-none transition-all duration-300 border rounded-sm placeholder:text-[var(--fys-earth)]"
            style={{ 
              background: 'rgba(228, 224, 219, 0.02)',
              color: 'var(--fys-ivory)',
              borderColor: story ? 'rgba(168, 144, 128, 0.3)' : 'rgba(228, 224, 219, 0.1)'
            }}
          />
          
          {/* Word Counter */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            <span 
              className="text-sm"
              style={{ 
                color: wordCount < MIN_WORDS 
                  ? 'var(--fys-stone)' 
                  : wordCount > MAX_WORDS 
                    ? '#ef4444' 
                    : 'var(--fys-accent)'
              }}
            >
              {wordCount} / {MIN_WORDS}-{MAX_WORDS} words
            </span>
          </div>
        </div>

        {/* Authenticity Note */}
        <div 
          className="p-5 mb-8 border-l-2 text-base leading-relaxed"
          style={{ 
            background: 'rgba(228, 224, 219, 0.02)',
            borderColor: 'rgba(168, 144, 128, 0.3)',
            color: 'var(--fys-stone)'
          }}
        >
          <span style={{ color: 'var(--fys-accent)' }}>Note on authenticity:</span> While you may use AI tools 
          to refine or structure your thoughts, we assess stories for authentic human voice. 
          Purely AI-generated content limits our ability to accurately map your creative paths 
          and find meaningful historical parallels. Your voice matters.
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`px-12 py-4 text-base tracking-[0.2em] uppercase border transition-all duration-300 ${
              isValid && !isSubmitting
                ? 'border-[var(--fys-accent)] bg-[rgba(168,144,128,0.1)] hover:bg-[rgba(168,144,128,0.2)] cursor-pointer'
                : 'border-[rgba(228,224,219,0.1)] bg-[rgba(228,224,219,0.02)] cursor-not-allowed'
            }`}
            style={{ 
              color: isValid && !isSubmitting ? 'var(--fys-accent)' : 'var(--fys-earth)'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Analyze My Story'}
          </button>
        </div>

        {/* Helper Text */}
        {!isValid && (
          <p 
            className="mt-4 text-sm text-right"
            style={{ color: 'var(--fys-earth)' }}
          >
            {!title.trim() 
              ? 'Please add a title' 
              : wordCount < MIN_WORDS 
                ? `${MIN_WORDS - wordCount} more words needed`
                : wordCount > MAX_WORDS
                  ? `${wordCount - MAX_WORDS} words over limit`
                  : ''}
          </p>
        )}
      </div>
    </>
  );
}
