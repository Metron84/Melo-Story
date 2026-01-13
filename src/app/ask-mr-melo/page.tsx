'use client';

import { useState } from 'react';
import Head from 'next/head';

const CATEGORIES = [
  // Strategic Categories
  {
    id: 'strategic-philosophy',
    name: 'Strategic Philosophy',
    type: 'strategic',
    prompts: [
      'What strategy are you developing that others can\'t see?',
      'What\'s the philosophical foundation of your business approach?',
      'How do you determine the "price" of different opportunities?'
    ],
    icon: '🔮'
  },
  {
    id: 'business-psychology',
    name: 'Business Psychology',
    type: 'strategic',
    prompts: [
      'What human behavior are you trying to influence?',
      'How do you motivate premium customer behavior?',
      'What psychological triggers work in your business model?'
    ],
    icon: '💰'
  },
  {
    id: 'entrepreneurial-mindset',
    name: 'Entrepreneurial Mindset',
    type: 'strategic',
    prompts: [
      'What\'s your biggest insight about building successful businesses?',
      'How do you think about risk and opportunity differently?',
      'What entrepreneurial lesson took you the longest to learn?'
    ],
    icon: '🚀'
  },
  {
    id: 'innovation-strategy',
    name: 'Innovation Strategy',
    type: 'strategic',
    prompts: [
      'What innovation strategy are you working on right now?',
      'How do you create something truly unique and valuable?',
      'How do you stay ahead of market trends?'
    ],
    icon: '⚡'
  },
  {
    id: 'experience-architecture',
    name: 'Experience Architecture',
    type: 'strategic',
    prompts: [
      'What exclusive experience are you designing?',
      'How do you create perceived value beyond the product?',
      'How do you architect unforgettable customer experiences?'
    ],
    icon: '🎨'
  },
  {
    id: 'value-engineering',
    name: 'Value Engineering',
    type: 'strategic',
    prompts: [
      'How do you engineer products that people can\'t resist?',
      'What\'s your process for determining the perfect price point?',
      'How do you create premium value at scale?'
    ],
    icon: '🏆'
  },

  // Everyday Categories
  {
    id: 'home-comfort',
    name: 'Home & Comfort',
    type: 'everyday',
    prompts: [
      'Can you share what makes your house feel like home?',
      'I\'d love to know how you make your daily routine more comfortable',
      'What\'s your favorite way to unwind at home?'
    ],
    icon: '🏠'
  },
  {
    id: 'money-smarts',
    name: 'Money Smarts',
    type: 'everyday',
    prompts: [
      'Can you tell me about your biggest money worry right now?',
      'I\'d like to know how you make your money work better for you',
      'What\'s one smart money habit you\'d recommend?'
    ],
    icon: '💸'
  },
  {
    id: 'love-relationships',
    name: 'Love & Relationships',
    type: 'everyday',
    prompts: [
      'Can you share what\'s making you happy in your relationships?',
      'I\'d love to know how you make connections with others better',
      'How do you keep relationships strong and healthy?'
    ],
    icon: '❤️'
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    type: 'everyday',
    prompts: [
      'Can you tell me what\'s stressing you out the most these days?',
      'I\'d love to know your go-to way to relax and forget worries',
      'What helps you feel more at peace?'
    ],
    icon: '😌'
  },
  {
    id: 'getting-things-done',
    name: 'Getting Things Done',
    type: 'everyday',
    prompts: [
      'Can you tell me about one thing you keep putting off?',
      'I\'d love to know how you make daily tasks easier',
      'How do you stay productive without feeling overwhelmed?'
    ],
    icon: '🏃‍♂️'
  },
  {
    id: 'having-fun',
    name: 'Having Fun',
    type: 'everyday',
    prompts: [
      'Can you tell me when you last really enjoyed yourself?',
      'I\'d love to know a simple way to add more fun to your week',
      'How do you find joy in everyday moments?'
    ],
    icon: '🎉'
  },
  {
    id: 'peace-of-mind',
    name: 'Peace of Mind',
    type: 'everyday',
    prompts: [
      'Can you share what\'s keeping you up at night?',
      'I\'d love to know how you worry less and feel more calm',
      'What\'s one thing that always brings you peace?'
    ],
    icon: '🧘‍♀️'
  },
  {
    id: 'family-life',
    name: 'Family Life',
    type: 'everyday',
    prompts: [
      'Can you tell me how your family life has been treating you?',
      'I\'d love to know about a family tradition you\'d like to improve',
      'How do you make family time more enjoyable?'
    ],
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'feeling-good',
    name: 'Feeling Good',
    type: 'everyday',
    prompts: [
      'Can you share what makes you feel your best these days?',
      'I\'d love to know how you feel healthier and happier',
      'How do you take care of your well-being?'
    ],
    icon: '💪'
  },
  {
    id: 'life-balance',
    name: 'Life Balance',
    type: 'everyday',
    prompts: [
      'Can you tell me if you\'re feeling overwhelmed or just right?',
      'I\'d love to know how you balance work, fun, and rest better',
      'How do you find your sweet spot in life?'
    ],
    icon: '🌅'
  }
];

const TIERS = {
  basic: {
    name: 'Basic Access',
    price: '$15/month',
    email: 'basic@mrmelo.com',
    responseTime: '48 hours'
  },
  deepDiver: {
    name: 'Deep Diver',
    price: '$35/month',
    email: 'deepdiver@mrmelo.com',
    responseTime: '36 hours'
  },
  archiveMaster: {
    name: 'Archive Master',
    price: '$65/month',
    email: 'archivemaster@mrmelo.com',
    responseTime: '24 hours'
  }
};

export default function AskMrMeloPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState('selection');

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleResponseChange = (categoryId: string, promptIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [`${categoryId}-${promptIndex}`]: value
    }));
  };

  const generateRequestEmail = () => {
    const userTier = 'basic'; // Default tier, can be made dynamic
    const tier = TIERS[userTier];

    let emailBody = `Personalized Content Request from Valued Member\n\n`;
    emailBody += `Tier: ${tier.name}\n\n`;
    emailBody += 'CONTENT REQUEST DETAILS:\n\n';

    selectedCategories.forEach(categoryId => {
      const category = CATEGORIES.find(c => c.id === categoryId);
      if (!category) return;
      
      emailBody += `${category.icon} ${category.name}\n`;

      category.prompts.forEach((prompt, index) => {
        const response = responses[`${categoryId}-${index}`] || '';
        emailBody += `Question ${index + 1}: ${prompt}\n`;
        emailBody += `Your Answer: ${response}\n\n`;
      });
      emailBody += '---\n\n';
    });

    return { email: tier.email, body: emailBody };
  };

  const submitRequest = () => {
    const { email, body } = generateRequestEmail();
    const subject = `Content Request - ${selectedCategories.length} Categories`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, '_blank');

    setCurrentStep('success');
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-4xl font-bold mb-4">Request Sent!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Your personalized questions have been sent. I&apos;ll craft responses that speak directly to what you asked.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">✅</div>
                <div>
                  <strong>Email sent</strong> - Your questions are on their way
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">✅</div>
                <div>
                  <strong>Personal crafting</strong> - Content based on your specific questions
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">✅</div>
                <div>
                  <strong>Response time</strong> - Within your tier&apos;s SLA
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">✅</div>
                <div>
                  <strong>Direct answers</strong> - Responses tailored to what you asked
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/highlights"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              View Highlights →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Ask Mr. Melo - Personalized Content Requests</title>
        <meta name="description" content="Request personalized content from Mr. Melo. Choose your topics and get authentic responses based on proven methodology." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Ask Mr. Melo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the topics you want to explore, then tell me what you&apos;d like to know. I&apos;ll create personalized content that answers your specific questions.
            </p>

            {/* Authenticity Guarantee */}
            <div className="bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto">
              <div className="text-yellow-400 font-semibold mb-2">🔒 AUTHENTIC RESPONSES ONLY</div>
              <p className="text-gray-300 mb-4">
                All answers are provided solely by Mr. Melo with absolutely NO AI influence or implementation.
                You will receive genuine responses based on his five-step methodology:
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">🔸 Define</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">🔸 Explain</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">🔸 Prove</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">🔸 Differentiate</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">🔸 Anticipate & Roadmap</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                currentStep === 'selection' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-400'
              }`}>
                1
              </div>
              <div className="w-16 h-1 bg-gray-700">
                <div className={`h-full transition-all ${
                  currentStep === 'prompts' || currentStep === 'contact' ? 'bg-yellow-400 w-full' : 'w-0'
                }`}></div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                currentStep === 'prompts' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-400'
              }`}>
                2
              </div>
              <div className="w-16 h-1 bg-gray-700">
                <div className={`h-full transition-all ${
                  currentStep === 'contact' ? 'bg-yellow-400 w-full' : 'w-0'
                }`}></div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                currentStep === 'contact' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {currentStep === 'selection' && (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-center">Step 1: What interests you?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {CATEGORIES.map(category => (
                  <div
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-yellow-400 ${
                      selectedCategories.includes(category.id)
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">3 personalized questions</p>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                      category.type === 'strategic'
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-green-900/50 text-green-300'
                    }`}>
                      {category.type}
                    </div>
                  </div>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => setCurrentStep('prompts')}
                    className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                  >
                    Ask My Questions ({selectedCategories.length} topics) →
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 'prompts' && (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-center">Step 2: What do you want to know?</h2>

              <div className="space-y-8 mb-12">
                {selectedCategories.map(categoryId => {
                  const category = CATEGORIES.find(c => c.id === categoryId);
                  if (!category) return null;
                  return (
                    <div key={categoryId} className="bg-gray-900 p-8 rounded-lg">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-4">{category.icon}</span>
                        <div>
                          <h3 className="text-2xl font-semibold">{category.name}</h3>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            category.type === 'strategic'
                              ? 'bg-blue-900/50 text-blue-300'
                              : 'bg-green-900/50 text-green-300'
                          }`}>
                            {category.type}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {category.prompts.map((prompt, index) => (
                          <div key={index}>
                            <label className="block text-lg font-medium text-gray-300 mb-3">
                              {prompt}
                            </label>
                            <textarea
                              value={responses[`${categoryId}-${index}`] || ''}
                              onChange={(e) => handleResponseChange(categoryId, index, e.target.value)}
                              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none text-base"
                              rows={4}
                              placeholder="Share your thoughts, experiences, or what you'd like me to address..."
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep('selection')}
                  className="bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-colors mr-4"
                >
                  ← Back to Categories
                </button>
                <button
                  onClick={() => setCurrentStep('contact')}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                >
                  Send My Questions →
                </button>
              </div>
            </div>
          )}

          {currentStep === 'contact' && (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-center">Step 3: Send Your Questions</h2>

              <div className="bg-gray-900 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-6">Request Summary</h3>

                <div className="mb-6">
                  <p className="text-gray-300 mb-3">
                    <strong>Topics Selected:</strong> {selectedCategories.length}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {selectedCategories.map(categoryId => {
                      const category = CATEGORIES.find(c => c.id === categoryId);
                      if (!category) return null;
                      return (
                        <span key={categoryId} className="bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm">
                          {category.icon} {category.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-2">
                    <strong>Your Tier:</strong> {TIERS.basic.name}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Contact Email:</strong> <span className="text-yellow-400">{TIERS.basic.email}</span>
                  </p>
                  <p className="text-gray-300">
                    <strong>Response Time:</strong> <span className="text-green-400">{TIERS.basic.responseTime}</span>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep('prompts')}
                  className="bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-colors mr-4"
                >
                  ← Back to Questions
                </button>
                <button
                  onClick={submitRequest}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                >
                  📧 Send My Questions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

