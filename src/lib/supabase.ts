import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  tier: 'wanderer' | 'scribe' | 'chronicler'
  stories_count: number
  created_at: string
  updated_at: string
}

export interface Story {
  id: string
  user_id: string
  title: string
  content: string
  word_count: number
  keystroke_data: Record<string, unknown> | null
  analysis: StoryAnalysis | null
  category: string | null
  tags: string[]
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface StoryAnalysis {
  authenticity: {
    score: number
    confidence: string
    markers: string[]
  }
  characterMap: {
    characterSet: { trait: string; strength: number; description: string }
    mindSet: { trait: string; strength: number; description: string }
    skillSet: { trait: string; strength: number; description: string }
    toolSet: { trait: string; strength: number; description: string }
  }
  historicalParallels: Array<{
    name: string
    era: string
    connection: string
    icon: string
    quote?: string
  }>
  narrativeForks: {
    forkA: {
      id: string
      title: string
      subtitle: string
      description: string
      probability: number
    }
    forkB: {
      id: string
      title: string
      subtitle: string
      description: string
      probability: number
    }
  }
  themes: string[]
  tone: string
  style: string
}

export interface StoryConnection {
  id: string
  story_id: string
  connected_story_id: string
  connection_type: string
  created_at: string
}

export interface Collection {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
}

// Helper functions
export async function getStories(userId: string): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getStory(storyId: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storyId)
    .single()

  if (error) return null
  return data
}

export async function createStory(story: Omit<Story, 'id' | 'created_at' | 'updated_at'>): Promise<Story> {
  const { data, error } = await supabase
    .from('stories')
    .insert(story)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStory(storyId: string, updates: Partial<Story>): Promise<Story> {
  const { data, error } = await supabase
    .from('stories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', storyId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteStory(storyId: string): Promise<void> {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', storyId)

  if (error) throw error
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

export async function getStoryConnections(storyId: string): Promise<StoryConnection[]> {
  const { data, error } = await supabase
    .from('story_connections')
    .select('*')
    .or(`story_id.eq.${storyId},connected_story_id.eq.${storyId}`)

  if (error) throw error
  return data || []
}

export async function createConnection(
  storyId: string,
  connectedStoryId: string,
  connectionType: string
): Promise<StoryConnection> {
  const { data, error } = await supabase
    .from('story_connections')
    .insert({
      story_id: storyId,
      connected_story_id: connectedStoryId,
      connection_type: connectionType,
    })
    .select()
    .single()

  if (error) throw error
  return data
}
