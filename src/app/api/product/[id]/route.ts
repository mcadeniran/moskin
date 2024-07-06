import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  let canComment = false;
  const userSession = await auth();
  const userId = userSession?.user.id;

  const id = request.url.slice(request.url.lastIndexOf('/') + 1);

  if (userSession) {
    const orders: any[] = await db.order.findMany({
      where: {
        userId,
        status: 'DELIVERED',
      },
    });

    orders.forEach((order) => {
      order.items.forEach((item: CartItem) => {
        const itm = item;

        if (itm.id === id) {
          canComment = true;
        }
      });
    });
  }

  const reviews = await db.review.findMany({
    where: {
      productId: id,
    },
    include: {
      User: true,
    },
  });

  const product = await db.product.findFirst({
    where: {
      id: id,
    },
    include: {
      Category: true,
    },
  });

  return NextResponse.json({ product, reviews, canComment });
}
