'use client';

import { useState, useEffect } from 'react';
import { Package, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PlanType {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  translations: {
    pt: {
      name: string;
      description: string;
    };
    en: {
      name: string;
      description: string;
    };
  };
}

interface PlansPageProps {
  params: {
    locale: string;
  };
}

export default function PlansPage({ params }: PlansPageProps) {
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Admin.plans');

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch(`/${params.locale}/api/admin/plans`);
        if (!response.ok) {
          throw new Error(t('error.loading'));
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(t('error.loading'));
        console.error('Error loading plans:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, [params.locale, t]);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('delete.confirm'))) {
      return;
    }

    try {
      const response = await fetch(`/${params.locale}/api/admin/plans/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(t('delete.error'));
      }

      setPlans(plans.filter(plan => plan.id !== id));
    } catch (err) {
      console.error('Error deleting plan:', err);
      alert(t('delete.error'));
    }
  };

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Link
          href={`/${params.locale}/admin/plans/new`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          {t('new')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="text-primary" size={24} />
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/${params.locale}/admin/plans/${plan.id}`}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit size={20} className="text-gray-500" />
                </Link>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-1">
              {plan.translations[params.locale as keyof typeof plan.translations].name}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {plan.translations[params.locale as keyof typeof plan.translations].description}
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold">
                {new Intl.NumberFormat(params.locale, {
                  style: 'currency',
                  currency: 'BRL'
                }).format(plan.price)}
              </span>
              <span className="text-gray-500">/{t(`interval.${plan.interval}`)}</span>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 