'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import { ShoppingCart } from 'lucide-react';

interface WineCardProps {
  wine: {
    id: string;
    name: string;
    region: string;
    price: number;
    image: string;
  };
}

export function WineCard({ wine }: WineCardProps) {
  return (
    <div className="bg-[#0D1C1F] rounded-lg overflow-hidden group">
      <Link href={`/store/${wine.id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={wine.image || '/images/wine-placeholder.jpg'}
            alt={wine.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg text-[#ECE5D5] mb-1">{wine.name}</h3>
          <p className="text-[#ECE5D5]/60 text-sm mb-4">{wine.region}, Portugal</p>
          <div className="flex items-center justify-between">
            <span className="text-[#F7EC73] font-medium">€{wine.price.toFixed(2)}</span>
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Adicionar ao carrinho
              }}
              className="w-10 h-10 rounded-lg bg-[#F7EC73] text-[#1A393E] flex items-center justify-center hover:bg-[#F7EC73]/90 transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 