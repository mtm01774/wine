import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar os itens do carrinho com os vinhos relacionados
    const cartItems = await prisma.cartItem.findMany({
      include: {
        wine: {
          include: {
            translations: true
          }
        }
      }
    });

    return NextResponse.json({ items: cartItems });
  } catch (error) {
    console.error('Error loading cart items:', error);
    return NextResponse.json(
      { error: 'Failed to load cart items' },
      { status: 500 }
    );
  }
} 