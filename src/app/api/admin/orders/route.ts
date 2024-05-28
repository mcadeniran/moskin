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

export async function PATCH(req: Request) {
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

  const body = await req.json();

  if (body.type === 'SHIPPED') {
    try {
      await db.order.update({
        where: { id: body.id },
        data: {
          status: 'SHIPPED',
        },
      });
      return NextResponse.json(
        { success: true, message: 'Order status set to SHIPPED' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Something went wrong' },
        { status: 500 }
      );
    }
  } else if (body.type === 'REJECTED') {
    try {
      await db.order.update({
        where: { id: body.id },
        data: {
          status: 'REJECTED',
          reason: body.reason,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Order has been rejected' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Something went wrong while rejecting' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
