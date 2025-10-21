// lib/authOptions.ts
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodbClient";
import CredentialsProvider from "next-auth/providers/credentials";

import { login} from '@/lib/services/user.service'
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session:{strategy: "jwt" as SessionStrategy}, 
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
   
  ],
  pages: {
    signIn: "/auth/signin",
   
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks:{
    async jwt({token, user}:any){
      if(user){
        token.id= user._id?.toString?.()|| user.id

      }
      return token

    },
    async session({session, token}:any){
      if(token && session.user){
        session.user.id= token.id as string
      }
      return session
    }

  }
};
