import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from '@/schemas';
import { db } from './lib/db';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validadteFields = LoginFormSchema.safeParse(credentials);

        if (validadteFields.success) {
          const { emailAddress, password } = validadteFields.data;

          const user = await db.user.findUnique({
            where: { email: emailAddress },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  // secret: process.env.AUTH_SECRET,
  // trustHost: true,
} satisfies NextAuthConfig;
