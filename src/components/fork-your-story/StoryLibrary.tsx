'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Story {
  id: string;
  title: string;
  word_count: number;
  status: 'draft' | 'analyzing' | 'complete' | 'failed';
  isPublic: boolean;
  created_at: string;
  parallels?: string[];
  forks?: string[];
}

interface StoryLibraryProps {
  userId?: string;
}

export default function StoryLibrary({ userId }: StoryLibraryProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from API/Supabase
    // For now, use demo data or localStorage
    const loadStories = async () => {
      setLoading(true);
      
      // Demo stories
      const demoStories: Story[] = [
        {
          id: 'demo-1',
          title: 'The Longing',
          word_count: 281,
          status: 'complete',
          isPublic: true,
          created_at: new Date().toISOString(),
          parallels: ['Rumi', 'Neruda', 'Gibran'],
          forks: ['The Road of Pursuit', 'The Road of Transmutation'],
        },
      ];
      
      // Check if there's a pending story in sessionStorage
      const pendingStory = sessionStorage.getItem('pendingStory');
      if (pendingStory) {
        const data = JSON.parse(pendingStory);
        demoStories.unshift({
          id: data.id,
          title: data.title,
          word_count: data.word_count,
          status: 'complete',
          isPublic: true,
          created_at: data.submittedAt,
          parallels: ['Rumi', 'Neruda', 'Gibran'],
          forks: ['The Road of Pursuit', 'The Road of Transmutation'],
        });
      }
      
      setStories(demoStories);
      setLoading(false);
    };
    
    loadStories();
  }, [userId]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--fys-stone)' }}>Loading your library...</p>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div 
        className="py-16 text-center border rounded-sm"
        style={{ 
          borderColor: 'rgba(228, 224, 219, 0.08)',
          background: 'rgba(228, 224, 219, 0.02)'
        }}
      >
        <p 
          className="text-xl mb-4"
          style={{ color: 'var(--fys-ivory)' }}
        >
          Your library is empty
        </p>
        <p 
          className="text-base mb-8"
          style={{ color: 'var(--fys-stone)' }}
        >
          Begin your journey by writing your first story.
        </p>
        <Link
          href="/fork-your-story/write"
          className="inline-block px-8 py-3 border text-base tracking-[0.15em] uppercase transition-all duration-300"
          style={{ 
            borderColor: 'var(--fys-accent)',
            color: 'var(--fys-accent)',
            background: 'rgba(168, 144, 128, 0.1)'
          }}
        >
          Write Your First Story
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 
            className="text-2xl font-normal"
            style={{ color: 'var(--fys-ivory)' }}
          >
            Your Library
          </h2>
          <p 
            className="text-sm"
            style={{ color: 'var(--fys-stone)' }}
          >
            {stories.length} {stories.length === 1 ? 'story' : 'stories'} · {stories.filter(s => s.status === 'complete').length} complete
          </p>
        </div>
        <Link
          href="/fork-your-story/write"
          className="px-6 py-3 border text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:border-[var(--fys-cream)]"
          style={{ 
            borderColor: 'var(--fys-earth)',
            color: 'var(--fys-cream)'
          }}
        >
          + New Story
        </Link>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
        
        {/* New Story Card */}
        <Link
          href="/fork-your-story/write"
          className="border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center min-h-[280px] transition-all duration-300 hover:border-[var(--fys-accent)]"
          style={{ borderColor: 'rgba(228, 224, 219, 0.1)' }}
        >
          <span 
            className="text-4xl mb-4"
            style={{ color: 'var(--fys-earth)' }}
          >
            +
          </span>
          <span 
            className="text-base tracking-wider uppercase"
            style={{ color: 'var(--fys-stone)' }}
          >
            New Story
          </span>
        </Link>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const statusConfig = {
    draft: { label: 'Draft', color: 'var(--fys-stone)', icon: '📝' },
    analyzing: { label: 'Analyzing', color: 'var(--fys-accent)', icon: '◐' },
    complete: { label: 'Complete', color: '#22c55e', icon: '✓' },
    failed: { label: 'Failed', color: '#ef4444', icon: '⚠️' },
  };

  const status = statusConfig[story.status];
  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div 
      className="border rounded-sm overflow-hidden transition-all duration-300 hover:border-[rgba(228,224,219,0.2)]"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.08)',
        background: 'rgba(228, 224, 219, 0.02)'
      }}
    >
      <div className="p-6">
        {/* Title */}
        <h3 
          className="text-xl font-normal mb-2 line-clamp-1"
          style={{ color: 'var(--fys-ivory)' }}
        >
          &quot;{story.title}&quot;
        </h3>
        
        {/* Meta */}
        <p 
          className="text-sm mb-4"
          style={{ color: 'var(--fys-earth)' }}
        >
          {story.word_count} words · {formattedDate}
        </p>
        
        {/* Status */}
        <div 
          className="flex items-center gap-2 mb-4 text-sm"
          style={{ color: status.color }}
        >
          <span>{status.icon}</span>
          <span className="uppercase tracking-wider">{status.label}</span>
        </div>
        
        {/* Results Preview */}
        {story.status === 'complete' && (
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
          >
            {story.parallels && (
              <p 
                className="text-sm mb-2"
                style={{ color: 'var(--fys-stone)' }}
              >
                <span style={{ color: 'var(--fys-accent)' }}>Parallels:</span> {story.parallels.join(', ')}
              </p>
            )}
            {story.forks && (
              <p 
                className="text-sm"
                style={{ color: 'var(--fys-stone)' }}
              >
                <span style={{ color: 'var(--fys-accent)' }}>Roads:</span> {story.forks.length} paths
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div 
        className="px-6 py-4 border-t flex gap-4"
        style={{ 
          borderColor: 'rgba(228, 224, 219, 0.05)',
          background: 'rgba(228, 224, 219, 0.01)'
        }}
      >
        {story.status === 'complete' ? (
          <Link
            href={`/fork-your-story/results/${story.id}`}
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
            style={{ color: 'var(--fys-accent)' }}
          >
            View Results
          </Link>
        ) : story.status === 'analyzing' ? (
          <Link
            href={`/fork-your-story/analyzing/${story.id}`}
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
            style={{ color: 'var(--fys-accent)' }}
          >
            View Progress
          </Link>
        ) : story.status === 'failed' ? (
          <button
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
            style={{ color: 'var(--fys-accent)' }}
          >
            Retry Analysis
          </button>
        ) : (
          <Link
            href={`/fork-your-story/write?draft=${story.id}`}
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
            style={{ color: 'var(--fys-accent)' }}
          >
            Continue Writing
          </Link>
        )}
      </div>
    </div>
  );
}
