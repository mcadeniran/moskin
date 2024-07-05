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

  const users = await db.user.findMany();

  if (!users) {
    return { error: 'No user found' };
  }

  return { success: 'Users found', users: users, status: 200 };
};
