
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
        if(!credentials?.email || !credentials?.password)return null

        
        const loggedInuser= await login(credentials)
        
        return loggedInuser
      
      },
    }),
   
  ],
  pages: {
    signIn: "/auth/login",
   
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks:{
    async jwt({token, user}:any){
      if(user){
        token.id= user._id?.toString?.()|| user.id
        token.role=user.role 

      }
      return token

    },
    async session({session, token}:any){
      if(token && session.user){
        session.user.id= token.id as string;
        session.user.role=token.role 
      }
      return session
    }

  }
};
