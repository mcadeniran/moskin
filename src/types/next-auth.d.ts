import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    image: string;
    isAdmin: boolean;
  }
  interface Session {
    user: User & {
      username: string;
      image: string;
      isAdmin: boolean;
    };
    token: {
      username: string;
      image: string;
      isAdmin: boolean;
    };
  }
}
