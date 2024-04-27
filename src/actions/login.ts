'use server';

import * as z from 'zod';

import { LoginFormSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validadteFields = LoginFormSchema.safeParse(values);

  if (!validadteFields) {
    return { error: 'Invalid fields!' };
  }

  const { emailAddress, password } = validadteFields.data!;

  try {
    const res = await signIn('credentials', {
      emailAddress,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
