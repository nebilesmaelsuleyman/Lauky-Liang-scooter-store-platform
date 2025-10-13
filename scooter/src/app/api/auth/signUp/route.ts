// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/lib/models/userModel";
import {signup} from '@/lib/services/user.service'


export async function POST(req: Request) {
  try{
const { name, email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });


  const existing = await User.findOne({ email }).lean();
  if (existing) return NextResponse.json({ error: "User exists" }, { status: 409 });

  const newUser= await signup({name ,email, password})
  return NextResponse.json({ success: true, id: newUser.id.toString() ,name:newUser.name ,email:newUser.email}, { status: 201 });
} catch (error) {
    console.error('Signup error:', error);
    
    // Check for specific errors thrown by the service
    if (error instanceof Error && (error as any).status === 409) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    
    // Handle generic errors (like database connection issues, hashing failure, etc.)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}