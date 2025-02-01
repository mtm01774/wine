import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const region = searchParams.get('region');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');

    // Build where clause based on filters
    const where: any = {
      AND: []
    };

    if (type && type !== 'todos') {
      where.AND.push({ type });
    }

    if (region && region !== 'todas') {
      where.AND.push({ region });
    }

    if (minPrice || maxPrice) {
      where.AND.push({
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined
        }
      });
    }

    if (minRating) {
      where.AND.push({
        rating: {
          gte: Number(minRating)
        }
      });
    }

    // If no filters, remove AND clause
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const wines = await prisma.wine.findMany({
      where,
      include: {
        translations: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ wines });
  } catch (error) {
    console.error('Error fetching wines:', error);
    return NextResponse.json(
      { error: 'Error fetching wines' },
      { status: 500 }
    );
  }
} 