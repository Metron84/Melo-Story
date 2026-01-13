'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  birthYear: string;
  acceptedTerms: boolean;
}

export default function Register() {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    acceptedTerms: false
  });
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.birthYear) newErrors.birthYear = 'Birth year is required';
    
    const year = parseInt(formData.birthYear);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear - 18) {
      newErrors.birthYear = 'Please enter a valid birth year (18+ only)';
    }
    
    if (!formData.acceptedTerms) newErrors.acceptedTerms = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePassword = (lastName: string, birthYear: string): string => {
    // Take first 3 letters of last name, make uppercase, pad if needed
    const lastNamePrefix = lastName.substring(0, 3).toUpperCase().padEnd(3, 'X');
    return `${lastNamePrefix}${birthYear}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate the password
      const password = generatePassword(formData.lastName, formData.birthYear);
      
      // Here you would typically send this data to your backend/database
      // For now, we'll simulate the registration process
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store registration data (in production, this would go to a database)
      const registrationData = {
        ...formData,
        password,
        registrationDate: new Date().toISOString(),
        accessCode: password // This will be their access code
      };

      // Store in localStorage for demo (in production, use database)
      localStorage.setItem('confidential_archive_registration', JSON.stringify(registrationData));

      setRegistrationComplete(true);
      
      // In production, you would also send an email with the password
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✅</span>
          </div>
          
          <h1 className="text-3xl font-serif mb-4">Registration Complete!</h1>
          <p className="text-foreground/80 mb-6">
            Welcome to The Confidential Archive, {formData.firstName}! Your personalized access code has been generated.
          </p>
          
          <div className="bg-black/40 rounded-lg p-6 mb-6">
            <h3 className="font-serif text-lg mb-2">Your Access Code:</h3>
            <div className="text-3xl font-mono font-bold text-[color:var(--accent)] mb-4">
              {generatePassword(formData.lastName, formData.birthYear)}
            </div>
            <p className="text-sm text-foreground/60">
              Keep this code safe - you'll need it to access the archive.
            </p>
          </div>

          <div className="space-y-4">
            <Link 
              href="/confidential-archive/access"
              className="btn-ripple w-full rounded-full bg-[color:var(--accent)] text-black px-6 py-3 font-medium hover:opacity-90 inline-block text-center"
            >
              Access The Archive Now
            </Link>
            
            <p className="text-sm text-foreground/60">
              📧 A confirmation email has been sent to {formData.email} with your access details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-serif mb-4">Join The Confidential Archive</h1>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Register to receive your personalized access code and unlock exclusive content.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section>
        <div className="mx-auto max-w-md px-4 pb-20">
          <div className="bg-black/40 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/40 border rounded-lg focus:outline-none focus:border-[color:var(--accent)] text-white placeholder-foreground/60 ${
                    errors.firstName ? 'border-red-500' : 'border-[color:var(--sand)]'
                  }`}
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/40 border rounded-lg focus:outline-none focus:border-[color:var(--accent)] text-white placeholder-foreground/60 ${
                    errors.lastName ? 'border-red-500' : 'border-[color:var(--sand)]'
                  }`}
                  placeholder="Enter your last name"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/40 border rounded-lg focus:outline-none focus:border-[color:var(--accent)] text-white placeholder-foreground/60 ${
                    errors.email ? 'border-red-500' : 'border-[color:var(--sand)]'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Birth Year */}
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium mb-2">
                  Year of Birth *
                </label>
                <select
                  id="birthYear"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/40 border rounded-lg focus:outline-none focus:border-[color:var(--accent)] text-white ${
                    errors.birthYear ? 'border-red-500' : 'border-[color:var(--sand)]'
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="">Select your birth year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - 18 - i;
                    return (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {errors.birthYear && (
                  <p className="text-red-400 text-sm mt-1">{errors.birthYear}</p>
                )}
              </div>

              {/* Password Preview */}
              {formData.lastName && formData.birthYear && (
                <div className="bg-black/60 rounded-lg p-4">
                  <h4 className="font-serif text-sm mb-2">Your Access Code Preview:</h4>
                  <div className="text-xl font-mono font-bold text-[color:var(--accent)]">
                    {generatePassword(formData.lastName, formData.birthYear)}
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">
                    First 3 letters of last name + birth year = 7-character access code
                  </p>
                </div>
              )}

              {/* Terms Acceptance */}
              <div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-[color:var(--accent)] focus:ring-[color:var(--accent)] border-[color:var(--sand)] rounded"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-foreground/80">
                    I agree to the{' '}
                    <Link href="/terms-of-service" className="text-[color:var(--accent)] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and understand that access codes are personalized and non-transferable.
                  </span>
                </label>
                {errors.acceptedTerms && (
                  <p className="text-red-400 text-sm mt-1">You must accept the terms to continue</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-ripple rounded-full bg-[color:var(--accent)] text-black px-6 py-4 text-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Creating Your Access Code...
                  </>
                ) : (
                  'Generate My Access Code'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/60 text-sm">
                Already have an access code?{' '}
                <Link href="/confidential-archive/access" className="text-[color:var(--accent)] hover:underline">
                  Access the Archive →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
