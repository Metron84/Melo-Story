'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Share2, Link as LinkIcon, Save, X, Plus } from 'lucide-react';
import type { Story } from '@/lib/supabase';

interface StoryConnection {
  id: string;
  story_id: string;
  connected_story_id: string;
  connection_type: string;
  created_at: string;
}

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [story, setStory] = useState<Story | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [category, setCategory] = useState('');
  const [collection, setCollection] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [connections] = useState<StoryConnection[]>([]);
  const [storyId, setStoryId] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setStoryId(resolvedParams.id);
      loadStory(resolvedParams.id);
    });
  }, [params]);

  const loadStory = (id: string) => {
    // Load from sessionStorage or API
    const pendingStory = sessionStorage.getItem('pendingStory');
    if (pendingStory) {
      const data = JSON.parse(pendingStory);
      if (data.id === id) {
        const analysisKey = `analysis_${id}`;
        const analysis = sessionStorage.getItem(analysisKey);
        
        setStory({
          ...data,
          analysis: analysis ? JSON.parse(analysis) : null,
        });
        setTags(['personal', 'reflection']);
        setCategory('personal');
      }
    }
  };

  const handleSave = () => {
    // Save changes to API/database
    console.log('Saving story:', { tags, category, collection, isPublic, connections });
    setIsEditing(false);
    // TODO: API call to save
  };

  if (!story) {
    return (
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-16">
        <p style={{ color: 'var(--fys-stone)' }}>Loading story...</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story Header */}
            <div>
              <h1 
                className="text-4xl font-normal mb-4"
                style={{ color: 'var(--fys-ink)' }}
              >
                &quot;{story.title}&quot;
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span style={{ color: 'var(--fys-stone)' }}>
                  {story.word_count} words
                </span>
                <span style={{ color: 'var(--fys-stone)' }}>
                  {new Date(story.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Story Content */}
            <div 
              className="p-8 border rounded-sm"
              style={{ 
                borderColor: 'var(--fys-earth)',
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <p 
                className="text-lg leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--fys-ink)' }}
              >
                {story.content}
              </p>
            </div>

            {/* Analysis Results */}
            {story.analysis && (
              <div className="space-y-6">
                <h2 
                  className="text-2xl font-normal"
                  style={{ color: 'var(--fys-ink)' }}
                >
                  Your Analysis
                </h2>
                
                {/* Character Map */}
                {story.analysis.characterMap && (
                  <div 
                    className="p-6 border rounded-sm"
                    style={{ 
                      borderColor: 'var(--fys-earth)',
                      background: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <h3 
                      className="text-xl font-normal mb-4"
                      style={{ color: 'var(--fys-ink)' }}
                    >
                      Creative DNA
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p 
                          className="text-xs uppercase tracking-wider mb-2"
                          style={{ color: 'var(--fys-stone)' }}
                        >
                          Character Set
                        </p>
                        <p style={{ color: 'var(--fys-ink)' }}>
                          {typeof story.analysis.characterMap.characterSet === 'string' 
                            ? story.analysis.characterMap.characterSet 
                            : story.analysis.characterMap.characterSet?.description || story.analysis.characterMap.characterSet?.trait || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p 
                          className="text-xs uppercase tracking-wider mb-2"
                          style={{ color: 'var(--fys-stone)' }}
                        >
                          Mind Set
                        </p>
                        <p style={{ color: 'var(--fys-ink)' }}>
                          {typeof story.analysis.characterMap.mindSet === 'string' 
                            ? story.analysis.characterMap.mindSet 
                            : story.analysis.characterMap.mindSet?.description || story.analysis.characterMap.mindSet?.trait || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p 
                          className="text-xs uppercase tracking-wider mb-2"
                          style={{ color: 'var(--fys-stone)' }}
                        >
                          Skill Set
                        </p>
                        <p style={{ color: 'var(--fys-ink)' }}>
                          {typeof story.analysis.characterMap.skillSet === 'string' 
                            ? story.analysis.characterMap.skillSet 
                            : story.analysis.characterMap.skillSet?.description || story.analysis.characterMap.skillSet?.trait || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p 
                          className="text-xs uppercase tracking-wider mb-2"
                          style={{ color: 'var(--fys-stone)' }}
                        >
                          Tool Set
                        </p>
                        <p style={{ color: 'var(--fys-ink)' }}>
                          {typeof story.analysis.characterMap.toolSet === 'string' 
                            ? story.analysis.characterMap.toolSet 
                            : story.analysis.characterMap.toolSet?.description || story.analysis.characterMap.toolSet?.trait || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Historical Parallels */}
                {story.analysis.parallels && (
                  <div 
                    className="p-6 border rounded-sm"
                    style={{ 
                      borderColor: 'var(--fys-earth)',
                      background: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <h3 
                      className="text-xl font-normal mb-4"
                      style={{ color: 'var(--fys-ink)' }}
                    >
                      Historical Parallels
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {story.analysis.parallels.map((p: { name: string; icon: string; era: string }, i: number) => (
                        <div key={i} className="text-center">
                          <span className="text-4xl mb-2 block">{p.icon}</span>
                          <p 
                            className="font-medium mb-1"
                            style={{ color: 'var(--fys-ink)' }}
                          >
                            {p.name}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: 'var(--fys-stone)' }}
                          >
                            {p.era}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Narrative Forks */}
                {story.analysis.forks && (
                  <div 
                    className="p-6 border rounded-sm"
                    style={{ 
                      borderColor: 'var(--fys-earth)',
                      background: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <h3 
                      className="text-xl font-normal mb-4"
                      style={{ color: 'var(--fys-ink)' }}
                    >
                      Your Two Roads
                    </h3>
                    <div className="space-y-4">
                      {story.analysis.forks.map((fork: { id: string; title: string; letter: string }, i: number) => (
                        <Link
                          key={i}
                          href={`/fork-your-story/results/${storyId}?fork=${fork.id}`}
                          className="block p-4 border rounded-sm hover:bg-[var(--fys-accent-soft)] transition-all duration-300"
                          style={{ 
                            borderColor: 'var(--fys-earth)'
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <span 
                              className="text-2xl font-normal"
                              style={{ color: 'var(--fys-accent)' }}
                            >
                              {fork.letter}
                            </span>
                            <div className="flex-1">
                              <h4 
                                className="text-lg font-normal mb-1"
                                style={{ color: 'var(--fys-ink)' }}
                              >
                                {fork.title}
                              </h4>
                              <p 
                                className="text-sm italic mb-2"
                                style={{ color: 'var(--fys-stone)' }}
                              >
                                {fork.subtitle}
                              </p>
                              <p 
                                className="text-sm"
                                style={{ color: 'var(--fys-stone)' }}
                              >
                                {fork.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div 
              className="p-6 border rounded-sm"
              style={{ 
                borderColor: 'var(--fys-earth)',
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <h3 
                className="text-lg font-normal mb-4"
                style={{ color: 'var(--fys-ink)' }}
              >
                Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full px-4 py-2 border text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[var(--fys-accent-soft)]"
                  style={{ 
                    borderColor: 'var(--fys-accent)',
                    color: 'var(--fys-accent)'
                  }}
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Story'}
                </button>
                <button
                  className="w-full px-4 py-2 border text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[var(--fys-accent-soft)] flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: 'var(--fys-earth)',
                    color: 'var(--fys-ink)'
                  }}
                >
                  <Share2 size={16} />
                  Share Story
                </button>
                <Link
                  href={`/fork-your-story/results/${storyId}`}
                  className="block w-full px-4 py-2 border text-sm uppercase tracking-wider text-center transition-all duration-300 hover:bg-[var(--fys-accent-soft)]"
                  style={{ 
                    borderColor: 'var(--fys-earth)',
                    color: 'var(--fys-ink)'
                  }}
                >
                  View Full Results
                </Link>
              </div>
            </div>

            {/* Organization (when editing) */}
            {isEditing && (
              <div 
                className="p-6 border rounded-sm"
                style={{ 
                  borderColor: 'var(--fys-earth)',
                  background: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <h3 
                  className="text-lg font-normal mb-4"
                  style={{ color: 'var(--fys-ink)' }}
                >
                  Organize
                </h3>
                
                {/* Tags */}
                <div className="mb-4">
                  <label 
                    className="block text-sm uppercase tracking-wider mb-2"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm border rounded flex items-center gap-2"
                        style={{ 
                          borderColor: 'var(--fys-accent-soft)',
                          color: 'var(--fys-accent)',
                          background: 'var(--fys-accent-soft)'
                        }}
                      >
                        {tag}
                        <button
                          onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                          className="hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTag.trim()) {
                          setTags([...tags, newTag.trim()]);
                          setNewTag('');
                        }
                      }}
                      placeholder="Add tag..."
                      className="flex-1 px-3 py-2 border rounded-sm text-sm"
                      style={{ 
                        borderColor: 'var(--fys-earth)',
                        color: 'var(--fys-ink)',
                        background: 'transparent'
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newTag.trim()) {
                          setTags([...tags, newTag.trim()]);
                          setNewTag('');
                        }
                      }}
                      className="px-3 py-2 border rounded-sm"
                      style={{ 
                        borderColor: 'var(--fys-accent)',
                        color: 'var(--fys-accent)'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label 
                    className="block text-sm uppercase tracking-wider mb-2"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-sm text-sm"
                    style={{ 
                      borderColor: 'var(--fys-earth)',
                      color: 'var(--fys-ink)',
                      background: 'transparent'
                    }}
                  >
                    <option value="personal">Personal</option>
                    <option value="fiction">Fiction</option>
                    <option value="poetry">Poetry</option>
                    <option value="essay">Essay</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Collection */}
                <div className="mb-4">
                  <label 
                    className="block text-sm uppercase tracking-wider mb-2"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    Collection
                  </label>
                  <input
                    type="text"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    placeholder="e.g., Love Stories, 2024 Collection"
                    className="w-full px-3 py-2 border rounded-sm text-sm"
                    style={{ 
                      borderColor: 'var(--fys-earth)',
                      color: 'var(--fys-ink)',
                      background: 'transparent'
                    }}
                  />
                </div>

                {/* Privacy */}
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="w-4 h-4"
                      style={{ accentColor: 'var(--fys-accent)' }}
                    />
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--fys-ink)' }}
                    >
                      Make story public
                    </span>
                  </label>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 border text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[var(--fys-accent-soft)] flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: 'var(--fys-accent)',
                    color: 'var(--fys-accent)'
                  }}
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}

            {/* Story Connections */}
            <div 
              className="p-6 border rounded-sm"
              style={{ 
                borderColor: 'var(--fys-earth)',
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <h3 
                className="text-lg font-normal mb-4"
                style={{ color: 'var(--fys-ink)' }}
              >
                Connected Stories
              </h3>
              {connections.length > 0 ? (
                <div className="space-y-2">
                  {connections.map((conn, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 border rounded-sm"
                      style={{ borderColor: 'var(--fys-earth)' }}
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon size={14} style={{ color: 'var(--fys-accent)' }} />
                        <span className="text-sm" style={{ color: 'var(--fys-ink)' }}>
                          {conn.title}
                        </span>
                      </div>
                      <span 
                        className="text-xs uppercase"
                        style={{ color: 'var(--fys-stone)' }}
                      >
                        {conn.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p 
                  className="text-sm"
                  style={{ color: 'var(--fys-stone)' }}
                >
                  No connections yet. Link this story to others to build your narrative universe.
                </p>
              )}
              <button
                className="mt-4 w-full px-4 py-2 border text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[var(--fys-accent-soft)] flex items-center justify-center gap-2"
                style={{ 
                  borderColor: 'var(--fys-earth)',
                  color: 'var(--fys-ink)'
                }}
              >
                <Plus size={16} />
                Connect Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
