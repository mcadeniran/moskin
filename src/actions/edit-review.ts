'use server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export const editReview = async (
  id: string,
  userId: string,
  details: string
) => {
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
    return { error: 'Unauthorized. Only review owner can edit!' };
  }

  const res = await db.review.update({
    where: { id: id },
    data: { details: details, edited: true },
  });

  return { success: 'Review updated successfully.', data: res };
};
