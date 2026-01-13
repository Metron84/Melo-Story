/**
 * Example Intelligence Page CTA Component
 * 
 * This is an example showing how to integrate WhatsApp Business buttons
 * into a Metron Intelligence landing page, based on the structure from
 * https://www.metronventures.com/intelligence.html
 * 
 * Copy and adapt this for your actual intelligence page.
 */

import WhatsAppButton, { WhatsAppLink } from './WhatsAppButton';

/**
 * Main CTA Section - Hero/Footer Style
 * Use this at the bottom of the intelligence page
 */
export function IntelligenceMainCTA() {
  return (
    <section className="text-center py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-serif mb-7">
        Get Decision-Ready Intelligence
      </h2>
      <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12">
        Whether you&apos;re evaluating an acquisition, planning digital transformation, 
        or validating a business model—we deliver research that informs action.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <WhatsAppButton variant="primary" size="lg" openInNewTab>
          Initiate Contact
        </WhatsAppButton>
        <a 
          href="mailto:info@metronventures.com" 
          className="rounded-full border border-[color:var(--sand)] px-8 py-4 text-lg font-medium hover:bg-[color:var(--sand)]/30"
        >
          Email Us
        </a>
      </div>
    </section>
  );
}

/**
 * Service-Specific CTAs
 * Use these for each client segment section
 */
export function ServiceSegmentCTA({ 
  segment, 
  serviceType 
}: { 
  segment: string;
  serviceType?: 'equityFirms' | 'scalingOperations' | 'founders';
}) {
  return (
    <div className="mt-6">
      <WhatsAppButton 
        serviceType={serviceType}
        variant="outline" 
        size="md"
        openInNewTab
      >
        Contact {segment}
      </WhatsAppButton>
    </div>
  );
}

/**
 * Example: Client Segments Section with WhatsApp CTAs
 */
export function ClientSegmentsSection() {
  const segments = [
    {
      title: 'Equity Firms & Investment Teams',
      description: 'Due diligence packages, market intelligence, portfolio company research, and thesis validation delivered in formats your GP and LP stakeholders actually consume.',
      services: ['Pre-investment research', 'Market sizing & validation', 'Competitive analysis', 'Portfolio support'],
      serviceType: 'equityFirms' as const,
    },
    {
      title: 'Scaling Operations & Growth Stage',
      description: 'Digital transformation research, technology audits, and AI integration strategy for venture-backed companies and high-growth businesses scaling operations.',
      services: ['Tech stack audits', 'AI integration strategy', 'Process automation', 'Market research'],
      serviceType: 'scalingOperations' as const,
    },
    {
      title: 'Solo Entrepreneurs & Founders',
      description: 'Business model research, custom website development, AI tool integration, and competitive analysis for individual business owners building sustainable ventures.',
      services: ['Business research', 'Website + AI tools', 'Market positioning', 'Go-to-market strategy'],
      serviceType: 'founders' as const,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Who We Serve</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {segments.map((segment) => (
            <div 
              key={segment.title}
              className="p-8 border border-[color:var(--sand)]/20 rounded-lg hover:border-[color:var(--sand)]/40 transition-colors"
            >
              <h3 className="text-xl font-serif mb-4">{segment.title}</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {segment.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {segment.services.map((service) => (
                  <li key={service} className="text-sm text-foreground/60 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              
              <ServiceSegmentCTA 
                segment={segment.title.split('&')[0].trim()}
                serviceType={segment.serviceType}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Footer with WhatsApp Link
 */
export function IntelligenceFooter() {
  return (
    <footer className="border-t border-[color:var(--sand)]/20 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-sm text-foreground/60">
          © {new Date().getFullYear()} Metron Ventures · Dubai, UAE
        </div>
        <div className="flex flex-wrap gap-6 items-center text-sm">
          <WhatsAppLink>WhatsApp Business</WhatsAppLink>
          <a 
            href="mailto:info@metronventures.com" 
            className="hover:text-[color:var(--accent)]"
          >
            info@metronventures.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * Complete Example Intelligence Page Layout
 * 
 * Usage:
 * ```tsx
 * import { 
 *   IntelligenceMainCTA, 
 *   ClientSegmentsSection, 
 *   IntelligenceFooter 
 * } from '@/components/metron/IntelligenceCTAExample';
 * 
 * export default function IntelligencePage() {
 *   return (
 *     <>
 *       // Your hero section
 *       <ClientSegmentsSection />
 *       // Other sections
 *       <IntelligenceMainCTA />
 *       <IntelligenceFooter />
 *     </>
 *   );
 * }
 * ```
 */
export default {
  IntelligenceMainCTA,
  ServiceSegmentCTA,
  ClientSegmentsSection,
  IntelligenceFooter,
};
