'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const t = useTranslations('Cart');
  const params = useParams();
  const locale = params.locale as string;
  const { items: cartItems, loading, error, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.wine.price * item.quantity);
    }, 0);
  };

  const shippingCost = 5.00;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A393E] pt-24">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-[#F7EC73] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1A393E] pt-24">
        <div className="container-custom">
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#1A393E] pt-24">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-12">
            <ShoppingCart size={32} className="text-[#F7EC73]" />
            <h1 className="text-3xl font-display text-[#ECE5D5]">{t('title')}</h1>
          </div>
          <div className="bg-[#0D1C1F] p-8 rounded-lg text-center">
            <h2 className="text-xl font-display text-[#ECE5D5] mb-4">{t('empty.title')}</h2>
            <p className="text-[#ECE5D5]/60 mb-8">{t('empty.description')}</p>
            <Link
              href="/store"
              className="inline-block bg-[#F7EC73] text-[#1A393E] font-medium px-6 py-3 rounded-lg hover:bg-[#F7EC73]/90 transition-colors duration-200"
            >
              {t('summary.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-12">
          <ShoppingCart size={32} className="text-[#F7EC73]" />
          <h1 className="text-3xl font-display text-[#ECE5D5]">{t('title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => {
              const translation = item.wine.translations.find(t => t.locale === locale) || item.wine.translations[0];
              
              return (
                <div key={item.id} className="bg-[#0D1C1F] p-6 rounded-lg mb-4">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.wine.image || '/images/wine-placeholder.jpg'}
                        alt={translation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-lg text-[#ECE5D5] mb-1">{translation.name}</h3>
                      <p className="text-[#ECE5D5]/60 text-sm mb-4">{item.wine.region}, Portugal</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full border border-[#ECE5D5]/20 flex items-center justify-center hover:bg-[#ECE5D5]/10"
                          >
                            <Minus size={16} className="text-[#ECE5D5]" />
                          </button>
                          <span className="text-[#ECE5D5]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-[#ECE5D5]/20 flex items-center justify-center hover:bg-[#ECE5D5]/10"
                          >
                            <Plus size={16} className="text-[#ECE5D5]" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#F7EC73] font-medium">€{(item.wine.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#0D1C1F] p-6 rounded-lg sticky top-24">
              <h2 className="font-display text-xl text-[#ECE5D5] mb-6">{t('summary.title')}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#ECE5D5]/60">
                  <span>{t('summary.subtotal')}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#ECE5D5]/60">
                  <span>{t('summary.shipping')}</span>
                  <span>€{shippingCost.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-[#ECE5D5]/10">
                  <div className="flex justify-between text-[#ECE5D5] font-medium">
                    <span>{t('summary.total')}</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#F7EC73] text-[#1A393E] font-medium py-3 rounded-lg hover:bg-[#F7EC73]/90 transition-colors duration-200">
                {t('summary.checkout')}
              </button>
              <Link
                href="/store"
                className="block text-center text-[#F7EC73] text-sm mt-4 hover:underline"
              >
                {t('summary.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 