/**
 * Google Gemini AI Integration for Fork Your Story
 * 
 * This module handles all AI-powered analysis:
 * - Character mapping (extracting creative DNA)
 * - Historical figure matching
 * - Fork generation (two narrative paths)
 * - AI detection scoring
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client - API key should be in environment variables
const apiKey = process.env.GOOGLE_AI_API_KEY || '';

if (!apiKey) {
  console.warn('⚠️  GOOGLE_AI_API_KEY is not set. Gemini API calls will fail.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Model configuration
// Using gemini-2.5-flash for better performance and availability
// Alternative: 'gemini-2.5-pro' for more advanced reasoning
const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Helper function to safely call Gemini API with error handling
 */
async function safeGenerateContent(
  model: ReturnType<typeof genAI.getGenerativeModel>,
  prompt: string,
  operationName: string
): Promise<string> {
  try {
    console.log(`📤 Calling Gemini API for ${operationName}...`);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log(`✅ ${operationName} completed, response length: ${response.length}`);
    return response;
  } catch (error) {
    console.error(`❌ Gemini API error in ${operationName}:`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorString = String(error);
    
    // Log full error for debugging
    if (error instanceof Error && error.stack) {
      console.error(`Stack trace for ${operationName}:`, error.stack);
    }
    
    // Check for specific error types
    if (
      errorMessage.includes('API_KEY') || 
      errorMessage.includes('401') || 
      errorMessage.includes('403') ||
      errorString.includes('API_KEY') ||
      errorString.includes('401') ||
      errorString.includes('403')
    ) {
      throw new Error(`Invalid API key for ${operationName}. Please check your GOOGLE_AI_API_KEY.`);
    }
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      throw new Error(`API quota exceeded for ${operationName}. Please try again later.`);
    }
    if (errorMessage.includes('safety') || errorMessage.includes('SAFETY')) {
      throw new Error(`Content safety filter triggered in ${operationName}. Please try a different story.`);
    }
    
    throw new Error(`Failed to ${operationName}: ${errorMessage}`);
  }
}

export interface CharacterMap {
  characterSet: string;
  mindSet: string;
  skillSet: string;
  toolSet: string;
}

export interface HistoricalParallel {
  name: string;
  era: string;
  icon: string;
  traits: string[];
  quote: string;
}

export interface NarrativeFork {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  outcome: string;
  trailer: {
    duration: string;
    scenes: string[];
  };
}

export interface StoryAnalysis {
  verification: {
    isHuman: boolean;
    confidence: number;
    analysis: string;
  };
  characterMap: CharacterMap;
  parallels: HistoricalParallel[];
  forks: NarrativeFork[];
}

/**
 * Analyze a story and generate complete results
 */
export async function analyzeStory(
  title: string,
  content: string,
  keystrokeData?: {
    totalKeystrokes: number;
    averageInterval: number;
    typingDuration: number;
  }
): Promise<StoryAnalysis> {
  // Validate API key before proceeding
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('GOOGLE_AI_API_KEY is not configured. Please set it in your environment variables.');
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  try {
    // Step 1: Character Mapping
    let characterMap;
    try {
      console.log('📊 Step 1: Generating character map...');
      characterMap = await generateCharacterMap(model, title, content);
      console.log('✅ Step 1 completed');
    } catch (error) {
      console.error('❌ Step 1 (Character Map) failed:', error);
      throw new Error(`Character mapping failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 2: Find Historical Parallels
    let parallels;
    try {
      console.log('🔍 Step 2: Finding historical parallels...');
      parallels = await findHistoricalParallels(model, title, content, characterMap);
      console.log('✅ Step 2 completed');
    } catch (error) {
      console.error('❌ Step 2 (Historical Parallels) failed:', error);
      throw new Error(`Historical parallels failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 3: Generate Narrative Forks
    let forks;
    try {
      console.log('🌳 Step 3: Generating narrative forks...');
      forks = await generateForks(model, title, content, characterMap, parallels);
      console.log('✅ Step 3 completed');
    } catch (error) {
      console.error('❌ Step 3 (Narrative Forks) failed:', error);
      throw new Error(`Narrative forks failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 4: Authenticity Assessment
    let verification;
    try {
      console.log('✅ Step 4: Assessing authenticity...');
      verification = await assessAuthenticity(model, content, keystrokeData);
      console.log('✅ Step 4 completed');
    } catch (error) {
      console.error('❌ Step 4 (Authenticity) failed:', error);
      throw new Error(`Authenticity assessment failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log('✅ All analysis steps completed successfully');
    return {
      verification,
      characterMap,
      parallels,
      forks,
    };
  } catch (error) {
    console.error('❌ Error in analyzeStory:', error);
    // Re-throw with more context
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Story analysis failed: ${String(error)}`);
  }
}

/**
 * Generate the 4-part character map from a story
 */
async function generateCharacterMap(
  model: ReturnType<typeof genAI.getGenerativeModel>,
  title: string,
  content: string
): Promise<CharacterMap> {
  const prompt = `Analyze this story and extract the storyteller's creative DNA in exactly 4 dimensions.

STORY TITLE: "${title}"

STORY:
${content}

Respond with a JSON object containing exactly these 4 fields:
- characterSet: A phrase describing WHO the storyteller is as a creative voice (e.g., "Confessional lyricist who transforms longing into transcendence")
- mindSet: A phrase describing HOW they think (e.g., "Paradoxical thinker—finding comfort in avoidance, liberation in absence")
- skillSet: 3 comma-separated skills/techniques they demonstrate (e.g., "Sensory saturation, spiritual-erotic fusion, philosophical abstraction")
- toolSet: 3 comma-separated literary tools they use (e.g., "Second-person address, synesthetic imagery, prose poetry form")

Each should be 10-20 words maximum. Be specific to THIS story, not generic.

Respond ONLY with valid JSON, no markdown or explanation.`;

  const response = await safeGenerateContent(model, prompt, 'generateCharacterMap');
  
  try {
    // Clean up response - remove markdown code blocks if present
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    
    // Validate structure
    if (!parsed.characterSet || !parsed.mindSet || !parsed.skillSet || !parsed.toolSet) {
      throw new Error('Missing required fields in character map');
    }
    
    return parsed;
  } catch {
    console.warn('⚠️  Failed to parse character map JSON, using fallback. Response:', response.substring(0, 200));
    // Fallback if parsing fails
    return {
      characterSet: 'Creative voice exploring profound themes',
      mindSet: 'Thoughtful observer of human experience',
      skillSet: 'Narrative craft, emotional depth, vivid imagery',
      toolSet: 'Prose storytelling, metaphor, character development',
    };
  }
}

/**
 * Find 3 historical figures with similar creative patterns
 */
async function findHistoricalParallels(
  model: ReturnType<typeof genAI.getGenerativeModel>,
  title: string,
  content: string,
  characterMap: CharacterMap
): Promise<HistoricalParallel[]> {
  const prompt = `Based on this story and character analysis, identify 3 historical figures (writers, artists, philosophers, leaders) who explored similar themes or had similar creative approaches.

STORY TITLE: "${title}"

STORY:
${content}

CHARACTER ANALYSIS:
- Character Set: ${characterMap.characterSet}
- Mind Set: ${characterMap.mindSet}
- Skill Set: ${characterMap.skillSet}
- Tool Set: ${characterMap.toolSet}

For each figure, provide:
1. Name and life dates
2. An emoji icon that represents them
3. 3 specific parallels between their work/life and this story
4. A relevant quote from them

Respond with a JSON array of exactly 3 objects:
[
  {
    "name": "Full Name",
    "era": "YYYY–YYYY",
    "icon": "🔮",
    "traits": ["Parallel 1", "Parallel 2", "Parallel 3"],
    "quote": "A relevant quote from this figure"
  }
]

Choose figures from different eras/cultures for diversity. Be specific about WHY they parallel this storyteller.

Respond ONLY with valid JSON, no markdown or explanation.`;

  const response = await safeGenerateContent(model, prompt, 'findHistoricalParallels');
  
  try {
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch {
    // Fallback parallels
    return [
      {
        name: 'Virginia Woolf',
        era: '1882–1941',
        icon: '🌊',
        traits: [
          'Explored consciousness through stream-of-thought prose',
          'Found profound meaning in ordinary moments',
          'Used innovative narrative techniques',
        ],
        quote: 'You cannot find peace by avoiding life.',
      },
      {
        name: 'Jorge Luis Borges',
        era: '1899–1986',
        icon: '🔮',
        traits: [
          'Blended reality and imagination seamlessly',
          'Explored infinite possibilities in finite spaces',
          'Made the reader question perception',
        ],
        quote: 'I have always imagined that Paradise will be a kind of library.',
      },
      {
        name: 'James Baldwin',
        era: '1924–1987',
        icon: '✨',
        traits: [
          'Used personal truth to illuminate universal experience',
          'Confronted difficult emotions with unflinching honesty',
          'Made vulnerability a source of strength',
        ],
        quote: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
      },
    ];
  }
}

/**
 * Generate 2 possible narrative paths (forks)
 */
async function generateForks(
  model: ReturnType<typeof genAI.getGenerativeModel>,
  title: string,
  content: string,
  characterMap: CharacterMap,
  parallels: HistoricalParallel[]
): Promise<NarrativeFork[]> {
  const parallelNames = parallels.map(p => p.name).join(', ');
  
  const prompt = `Based on this story and the historical parallels found (${parallelNames}), generate 2 possible paths this narrative could take.

STORY TITLE: "${title}"

STORY:
${content}

CHARACTER ANALYSIS:
- Character Set: ${characterMap.characterSet}
- Mind Set: ${characterMap.mindSet}

The two paths should represent a fundamental duality/choice in the story—not just "good vs bad" but two legitimate directions that respect the story's themes.

For each path, create:
1. A title (e.g., "The Road of Pursuit")
2. A subtitle/tagline (e.g., "Close the distance, risk the mystery")
3. A description (50-80 words) explaining where this path leads, referencing relevant historical parallel
4. An outcome summary (one sentence)
5. A cinematic trailer script (6 short scenes/lines that tell the story of this path)

Respond with a JSON array of exactly 2 objects:
[
  {
    "id": "path-a",
    "letter": "A",
    "title": "The Road of [Something]",
    "subtitle": "A poetic tagline",
    "description": "Description referencing historical parallel...",
    "outcome": "One sentence summary of what choosing this path means.",
    "trailer": {
      "duration": "0:26",
      "scenes": [
        "INT/EXT. LOCATION - TIME",
        "Visual description or action",
        "\"Dialogue line if any\"",
        "More description",
        "Climactic moment",
        "TITLE CARD: THE ROAD OF [X]"
      ]
    }
  }
]

Make paths feel genuinely different yet equally valid. Reference the story's specific imagery/themes.

Respond ONLY with valid JSON, no markdown or explanation.`;

  const response = await safeGenerateContent(model, prompt, 'generateForks');
  
  try {
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch {
    // Fallback forks
    return [
      {
        id: 'action',
        letter: 'A',
        title: 'The Road of Action',
        subtitle: 'Move forward, embrace change',
        description: 'This path leads toward decisive action. The protagonist confronts what they\'ve been avoiding, risking comfort for transformation. Like Hemingway\'s characters, they discover that courage is grace under pressure.',
        outcome: 'Bold transformation through direct confrontation with fear.',
        trailer: {
          duration: '0:26',
          scenes: [
            'EXT. CROSSROADS - DAWN',
            'A figure stands at the fork in the road.',
            '"I\'ve waited long enough."',
            'They take the first step forward.',
            'The horizon opens before them.',
            'TITLE CARD: THE ROAD OF ACTION',
          ],
        },
      },
      {
        id: 'reflection',
        letter: 'B',
        title: 'The Road of Reflection',
        subtitle: 'Go inward, find understanding',
        description: 'This path turns inward. Rather than changing circumstances, the protagonist changes their relationship to them. Like Thoreau at Walden, they discover that the journey within holds unexpected depths.',
        outcome: 'Profound understanding through patient contemplation.',
        trailer: {
          duration: '0:24',
          scenes: [
            'INT. QUIET ROOM - EVENING',
            'Light shifts across the walls.',
            '"What if the answer isn\'t out there?"',
            'Hands rest on an open book.',
            'A gentle smile of recognition.',
            'TITLE CARD: THE ROAD OF REFLECTION',
          ],
        },
      },
    ];
  }
}

/**
 * Assess whether the story appears to be human-written
 */
async function assessAuthenticity(
  model: ReturnType<typeof genAI.getGenerativeModel>,
  content: string,
  keystrokeData?: {
    totalKeystrokes: number;
    averageInterval: number;
    typingDuration: number;
  }
): Promise<{ isHuman: boolean; confidence: number; analysis: string }> {
  // If we have keystroke data, factor it in
  let keystrokeAnalysis = '';
  if (keystrokeData) {
    const wordsPerMinute = keystrokeData.typingDuration > 0
      ? (content.split(/\s+/).length / keystrokeData.typingDuration) * 60000
      : 0;
    
    // Human typing is typically 30-80 WPM with variable intervals
    const typingSpeedNormal = wordsPerMinute > 20 && wordsPerMinute < 120;
    const intervalVariation = keystrokeData.averageInterval > 50 && keystrokeData.averageInterval < 1000;
    
    keystrokeAnalysis = `
Keystroke Analysis:
- Typing speed: ${wordsPerMinute.toFixed(1)} WPM (${typingSpeedNormal ? 'normal range' : 'unusual'})
- Average interval: ${keystrokeData.averageInterval.toFixed(0)}ms (${intervalVariation ? 'human-like' : 'possibly automated'})
`;
  }

  const prompt = `Analyze this text for signs of human vs AI authorship. Consider:
- Unique voice and stylistic quirks
- Emotional authenticity vs formulaic phrasing
- Unexpected word choices or creative risks
- Narrative coherence vs generic structure

TEXT:
${content}

${keystrokeAnalysis}

Respond with a JSON object:
{
  "isHuman": true/false (your assessment),
  "confidence": 0-100 (how confident you are),
  "analysis": "Brief explanation of your assessment"
}

Be generous—assume human unless clearly AI-generated. Focus on voice authenticity.

Respond ONLY with valid JSON, no markdown or explanation.`;

  const response = await safeGenerateContent(model, prompt, 'assessAuthenticity');
  
  try {
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch {
    // Default to human with moderate confidence
    return {
      isHuman: true,
      confidence: 75,
      analysis: 'Unable to perform detailed analysis. Defaulting to human authorship assumption.',
    };
  }
}

/**
 * Generate video prompt for a fork (to be used with fal.ai)
 */
export function generateVideoPromptForFork(fork: NarrativeFork): string {
  // Create cinematic video prompt from fork details
  const prompt = `Cinematic trailer scene: ${fork.title} - ${fork.subtitle}. ${fork.description}. Slow dramatic camera movement, atmospheric lighting, cinematic color grading, film grain texture, professional cinematography, 4K quality, smooth motion, dramatic tension, visual storytelling, artistic composition.`;
  
  return prompt;
}

/**
 * Generate extended narrative content for a chosen fork (Chronicler tier)
 */
export async function generateExtendedNarrative(
  fork: NarrativeFork,
  originalStory: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `Based on this original story and the chosen narrative path, write an extended narrative treatment (300-400 words) that explores where the story goes.

ORIGINAL STORY:
${originalStory}

CHOSEN PATH: ${fork.title}
${fork.description}

Write a prose narrative that:
1. Continues from where the original story left off
2. Follows the trajectory of the chosen path
3. Maintains the voice and style of the original
4. Reaches a meaningful conclusion or turning point

Write the extended narrative directly, no preamble.`;

  return await safeGenerateContent(model, prompt, 'generateExtendedNarrative');
}
