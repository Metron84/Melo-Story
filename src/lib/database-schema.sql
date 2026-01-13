-- ═══════════════════════════════════════════════════════════════════════════════
-- Fork Your Story - Supabase Database Schema
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════════
-- USER PROFILES (extends Supabase Auth)
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'wanderer' CHECK (subscription_tier IN ('wanderer', 'scribe', 'chronicler')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'past_due')),
  stories_this_month INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════════════════
-- STORIES
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  word_count INT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'complete', 'failed')),
  is_public BOOLEAN DEFAULT true,
  reanalysis_count INT DEFAULT 0,
  keystroke_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user's stories
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON public.stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON public.stories(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════════
-- ANALYSES (Story Analysis Results)
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  
  -- Verification
  is_human BOOLEAN DEFAULT true,
  authenticity_confidence INT DEFAULT 0,
  authenticity_analysis TEXT,
  
  -- Character Map (stored as JSON)
  character_map JSONB,
  -- Structure: { characterSet, mindSet, skillSet, toolSet }
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analyses_story_id ON public.analyses(story_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- HISTORICAL PARALLELS
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.historical_figures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  era TEXT NOT NULL,
  icon TEXT,
  bio TEXT,
  themes TEXT[], -- Array of themes/topics they explored
  writing_style TEXT,
  notable_works TEXT[],
  quotes TEXT[],
  embedding VECTOR(1536), -- For semantic search (if using pgvector)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story-to-Figure matches
CREATE TABLE IF NOT EXISTS public.story_parallels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  figure_id UUID REFERENCES public.historical_figures(id) ON DELETE CASCADE,
  -- If figure not in DB, store inline
  figure_name TEXT,
  figure_era TEXT,
  figure_icon TEXT,
  traits TEXT[], -- Why they parallel this story
  quote TEXT,
  match_score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_story_parallels_analysis_id ON public.story_parallels(analysis_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- NARRATIVE FORKS
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.forks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  letter CHAR(1) NOT NULL, -- 'A' or 'B'
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  outcome TEXT,
  trailer_duration TEXT,
  trailer_scenes TEXT[],
  extended_narrative TEXT, -- For Chronicler tier
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_forks_analysis_id ON public.forks(analysis_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- USER SELECTIONS (which fork they chose)
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.fork_selections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  fork_id UUID REFERENCES public.forks(id) ON DELETE CASCADE NOT NULL,
  selected_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(story_id) -- One selection per story
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_parallels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fork_selections ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Stories: Users can CRUD their own, read public ones
CREATE POLICY "Users can view own stories" ON public.stories
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);
  
CREATE POLICY "Users can insert own stories" ON public.stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own stories" ON public.stories
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete own stories" ON public.stories
  FOR DELETE USING (auth.uid() = user_id);

-- Analyses: Linked to stories permissions
CREATE POLICY "Users can view analyses for accessible stories" ON public.analyses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stories 
      WHERE stories.id = analyses.story_id 
      AND (stories.user_id = auth.uid() OR stories.is_public = true)
    )
  );

-- Parallels: Same as analyses
CREATE POLICY "Users can view parallels for accessible analyses" ON public.story_parallels
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.analyses a
      JOIN public.stories s ON s.id = a.story_id
      WHERE a.id = story_parallels.analysis_id
      AND (s.user_id = auth.uid() OR s.is_public = true)
    )
  );

-- Forks: Same pattern
CREATE POLICY "Users can view forks for accessible analyses" ON public.forks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.analyses a
      JOIN public.stories s ON s.id = a.story_id
      WHERE a.id = forks.analysis_id
      AND (s.user_id = auth.uid() OR s.is_public = true)
    )
  );

-- Fork selections: Users manage their own
CREATE POLICY "Users can manage own fork selections" ON public.fork_selections
  FOR ALL USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- HELPER FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Reset monthly story count (run via cron)
CREATE OR REPLACE FUNCTION reset_monthly_story_counts()
RETURNS void AS $$
BEGIN
  UPDATE public.profiles SET stories_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user can submit a story (tier limits)
CREATE OR REPLACE FUNCTION can_submit_story(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  story_count INT;
BEGIN
  SELECT subscription_tier, stories_this_month 
  INTO user_tier, story_count
  FROM public.profiles WHERE id = user_uuid;
  
  -- Tier limits
  IF user_tier = 'wanderer' THEN
    RETURN story_count < 1;
  ELSIF user_tier = 'scribe' THEN
    RETURN story_count < 5;
  ELSIF user_tier = 'chronicler' THEN
    RETURN true; -- Unlimited
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SEED DATA: Historical Figures
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO public.historical_figures (name, era, icon, bio, themes, quotes) VALUES
('Rumi', '1207–1273', '🌹', '13th-century Persian poet and Sufi mystic whose works explore divine love and spiritual transcendence.', 
 ARRAY['divine love', 'spiritual transcendence', 'longing', 'mysticism', 'poetry'],
 ARRAY['The wound is the place where the Light enters you.', 'What you seek is seeking you.', 'Let yourself be silently drawn by the strange pull of what you really love.']),

('Pablo Neruda', '1904–1973', '🌊', 'Chilean poet known for passionate love poetry and political activism.',
 ARRAY['romantic love', 'nature', 'sensuality', 'politics', 'Chile'],
 ARRAY['I love you as certain dark things are to be loved, in secret, between the shadow and the soul.', 'Poetry is an act of peace.', 'I want to do with you what spring does with the cherry trees.']),

('Kahlil Gibran', '1883–1931', '🕯️', 'Lebanese-American writer and poet, author of The Prophet.',
 ARRAY['philosophy', 'spirituality', 'love', 'loss', 'wisdom'],
 ARRAY['Ever has it been that love knows not its own depth until the hour of separation.', 'Out of suffering have emerged the strongest souls.', 'Your pain is the breaking of the shell that encloses your understanding.']),

('Virginia Woolf', '1882–1941', '🌊', 'British modernist author known for stream-of-consciousness narrative and feminist essays.',
 ARRAY['consciousness', 'feminism', 'time', 'memory', 'identity'],
 ARRAY['You cannot find peace by avoiding life.', 'One cannot think well, love well, sleep well, if one has not dined well.', 'Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind.']),

('Jorge Luis Borges', '1899–1986', '🔮', 'Argentine writer known for philosophical fiction exploring infinity, labyrinths, and reality.',
 ARRAY['infinity', 'labyrinths', 'time', 'reality', 'libraries'],
 ARRAY['I have always imagined that Paradise will be a kind of library.', 'Time is the substance I am made of.', 'Reality is not always probable, or likely.']),

('James Baldwin', '1924–1987', '✨', 'American writer and activist whose work explored race, sexuality, and identity in America.',
 ARRAY['race', 'identity', 'sexuality', 'America', 'love'],
 ARRAY['Not everything that is faced can be changed, but nothing can be changed until it is faced.', 'Love takes off the masks we fear we cannot live without.', 'The purpose of art is to lay bare the questions hidden by the answers.']),

('Fyodor Dostoevsky', '1821–1881', '📚', 'Russian novelist whose psychological depth explored morality, faith, and human nature.',
 ARRAY['psychology', 'morality', 'faith', 'suffering', 'redemption'],
 ARRAY['Pain and suffering are always inevitable for a large intelligence and a deep heart.', 'The soul is healed by being with children.', 'To live without hope is to cease to live.']),

('Sylvia Plath', '1932–1963', '🔔', 'American poet and novelist known for confessional poetry and The Bell Jar.',
 ARRAY['confessional poetry', 'mental health', 'identity', 'womanhood', 'death'],
 ARRAY['I took a deep breath and listened to the old brag of my heart: I am, I am, I am.', 'Perhaps some day I''ll crawl back home, beaten, defeated.', 'Kiss me, and you will see how important I am.']),

('Marcus Aurelius', '121–180', '🏛️', 'Roman Emperor and Stoic philosopher, author of Meditations.',
 ARRAY['stoicism', 'philosophy', 'leadership', 'virtue', 'mortality'],
 ARRAY['The happiness of your life depends upon the quality of your thoughts.', 'Waste no more time arguing about what a good man should be. Be one.', 'You have power over your mind - not outside events. Realize this, and you will find strength.']),

('Mary Oliver', '1935–2019', '🍃', 'American poet known for nature poetry and accessible contemplative verse.',
 ARRAY['nature', 'attention', 'gratitude', 'simplicity', 'wonder'],
 ARRAY['Tell me, what is it you plan to do with your one wild and precious life?', 'Attention is the beginning of devotion.', 'Someone I loved once gave me a box full of darkness. It took me years to understand that this too, was a gift.'])

ON CONFLICT DO NOTHING;
