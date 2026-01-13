import Link from "next/link";

export default function ArchiveContent() {
  return (
    <>
      {/* Header */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-4xl font-serif mb-4">Welcome to The Confidential Archive</h1>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Your access has been verified. Explore my personal collection of insights, theories, and creative work.
          </p>
        </div>
      </section>

      {/* Content Categories */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl font-serif mb-12">Available Content Categories</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 hover:border-[color:var(--accent)] transition-colors">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">📝 Written Content</h3>
              <p className="text-foreground/80 text-sm mb-4">Essays, theories, and research notes</p>
              <div className="space-y-2">
                <div className="text-xs text-foreground/60">Available Items:</div>
                <div className="text-sm">• Personal Philosophy Essays (3)</div>
                <div className="text-sm">• Business Strategy Frameworks (2)</div>
                <div className="text-sm">• Creative Writing Pieces (1)</div>
              </div>
              <button className="mt-4 w-full btn-ripple rounded bg-[color:var(--accent)] text-black px-4 py-2 text-sm font-medium hover:opacity-90">
                Browse Essays
              </button>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 hover:border-[color:var(--accent)] transition-colors">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">🎧 Audio Content</h3>
              <p className="text-foreground/80 text-sm mb-4">Recordings and discussions</p>
              <div className="space-y-2">
                <div className="text-xs text-foreground/60">Available Items:</div>
                <div className="text-sm">• Philosophy Discussions (2)</div>
                <div className="text-sm">• Business Strategy Sessions (1)</div>
                <div className="text-sm">• Creative Process Recordings (1)</div>
              </div>
              <button className="mt-4 w-full btn-ripple rounded bg-[color:var(--accent)] text-black px-4 py-2 text-sm font-medium hover:opacity-90">
                Listen Now
              </button>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 hover:border-[color:var(--accent)] transition-colors">
              <h3 className="font-serif text-lg mb-3 text-[color:var(--accent)]">🎬 Video Content</h3>
              <p className="text-foreground/80 text-sm mb-4">Visual insights and demonstrations</p>
              <div className="space-y-2">
                <div className="text-xs text-foreground/60">Available Items:</div>
                <div className="text-sm">• Strategy Breakdown Videos (1)</div>
                <div className="text-sm">• Creative Process Demo (1)</div>
                <div className="text-sm">• Industry Analysis (1)</div>
              </div>
              <button className="mt-4 w-full btn-ripple rounded bg-[color:var(--accent)] text-black px-4 py-2 text-sm font-medium hover:opacity-90">
                Watch Videos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Content */}
      <section className="bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl font-serif mb-12">Recent Additions</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg mb-2">The Psychology of Decision Making</h3>
                  <p className="text-foreground/60 text-sm">📝 Essay • 2 days ago</p>
                </div>
                <span className="text-xs bg-[color:var(--accent)] text-black px-2 py-1 rounded">NEW</span>
              </div>
              <p className="text-foreground/80 text-sm mb-4">
                An exploration of cognitive biases and their impact on business decisions, 
                drawn from personal experiences and observations.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Download: $0.99</span>
                <button className="btn-ripple rounded bg-[color:var(--accent)] text-black px-4 py-2 text-sm font-medium hover:opacity-90">
                  Download
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg mb-2">Future of Remote Work</h3>
                  <p className="text-foreground/60 text-sm">🎧 Audio • 1 week ago</p>
                </div>
                <span className="text-xs bg-[color:var(--accent)] text-black px-2 py-1 rounded">NEW</span>
              </div>
              <p className="text-foreground/80 text-sm mb-4">
                A 15-minute audio reflection on how remote work is reshaping productivity, 
                creativity, and work-life balance.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Download: $1.99</span>
                <button className="btn-ripple rounded bg-[color:var(--accent)] text-black px-4 py-2 text-sm font-medium hover:opacity-90">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Management */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl font-serif mb-12">Account Management</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 text-center">
              <h3 className="font-serif text-lg mb-4">Current Plan</h3>
              <div className="text-2xl font-bold text-[color:var(--accent)] mb-2">Deep Diver</div>
              <p className="text-foreground/60 text-sm">Valid until: Dec 31, 2024</p>
              <Link href="/account" className="mt-4 inline-block text-[color:var(--accent)] hover:underline text-sm">
                Manage Plan →
              </Link>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 text-center">
              <h3 className="font-serif text-lg mb-4">Download History</h3>
              <div className="text-2xl font-bold text-[color:var(--accent)] mb-2">12</div>
              <p className="text-foreground/60 text-sm">Items downloaded this month</p>
              <Link href="/downloads" className="mt-4 inline-block text-[color:var(--accent)] hover:underline text-sm">
                View History →
              </Link>
            </div>

            <div className="rounded-lg border border-[color:var(--sand)] p-6 bg-black/40 text-center">
              <h3 className="font-serif text-lg mb-4">Monthly Usage</h3>
              <div className="text-2xl font-bold text-[color:var(--accent)] mb-2">$24.50</div>
              <p className="text-foreground/60 text-sm">Spent on downloads this month</p>
              <Link href="/billing" className="mt-4 inline-block text-[color:var(--accent)] hover:underline text-sm">
                View Billing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-black/20">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-serif mb-4">Need Assistance?</h2>
          <p className="text-foreground/80 mb-8">
            Our support team is here to help you get the most out of your Confidential Archive access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="btn-ripple rounded-full bg-[color:var(--accent)] text-black px-8 py-4 text-lg font-medium hover:opacity-90"
            >
              Contact Support
            </Link>
            <Link 
              href="/faq"
              className="btn-ripple rounded-full border border-[color:var(--sand)] px-8 py-4 text-lg font-medium hover:bg-[color:var(--sand)]/30"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
