export default function FAQPage() {
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Most projects are completed within 2-4 weeks from kickoff to delivery. We use a structured process with clear milestones and regular check-ins to ensure smooth progress."
    },
    {
      question: "Do you work with startups or just enterprise clients?",
      answer: "We work with clients of all sizes, from early-stage startups to established enterprises. Our productized packages are designed to be accessible, while our custom solutions scale with your needs."
    },
    {
      question: "What makes your AI approach different?",
      answer: "Our Human Knowledge Model ensures AI systems are grounded in verified human expertise, maintain context, and prioritize ethical augmentation over automation. Every AI solution is custom-built for your specific domain."
    },
    {
      question: "Can you handle both video production and website development?",
      answer: "Yes, our five integrated branches (Voice, Video, Words, Pics, Code) work together seamlessly. We can handle end-to-end creative and technical projects, or focus on specific disciplines as needed."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various support options including maintenance packages, performance monitoring, and strategic consultation. Our Elite tier includes priority support and ongoing optimization."
    },
    {
      question: "What's included in your quality assurance process?",
      answer: "Every project goes through our three-gate review process: draft review, pre-final testing, and final approval. We also include light analytics and performance monitoring in most packages."
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely. We adapt to your existing brand voice, visual style, and technical requirements. If you don't have formal guidelines, we can help develop them as part of the project."
    },
    {
      question: "What platforms do you develop for?",
      answer: "We build for web, mobile, and emerging platforms. Our solutions are responsive, accessible, and optimized for performance across devices and browsers."
    }
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-serif mb-4">Frequently Asked Questions</h1>
      <p className="text-foreground/80 mb-10">
        Common questions about our process, pricing, and capabilities. Can&apos;t find what you&apos;re looking for? Feel free to reach out.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg border border-[color:var(--sand)] p-6">
            <h2 className="font-serif text-lg mb-3 text-[color:var(--accent)]">
              {faq.question}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-foreground/80 mb-6">
          Have a different question or need a custom solution?
        </p>
        <a href="/contact" className="rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90">
          Get In Touch
        </a>
      </div>
    </section>
  );
}
