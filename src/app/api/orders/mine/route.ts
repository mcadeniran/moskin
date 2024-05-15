import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    const myOrders = await db.order.findMany({
      where: { userId: userSession.user.id! },
    });

    return NextResponse.json(myOrders);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unknown error' },
      { status: 500 }
    );
  }
}
