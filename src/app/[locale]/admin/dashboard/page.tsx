'use client';

import { useEffect, useState } from 'react';
import { Wine, Package, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DashboardStats {
  totalWines: number;
  totalPlans: number;
  totalContacts: number;
  recentContacts: Array<{
    id: string;
    name: string;
    subject: string;
    status: string;
    createdAt: string;
  }>;
}

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Admin.dashboard');

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch(`/${params.locale}/api/admin/dashboard/stats`);
        if (!response.ok) {
          throw new Error(t('error.stats'));
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(t('error.loading'));
        console.error('Error loading statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [params.locale, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('stats.wines')}</p>
              <p className="text-2xl font-semibold">{stats.totalWines}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Wine className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('stats.plans')}</p>
              <p className="text-2xl font-semibold">{stats.totalPlans}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('stats.contacts')}</p>
              <p className="text-2xl font-semibold">{stats.totalContacts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <MessageSquare className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">{t('recentContacts.title')}</h2>
        </div>
        <div className="divide-y">
          {stats.recentContacts.map((contact) => (
            <div key={contact.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.subject}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {t(`recentContacts.status.${contact.status}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 