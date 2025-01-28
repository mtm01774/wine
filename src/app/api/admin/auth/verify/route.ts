import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const user = await verifyAuth(token);
    return NextResponse.json({ valid: true, user });
  } catch (error) {
    return NextResponse.json({ valid: false, error: (error as Error).message }, { status: 401 });
  }
} 