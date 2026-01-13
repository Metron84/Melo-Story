"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  comment: string;
  rating: number;
  date: string;
  approved: boolean;
}

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    comment: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load testimonials from localStorage on component mount
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('mrmelo_testimonials');
    if (savedTestimonials) {
      try {
        const parsed = JSON.parse(savedTestimonials);
        setTestimonials(parsed.filter((t: Testimonial) => t.approved));
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString(),
        approved: true // Auto-approve for now, can be changed to false for moderation
      };

      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      localStorage.setItem('mrmelo_testimonials', JSON.stringify(updatedTestimonials));

      // Reset form
      setFormData({ name: "", company: "", comment: "", rating: 5 });
      setShowForm(false);
      
      alert('Thank you for your testimonial! It has been submitted successfully.');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('There was an error submitting your testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl mx-auto mb-16">
      <h1 className="text-3xl font-serif mb-4">About</h1>
      <p className="text-foreground/80 mb-4">
        <strong>Ethos —</strong> Content of character first. We build useful media and software with clarity,
        honesty, and respect for attention.
      </p>
      <p className="text-foreground/80 mb-4">
        <strong>Background —</strong> Cross trained in media, AI, and communications. We work with brands and
        founders across markets from startup to enterprise.
      </p>
      <p className="text-foreground/80">
        <strong>Approach —</strong> Strategy to execution in short cycles. Source grounded writing, measurable
        delivery, and simple contracts.
      </p>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif">Client Testimonials</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-ripple rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90"
          >
            {showForm ? 'Cancel' : 'Share Your Experience'}
          </button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <div className="mb-12 p-6 border border-[color:var(--sand)] rounded-lg bg-black/20">
            <h3 className="text-xl font-serif mb-4">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-[color:var(--sand)] bg-transparent px-3 py-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[color:var(--sand)] bg-transparent px-3 py-2"
                    placeholder="Your company"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Rating *</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-[color:var(--sand)] bg-transparent px-3 py-2"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                  <option value={2}>2 Stars - Fair</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Your Testimonial *</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full rounded-md border border-[color:var(--sand)] bg-transparent px-3 py-2"
                  placeholder="Share your experience working with us..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-ripple rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-ripple rounded-full border border-[color:var(--sand)] px-6 py-3 text-sm font-medium hover:bg-[color:var(--sand)]/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display Testimonials */}
        {testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 border border-[color:var(--sand)] rounded-lg bg-black/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    {testimonial.company && (
                      <p className="text-sm text-foreground/60">{testimonial.company}</p>
                    )}
                  </div>
                  <div className="flex text-[color:var(--accent)]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-[color:var(--accent)]' : 'text-gray-400'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80 italic">&quot;{testimonial.comment}&quot;</p>
                <p className="text-xs text-foreground/60 mt-3">
                  {new Date(testimonial.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">No testimonials yet. Be the first to share your experience!</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-ripple rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90"
            >
              Share Your Experience
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


