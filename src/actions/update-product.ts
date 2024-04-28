'use server';

import * as z from 'zod';

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { ProductFormSchema } from '@/schemas';

export const updateProduct = async (
  values: z.infer<typeof ProductFormSchema>,
  id: string
) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (user.isAdmin === false) {
    return { error: 'Unauthorized' };
  }

  const existingProduct = await db.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    return { error: 'Unknown product!' };
  }

  const uniqueName = await db.product.count({
    where: {
      name: values.name,
      NOT: {
        id: id,
      },
    },
  });

  if (uniqueName > 0) {
    return { error: 'Product name already in use' };
  }

  await db.product.update({
    where: { id },
    data: {
      name: values.name,
      description: values.description,
      price: values.price,
      categoryId: values.category,
      features: values.features,
      ingredients: values.ingredients,
      onSale: values.sale,
      off: values.off,
      images: values.images,
      display: values.display,
    },
  });

  return { success: 'Product updated successfully.' };
};
