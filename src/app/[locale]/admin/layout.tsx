'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { Wine, Users, Package, MessageSquare, LogOut, LayoutDashboard, Store } from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  if (pathname === `/${locale}/admin/login`) {
    return children;
  }

  const handleLogout = async () => {
    try {
      await fetch(`/${locale}/api/admin/auth/logout`, { method: 'POST' });
      router.push(`/${locale}/admin/login`);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { href: `/${locale}/admin/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/${locale}/admin/wines`, label: 'Wines', icon: Wine },
    { href: `/${locale}/admin/plans`, label: 'Plans', icon: Package },
    { href: `/${locale}/admin/contacts`, label: 'Contacts', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <Link href={`/${locale}/admin/dashboard`} className="flex items-center gap-2 text-gray-800">
            <Wine className="text-blue-600" size={24} />
            <span className="font-medium">Admin</span>
          </Link>
        </div>

        <nav className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-4 border-t pt-4">
            <Link
              href={`/${locale}/store`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Store size={20} />
              <span>View Store</span>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full mt-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 