'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('Auth');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('registerError'));
      }

      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('registerError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1C1F] rounded-full flex items-center justify-center mx-auto mb-4">
              <Wine className="text-[#F7EC73]" size={32} />
            </div>
            <h1 className="text-2xl font-display text-[#ECE5D5] mb-2">{t('registerTitle')}</h1>
            <p className="text-[#ECE5D5]/60">{t('registerDescription')}</p>
          </div>

          <div className="bg-[#0D1C1F] rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm text-[#ECE5D5]/60 mb-1">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[#ECE5D5]/10 rounded-md text-sm text-[#ECE5D5] placeholder-[#ECE5D5]/30 focus:outline-none focus:ring-2 focus:ring-[#F7EC73] focus:border-transparent"
                  placeholder={t('namePlaceholder')}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[#ECE5D5]/60 mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[#ECE5D5]/10 rounded-md text-sm text-[#ECE5D5] placeholder-[#ECE5D5]/30 focus:outline-none focus:ring-2 focus:ring-[#F7EC73] focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-[#ECE5D5]/60 mb-1">
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[#ECE5D5]/10 rounded-md text-sm text-[#ECE5D5] placeholder-[#ECE5D5]/30 focus:outline-none focus:ring-2 focus:ring-[#F7EC73] focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-[#ECE5D5]/60 mb-1">
                  {t('confirmPassword')}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[#ECE5D5]/10 rounded-md text-sm text-[#ECE5D5] placeholder-[#ECE5D5]/30 focus:outline-none focus:ring-2 focus:ring-[#F7EC73] focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F7EC73] text-[#1A393E] font-medium py-2 rounded-md hover:bg-[#F7EC73]/90 focus:outline-none focus:ring-2 focus:ring-[#F7EC73] focus:ring-offset-2 focus:ring-offset-[#0D1C1F] transition-colors relative"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="opacity-0">{t('registerSubmit')}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-[#1A393E] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  t('registerSubmit')
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#ECE5D5]/60">
                  {t('haveAccount')}{' '}
                  <Link href="/login" className="text-[#F7EC73] hover:underline">
                    {t('login')}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 