import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Story, StoryAnalysis } from '@/lib/supabase'

interface StoryDraft {
  id: string
  title: string
  content: string
  wordCount: number
  keystrokeData: {
    totalKeystrokes: number
    deletions: number
    pauses: number[]
    startTime: number
    endTime?: number
  }
}

interface StoryState {
  // Current draft being written
  currentDraft: StoryDraft | null
  setCurrentDraft: (draft: StoryDraft | null) => void
  updateDraft: (updates: Partial<StoryDraft>) => void
  
  // Analysis results (temporary storage before DB save)
  pendingAnalysis: { storyId: string; analysis: StoryAnalysis } | null
  setPendingAnalysis: (data: { storyId: string; analysis: StoryAnalysis } | null) => void
  
  // Local stories cache (for offline/guest users)
  localStories: Story[]
  addLocalStory: (story: Story) => void
  updateLocalStory: (storyId: string, updates: Partial<Story>) => void
  removeLocalStory: (storyId: string) => void
  
  // UI State
  libraryView: 'grid' | 'list' | 'map' | 'timeline'
  setLibraryView: (view: 'grid' | 'list' | 'map' | 'timeline') => void
  
  libraryFilters: {
    search: string
    category: string | null
    tags: string[]
    sortBy: 'newest' | 'oldest' | 'title' | 'wordCount'
  }
  setLibraryFilters: (filters: Partial<StoryState['libraryFilters']>) => void
  
  // Video generation tracking
  generatingVideos: Set<string>
  addGeneratingVideo: (forkId: string) => void
  removeGeneratingVideo: (forkId: string) => void
  
  // Reset state
  reset: () => void
}

const initialState = {
  currentDraft: null,
  pendingAnalysis: null,
  localStories: [],
  libraryView: 'grid' as const,
  libraryFilters: {
    search: '',
    category: null,
    tags: [],
    sortBy: 'newest' as const,
  },
  generatingVideos: new Set<string>(),
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentDraft: (draft) => set({ currentDraft: draft }),
      
      updateDraft: (updates) => set((state) => ({
        currentDraft: state.currentDraft
          ? { ...state.currentDraft, ...updates }
          : null,
      })),

      setPendingAnalysis: (data) => set({ pendingAnalysis: data }),

      addLocalStory: (story) => set((state) => ({
        localStories: [story, ...state.localStories],
      })),

      updateLocalStory: (storyId, updates) => set((state) => ({
        localStories: state.localStories.map((s) =>
          s.id === storyId ? { ...s, ...updates } : s
        ),
      })),

      removeLocalStory: (storyId) => set((state) => ({
        localStories: state.localStories.filter((s) => s.id !== storyId),
      })),

      setLibraryView: (view) => set({ libraryView: view }),

      setLibraryFilters: (filters) => set((state) => ({
        libraryFilters: { ...state.libraryFilters, ...filters },
      })),

      addGeneratingVideo: (forkId) => set((state) => {
        const newSet = new Set(state.generatingVideos)
        newSet.add(forkId)
        return { generatingVideos: newSet }
      }),

      removeGeneratingVideo: (forkId) => set((state) => {
        const newSet = new Set(state.generatingVideos)
        newSet.delete(forkId)
        return { generatingVideos: newSet }
      }),

      reset: () => set(initialState),
    }),
    {
      name: 'fork-your-story-storage',
      partialize: (state) => ({
        localStories: state.localStories,
        libraryView: state.libraryView,
        libraryFilters: state.libraryFilters,
      }),
    }
  )
)
