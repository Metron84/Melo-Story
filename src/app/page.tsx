export default function Home() {
  return (
    <>
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Who We Are</h1>
        <p className="text-lg text-foreground/80 max-w-4xl mx-auto leading-relaxed">
          We are a comprehensive AI-powered media consulting service that combines human reasoning, critical thinking, and advanced technology to build complete digital solutions. From websites and chatbots to AI agents and premium media content, we leverage cutting-edge tools and methodologies. Given the advanced capabilities at our disposal, there are no limits to creation—everything we execute for your business or personal brand is designed to match your identity, objectives, and vision.
        </p>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">What We Do</h2>
        <p className="text-lg text-foreground/80 max-w-4xl mx-auto leading-relaxed">
          We deliver comprehensive digital solutions including websites, chatbots, AI agents, and premium media content for both traditional and social media assets. We execute the visual and build the infrastructure so clients understand what you are offering and what you are about. There are no limits to creation—we bring any vision to digital reality, from simple media assets to complex AI-driven platforms.
        </p>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">What Separates Us</h2>
        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[color:var(--sand)]">
              <thead>
                <tr className="bg-black/20">
                  <th className="border border-[color:var(--sand)] p-4 text-left font-serif">Criteria</th>
                  <th className="border border-[color:var(--sand)] p-4 text-left font-serif">MrMelo.com</th>
                  <th className="border border-[color:var(--sand)] p-4 text-left font-serif">Global Top-Tier Agency</th>
                  <th className="border border-[color:var(--sand)] p-4 text-left font-serif">Mid-Tier Agency</th>
                  <th className="border border-[color:var(--sand)] p-4 text-left font-serif">Small-Tier Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[color:var(--sand)] p-4 font-medium">Media Asset Quality</td>
                  <td className="border border-[color:var(--sand)] p-4 text-[color:var(--accent)]">Exceptional</td>
                  <td className="border border-[color:var(--sand)] p-4">Exceptional</td>
                  <td className="border border-[color:var(--sand)] p-4">Good</td>
                  <td className="border border-[color:var(--sand)] p-4">Basic</td>
                </tr>
                <tr>
                  <td className="border border-[color:var(--sand)] p-4 font-medium">Delivery Time</td>
                  <td className="border border-[color:var(--sand)] p-4 text-[color:var(--accent)]">2-5 days</td>
                  <td className="border border-[color:var(--sand)] p-4">1-3 weeks</td>
                  <td className="border border-[color:var(--sand)] p-4">2-4 weeks</td>
                  <td className="border border-[color:var(--sand)] p-4">1-2 months</td>
                </tr>
                <tr>
                  <td className="border border-[color:var(--sand)] p-4 font-medium">Price</td>
                  <td className="border border-[color:var(--sand)] p-4 text-[color:var(--accent)]">$2,500-$8,000</td>
                  <td className="border border-[color:var(--sand)] p-4">$10,000-$50,000</td>
                  <td className="border border-[color:var(--sand)] p-4">$5,000-$15,000</td>
                  <td className="border border-[color:var(--sand)] p-4">$1,000-$3,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-foreground/60 mt-4 italic">
            *Comparison based on industry benchmarks and client feedback from verified sources
          </p>
        </div>
      </div>

      <div className="text-center mb-16">
        <blockquote className="text-2xl md:text-3xl font-serif italic text-[color:var(--accent)] mb-8">
          &quot;Let&apos;s focus on replicating breakthrough ideas rather than just automating existing processes&quot;
        </blockquote>
        <p className="text-sm text-foreground/60">— Mr. Melo</p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">Schedule a Meeting</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Discuss your ambitions, visions, and goals with our team. We&apos;ll arrange a call or in-person meeting at your convenience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-ripple rounded-full bg-foreground text-background px-8 py-4 text-lg font-medium hover:opacity-90">
            Get Started
          </a>
          <a href="mailto:info@mrmelo.com" className="btn-ripple rounded-full border border-[color:var(--sand)] px-8 py-4 text-lg font-medium hover:bg-[color:var(--sand)]/30">
            Email Us
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
