'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  quantity: number;
  wine: {
    id: string;
    translations: {
      locale: string;
      name: string;
      description: string;
    }[];
    region: string;
    price: number;
    image: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (wineId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  // Atualiza o total sempre que os itens mudarem
  useEffect(() => {
    const newTotal = items.reduce((total, item) => total + (item.quantity || 0), 0);
    setTotalItems(newTotal);
  }, [items]);

  async function loadCartItems() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/cart');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to load cart items');
      }
      
      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      console.error('Error loading cart items:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCartItems();
  }, []);

  const addToCart = async (wineId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wineId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      await loadCartItems(); // Recarrega os itens após adicionar
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      await loadCartItems(); // Recarrega os itens após remover
    } catch (err) {
      console.error('Error removing item:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      await loadCartItems(); // Recarrega os itens após atualizar quantidade
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 