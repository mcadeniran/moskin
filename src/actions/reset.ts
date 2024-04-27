'use server';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { db } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validadteFields = ResetSchema.safeParse(values);

  if (!validadteFields.success) {
    return { error: 'Invalid email!' };
  }

  const { emailAddress } = validadteFields.data;

  const existingUser = await db.user.findUnique({
    where: { email: emailAddress },
  });

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(emailAddress);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};
