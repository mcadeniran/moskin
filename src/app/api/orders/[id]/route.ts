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

export async function PATCH(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const body = await request.json();

  console.log(body);
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const payload = body;
    const orderId = payload.id;
    const paymentId = payload.ref;

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentId,
        paidAt: new Date(),
        isPaid: true,
      },
    });
    return NextResponse.json(
      { success: true, message: 'Payment Recieved' },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, message: 'Unknown error occured' },
      { status: 500 }
    );
  }
}
