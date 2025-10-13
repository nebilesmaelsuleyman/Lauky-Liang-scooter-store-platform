import { NextResponse } from "next/server";

import { login } from '@/lib/services/user.service';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

 
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing email or password" }, 
        { status: 400 }
      );
    }


    const loggedInUser = await login({ email, password });

    if (!loggedInUser) {
       
        return NextResponse.json(
            { success: false, error: "Invalid email or password" },
            { status: 401 }
        );
    }

   
    return NextResponse.json(
        { 
            success: true, 
            data: loggedInUser 
        }, 
        { status: 200 }
    );
    
  } catch (error) {
    
    console.error('API Error in login:', error);
    
   
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}
