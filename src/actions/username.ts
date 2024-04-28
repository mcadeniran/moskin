'use server';

import * as z from 'zod';

import { db } from '@/lib/db';
import { UsernameSchema } from '@/schemas';
import { auth } from '@/auth';

export const username = async (values: z.infer<typeof UsernameSchema>) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const usernameExists = await db.user.findUnique({
    where: { username: values.username },
  });

  if (usernameExists) {
    return { error: 'Username already taken!' };
  }

  await db.user.update({
    where: { id: user.id },
    data: { ...values },
  });

  return { success: 'Username Updated.' };
};
