// lib/authOptions.ts
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodbClient";
import CredentialsProvider from "next-auth/providers/credentials";

import { login} from '@/lib/services/user.service'
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session:{strategy: "jwt" as SessionStrategy}, // or "database" depending on your preference
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          console.log("login fail: missing email or password in credentials")
          return null
        }
        const loggedInuser= await login(credentials)
        console.log("logged in user form authoptions",loggedInuser)
        return loggedInuser
      
      },
    }),
    // You can add OAuth providers here (Google, GitHub) if needed
  ],
  pages: {
    signIn: "/auth/signin",
    // optionally error, signOut, verifyRequest...
  },
  secret: process.env.NEXTAUTH_SECRET,
};
