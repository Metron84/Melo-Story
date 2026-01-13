'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Grid3X3, 
  List, 
  Map, 
  Clock, 
  Plus, 
  ChevronDown,
  BookOpen,
  Sparkles,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye,
  GitFork,
  X,
  BarChart3,
  SlidersHorizontal
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useStoryStore } from '@/lib/store'
import { cn, formatRelativeDate, truncateText, CATEGORIES } from '@/lib/utils'
import { LibrarySkeleton } from '@/components/fork-your-story/Skeletons'
import { toast } from '@/components/fork-your-story/Toast'
import type { Story } from '@/lib/supabase'

type ViewMode = 'grid' | 'list' | 'map' | 'timeline'

const VIEW_ICONS = {
  grid: Grid3X3,
  list: List,
  map: Map,
  timeline: Clock,
}

export default function LibraryPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { 
    localStories, 
    libraryView, 
    setLibraryView,
    libraryFilters,
    setLibraryFilters,
    removeLocalStory
  } = useStoryStore()

  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadStories = async () => {
      setIsLoading(true)
      try {
        setStories(localStories)
      } catch (error) {
        console.error('Error loading stories:', error)
        toast.error('Failed to load stories')
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      loadStories()
    }
  }, [user, authLoading, localStories])

  const filteredStories = useMemo(() => {
    let result = [...stories]

    if (libraryFilters.search) {
      const searchLower = libraryFilters.search.toLowerCase()
      result = result.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.content.toLowerCase().includes(searchLower) ||
        s.tags?.some(t => t.toLowerCase().includes(searchLower))
      )
    }

    if (libraryFilters.category) {
      result = result.filter(s => s.category === libraryFilters.category)
    }

    switch (libraryFilters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'wordCount':
        result.sort((a, b) => b.word_count - a.word_count)
        break
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    return result
  }, [stories, libraryFilters])

  const stats = useMemo(() => ({
    totalStories: stories.length,
    totalWords: stories.reduce((sum, s) => sum + s.word_count, 0),
    categories: [...new Set(stories.map(s => s.category).filter(Boolean))].length,
  }), [stories])

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return
    removeLocalStory(storyId)
    toast.success('Story deleted')
  }

  const clearFilters = () => {
    setLibraryFilters({
      search: '',
      category: null,
      tags: [],
      sortBy: 'newest',
    })
  }

  if (!authLoading && !user && localStories.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fys-cream flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-fys-stone" />
          </div>
          <h2 className="heading-2 mb-4">Your Library Awaits</h2>
          <p className="text-body mb-8">
            Sign up to save your stories, track your creative evolution, 
            and build your personal narrative library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/fork-your-story/sign-up" className="btn-primary">
              Sign Up Free
            </Link>
            <Link href="/fork-your-story/write" className="btn-secondary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Write a Story First
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (isLoading || authLoading) {
    return (
      <div className="container-wide py-12">
        <LibrarySkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen page-enter">
      <div className="container-wide py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="heading-1 mb-1">My Library</h1>
            <p className="text-body">
              {stats.totalStories} {stats.totalStories === 1 ? 'story' : 'stories'} • {stats.totalWords.toLocaleString()} words
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/fork-your-story/library/insights" 
              className="btn-ghost inline-flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </Link>
            <Link href="/fork-your-story/write" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Story
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Stories', value: stats.totalStories, icon: BookOpen },
            { label: 'Words', value: stats.totalWords.toLocaleString(), icon: Edit },
            { label: 'Categories', value: stats.categories, icon: GitFork },
          ].map((stat) => (
            <div key={stat.label} className="card flex items-center gap-3 p-4">
              <stat.icon className="w-5 h-5 text-fys-accent" />
              <div>
                <p className="font-serif text-lg md:text-xl text-fys-ink">{stat.value}</p>
                <p className="text-xs text-fys-stone">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fys-stone" />
            <input
              type="text"
              placeholder="Search stories..."
              value={libraryFilters.search}
              onChange={(e) => setLibraryFilters({ search: e.target.value })}
              className="input pl-10"
            />
            {libraryFilters.search && (
              <button
                onClick={() => setLibraryFilters({ search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fys-stone hover:text-fys-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center gap-2 sm:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <select
              value={libraryFilters.category || ''}
              onChange={(e) => setLibraryFilters({ category: e.target.value || null })}
              className="input py-2 pr-8"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={libraryFilters.sortBy}
              onChange={(e) => setLibraryFilters({ sortBy: e.target.value as 'newest' | 'oldest' | 'title' | 'wordCount' })}
              className="input py-2 pr-8"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="wordCount">Word Count</option>
            </select>

            {(libraryFilters.category || libraryFilters.search) && (
              <button onClick={clearFilters} className="btn-ghost text-fys-accent">
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center border border-fys-earth/20 rounded-sm overflow-hidden">
            {(Object.keys(VIEW_ICONS) as ViewMode[]).map((view) => {
              const Icon = VIEW_ICONS[view]
              return (
                <button
                  key={view}
                  onClick={() => setLibraryView(view)}
                  className={cn(
                    'p-2 transition-colors',
                    libraryView === view
                      ? 'bg-fys-ink text-fys-deep'
                      : 'bg-transparent text-fys-stone hover:bg-fys-cream'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden sm:hidden mb-6"
            >
              <div className="card space-y-4">
                <select
                  value={libraryFilters.category || ''}
                  onChange={(e) => setLibraryFilters({ category: e.target.value || null })}
                  className="input w-full"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={libraryFilters.sortBy}
                  onChange={(e) => setLibraryFilters({ sortBy: e.target.value as 'newest' | 'oldest' | 'title' | 'wordCount' })}
                  className="input w-full"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="wordCount">Word Count</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fys-cream flex items-center justify-center">
              <Search className="w-8 h-8 text-fys-stone" />
            </div>
            <h3 className="heading-3 mb-2">No Stories Found</h3>
            <p className="text-body mb-6">
              {libraryFilters.search || libraryFilters.category
                ? 'Try adjusting your filters'
                : 'Start your creative journey'}
            </p>
            <Link href="/fork-your-story/write" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Write Your First Story
            </Link>
          </div>
        )}

        {/* Grid View */}
        {filteredStories.length > 0 && libraryView === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <StoryCard story={story} onDelete={() => handleDeleteStory(story.id)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* List View */}
        {filteredStories.length > 0 && libraryView === 'list' && (
          <div className="card overflow-hidden divide-y divide-fys-earth/10">
            {filteredStories.map((story) => (
              <StoryListItem key={story.id} story={story} onDelete={() => handleDeleteStory(story.id)} />
            ))}
          </div>
        )}

        {/* Timeline View */}
        {filteredStories.length > 0 && libraryView === 'timeline' && (
          <div className="relative pl-8 border-l border-fys-earth/20">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pb-8 last:pb-0"
              >
                <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-fys-accent border-4 border-fys-deep" />
                <p className="text-xs text-fys-stone mb-2">{formatRelativeDate(story.created_at)}</p>
                <StoryCard story={story} onDelete={() => handleDeleteStory(story.id)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Map View Placeholder */}
        {filteredStories.length > 0 && libraryView === 'map' && (
          <div className="card min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Map className="w-12 h-12 text-fys-stone/30 mx-auto mb-4" />
              <h3 className="heading-3 mb-2">Story Map</h3>
              <p className="text-body max-w-md">
                Visual story connections coming soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StoryCard({ story, onDelete }: { story: Story; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="card group relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-fys-cream transition-all"
        >
          <MoreHorizontal className="w-4 h-4 text-fys-stone" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-1 w-40 bg-fys-deep border border-fys-earth/20 rounded-sm shadow-lg z-20"
              >
                <Link
                  href={`/fork-your-story/library/story/${story.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-fys-stone hover:text-fys-ink hover:bg-fys-cream/50"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
                <button
                  onClick={() => { onDelete(); setMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <Link href={`/fork-your-story/library/story/${story.id}`} className="block">
        <div className="flex items-center gap-2 mb-3">
          {story.category && <span className="badge badge-sage text-xs">{story.category}</span>}
          <span className="text-xs text-fys-stone">{formatRelativeDate(story.created_at)}</span>
        </div>
        <h3 className="font-serif text-lg text-fys-ink mb-2 group-hover:text-fys-accent transition-colors">
          {story.title}
        </h3>
        <p className="text-sm text-fys-stone leading-relaxed mb-4">
          {truncateText(story.content, 150)}
        </p>
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {story.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-fys-cream rounded-full text-fys-stone">{tag}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-fys-earth/10">
          <span className="text-xs text-fys-stone">{story.word_count.toLocaleString()} words</span>
          {story.analysis && (
            <span className="inline-flex items-center gap-1 text-xs text-fys-sage">
              <Sparkles className="w-3 h-3" />
              Analyzed
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}

function StoryListItem({ story, onDelete }: { story: Story; onDelete: () => void }) {
  return (
    <Link 
      href={`/fork-your-story/library/story/${story.id}`}
      className="flex items-center gap-4 p-4 hover:bg-fys-cream/30 transition-colors group"
    >
      <div className="w-12 h-12 rounded-sm bg-fys-cream flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-5 h-5 text-fys-stone" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-serif text-fys-ink group-hover:text-fys-accent transition-colors truncate">
            {story.title}
          </h3>
          {story.analysis && <Sparkles className="w-3 h-3 text-fys-sage flex-shrink-0" />}
        </div>
        <p className="text-sm text-fys-stone truncate">{truncateText(story.content, 100)}</p>
        <div className="flex items-center gap-3 mt-1">
          {story.category && <span className="text-xs text-fys-accent">{story.category}</span>}
          <span className="text-xs text-fys-stone">{story.word_count.toLocaleString()} words</span>
          <span className="text-xs text-fys-stone">{formatRelativeDate(story.created_at)}</span>
        </div>
      </div>
      <button
        onClick={(e) => { e.preventDefault(); onDelete(); }}
        className="p-2 text-fys-stone hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </Link>
  )
}
