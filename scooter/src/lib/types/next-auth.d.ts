import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodbClient";
import CredentialsProvider from "next-auth/providers/credentials";

// NOTE: Ensure your 'login' function is correctly typed to return a NextAuth.User object
import { login } from '@/lib/services/user.service';

import type { AuthOptions, SessionStrategy, User } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" as SessionStrategy },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // loggedInuser should be of type NextAuth.User with 'id' and 'role' properties
        const loggedInuser = await login(credentials);
        
        // If authorization is successful, return the user object (now correctly typed)
        return loggedInuser as User | null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    // Note: TypeScript now automatically recognizes the custom properties on token and user
    async jwt({ token, user, trigger }) {
      if (user) {
        // user object is only present on first sign-in
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // token properties are transferred to the session object for client-side use
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
};
