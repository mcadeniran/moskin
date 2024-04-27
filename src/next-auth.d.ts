import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  isAdmin: boolean;
  username: string;
  image: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

import { JWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT {
    isAdmin: boolean;
    username: string;
    image: string;
  }
}
