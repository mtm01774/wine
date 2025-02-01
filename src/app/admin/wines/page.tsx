'use client';

import { useState, useEffect } from 'react';
import { Wine, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
    try {
      const res = await fetch('/pt/api/admin/wines');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);
      
      setWines(data.wines);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este vinho?')) return;

    try {
      const res = await fetch(`/pt/api/admin/wines/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);
      
      setWines(wines.filter(wine => wine.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Wine className="text-primary" size={32} />
          <h1 className="text-2xl font-display">Gestão de Vinhos</h1>
        </div>
        <Link
          href="/admin/wines/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus size={20} />
          Novo Vinho
        </Link>
      </div>

      <div className="grid gap-6">
        {wines.map(wine => (
          <div key={wine.id} className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-6">
            <div className="relative w-24 h-24">
              <Image
                src={wine.image}
                alt={wine.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-1">{wine.name}</h2>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Tipo: {wine.type}</p>
                <p>Região: {wine.region}</p>
                <p>Ano: {wine.year}</p>
                <p>Preço: €{wine.price.toFixed(2)}</p>
                <p>Stock: {wine.stock} unidades</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/wines/${wine.id}/edit`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => handleDelete(wine.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {wines.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum vinho cadastrado ainda.
          </div>
        )}
      </div>
    </div>
  );
} 