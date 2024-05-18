import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (userSession.user.isAdmin === false) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const order = await db.order.findMany({
      include: { User: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unknown Error' },
      { status: 500 }
    );
  }
}
