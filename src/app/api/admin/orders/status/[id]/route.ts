import { auth } from '@/auth';
import { db } from '@/lib/db';
import { OrderStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userSession = await auth();
  const stat = params.id;

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
      where: {
        status:
          stat === 'PENDING'
            ? 'PENDING'
            : stat === 'PROCESSING'
            ? 'PROCESSING'
            : stat === 'SHIPPED'
            ? 'SHIPPED'
            : stat === 'DELIVERED'
            ? 'DELIVERED'
            : stat === 'CANCELLED'
            ? 'CANCELLED'
            : 'REJECTED',
      },
      include: { User: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unknown Error' },
      { status: 500 }
    );
  }
}
