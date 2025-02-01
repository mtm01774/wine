import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

export async function POST(request: Request) {
  try {
    const { wineId, quantity } = await request.json();

    // Verificar se o vinho existe
    const wine = await prisma.wine.findUnique({
      where: { id: wineId }
    });

    if (!wine) {
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      );
    }

    // Verificar se já existe um item no carrinho para este vinho
    const existingItem = await prisma.cartItem.findFirst({
      where: { wineId }
    });

    if (existingItem) {
      // Se já existe, atualiza a quantidade
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          wine: {
            include: {
              translations: true
            }
          }
        }
      });

      return NextResponse.json(updatedItem);
    }

    // Se não existe, cria um novo item
    const newItem = await prisma.cartItem.create({
      data: {
        wineId,
        quantity
      },
      include: {
        wine: {
          include: {
            translations: true
          }
        }
      }
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
} 