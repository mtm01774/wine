'use client';

import { WineType } from "@/types/wine";
import { X, Star, ShoppingCart, GlassWater, Grape, MapPin, ThermometerSun } from "lucide-react";
import Image from "next/image";

interface WineModalProps {
  wine: WineType;
  isOpen: boolean;
  onClose: () => void;
}

export function WineModal({ wine, isOpen, onClose }: WineModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-text-secondary hover:text-text-primary z-10"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Imagem do Vinho */}
            <div className="relative h-[400px] md:h-full">
              <Image
                src={wine.image}
                alt={wine.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Detalhes do Vinho */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                <span>{wine.type}</span>
                <span>•</span>
                <span>{wine.year}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-primary fill-primary" />
                  <span>{wine.rating}</span>
                </div>
              </div>

              <h2 className="font-display text-2xl text-text-primary mb-2">{wine.name}</h2>
              <p className="text-text-secondary mb-6">{wine.region}, Portugal</p>

              {/* Características */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <GlassWater size={20} className="text-primary" />
                  <span className="text-text-secondary">Corpo Médio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Grape size={20} className="text-primary" />
                  <span className="text-text-secondary">Touriga Nacional</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-text-secondary">{wine.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThermometerSun size={20} className="text-primary" />
                  <span className="text-text-secondary">16-18°C</span>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-text-secondary mb-8">
                Um vinho excepcional que combina tradição e modernidade. Apresenta aromas intensos de frutas vermelhas maduras, com notas de especiarias e um toque sutil de carvalho. Na boca, mostra-se elegante e equilibrado, com taninos macios e final persistente.
              </p>

              {/* Preço e Botão */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-text-secondary text-sm">Preço</span>
                  <p className="text-text-primary text-2xl font-medium">€{wine.price.toFixed(2)}</p>
                </div>
                <button className="bg-primary text-text-primary px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors duration-200">
                  <ShoppingCart size={20} />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 