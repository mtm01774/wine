import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
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
    console.error('Detailed error:', error);
    
    // Check if it's a Prisma error
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to load cart items',
          details: error.message,
          name: error.name
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