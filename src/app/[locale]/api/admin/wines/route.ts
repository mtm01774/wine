import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const wines = await prisma.wine.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { translations, ...wineData } = data;

    // Parse numeric fields with fallbacks
    const parsedWineData = {
      ...wineData,
      price: Number(wineData.price) || 0,
      stock: Number(wineData.stock) || 0,
      year: Number(wineData.year) || new Date().getFullYear(),
      rating: 0, // Default rating for new wines
      image: wineData.image || ''
    };

    // Validate required fields
    if (!parsedWineData.type || !parsedWineData.region) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create wine with translations
    const wine = await prisma.wine.create({
      data: {
        ...parsedWineData,
        translations: {
          create: Object.entries(translations || {}).map(([locale, trans]: [string, any]) => ({
            locale,
            name: trans.name || '',
            description: trans.description || ''
          }))
        }
      },
      include: {
        translations: true
      }
    });

    return NextResponse.json(wine);
  } catch (error) {
    console.error('Error creating wine:', error);
    return NextResponse.json(
      { error: 'Error creating wine: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, translations, ...wineData } = data;

    // Parse numeric fields with fallbacks
    const parsedWineData = {
      ...wineData,
      price: Number(wineData.price) || 0,
      stock: Number(wineData.stock) || 0,
      year: Number(wineData.year) || new Date().getFullYear()
    };

    // First update the wine
    const wine = await prisma.wine.update({
      where: { id },
      data: parsedWineData
    });

    // Then update translations
    if (translations) {
      for (const [locale, trans] of Object.entries(translations)) {
        await prisma.wineTranslation.upsert({
          where: {
            wineId_locale: {
              wineId: id,
              locale
            }
          },
          create: {
            wineId: id,
            locale,
            name: (trans as any).name || '',
            description: (trans as any).description || ''
          },
          update: {
            name: (trans as any).name || '',
            description: (trans as any).description || ''
          }
        });
      }
    }

    // Get updated wine with translations
    const updatedWine = await prisma.wine.findUnique({
      where: { id },
      include: {
        translations: true
      }
    });

    return NextResponse.json(updatedWine);
  } catch (error) {
    console.error('Error updating wine:', error);
    return NextResponse.json(
      { error: 'Error updating wine: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 