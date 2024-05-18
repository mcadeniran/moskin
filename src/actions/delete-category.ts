'use server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export const deleteCategory = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (user.isAdmin === false) {
    return { error: 'Unauthorized' };
  }

  const existingCategory = await db.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    return { error: 'Category does not exist!' };
  }

  await db.category.delete({
    where: { id },
  });

  return { success: 'Category deleted successfully.' };
};
