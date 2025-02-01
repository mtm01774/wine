'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Wine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useParams } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('Auth');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Iniciando login com:', { email, hasPassword: !!password, locale: params.locale });
      
      const response = await fetch(`/${params.locale}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || t('error'));
      }

      console.log('Login bem-sucedido, redirecionando...');
      router.push(`/${params.locale}/store`);
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 text-[var(--text-primary)]">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1C1F] rounded-full flex items-center justify-center mx-auto mb-4">
              <Wine className="text-[var(--primary)]" size={32} />
            </div>
            <h1 className="text-2xl font-display mb-2">{t('title')}</h1>
            <p className="text-[var(--text-secondary)]">{t('description')}</p>
          </div>

          <div className="bg-[#0D1C1F] rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm text-[var(--text-secondary)] mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[var(--text-primary)]/10 rounded-md text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-[var(--text-secondary)] mb-1">
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A393E] border border-[var(--text-primary)]/10 rounded-md text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[#1A393E] font-medium py-2 rounded-md hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0D1C1F] transition-colors relative"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="opacity-0">{t('submit')}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-[#1A393E] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  t('submit')
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-[var(--text-secondary)]">
                  {t('noAccount')}{' '}
                  <Link href="/register" className="text-[var(--primary)] hover:underline">
                    {t('register')}
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