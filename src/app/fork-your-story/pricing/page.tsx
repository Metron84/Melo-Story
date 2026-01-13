import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — Fork Your Story',
  description: 'Choose your path. From free exploration to unlimited storytelling.',
};

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <PricingHero />
      <PricingTiers />
      <FeatureComparison />
      <FAQ />
      <PricingFooter />
    </>
  );
}

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
          href="/fork-your-story" 
          className="text-base tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-ivory)]"
          style={{ color: 'var(--fys-stone)' }}
        >
          Home
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

function PricingHero() {
  return (
    <section className="relative z-10 py-20 px-8 text-center">
      <p 
        className="text-sm tracking-[0.3em] uppercase mb-6"
        style={{ color: 'var(--fys-accent)' }}
      >
        Choose Your Path
      </p>
      <h1 
        className="text-4xl md:text-6xl font-normal mb-6 leading-tight"
        style={{ color: 'var(--fys-ivory)' }}
      >
        Every Story Deserves
        <br />
        <span className="italic" style={{ color: 'var(--fys-cream)' }}>To Know Where It Could Lead</span>
      </h1>
      <p 
        className="text-xl max-w-[600px] mx-auto leading-relaxed"
        style={{ color: 'var(--fys-stone)' }}
      >
        From free exploration to unlimited storytelling—find the path that fits your journey.
      </p>
    </section>
  );
}

function PricingTiers() {
  const tiers = [
    {
      name: 'The Wanderer',
      quote: '"Not all who wander are lost."',
      price: 'Free',
      period: '',
      description: 'Begin your journey',
      features: [
        '1 story analysis',
        'Public sharing only',
        '3 historical parallels',
        '2 roads ahead',
        'Text-based trailers',
      ],
      cta: 'Begin Free',
      href: '/fork-your-story/write',
      highlighted: false,
    },
    {
      name: 'The Scribe',
      quote: '"The pen is mightier than the sword."',
      price: '$9',
      period: '/month',
      yearlyPrice: '$79/year',
      description: 'For the dedicated storyteller',
      features: [
        '5 stories per month',
        'Your personal library',
        '1 re-analysis per story',
        'PDF export',
        'Public sharing',
        'Priority support',
      ],
      cta: 'Choose Scribe',
      href: '/fork-your-story/write',
      highlighted: true,
    },
    {
      name: 'The Chronicler',
      quote: '"History is written by those who show up."',
      price: '$29',
      period: '/month',
      yearlyPrice: '$249/year',
      description: 'Unlimited creative exploration',
      features: [
        'Unlimited stories',
        'Private & public options',
        '2 re-analyses per story',
        'Extended narratives',
        'Shareable private links',
        'Priority processing',
        'Early access to features',
      ],
      cta: 'Choose Chronicler',
      href: '/fork-your-story/write',
      highlighted: false,
    },
  ];

  return (
    <section 
      className="relative z-10 py-16 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 md:p-10 border transition-all duration-300 ${
                tier.highlighted 
                  ? 'border-[var(--fys-accent)]' 
                  : 'border-[rgba(228,224,219,0.08)]'
              }`}
              style={{ background: 'rgba(228, 224, 219, 0.015)' }}
            >
              {tier.highlighted && (
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs tracking-[0.2em] uppercase"
                  style={{ 
                    background: 'var(--fys-accent)', 
                    color: 'var(--fys-deep)' 
                  }}
                >
                  Most Popular
                </div>
              )}
              
              <h3 
                className="text-2xl font-normal mb-2"
                style={{ color: 'var(--fys-ivory)' }}
              >
                {tier.name}
              </h3>
              
              <p 
                className="text-sm italic mb-6"
                style={{ color: 'var(--fys-stone)' }}
              >
                {tier.quote}
              </p>
              
              <div className="mb-6">
                <span 
                  className="text-5xl font-normal"
                  style={{ color: 'var(--fys-ivory)' }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span style={{ color: 'var(--fys-stone)' }}>{tier.period}</span>
                )}
                {tier.yearlyPrice && (
                  <p 
                    className="text-sm mt-1"
                    style={{ color: 'var(--fys-earth)' }}
                  >
                    or {tier.yearlyPrice}
                  </p>
                )}
              </div>
              
              <p 
                className="text-base mb-8"
                style={{ color: 'var(--fys-stone)' }}
              >
                {tier.description}
              </p>
              
              <ul className="space-y-3 mb-10">
                {tier.features.map((feature, i) => (
                  <li 
                    key={i}
                    className="flex items-start gap-3 text-base"
                    style={{ color: 'var(--fys-cream)' }}
                  >
                    <span style={{ color: 'var(--fys-accent)' }}>—</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href={tier.href}
                className={`block w-full py-4 text-center text-base tracking-[0.15em] uppercase border transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-[var(--fys-accent)] bg-[rgba(168,144,128,0.1)] hover:bg-[rgba(168,144,128,0.2)]'
                    : 'border-[var(--fys-earth)] hover:border-[var(--fys-cream)]'
                }`}
                style={{ color: 'var(--fys-cream)' }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureComparison() {
  const features = [
    { name: 'Stories', wanderer: '1', scribe: '5/month', chronicler: 'Unlimited' },
    { name: 'Your Library', wanderer: '✗', scribe: '✓', chronicler: '✓' },
    { name: 'Private Stories', wanderer: '✗', scribe: '✗', chronicler: '✓' },
    { name: 'Historical Parallels', wanderer: '3', scribe: '3', chronicler: '3 + context' },
    { name: 'Roads Ahead', wanderer: '2', scribe: '2', chronicler: '2 + extended' },
    { name: 'Re-analyze', wanderer: '✗', scribe: '1x', chronicler: '2x' },
    { name: 'PDF Export', wanderer: '✗', scribe: '✓', chronicler: '✓' },
    { name: 'Shareable Links', wanderer: 'Public', scribe: 'Public', chronicler: 'Public + Private' },
    { name: 'Priority Processing', wanderer: '✗', scribe: '✗', chronicler: '✓' },
  ];

  return (
    <section 
      className="relative z-10 py-20 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[1000px] mx-auto">
        <h2 
          className="text-3xl font-normal text-center mb-12"
          style={{ color: 'var(--fys-ivory)' }}
        >
          Compare All Features
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr 
                className="border-b"
                style={{ borderColor: 'rgba(228, 224, 219, 0.1)' }}
              >
                <th className="text-left py-4 pr-8" style={{ color: 'var(--fys-stone)' }}></th>
                <th className="text-center py-4 px-4" style={{ color: 'var(--fys-ivory)' }}>Wanderer</th>
                <th className="text-center py-4 px-4" style={{ color: 'var(--fys-accent)' }}>Scribe</th>
                <th className="text-center py-4 px-4" style={{ color: 'var(--fys-ivory)' }}>Chronicler</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr 
                  key={feature.name}
                  className="border-b"
                  style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
                >
                  <td 
                    className="py-4 pr-8 text-base"
                    style={{ color: 'var(--fys-cream)' }}
                  >
                    {feature.name}
                  </td>
                  <td 
                    className="text-center py-4 px-4 text-base"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    {feature.wanderer}
                  </td>
                  <td 
                    className="text-center py-4 px-4 text-base"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    {feature.scribe}
                  </td>
                  <td 
                    className="text-center py-4 px-4 text-base"
                    style={{ color: 'var(--fys-stone)' }}
                  >
                    {feature.chronicler}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: 'Can I try before subscribing?',
      a: 'Yes! The Wanderer tier is completely free. Submit one story and experience the full analysis—historical parallels, character mapping, and two roads ahead.',
    },
    {
      q: 'What counts as a "story"?',
      a: 'Any narrative between 250-1,500 words. It can be personal (a crossroads you face), fictional (a character you\'re developing), or exploratory (a story within a story).',
    },
    {
      q: 'Why only two roads?',
      a: 'We respect the duality inherent in meaningful choices. Every real decision is ultimately binary—this or that, pursue or transmute. Two paths honor that truth.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. No contracts, no hassle. Your library and past analyses remain accessible even after cancellation.',
    },
    {
      q: 'What makes stories "private"?',
      a: 'Private stories (Chronicler tier) are only visible to you. You can share them via private links that you control, rather than public URLs anyone can find.',
    },
  ];

  return (
    <section 
      className="relative z-10 py-20 px-8 border-t"
      style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
    >
      <div className="max-w-[700px] mx-auto">
        <h2 
          className="text-3xl font-normal text-center mb-12"
          style={{ color: 'var(--fys-ivory)' }}
        >
          Questions
        </h2>
        
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="pb-8 border-b"
              style={{ borderColor: 'rgba(228, 224, 219, 0.06)' }}
            >
              <h3 
                className="text-xl font-normal mb-4"
                style={{ color: 'var(--fys-ivory)' }}
              >
                {faq.q}
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--fys-stone)' }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingFooter() {
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
            href="/fork-your-story"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-stone)]"
            style={{ color: 'var(--fys-earth)' }}
          >
            Home
          </Link>
          <Link 
            href="/terms-of-service"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-stone)]"
            style={{ color: 'var(--fys-earth)' }}
          >
            Terms
          </Link>
          <Link 
            href="/contact"
            className="text-sm tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--fys-stone)]"
            style={{ color: 'var(--fys-earth)' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
