export default function HKMPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-serif mb-4">Human Knowledge Model</h1>
      <p className="text-foreground/80 mb-6">
        Our framework for building AI systems that understand and amplify human expertise.
      </p>

      <div className="space-y-8">
        <div className="rounded-lg border border-[color:var(--sand)] p-6">
          <h2 className="font-serif text-xl mb-3">Core Principles</h2>
          <ul className="space-y-2 text-foreground/80 list-disc pl-5">
            <li><strong>Source-grounded knowledge</strong> — Every AI response is traceable to verified human expertise</li>
            <li><strong>Context-aware reasoning</strong> — Understanding not just what, but why and when</li>
            <li><strong>Ethical augmentation</strong> — AI as a tool for human creativity, not replacement</li>
            <li><strong>Measurable impact</strong> — Clear metrics for knowledge quality and user outcomes</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[color:var(--sand)] p-6">
          <h2 className="font-serif text-xl mb-3">Implementation Framework</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Knowledge Architecture</h3>
              <p className="text-foreground/80 text-sm">
                Structured data models that preserve context and relationships between concepts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Validation Systems</h3>
              <p className="text-foreground/80 text-sm">
                Multi-layer verification ensuring accuracy and reliability of AI responses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Feedback Loops</h3>
              <p className="text-foreground/80 text-sm">
                Continuous learning from user interactions and expert corrections.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ethical Guardrails</h3>
              <p className="text-foreground/80 text-sm">
                Built-in constraints ensuring responsible and helpful AI behavior.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[color:var(--sand)] p-6">
          <h2 className="font-serif text-xl mb-3">Applications</h2>
          <p className="text-foreground/80 mb-4">
            The Human Knowledge Model powers our AI solutions across different domains:
          </p>
          <ul className="space-y-2 text-foreground/80 list-disc pl-5">
            <li><strong>Customer Support Agents</strong> — Context-aware responses based on your knowledge base</li>
            <li><strong>Content Creation Assistants</strong> — AI that understands your brand voice and expertise</li>
            <li><strong>Knowledge Management</strong> — Intelligent organization and retrieval of information</li>
            <li><strong>Decision Support Systems</strong> — AI-powered insights for complex problem solving</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <a href="/contact" className="rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90">
          Discuss Your AI Solution
        </a>
      </div>
    </section>
  );
}
