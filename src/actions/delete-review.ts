'use server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export const deleteReview = async (id: string, userId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const existingReview = await db.review.findUnique({
    where: { id },
  });

  if (!existingReview) {
    return { error: 'Review does not exist!' };
  }

  if (existingReview.userId !== userId) {
    return { error: 'Unauthorized. Only review owner can delete!' };
  }

  await db.review.delete({
    where: { id },
  });

  return { success: 'Review deleted successfully.' };
};
