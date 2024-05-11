import { auth } from '@/auth';
import { db } from '@/lib/db';
import { getAddressDeliveryPrice } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const payload = await req.json();

    const items: CartItem[] = payload.items;
    const shippingAddress: ShippingAddress = payload.deliveryAddress;
    const paymentMethod: string = payload.paymentMethod;

    const dbProductPrices = await db.product.findMany({
      where: {
        id: {
          in: items.map((x) => x.id),
        },
      },
      select: {
        price: true,
        onSale: true,
        off: true,
        id: true,
      },
    });

    items.forEach((item) => {
      const it = dbProductPrices.find((prod) => prod.id === item.id);
      if (it?.onSale === false) {
        item.price = it.price;
      } else {
        item.price = it!.price * (1 - it!.off! / 100);
      }
    });
    const itemsPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const shippingPrice = getAddressDeliveryPrice(
      shippingAddress.country,
      shippingAddress.state
    );
    const totalPrice = itemsPrice + shippingPrice;

    const newOrder = await db.order.create({
      data: {
        userId: userSession.user.id!,
        items,
        shippingAddress: shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
        status: 'Not Paid',
      },
    });

    return NextResponse.json(
      { success: true, message: 'Order has been created', order: newOrder },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, message: 'unknown' },
      { status: 500 }
    );
  }
}
