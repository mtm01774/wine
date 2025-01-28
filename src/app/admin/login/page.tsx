'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Enviando requisição de login...');
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('Resposta recebida:', { status: res.status, data });

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      console.log('Login bem-sucedido, aguardando 1 segundo antes de redirecionar...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Redirecionando para o dashboard...');
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      console.error('Erro durante o login:', err);
      setError(err.message || 'Ocorreu um erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-primary" size={24} />
          </div>
          <h1 className="font-display text-3xl text-text-primary mb-2">Admin Login</h1>
          <p className="text-text-secondary">
            Acesse o painel administrativo para gerenciar o conteúdo do site
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-text-primary text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-text-primary text-sm mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-text-primary font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 relative"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="opacity-0">Entrar</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 