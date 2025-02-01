'use client';

import { useState, useEffect } from 'react';
import { Wine, Edit, Trash2, Plus, Store, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface WineType {
  id: string;
  name: string;
  type: string;
  region: string;
  price: number;
  stock: number;
  image: string;
  year: number;
  translations: {
    locale: string;
    name: string;
    description: string;
  }[];
}

export default function WinesPage() {
  const [wines, setWines] = useState<WineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    loadWines();
  }, [locale]);

  async function loadWines() {
    try {
      const response = await fetch(`/${locale}/api/admin/wines`);
      if (!response.ok) {
        throw new Error('Failed to load wines');
      }
      const data = await response.json();
      setWines(data.wines || []);
    } catch (err) {
      setError('Error loading wine list');
      console.error('Error loading wines:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this wine?')) {
      return;
    }

    try {
      const response = await fetch(`/${locale}/api/admin/wines/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete wine');
      }

      await loadWines();
    } catch (err) {
      console.error('Error deleting wine:', err);
      alert('Error deleting wine');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-gray-900">Wines</h1>
          <p className="text-gray-600">Manage your wine catalog</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/store`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Store size={20} />
            <span>View Store</span>
            <ExternalLink size={16} />
          </Link>
          <Link
            href={`/${locale}/admin/wines/new`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>New Wine</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-600">Wine</th>
                <th className="text-left p-4 font-medium text-gray-600">Type</th>
                <th className="text-left p-4 font-medium text-gray-600">Region</th>
                <th className="text-left p-4 font-medium text-gray-600">Price</th>
                <th className="text-left p-4 font-medium text-gray-600">Stock</th>
                <th className="text-right p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wines.map(wine => {
                const translation = wine.translations.find(t => t.locale === locale) || wine.translations[0];
                return (
                  <tr key={wine.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {wine.image ? (
                          <Image
                            src={wine.image}
                            alt={translation.name}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Wine size={20} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{translation.name}</p>
                          <p className="text-sm text-gray-500">{wine.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{wine.type}</td>
                    <td className="p-4 text-gray-600">{wine.region}</td>
                    <td className="p-4 text-gray-600">
                      {wine.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          wine.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : wine.stock > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {wine.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${locale}/admin/wines/${wine.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(wine.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 