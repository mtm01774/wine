import { NextResponse } from 'next/server';
import { createInitialUser } from '@/lib/auth';

export async function POST() {
  try {
    console.log('=== Starting initial user setup ===');
    const user = await createInitialUser();
    console.log('Initial user setup completed successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
    return NextResponse.json({ message: 'Initial user setup completed' });
  } catch (error) {
    console.error('Error in initial user setup:', error);
    return NextResponse.json(
      { message: 'Error creating initial user' },
      { status: 500 }
    );
  }
} 