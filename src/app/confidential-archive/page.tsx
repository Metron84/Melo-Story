import Link from "next/link";

export default function ConfidentialArchive() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative fade-bottom">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,rgba(0,0,0,0),rgba(0,0,0,0.6))]" />

        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">
              The Confidential Archive
            </h1>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-6">
              <strong>Exclusive personal insights and original content.</strong> My private collection of theories, 
              observations, and creative work spanning philosophy, business, and human experience.
            </p>
            <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
              <p className="text-foreground/80 mb-4">
                <em>This archive contains only my original personal material</em> - no client work, 
                no commissioned content. These are my authentic thoughts, theories, and creative expressions 
                on the topics that shape our world.
              </p>
              <div className="text-foreground/70">
                <p className="text-lg italic">Everyone has a price. Even private thoughts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-serif text-center mb-12">Topics Covered in the Archive</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Life & Philosophy</h3>
              <p className="text-foreground/80 text-sm">Personal theories on existence, purpose, consciousness, and the human condition</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Economy & Finance</h3>
              <p className="text-foreground/80 text-sm">Alternative economic theories, market psychology, wealth creation strategies</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Relationships & Psychology</h3>
              <p className="text-foreground/80 text-sm">Interpersonal dynamics, emotional intelligence, communication patterns</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Industries & Technology</h3>
              <p className="text-foreground/80 text-sm">Industry analysis, technological trends, innovation theories</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Business & Entrepreneurship</h3>
              <p className="text-foreground/80 text-sm">Business models, startup strategies, leadership insights, market disruption</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Self-Development & Growth</h3>
              <p className="text-foreground/80 text-sm">Personal growth frameworks, productivity systems, mindset development</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Creativity & Art</h3>
              <p className="text-foreground/80 text-sm">Creative processes, artistic theories, innovation in expression</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Society & Culture</h3>
              <p className="text-foreground/80 text-sm">Social dynamics, cultural observations, future trends</p>
            </div>
            
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Ethics & Morality</h3>
              <p className="text-foreground/80 text-sm">Moral frameworks, ethical dilemmas, decision-making principles</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Health & Wellness</h3>
              <p className="text-foreground/80 text-sm">Holistic health approaches, mental wellness strategies, lifestyle optimization</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Education & Learning</h3>
              <p className="text-foreground/80 text-sm">Effective learning methods, knowledge acquisition, skill development frameworks</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Technology & Future</h3>
              <p className="text-foreground/80 text-sm">Emerging tech analysis, future predictions, digital transformation insights</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Spirituality & Mindfulness</h3>
              <p className="text-foreground/80 text-sm">Inner peace practices, spiritual growth, mindfulness techniques, consciousness exploration</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Productivity & Systems</h3>
              <p className="text-foreground/80 text-sm">Workflow optimization, time management, system design, efficiency frameworks</p>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">Communication & Influence</h3>
              <p className="text-foreground/80 text-sm">Persuasion techniques, influence strategies, effective communication, impact creation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-serif text-center mb-4">Flexible Access Model</h2>
          <p className="text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
            Start with basic access, then unlock the topics that matter most to you. 
            New content drops keep the archive fresh and valuable.
          </p>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Base Membership */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif mb-6">Step 1: Choose Your Base Access</h3>
              
              <div className="grid gap-4">
                <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg">Basic Explorer</h4>
                      <p className="text-foreground/80 text-sm">Perfect for getting started</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$15/month</div>
                      <div className="text-sm text-foreground/60">or $150/year (save 17%)</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Access to 3 topic categories</li>
                    <li>• Monthly content updates</li>
                    <li>• Download up to 5 items/month</li>
                    <li>• Cancel anytime (no refunds for partial months)</li>
                  </ul>
                </div>

                <div className="rounded-lg border-2 border-[color:var(--accent)] p-6 bg-black/40 relative">
                  <div className="absolute -top-3 left-4">
                    <span className="bg-[color:var(--accent)] text-black px-3 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg">Deep Diver</h4>
                      <p className="text-foreground/80 text-sm">For serious personal growth</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$35/month</div>
                      <div className="text-sm text-foreground/60">or $350/year (save 17%)</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Access to 8 topic categories</li>
                    <li>• Weekly content updates</li>
                    <li>• Download up to 15 items/month</li>
                    <li>• Priority access to new content</li>
                    <li>• Personal recommendations</li>
                    <li>• Cancel anytime (no refunds for partial months)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg">Archive Master</h4>
                      <p className="text-foreground/80 text-sm">Complete access to everything</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$65/month</div>
                      <div className="text-sm text-foreground/60">or $650/year (save 17%)</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Access to all 15 topic categories</li>
                    <li>• Daily content updates</li>
                    <li>• Unlimited downloads</li>
                    <li>• Early access to new content</li>
                    <li>• Direct communication access</li>
                    <li>• Custom content requests</li>
                    <li>• Cancel anytime (no refunds for partial months)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Topic Selection & Micro-Payments */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif mb-6">Step 2: Customize Your Topics</h3>
              
              <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
                <h4 className="font-serif text-lg mb-4">Topic Unlock Fees</h4>
                <p className="text-foreground/80 text-sm mb-4">
                  Add additional topics beyond your base membership:
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[color:var(--sand)]/30">
                    <span className="text-sm">Individual Topic Access</span>
                    <span className="font-semibold">$5/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[color:var(--sand)]/30">
                    <span className="text-sm">Topic Bundle (3 topics)</span>
                    <span className="font-semibold">$12/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Complete Archive Access</span>
                    <span className="font-semibold">$25/month</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
                <h4 className="font-serif text-lg mb-4">Content Download Fees</h4>
                <p className="text-foreground/80 text-sm mb-4">
                  Pay-per-download for new premium content:
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[color:var(--sand)]/30">
                    <span className="text-sm">Text Essays & Articles</span>
                    <span className="font-semibold">$0.99</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[color:var(--sand)]/30">
                    <span className="text-sm">Audio Recordings</span>
                    <span className="font-semibold">$1.99</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Video Content</span>
                    <span className="font-semibold">$2.99</span>
                  </div>
                </div>
              </div>

              {/* Example Calculator */}
              <div className="rounded-lg border border-[color:var(--accent)] p-6 bg-black/40">
                <h4 className="font-serif text-lg mb-4">💡 Example Scenarios</h4>
                
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-black/40 rounded">
                    <div className="font-semibold mb-2">Scenario A: Focused Learner</div>
                    <div className="text-foreground/80 space-y-1">
                      <div>• Basic Explorer ($15/month)</div>
                      <div>• +2 Philosophy topics ($10/month)</div>
                      <div>• +3 downloads ($3-6/month)</div>
                      <div className="font-semibold text-[color:var(--accent)] mt-2">Total: $28-31/month</div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/40 rounded">
                    <div className="font-semibold mb-2">Scenario B: Content Enthusiast</div>
                    <div className="text-foreground/80 space-y-1">
                      <div>• Deep Diver ($35/month)</div>
                      <div>• +Complete archive ($25/month)</div>
                      <div>• +10+ downloads ($10-30/month)</div>
                      <div className="font-semibold text-[color:var(--accent)] mt-2">Total: $70-90/month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Ready to start building your personalized access to my personal archive? 
              Choose your base level and customize from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.paypal.com/paypalme/MrMelo84/35"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple rounded-full bg-[color:var(--accent)] text-black px-8 py-4 text-lg font-medium hover:opacity-90"
              >
                Start with Deep Diver - $35/month
              </a>
              <Link 
                href="/contact"
                className="btn-ripple rounded-full border border-[color:var(--sand)] px-8 py-4 text-lg font-medium hover:bg-[color:var(--sand)]/30"
              >
                Discuss Custom Access
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Link 
                href="/register" 
                className="btn-ripple rounded-full border border-[color:var(--sand)] px-8 py-4 text-lg font-medium hover:bg-[color:var(--sand)]/30"
              >
                Start Registration Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
