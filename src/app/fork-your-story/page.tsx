import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fork Your Story — Where Stories Meet Historical Wisdom',
  description: 'Share your story. We find three who walked similar paths. We show you two roads—where your story could lead.',
};

export default function ForkYourStoryPage() {
  return (
    <>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Robert Frost Quote */}
      <QuoteSection />
      
      {/* How It Works Example */}
      <ExampleSection />
      
      {/* The Method */}
      <MethodSection />
      
      {/* Duality Section */}
      <DualitySection />
      
      {/* Final CTA */}
      <FinalCTASection />
      
      {/* Footer */}
      <FYSFooter />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Navigation
   ═══════════════════════════════════════════════════════════════════════════ */
function Navigation() {
  return (
    <nav className="relative z-10 px-6 py-6 flex justify-between items-center md:px-16">
      <Link href="/fork-your-story" className="flex items-center gap-3">
        <span className="text-3xl font-medium tracking-tight" style={{ color: 'var(--fys-ivory)' }}>
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
          href="/fork-your-story#about" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          About
        </Link>
        <Link 
          href="/fork-your-story#method" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          Method
        </Link>
        <Link 
          href="/fork-your-story/write" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          Begin
        </Link>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-8 text-center">
      <div className="max-w-[900px]">
        <p 
          className="text-sm tracking-[0.4em] uppercase mb-12"
          style={{ color: 'var(--fys-stone)' }}
        >
          A Storytelling Platform
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight leading-[1.1] mb-10">
          <span style={{ color: 'var(--fys-ivory)' }}>Your Story.</span>
          <br />
          <span style={{ color: 'var(--fys-stone)' }}>Their Paths.</span>
          <br />
          <span className="italic" style={{ color: 'var(--fys-cream)' }}>Your Roads Ahead.</span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl font-light max-w-[620px] mx-auto mb-14 leading-relaxed"
          style={{ color: 'var(--fys-stone)' }}
        >
          Where personal stories meet historical wisdom. Share your story. 
          We find three who walked similar paths. We show you two roads—
          where your story could lead.
        </p>
        
        <Link 
          href="/fork-your-story/write"
          className="inline-block px-12 py-5 text-lg tracking-[0.15em] uppercase border transition-all duration-400"
          style={{ 
            color: 'var(--fys-cream)',
            borderColor: 'var(--fys-earth)',
            background: 'transparent',
          }}
        >
          Begin Your Story
        </Link>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span 
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--fys-earth)' }}
        >
          Scroll
        </span>
        <div 
          className="w-px h-16"
          style={{ background: 'linear-gradient(to bottom, var(--fys-earth), transparent)' }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Quote Section (Robert Frost)
   ═══════════════════════════════════════════════════════════════════════════ */
function QuoteSection() {
  return (
    <section 
      className="relative z-10 py-20 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <p 
          className="text-2xl md:text-3xl italic leading-[2] mb-8"
          style={{ color: 'var(--fys-stone)' }}
        >
          &quot;Two roads diverged in a wood, and I—
          <br />
          I took the one less traveled by,
          <br />
          And that has made all the difference.&quot;
        </p>
        <p 
          className="text-base tracking-[0.15em] uppercase"
          style={{ color: 'var(--fys-earth)' }}
        >
          Robert Frost, &quot;The Road Not Taken&quot;
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Example Section (How It Works)
   ═══════════════════════════════════════════════════════════════════════════ */
function ExampleSection() {
  return (
    <section 
      id="about"
      className="relative z-10 py-28 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--fys-accent)' }}
          >
            See It In Action
          </p>
          <h2 
            className="text-4xl md:text-5xl font-normal mb-6 leading-tight"
            style={{ color: 'var(--fys-ivory)' }}
          >
            How It Works
          </h2>
          <p 
            className="text-xl max-w-[580px] mx-auto leading-relaxed"
            style={{ color: 'var(--fys-stone)' }}
          >
            Follow a story through our process—from submission to the two roads ahead.
          </p>
        </div>
        
        {/* Steps */}
        <div className="flex flex-col gap-12">
          {/* Step 1: The Story */}
          <ExampleStep
            stepNumber="One"
            stepLabel="The Story"
            title="An excerpt from a submitted story"
            description="Stories can be personal crossroads, fictional characters, or narratives you're exploring. Below is an excerpt from a prose poem meditation on desire and absence:"
          >
            <div 
              className="p-10 mt-8 italic text-xl leading-[2] border-l-2"
              style={{ 
                background: 'var(--fys-ink)',
                borderColor: 'var(--fys-accent)',
                color: 'var(--fys-cream)'
              }}
            >
              &quot;You make me want you. My shyness born, from a prolonged absence, creates our distance. Observing your features as though it were against the law of nature. There&apos;s not a speck that surpasses my attention. Not a memory that escapes my senses when I think of your fragrance. My comfort lives in the avoidance of approaching you. To be patient in suffering within my manic delusion.
              <br /><br />
              There&apos;s not a sound that evades my spirit. How I recall the thunder of your waterfall, the crunch when I would bite into you, the bellowing sounds of your joyous laughter. Not a sight that escapes my daydreaming. You revealing your wondrous landscape. Your glorious mouth agape with head tilted back in euphoria.&quot;
              
              <div 
                className="mt-6 pt-6 not-italic text-base border-t"
                style={{ borderColor: 'rgba(228, 224, 219, 0.08)', color: 'var(--fys-earth)' }}
              >
                — Excerpt from &quot;The Longing&quot; (submitted story, 281 words total)
              </div>
            </div>
            
            <div 
              className="mt-8 p-5 text-lg border-l-2"
              style={{ 
                background: 'rgba(168, 144, 128, 0.05)',
                borderColor: 'rgba(168, 144, 128, 0.3)',
                color: 'var(--fys-stone)'
              }}
            >
              <strong style={{ color: 'var(--fys-cream)' }}>Story Guidelines:</strong> Submissions should be 250–1,500 words. This gives us enough material to map your creative patterns while keeping the focus sharp.
            </div>
          </ExampleStep>
          
          {/* Step 2: Character Map */}
          <ExampleStep
            stepNumber="Two"
            stepLabel="Character Map"
            title="We map the storyteller's creative DNA"
            description="Based on the narrative's voice, structure, and thematic concerns, we identify the core traits that define how this person approaches their craft:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <CharacterCard label="Character Set" value="Confessional lyricist who transforms longing into transcendence" />
              <CharacterCard label="Mind Set" value="Paradoxical thinker—finding comfort in avoidance, liberation in absence" />
              <CharacterCard label="Skill Set" value="Sensory saturation, spiritual-erotic fusion, philosophical abstraction" />
              <CharacterCard label="Tool Set" value="Second-person address, synesthetic imagery, prose poetry form" />
            </div>
          </ExampleStep>
          
          {/* Step 3: Historical Parallels */}
          <ExampleStep
            stepNumber="Three"
            stepLabel="Parallels"
            title="Three who walked similar paths"
            description="We match the storyteller with historical figures who explored similar territories of longing, absence, and transcendence:"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-10">
              <ParallelCard 
                icon="🌹"
                name="Rumi"
                era="1207–1273"
                traits={[
                  "Fused erotic and spiritual longing into unified expression",
                  "Used absence of the beloved as path to divine",
                  "Transformed suffering into ecstatic revelation"
                ]}
              />
              <ParallelCard 
                icon="🌊"
                name="Pablo Neruda"
                era="1904–1973"
                traits={[
                  "Worshipped the beloved through saturated sensory detail",
                  "Made the body a landscape of metaphor",
                  "Elevated physical desire to cosmic significance"
                ]}
              />
              <ParallelCard 
                icon="🕯️"
                name="Kahlil Gibran"
                era="1883–1931"
                traits={[
                  "Wrote philosophical prose poetry on love and loss",
                  "Bridged Eastern mysticism with Western confession",
                  "Found wisdom in the ache of separation"
                ]}
              />
            </div>
          </ExampleStep>
          
          {/* Step 4: Two Roads */}
          <ExampleStep
            stepNumber="Four"
            stepLabel="Two Roads"
            title="Where the story could lead"
            description="Based on how the historical parallels navigated their own crossroads of longing and expression, we present two possible paths forward:"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <PathCard
                letter="A"
                title="The Road of Pursuit"
                subtitle="Close the distance, risk the mystery"
                description={<>Like Neruda in <em>Twenty Love Poems</em>—move toward the beloved. Let longing become arrival. The sensory worship you&apos;ve cultivated transforms from imagination to presence. The risk: what you find may not match what you&apos;ve created in absence. The reward: the thunder becomes touch.</>}
                trailerDuration="0:26"
              />
              <PathCard
                letter="B"
                title="The Road of Transmutation"
                subtitle="Let absence become the art itself"
                description={<>Like Rumi after losing Shams—let the longing become the work. The beloved remains unreachable, but the ache generates endless creation. Your &quot;comfort in avoidance&quot; becomes discipline. The separation is not obstacle but fuel. You write your way toward what you cannot touch.</>}
                trailerDuration="0:24"
              />
            </div>
          </ExampleStep>
        </div>
      </div>
    </section>
  );
}

function ExampleStep({ 
  stepNumber, 
  stepLabel, 
  title, 
  description, 
  children 
}: { 
  stepNumber: string; 
  stepLabel: string; 
  title: string; 
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12 p-8 md:p-12 border"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.06)',
        background: 'rgba(228, 224, 219, 0.01)'
      }}
    >
      <div 
        className="text-sm tracking-[0.2em] uppercase leading-relaxed pt-1"
        style={{ color: 'var(--fys-accent)' }}
      >
        Step {stepNumber}
        <br />
        {stepLabel}
      </div>
      <div>
        <h3 
          className="text-2xl md:text-3xl font-normal mb-6"
          style={{ color: 'var(--fys-ivory)' }}
        >
          {title}
        </h3>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: 'var(--fys-stone)' }}
        >
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}

function CharacterCard({ label, value }: { label: string; value: string }) {
  return (
    <div 
      className="p-7 border"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.08)',
        background: 'rgba(228, 224, 219, 0.015)'
      }}
    >
      <p 
        className="text-xs tracking-[0.15em] uppercase mb-4"
        style={{ color: 'var(--fys-accent)' }}
      >
        {label}
      </p>
      <p 
        className="text-lg leading-relaxed"
        style={{ color: 'var(--fys-cream)' }}
      >
        {value}
      </p>
    </div>
  );
}

function ParallelCard({ 
  icon, 
  name, 
  era, 
  traits 
}: { 
  icon: string; 
  name: string; 
  era: string; 
  traits: string[];
}) {
  return (
    <div 
      className="p-9 border"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.08)',
        background: 'rgba(228, 224, 219, 0.015)'
      }}
    >
      <div 
        className="flex items-center gap-5 mb-7 pb-6 border-b"
        style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
      >
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-xl" style={{ color: 'var(--fys-ivory)' }}>{name}</p>
          <p className="text-base" style={{ color: 'var(--fys-earth)' }}>{era}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {traits.map((trait, i) => (
          <li 
            key={i}
            className="text-base leading-relaxed pl-6 relative"
            style={{ color: 'var(--fys-stone)' }}
          >
            <span 
              className="absolute left-0"
              style={{ color: 'var(--fys-earth)' }}
            >
              —
            </span>
            {trait}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PathCard({ 
  letter, 
  title, 
  subtitle, 
  description, 
  trailerDuration 
}: { 
  letter: string;
  title: string; 
  subtitle: string; 
  description: React.ReactNode;
  trailerDuration: string;
}) {
  return (
    <div 
      className="p-10 border"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.08)',
        background: 'rgba(228, 224, 219, 0.015)'
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-2xl mb-1" style={{ color: 'var(--fys-ivory)' }}>{title}</p>
          <p className="text-lg italic" style={{ color: 'var(--fys-accent)' }}>{subtitle}</p>
        </div>
        <span 
          className="text-6xl font-normal leading-none"
          style={{ color: 'rgba(228, 224, 219, 0.08)' }}
        >
          {letter}
        </span>
      </div>
      
      <p 
        className="text-lg leading-relaxed mb-8"
        style={{ color: 'var(--fys-stone)' }}
      >
        {description}
      </p>
      
      <button 
        className="flex items-center gap-5 w-full p-5 border transition-all duration-300"
        style={{ 
          background: 'var(--fys-ink)',
          borderColor: 'rgba(228, 224, 219, 0.06)'
        }}
      >
        <div 
          className="w-11 h-11 rounded-full border flex items-center justify-center text-sm transition-all duration-300"
          style={{ borderColor: 'var(--fys-earth)', color: 'var(--fys-stone)' }}
        >
          ▶
        </div>
        <span 
          className="text-sm tracking-[0.1em] uppercase"
          style={{ color: 'var(--fys-stone)' }}
        >
          Watch Trailer · {trailerDuration}
        </span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Method Section
   ═══════════════════════════════════════════════════════════════════════════ */
function MethodSection() {
  const steps = [
    {
      number: '01',
      title: 'Write',
      description: 'Share your story—fiction or personal. A character you\'re developing, a crossroads you face, a narrative you\'re exploring. 250–1,500 words.',
    },
    {
      number: '02',
      title: 'Verify',
      description: 'We ensure authentic voices. AI-assisted stories are flagged—we value human creativity and genuine expression.',
    },
    {
      number: '03',
      title: 'Match',
      description: 'We find three historical figures who walked similar paths. Their wisdom illuminates your journey.',
    },
    {
      number: '04',
      title: 'Reveal',
      description: 'Two roads ahead emerge. Short visual treatments show where each path could lead.',
    },
  ];
  
  return (
    <section 
      id="method"
      className="relative z-10 py-28 px-8 border-t"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.06)',
        background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2))'
      }}
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <p 
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: 'var(--fys-accent)' }}
        >
          The Method
        </p>
        <h2 
          className="text-4xl md:text-5xl font-normal mb-20"
          style={{ color: 'var(--fys-ivory)' }}
        >
          Your Journey in Four Steps
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              <div 
                className="text-7xl font-normal mb-4 leading-none transition-colors duration-300"
                style={{ color: 'rgba(228, 224, 219, 0.06)' }}
              >
                {step.number}
              </div>
              <h3 
                className="text-2xl font-normal mb-5"
                style={{ color: 'var(--fys-ivory)' }}
              >
                {step.title}
              </h3>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'var(--fys-stone)' }}
              >
                {step.description}
              </p>
              
              {i < steps.length - 1 && (
                <span 
                  className="hidden lg:block absolute top-10 -right-6 text-2xl"
                  style={{ color: 'rgba(228, 224, 219, 0.08)' }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Duality Section
   ═══════════════════════════════════════════════════════════════════════════ */
function DualitySection() {
  return (
    <section 
      className="relative z-10 py-20 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <p 
          className="text-xl md:text-2xl leading-[1.9]"
          style={{ color: 'var(--fys-stone)' }}
        >
          We show two roads—respecting the duality inherent in all meaningful choices. 
          Not three, not five. Two. Because every real decision is ultimately binary: 
          this or that, stay or go, pursue or transmute.
        </p>
        <p 
          className="text-base tracking-[0.15em] uppercase mt-8"
          style={{ color: 'var(--fys-accent)' }}
        >
          The Metron Methodology
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Final CTA Section
   ═══════════════════════════════════════════════════════════════════════════ */
function FinalCTASection() {
  return (
    <section 
      className="relative z-10 py-28 px-8 text-center border-t"
      style={{ 
        borderColor: 'rgba(228, 224, 219, 0.06)',
        background: 'linear-gradient(to top, rgba(168, 144, 128, 0.03), transparent)'
      }}
    >
      <div className="max-w-[650px] mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-normal mb-7 leading-tight"
          style={{ color: 'var(--fys-ivory)' }}
        >
          Where Does Your
          <br />
          Road Lead?
        </h2>
        <p 
          className="text-xl leading-relaxed mb-12"
          style={{ color: 'var(--fys-stone)' }}
        >
          Whether it&apos;s a personal crossroads, a character you&apos;re workshopping, 
          or a story within a story—discover the paths that lie ahead.
        </p>
        <Link 
          href="/fork-your-story/write"
          className="inline-block px-16 py-6 text-lg tracking-[0.2em] uppercase border transition-all duration-400"
          style={{ 
            color: 'var(--fys-cream)',
            borderColor: 'var(--fys-earth)',
            background: 'rgba(228, 224, 219, 0.03)'
          }}
        >
          Begin Your Story
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════════════════════════════════ */
function FYSFooter() {
  return (
    <footer 
      className="relative z-10 py-16 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span 
            className="text-2xl font-medium"
            style={{ color: 'var(--fys-cream)' }}
          >
            M
          </span>
          <span 
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: 'var(--fys-earth)' }}
          >
            MrMelo
          </span>
        </div>
        
        <p 
          className="text-sm tracking-[0.1em] uppercase"
          style={{ color: 'var(--fys-earth)' }}
        >
          A Metron Ventures Platform
        </p>
        
        <div className="flex gap-10">
          <Link 
            href="/fork-your-story/pricing"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300"
            style={{ color: 'var(--fys-earth)' }}
          >
            Pricing
          </Link>
          <Link 
            href="/terms-of-service"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300"
            style={{ color: 'var(--fys-earth)' }}
          >
            Terms
          </Link>
          <Link 
            href="/contact"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300"
            style={{ color: 'var(--fys-earth)' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
