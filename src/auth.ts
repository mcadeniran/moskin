import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from './lib/db';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.image = token.image;
      }

      if (session.user) {
        session.user.isAdmin = token.isAdmin;
      }

      if (session.user) {
        session.user.username = token.username;
      }

      // console.log({ session });

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;

      token.isAdmin = existingUser.isAdmin;
      token.username = existingUser.username;
      token.image = existingUser.image;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});

// import { NextAuthOptions, getServerSession } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { db } from './db';
// import { compare } from 'bcrypt';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'youremail@mail.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }
//         const existingUser = await db.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!existingUser) {
//           return null;
//         }

//         const passwordMatch = await compare(
//           credentials.password,
//           existingUser.password
//         );

//         if (!passwordMatch) {
//           return null;
//         }

//         return {
//           id: existingUser.id,
//           email: existingUser.email,
//           isAdmin: existingUser.isAdmin,
//           username: existingUser.username,
//           image: existingUser.image,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           username: user.username,
//           isAdmin: user.isAdmin,
//           image: user.image,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           username: token.username,
//           isAdmin: token.isAdmin,
//         },
//       };
//     },
//   },
// };

// export const getAuthSession = () => getServerSession(authOptions);
