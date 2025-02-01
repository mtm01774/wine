'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wine as WineType } from '@prisma/client';
import { Wine, Upload, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface WineFormProps {
  wine?: WineType & {
    translations: {
      locale: string;
      name: string;
      description: string;
    }[];
  };
  locale: string;
}

interface FormData {
  name: string;
  type: string;
  region: string;
  price: number;
  stock: number;
  image: string;
  year: number;
  grapeVariety: string;
  body: string;
  servingTemp: string;
  translations: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

const SUPPORTED_LOCALES = ['pt', 'en'];

export default function WineForm({ wine, locale }: WineFormProps) {
  const router = useRouter();
  const isEditing = !!wine;

  const [formData, setFormData] = useState<FormData>(() => {
    if (wine) {
      return {
        ...wine,
        price: Number(wine.price),
        stock: Number(wine.stock),
        year: Number(wine.year),
        translations: wine.translations.reduce((acc, trans) => ({
          ...acc,
          [trans.locale]: {
            name: trans.name,
            description: trans.description
          }
        }), {})
      };
    }
    return {
      name: '',
      type: '',
      region: '',
      price: 0,
      stock: 0,
      image: '',
      year: new Date().getFullYear(),
      grapeVariety: '',
      body: '',
      servingTemp: '',
      translations: SUPPORTED_LOCALES.reduce((acc, loc) => ({
        ...acc,
        [loc]: {
          name: '',
          description: ''
        }
      }), {})
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(wine?.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const formDataFile = new FormData();
        formDataFile.append('file', imageFile);

        const uploadRes = await fetch(`/${locale}/api/admin/upload`, {
          method: 'POST',
          body: formDataFile,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({ error: 'Error uploading image' }));
          throw new Error(errorData.error || 'Error uploading image');
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.fileName;
      }

      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/${locale}/api/admin/wines/${wine.id}` : `/${locale}/api/admin/wines`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: wine?.id,
          price: Number(formData.price) || 0,
          stock: Number(formData.stock) || 0,
          year: Number(formData.year) || new Date().getFullYear(),
          image: imageUrl || '',
          translations: formData.translations
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error occurred' }));
        throw new Error(errorData.error || 'Error saving wine');
      }

      router.push(`/${locale}/admin/wines`);
      router.refresh();
    } catch (error) {
      console.error('Error saving wine:', error);
      setError(error.message || 'Error saving wine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={e => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (€)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="relative w-24 h-24">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload size={20} />
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-lg font-medium border-b pb-2">Translations</h2>
        
        {SUPPORTED_LOCALES.map(loc => (
          <div key={loc} className="space-y-4">
            <h3 className="font-medium">{loc.toUpperCase()}</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.translations[loc]?.name || ''}
                  onChange={e => setFormData({
                    ...formData,
                    translations: {
                      ...formData.translations,
                      [loc]: {
                        ...formData.translations[loc],
                        name: e.target.value,
                      },
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.translations[loc]?.description || ''}
                  onChange={e => setFormData({
                    ...formData,
                    translations: {
                      ...formData.translations,
                      [loc]: {
                        ...formData.translations[loc],
                        description: e.target.value,
                      },
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/${locale}/admin/wines`}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={20} />
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
} 