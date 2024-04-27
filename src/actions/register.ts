'use server';

import * as z from 'zod';
import { hash } from 'bcryptjs';

import { RegisterFormSchema } from '@/schemas';
import { db } from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validadteFields = RegisterFormSchema.safeParse(values);

  if (!validadteFields) {
    return { error: 'Invalid fields!' };
  }

  const { email, username, password } = validadteFields.data!;

  const hashedPasseword = await hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const existingUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUsername) {
    return { error: 'Username already in use!' };
  }

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPasseword,
    },
  });

  return { success: 'User created! Please login' };
};
