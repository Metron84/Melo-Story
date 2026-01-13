'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessArchive() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePasswordFormat = (pwd: string): boolean => {
    // Check if password matches the format: 3 letters + 4 digits (7 characters total)
    const passwordRegex = /^[A-Z]{3}\d{4}$/;
    return passwordRegex.test(pwd);
  };

  const verifyPassword = (pwd: string): boolean => {
    // Check if password exists in stored registrations
    try {
      const storedData = localStorage.getItem('confidential_archive_registration');
      if (!storedData) return false;

      const registration = JSON.parse(storedData);
      return registration.password === pwd;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate password format
    if (!validatePasswordFormat(password)) {
      setError('Invalid password format. Access codes are 7 characters: 3 letters + 4 numbers (e.g., SMI1990)');
      setIsLoading(false);
      return;
    }

    // Verify password
    if (verifyPassword(password)) {
      // Store access session (in production, use proper authentication)
      sessionStorage.setItem('archive_access_granted', 'true');
      sessionStorage.setItem('access_time', new Date().toISOString());
      
      router.push('/confidential-archive/content');
    } else {
      setError('Access code not found. Please check your registration details or contact support.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-4">Access The Archive</h1>
          <p className="text-foreground/80">
            Enter your personalized 7-character access code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value.toUpperCase())}
              placeholder="Enter your access code (e.g., SMI1990)"
              className="w-full px-4 py-3 bg-black/40 border border-[color:var(--sand)] rounded-lg focus:outline-none focus:border-[color:var(--accent)] text-white placeholder-foreground/60 font-mono text-center text-lg tracking-wider"
              maxLength={7}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-foreground/60 mt-2 text-center">
              Format: First 3 letters of last name + birth year
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-ripple rounded-full bg-[color:var(--accent)] text-black px-6 py-3 font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Verifying Access...
              </>
            ) : (
              'Access Archive'
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <div className="border-t border-[color:var(--sand)]/30 pt-4">
            <p className="text-foreground/60 text-sm">
              Lost your access code?{' '}
              <a 
                href="mailto:support@mrmelo.com?subject=Lost Access Code&body=Please help me recover my Confidential Archive access code."
                className="text-[color:var(--accent)] hover:underline"
              >
                Contact Support →
              </a>
            </p>
            <p className="text-foreground/60 text-sm mt-2">
              Need to register first?{' '}
              <a 
                href="/register"
                className="text-[color:var(--accent)] hover:underline"
              >
                Sign Up Here →
              </a>
            </p>
          </div>

          <div className="text-foreground/40 text-xs">
            <p>🔐 Personalized Access Codes</p>
            <p>⚡ Instant Verification</p>
            <p>🔄 Session-Based Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
