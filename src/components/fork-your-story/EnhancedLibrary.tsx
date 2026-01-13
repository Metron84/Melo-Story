'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Grid3x3, 
  List, 
  Network, 
  Calendar,
  Share2,
  Link as LinkIcon,
  BarChart3,
  Filter,
  Search,
  Plus,
  Edit3,
  Eye,
  EyeOff
} from 'lucide-react';

type ViewMode = 'grid' | 'list' | 'map' | 'timeline';

interface Story {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  status: 'draft' | 'analyzing' | 'complete' | 'failed';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  collection?: string;
  parallels?: Array<{ name: string; icon: string }>;
  forks?: Array<{ title: string; letter: string }>;
  connections?: Array<{ storyId: string; type: 'prequel' | 'sequel' | 'alternate' | 'same-universe'; title: string }>;
  excerpt?: string;
}

interface LibraryStats {
  totalStories: number;
  completeStories: number;
  totalWords: number;
  mostCommonParallel: string;
  mostCommonTheme: string;
  storiesThisMonth: number;
}

export default function EnhancedLibrary() {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    
    // Load from sessionStorage (demo data for now)
    const demoStories: Story[] = [];
    
    // Check for pending story
    const pendingStory = sessionStorage.getItem('pendingStory');
    if (pendingStory) {
      const data = JSON.parse(pendingStory);
      const analysisKey = `analysis_${data.id}`;
      const analysis = sessionStorage.getItem(analysisKey);
      
      demoStories.push({
        id: data.id,
        title: data.title,
        content: data.content,
        wordCount: data.wordCount,
        status: 'complete',
        isPublic: true,
        createdAt: data.submittedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['personal', 'reflection'],
        category: 'personal',
        excerpt: data.content.substring(0, 150) + '...',
        parallels: analysis ? JSON.parse(analysis).parallels?.slice(0, 3).map((p: { name: string; icon: string }) => ({ name: p.name, icon: p.icon })) : [],
        forks: analysis ? JSON.parse(analysis).forks?.map((f: { title: string; letter: string }) => ({ title: f.title, letter: f.letter })) : [],
      });
    }
    
    // Add more demo stories
    demoStories.push(
      {
        id: 'demo-1',
        title: 'The Longing',
        content: 'A story about desire and absence...',
        wordCount: 281,
        status: 'complete',
        isPublic: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['love', 'longing', 'poetry'],
        category: 'personal',
        collection: 'Love Stories',
        excerpt: 'You make me want you. My shyness born, from a prolonged absence...',
        parallels: [{ name: 'Rumi', icon: '🌹' }, { name: 'Neruda', icon: '🌊' }],
        forks: [{ title: 'The Road of Pursuit', letter: 'A' }, { title: 'The Road of Transmutation', letter: 'B' }],
        connections: [
          { storyId: 'demo-2', type: 'sequel', title: 'The Arrival' }
        ]
      },
      {
        id: 'demo-2',
        title: 'The Arrival',
        content: 'A continuation of The Longing...',
        wordCount: 342,
        status: 'complete',
        isPublic: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['love', 'arrival', 'transformation'],
        category: 'personal',
        collection: 'Love Stories',
        excerpt: 'The moment arrived. Not as I imagined, but real...',
        parallels: [{ name: 'Virginia Woolf', icon: '🌊' }],
        forks: [{ title: 'The Road of Acceptance', letter: 'A' }],
        connections: [
          { storyId: 'demo-1', type: 'prequel', title: 'The Longing' }
        ]
      }
    );
    
    setStories(demoStories);
    
    // Calculate stats
    setStats({
      totalStories: demoStories.length,
      completeStories: demoStories.filter(s => s.status === 'complete').length,
      totalWords: demoStories.reduce((sum, s) => sum + s.wordCount, 0),
      mostCommonParallel: 'Rumi',
      mostCommonTheme: 'Love & Longing',
      storiesThisMonth: demoStories.length,
    });
    
    setLoading(false);
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = !searchQuery || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(stories.map(s => s.category)))];

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--fys-stone)' }}>Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 
              className="text-4xl font-normal mb-2"
              style={{ color: 'var(--fys-ink)' }}
            >
              Your Library
            </h1>
            <p 
              className="text-lg"
              style={{ color: 'var(--fys-stone)' }}
            >
              Your creative universe · Where stories connect, patterns emerge, and your voice evolves
            </p>
          </div>
          <Link
            href="/fork-your-story/write"
            className="px-6 py-3 border text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[var(--fys-accent-soft)] flex items-center gap-2"
            style={{ 
              borderColor: 'var(--fys-accent)',
              color: 'var(--fys-accent)'
            }}
          >
            <Plus size={16} />
            New Story
          </Link>
        </div>

        {/* Stats Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Stories" value={stats.totalStories} />
            <StatCard label="Complete" value={stats.completeStories} />
            <StatCard label="Total Words" value={stats.totalWords.toLocaleString()} />
            <StatCard label="This Month" value={stats.storiesThisMonth} />
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: 'var(--fys-stone)' }}
          />
          <input
            type="text"
            placeholder="Search stories, tags, themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-sm bg-transparent text-sm"
            style={{ 
              borderColor: 'var(--fys-earth)',
              color: 'var(--fys-ink)'
            }}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <ViewModeButton 
            mode="grid" 
            currentMode={viewMode} 
            onClick={() => setViewMode('grid')}
            icon={Grid3x3}
          />
          <ViewModeButton 
            mode="list" 
            currentMode={viewMode} 
            onClick={() => setViewMode('list')}
            icon={List}
          />
          <ViewModeButton 
            mode="map" 
            currentMode={viewMode} 
            onClick={() => setViewMode('map')}
            icon={Network}
          />
          <ViewModeButton 
            mode="timeline" 
            currentMode={viewMode} 
            onClick={() => setViewMode('timeline')}
            icon={Calendar}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border text-sm flex items-center gap-2 transition-all duration-300 hover:bg-[var(--fys-accent-soft)]"
          style={{ 
            borderColor: 'var(--fys-earth)',
            color: 'var(--fys-ink)'
          }}
        >
          <Filter size={16} />
          Filters
        </button>
        
        {showFilters && (
          <>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border text-sm capitalize transition-all duration-300 ${
                  selectedCategory === cat ? 'bg-[var(--fys-accent-soft)]' : ''
                }`}
                style={{ 
                  borderColor: selectedCategory === cat ? 'var(--fys-accent)' : 'var(--fys-earth)',
                  color: 'var(--fys-ink)'
                }}
              >
                {cat}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Content Area */}
      {filteredStories.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {viewMode === 'grid' && <GridView stories={filteredStories} />}
          {viewMode === 'list' && <ListView stories={filteredStories} />}
          {viewMode === 'map' && <MapView stories={filteredStories} />}
          {viewMode === 'timeline' && <TimelineView stories={filteredStories} />}
        </>
      )}

      {/* Quick Actions Sidebar */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <Link
          href="/fork-your-story/library/insights"
          className="p-4 rounded-full border shadow-lg transition-all duration-300 hover:scale-110"
          style={{ 
            borderColor: 'var(--fys-accent)',
            background: 'var(--fys-deep)',
            color: 'var(--fys-accent)'
          }}
          title="Creative DNA Insights"
        >
          <BarChart3 size={20} />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div 
      className="p-4 border rounded-sm"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <p 
        className="text-2xl font-normal mb-1"
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

function ViewModeButton({ 
  mode, 
  currentMode, 
  onClick, 
  icon: Icon 
}: { 
  mode: ViewMode; 
  currentMode: ViewMode; 
  onClick: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const isActive = currentMode === mode;
  return (
    <button
      onClick={onClick}
      className={`p-2 border transition-all duration-300 ${
        isActive ? 'bg-[var(--fys-accent-soft)]' : ''
      }`}
      style={{ 
        borderColor: isActive ? 'var(--fys-accent)' : 'var(--fys-earth)',
        color: 'var(--fys-ink)'
      }}
      title={mode.charAt(0).toUpperCase() + mode.slice(1) + ' view'}
    >
      <Icon size={18} />
    </button>
  );
}

function GridView({ stories }: { stories: Story[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map(story => (
        <StoryCard key={story.id} story={story} />
      ))}
      <NewStoryCard />
    </div>
  );
}

function ListView({ stories }: { stories: Story[] }) {
  return (
    <div className="space-y-4">
      {stories.map(story => (
        <StoryListItem key={story.id} story={story} />
      ))}
    </div>
  );
}

function MapView({ stories: _stories }: { stories: Story[] }) {
  return (
    <div 
      className="p-8 border rounded-sm min-h-[600px] relative"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.3)'
      }}
    >
      <p className="text-center" style={{ color: 'var(--fys-stone)' }}>
        Story Map View - Visual connections coming soon
      </p>
      {/* TODO: Implement visual story connection graph */}
    </div>
  );
}

function TimelineView({ stories }: { stories: Story[] }) {
  const sortedStories = [...stories].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="relative pl-8 border-l" style={{ borderColor: 'var(--fys-earth)' }}>
      {sortedStories.map((story, index) => (
        <TimelineItem key={story.id} story={story} isLast={index === sortedStories.length - 1} />
      ))}
    </div>
  );
}

function TimelineItem({ story, isLast }: { story: Story; isLast: boolean }) {
  const date = new Date(story.createdAt);
  return (
    <div className="relative pb-8">
      <div 
        className="absolute -left-3 w-6 h-6 rounded-full border-2"
        style={{ 
          borderColor: 'var(--fys-accent)',
          background: 'var(--fys-deep)'
        }}
      />
      {!isLast && (
        <div 
          className="absolute -left-[1px] top-6 w-0.5 h-full"
          style={{ background: 'var(--fys-earth)' }}
        />
      )}
      <div className="pl-6">
        <p 
          className="text-xs uppercase tracking-wider mb-1"
          style={{ color: 'var(--fys-stone)' }}
        >
          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <Link
          href={`/fork-your-story/results/${story.id}`}
          className="text-xl font-normal hover:underline"
          style={{ color: 'var(--fys-ink)' }}
        >
          {story.title}
        </Link>
        <p 
          className="text-sm mt-1"
          style={{ color: 'var(--fys-stone)' }}
        >
          {story.wordCount} words · {story.tags.join(', ')}
        </p>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <div 
      className="border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg group"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-normal mb-2 line-clamp-2 group-hover:underline"
              style={{ color: 'var(--fys-ink)' }}
            >
              &quot;{story.title}&quot;
            </h3>
            <p 
              className="text-xs uppercase tracking-wider"
              style={{ color: 'var(--fys-stone)' }}
            >
              {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--fys-stone)' }}
          >
            {story.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* Excerpt */}
        {story.excerpt && (
          <p 
            className="text-sm mb-4 line-clamp-3 italic"
            style={{ color: 'var(--fys-stone)' }}
          >
            {story.excerpt}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {story.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs border rounded"
              style={{ 
                borderColor: 'var(--fys-accent-soft)',
                color: 'var(--fys-accent)',
                background: 'var(--fys-accent-soft)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Parallels Preview */}
        {story.parallels && story.parallels.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span 
              className="text-xs uppercase tracking-wider"
              style={{ color: 'var(--fys-stone)' }}
            >
              Parallels:
            </span>
            {story.parallels.map((p, i) => (
              <span key={i} className="text-lg" title={p.name}>{p.icon}</span>
            ))}
          </div>
        )}

        {/* Connections */}
        {story.connections && story.connections.length > 0 && (
          <div className="mb-4 pt-4 border-t" style={{ borderColor: 'var(--fys-earth)' }}>
            <p 
              className="text-xs uppercase tracking-wider mb-2"
              style={{ color: 'var(--fys-stone)' }}
            >
              Connected to:
            </p>
            <div className="flex flex-wrap gap-2">
              {story.connections.map((conn, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 border rounded flex items-center gap-1"
                  style={{ 
                    borderColor: 'var(--fys-accent-soft)',
                    color: 'var(--fys-accent)'
                  }}
                >
                  <LinkIcon size={12} />
                  {conn.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between">
          <StatusBadge status={story.status} />
          <div className="flex items-center gap-2">
            <span 
              className="text-xs"
              style={{ color: 'var(--fys-stone)' }}
            >
              {story.wordCount} words
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div 
        className="px-6 py-4 border-t flex gap-4"
        style={{ 
          borderColor: 'var(--fys-earth)',
          background: 'rgba(255, 255, 255, 0.3)'
        }}
      >
        {story.status === 'complete' ? (
          <>
            <Link
              href={`/fork-your-story/results/${story.id}`}
              className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-accent)] flex items-center gap-2"
              style={{ color: 'var(--fys-ink)' }}
            >
              View
            </Link>
            <Link
              href={`/fork-your-story/library/story/${story.id}`}
              className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-accent)] flex items-center gap-2"
              style={{ color: 'var(--fys-ink)' }}
            >
              <Edit3 size={14} />
              Edit
            </Link>
            <button
              className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-accent)] flex items-center gap-2"
              style={{ color: 'var(--fys-ink)' }}
            >
              <Share2 size={14} />
              Share
            </button>
          </>
        ) : (
          <Link
            href={`/fork-your-story/analyzing/${story.id}`}
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--fys-accent)]"
            style={{ color: 'var(--fys-accent)' }}
          >
            View Progress
          </Link>
        )}
      </div>
    </div>
  );
}

function StoryListItem({ story }: { story: Story }) {
  return (
    <div 
      className="p-6 border rounded-sm flex items-center justify-between hover:bg-[var(--fys-accent-soft)] transition-all duration-300"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <Link
            href={`/fork-your-story/results/${story.id}`}
            className="text-xl font-normal hover:underline"
            style={{ color: 'var(--fys-ink)' }}
          >
            {story.title}
          </Link>
          <StatusBadge status={story.status} />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span style={{ color: 'var(--fys-stone)' }}>
            {story.wordCount} words
          </span>
          <span style={{ color: 'var(--fys-stone)' }}>
            {new Date(story.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            {story.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs border rounded"
                style={{ 
                  borderColor: 'var(--fys-accent-soft)',
                  color: 'var(--fys-accent)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button style={{ color: 'var(--fys-stone)' }}>
          <Share2 size={18} />
        </button>
        <Link
          href={`/fork-your-story/library/story/${story.id}`}
          style={{ color: 'var(--fys-stone)' }}
        >
          <Edit3 size={18} />
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Story['status'] }) {
  const config = {
    draft: { label: 'Draft', color: 'var(--fys-stone)', bg: 'rgba(139, 134, 128, 0.1)' },
    analyzing: { label: 'Analyzing', color: 'var(--fys-accent)', bg: 'var(--fys-accent-soft)' },
    complete: { label: 'Complete', color: 'var(--fys-sage)', bg: 'rgba(168, 181, 160, 0.1)' },
    failed: { label: 'Failed', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  };

  const { label, color, bg } = config[status];

  return (
    <span
      className="px-2 py-1 text-xs uppercase tracking-wider rounded"
      style={{ color, background: bg }}
    >
      {label}
    </span>
  );
}

function NewStoryCard() {
  return (
    <Link
      href="/fork-your-story/write"
      className="border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center min-h-[400px] transition-all duration-300 hover:border-[var(--fys-accent)] hover:bg-[var(--fys-accent-soft)] group"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.3)'
      }}
    >
      <Plus 
        size={32} 
        className="mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ color: 'var(--fys-accent)' }}
      />
      <span 
        className="text-base tracking-wider uppercase"
        style={{ color: 'var(--fys-ink)' }}
      >
        New Story
      </span>
    </Link>
  );
}

function EmptyState() {
  return (
    <div 
      className="py-16 text-center border rounded-sm"
      style={{ 
        borderColor: 'var(--fys-earth)',
        background: 'rgba(255, 255, 255, 0.3)'
      }}
    >
      <p 
        className="text-xl mb-4"
        style={{ color: 'var(--fys-ink)' }}
      >
        Your library is empty
      </p>
      <p 
        className="text-base mb-8 max-w-md mx-auto"
        style={{ color: 'var(--fys-stone)' }}
      >
        Begin your journey by writing your first story. Try it free—no signup required. Save to your library when you&apos;re ready.
      </p>
      <Link
        href="/fork-your-story/write"
        className="inline-block px-8 py-3 border text-base tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[var(--fys-accent-soft)]"
        style={{ 
          borderColor: 'var(--fys-accent)',
          color: 'var(--fys-accent)'
        }}
      >
        Write Your First Story
      </Link>
    </div>
  );
}
