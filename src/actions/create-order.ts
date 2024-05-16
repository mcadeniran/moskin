'use server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { getAddressDeliveryPrice } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';

export const createOrder = async (data: any) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (user.isAdmin === false) {
    return { error: 'Unauthorized' };
  }

  try {
    const payload = data;

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
        userId: user.id!,
        items,
        shippingAddress: shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
      },
    });
    return {
      success: 'Order has been created',
      data: newOrder.id,
      status: 201,
    };
  } catch (e) {
    console.log(e);
    return { error: 'Unknown error occured!', data: e };
  }
};
