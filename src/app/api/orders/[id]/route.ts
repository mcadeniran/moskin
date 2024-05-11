import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const order = await db.order.findFirst({
    where: {
      id,
    },
    include: {
      PaymentResult: true,
    },
  });

  if (
    userSession.user.isAdmin === true ||
    order?.userId === userSession.user.id
  ) {
    return NextResponse.json(order);
  }

  return NextResponse.json(
    { success: false, message: 'Unauthorized' },
    { status: 401 }
  );
}
