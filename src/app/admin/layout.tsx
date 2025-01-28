'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Wine, Users, Package, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/wines', label: 'Vinhos', icon: Wine },
    { href: '/admin/plans', label: 'Planos', icon: Package },
    { href: '/admin/contacts', label: 'Contatos', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200">
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Wine className="text-primary" size={24} />
            <span className="font-display text-xl text-text-primary">Admin</span>
          </Link>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-text-secondary hover:bg-gray-50 ${
                  pathname === item.href ? 'bg-primary/5 text-primary' : ''
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 text-text-secondary hover:bg-gray-50 w-full mt-auto absolute bottom-6"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 