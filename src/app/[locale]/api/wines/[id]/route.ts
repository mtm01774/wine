import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching wine with ID:', params.id);

    const wine = await prisma.wine.findUnique({
      where: {
        id: params.id // ID is a string in the schema
      },
      include: {
        translations: true
      }
    });

    if (!wine) {
      console.log('Wine not found with ID:', params.id);
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      );
    }

    console.log('Wine found:', wine);
    return NextResponse.json(wine);
  } catch (error) {
    console.error('Error fetching wine:', error);
    return NextResponse.json(
      { error: 'Error fetching wine', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 