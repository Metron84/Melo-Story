'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, BookOpen, Sparkles } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  wordCount: number;
  analysis?: {
    parallels?: Array<{ name: string }>;
  } | null;
}

interface Insights {
  totalStories: number;
  totalWords: number;
  mostCommonParallel: string;
  averageWords: number;
  storiesThisMonth: number;
  creativeEvolution: string;
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = () => {
    // Calculate insights from stories
    const stories: Story[] = [];
    const pendingStory = sessionStorage.getItem('pendingStory');
    if (pendingStory) {
      const data = JSON.parse(pendingStory);
      const analysisKey = `analysis_${data.id}`;
      const analysis = sessionStorage.getItem(analysisKey);
      stories.push({
        ...data,
        analysis: analysis ? JSON.parse(analysis) : null,
      });
    }

    // Calculate insights
    const allParallels = stories
      .flatMap(s => s.analysis?.parallels || [])
      .map((p: { name: string }) => p.name);
    
    const parallelCounts: Record<string, number> = {};
    allParallels.forEach((name: string) => {
      parallelCounts[name] = (parallelCounts[name] || 0) + 1;
    });

    const mostCommonParallel = Object.entries(parallelCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None yet';

    setInsights({
      totalStories: stories.length,
      totalWords: stories.reduce((sum, s) => sum + (s.wordCount || 0), 0),
      mostCommonParallel,
      averageWords: stories.length > 0 
        ? Math.round(stories.reduce((sum, s) => sum + (s.wordCount || 0), 0) / stories.length)
        : 0,
      storiesThisMonth: stories.length,
      creativeEvolution: 'Your writing style is developing...',
    });
    
    setLoading(false);
  };

  if (loading || !insights) {
    return (
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-16">
        <p style={{ color: 'var(--fys-stone)' }}>Loading insights...</p>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-16">
        <div className="mb-8">
          <Link
            href="/fork-your-story/library"
            className="text-sm uppercase tracking-wider hover:underline"
            style={{ color: 'var(--fys-accent)' }}
          >
            ← Back to Library
          </Link>
        </div>

        <div className="mb-12">
          <h1 
            className="text-4xl font-normal mb-4"
            style={{ color: 'var(--fys-ink)' }}
          >
            Your Creative DNA
          </h1>
          <p 
            className="text-lg"
            style={{ color: 'var(--fys-stone)' }}
          >
            Discover patterns, track your growth, and understand your unique voice
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <InsightCard
            icon={BookOpen}
            label="Total Stories"
            value={insights.totalStories}
            color="var(--fys-accent)"
          />
          <InsightCard
            icon={TrendingUp}
            label="Total Words"
            value={insights.totalWords.toLocaleString()}
            color="var(--fys-sage)"
          />
          <InsightCard
            icon={Users}
            label="Most Aligned With"
            value={insights.mostCommonParallel}
            color="var(--fys-lavender)"
          />
          <InsightCard
            icon={Sparkles}
            label="Avg Words/Story"
            value={insights.averageWords}
            color="var(--fys-gold)"
          />
        </div>

        {/* Creative Evolution */}
        <div 
          className="p-8 border rounded-sm mb-8"
          style={{ 
            borderColor: 'var(--fys-earth)',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <h2 
            className="text-2xl font-normal mb-4"
            style={{ color: 'var(--fys-ink)' }}
          >
            Your Creative Evolution
          </h2>
          <p 
            className="text-lg leading-relaxed"
            style={{ color: 'var(--fys-stone)' }}
          >
            {insights.creativeEvolution}
          </p>
          <p 
            className="text-sm mt-4 italic"
            style={{ color: 'var(--fys-stone)' }}
          >
            As you add more stories, we&apos;ll track how your voice evolves, which themes you return to, and how your creative DNA develops over time.
          </p>
        </div>

        {/* Historical Parallels Breakdown */}
        <div 
          className="p-8 border rounded-sm mb-8"
          style={{ 
            borderColor: 'var(--fys-earth)',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <h2 
            className="text-2xl font-normal mb-6"
            style={{ color: 'var(--fys-ink)' }}
          >
            Your Historical Parallels
          </h2>
          <p 
            className="text-base"
            style={{ color: 'var(--fys-stone)' }}
          >
            The writers, artists, and thinkers whose creative patterns align with yours:
          </p>
          <div className="mt-6 p-6 border rounded-sm" style={{ borderColor: 'var(--fys-earth)' }}>
            <p 
              className="text-2xl font-normal text-center"
              style={{ color: 'var(--fys-accent)' }}
            >
              {insights.mostCommonParallel}
            </p>
            <p 
              className="text-sm text-center mt-2"
              style={{ color: 'var(--fys-stone)' }}
            >
              Your most frequent parallel
            </p>
          </div>
        </div>

        {/* Writing Patterns */}
        <div 
          className="p-8 border rounded-sm"
          style={{ 
            borderColor: 'var(--fys-earth)',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <h2 
            className="text-2xl font-normal mb-6"
            style={{ color: 'var(--fys-ink)' }}
          >
            Writing Patterns
          </h2>
          <div className="space-y-4">
            <PatternItem
              label="Average Story Length"
              value={`${insights.averageWords} words`}
            />
            <PatternItem
              label="Stories This Month"
              value={insights.storiesThisMonth}
            />
            <PatternItem
              label="Total Creative Output"
              value={`${insights.totalWords.toLocaleString()} words`}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className="mt-12 p-8 border rounded-sm text-center"
          style={{ 
            borderColor: 'var(--fys-accent)',
            background: 'var(--fys-accent-soft)'
          }}
        >
          <h3 
            className="text-2xl font-normal mb-4"
            style={{ color: 'var(--fys-ink)' }}
          >
            Continue Your Journey
          </h3>
          <p 
            className="text-base mb-6"
            style={{ color: 'var(--fys-stone)' }}
          >
            Add more stories to unlock deeper insights into your creative voice
          </p>
          <Link
            href="/fork-your-story/write"
            className="inline-block px-8 py-3 border text-base uppercase tracking-wider transition-all duration-300 hover:bg-[var(--fys-accent)] hover:text-white"
            style={{ 
              borderColor: 'var(--fys-accent)',
              color: 'var(--fys-accent)'
            }}
          >
            Write Another Story
          </Link>
        </div>
      </div>
    </>
  );
}

function InsightCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>; 
  label: string; 
  value: string | number; 
  color: string;
}) {
  return (
    <div 
      className="p-6 border rounded-sm"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <Icon size={24} style={{ color }} className="mb-4" />
      <p 
        className="text-3xl font-normal mb-2"
        style={{ color: 'var(--fys-ink)' }}
      >
        {value}
      </p>
      <p 
        className="text-xs uppercase tracking-wider"
        style={{ color: 'var(--fys-stone)' }}
      >
        {label}
      </p>
    </div>
  );
}

function PatternItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-sm" style={{ borderColor: 'var(--fys-earth)' }}>
      <span 
        className="text-base"
        style={{ color: 'var(--fys-ink)' }}
      >
        {label}
      </span>
      <span 
        className="text-base font-medium"
        style={{ color: 'var(--fys-accent)' }}
      >
        {value}
      </span>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="relative z-10 px-6 py-6 flex justify-between items-center md:px-16">
      <Link href="/fork-your-story" className="flex items-center gap-3">
        <span className="text-3xl font-medium tracking-tight" style={{ color: 'var(--fys-ink)' }}>
          M
        </span>
        <span 
          className="text-sm tracking-[0.25em] uppercase ml-1"
          style={{ color: 'var(--fys-stone)' }}
        >
          MrMelo
        </span>
      </Link>
      
      <div className="hidden sm:flex items-center gap-8 md:gap-12">
        <Link 
          href="/fork-your-story/library" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ink)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          Library
        </Link>
        <Link 
          href="/fork-your-story/write" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ink)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          New Story
        </Link>
      </div>
    </nav>
  );
}
