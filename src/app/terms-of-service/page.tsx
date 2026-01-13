import Link from "next/link";

export default function TermsOfService() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-4xl font-serif mb-8 text-center">Terms of Service & Payment Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-black/40 rounded-lg p-8 space-y-8">
              
              {/* Payment Terms */}
              <div>
                <h2 className="text-2xl font-serif mb-4 text-[color:var(--accent)]">💳 Payment Terms</h2>
                <ul className="space-y-2 text-foreground/80">
                  <li><strong>Auto-Renewal:</strong> Subscriptions renew automatically monthly/annually</li>
                  <li><strong>No Refunds:</strong> All payments are final and non-refundable</li>
                  <li><strong>Late Fees:</strong> $15 fee for failed payments requiring manual processing</li>
                  <li><strong>Currency:</strong> All prices in USD; conversion fees borne by customer</li>
                  <li><strong>Taxes:</strong> Customer responsible for all applicable taxes</li>
                </ul>
              </div>

              {/* Cancellation Policy */}
              <div>
                <h2 className="text-2xl font-serif mb-4 text-[color:var(--accent)]">🔄 Cancellation Policy</h2>
                <ul className="space-y-2 text-foreground/80">
                  <li><strong>Easy Cancellation:</strong> Cancel anytime through account dashboard</li>
                  <li><strong>Access Until Period Ends:</strong> Continue until paid billing cycle completes</li>
                  <li><strong>No Refunds:</strong> No prorated refunds for partial months</li>
                  <li><strong>Content Retention:</strong> Downloaded content remains accessible</li>
                  <li><strong>Reactivation:</strong> Cancelled accounts may be reactivated within 30 days</li>
                </ul>
              </div>

              {/* Legal Compliance */}
              <div>
                <h2 className="text-2xl font-serif mb-4 text-[color:var(--accent)]">⚖️ Legal Compliance</h2>
                <ul className="space-y-2 text-foreground/80">
                  <li><strong>GDPR Compliant:</strong> EU data protection regulations followed</li>
                  <li><strong>CCPA Compliant:</strong> California privacy rights respected</li>
                  <li><strong>PCI DSS:</strong> Secure payment processing standards met</li>
                  <li><strong>Intellectual Property:</strong> All content owned by MrMelo</li>
                  <li><strong>Personal Use Only:</strong> Content for individual use exclusively</li>
                </ul>
              </div>

              {/* Liability & Support */}
              <div>
                <h2 className="text-2xl font-serif mb-4 text-[color:var(--accent)]">🛡️ Liability & Support</h2>
                <ul className="space-y-2 text-foreground/80">
                  <li><strong>Limited Liability:</strong> Service provided &quot;as-is&quot; with reasonable care</li>
                  <li><strong>Technical Support:</strong> 24-48 hour response time</li>
                  <li><strong>Dispute Resolution:</strong> Arbitration for disputes over $500</li>
                  <li><strong>Governing Law:</strong> United States law with international considerations</li>
                  <li><strong>Service Availability:</strong> Best efforts made for consistent access</li>
                </ul>
              </div>

              {/* Important Notices */}
              <div className="border-t border-[color:var(--sand)] pt-6">
                <h2 className="text-xl font-serif mb-4 text-[color:var(--accent)]">📋 Important Notices</h2>
                <div className="space-y-4 text-foreground/80">
                  <p><strong>Age Restrictions:</strong> Minimum age 18 years old</p>
                  <p><strong>Prohibited Uses:</strong> No illegal activities, harassment, or commercial redistribution</p>
                  <p><strong>Service Provider:</strong> MrMelo (Sole Proprietorship) - United States</p>
                  <p><strong>Contact:</strong> info@mrmelo.com</p>
                  <p><strong>Last Updated:</strong> September 2024</p>
                </div>
              </div>

              {/* Agreement */}
              <div className="border-t border-[color:var(--sand)] pt-6">
                <p className="text-foreground/60 text-sm">
                  By proceeding with payment, you acknowledge that you have read, understood, and agree to be bound by these Terms of Payment and all applicable laws and regulations.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/confidential-archive"
                className="btn-ripple rounded-full bg-[color:var(--accent)] text-black px-8 py-4 text-lg font-medium hover:opacity-90"
              >
                Return to Confidential Archive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
