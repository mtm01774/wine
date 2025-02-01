import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  try {
    console.log('Fetching cart items...');
    
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

    console.log('Cart items fetched:', cartItems);
    return NextResponse.json({ items: cartItems });
  } catch (error) {
    console.error('Detailed error:', error);
    
    // Check if it's a Prisma error
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to load cart items',
          details: error.message,
          name: error.name,
          stack: error.stack
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to load cart items',
        details: 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 