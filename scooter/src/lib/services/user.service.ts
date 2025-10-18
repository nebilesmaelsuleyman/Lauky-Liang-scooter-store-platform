// lib/services/userService.ts
import bcrypt from "bcryptjs";
import User, { IUser } from "@/lib/models/userModel";
import connectDB from "@/lib/db/connectDB";
import { NextResponse } from 'next/server'


interface CustomerDetails {
  customerName: string;
  customerEmail: string;
}

    
  export async function signup(data: { name: string; email: string; password: string }) {
    await connectDB();

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }


  export async function login(data: { email: string; password: string }) {
    await connectDB();

    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(data.password, user.password!);
    console.log("service: password comparison reslt",isValid)
    if (!isValid) {
      console.error("sevice Fail: invalid password")
      return null
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }


export async function getAllUsers() {
  // Ensure the database connection is established
  await connectDB();

  try {
    
    const users = await User.find().lean();

    if (!users || users.length === 0) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    
    
    return NextResponse.json(
      { ok: false, message: 'Failed to retrieve users due to a server error.' },
      { status: 500 }
    );
  }
}

export async function updateUser(id: string, data: any) {
  await connectDB();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      data, 
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('Error updating user:', error);

    const status = (error as any).name === 'ValidationError' ? 400 : 500;
    
    return NextResponse.json(
      { message: 'Failed to update user due to a server error.' },
      { status: status }
    );
  }
}

export async function getCustomerDetails(userId: string): Promise<CustomerDetails | null> {
    await connectDB();
    
    try {
        const user = await User.findById(userId)
            .select('name email')
            .lean<IUser>(); 
            
        if (!user) {
            return null;
        }

        return user
            ? { customerName: user.name ?? "", customerEmail: user.email ?? "" }
            : null;

    } catch (error) {
        console.error("Failed to fetch user details for order creation:", error);
        return null;
    }
}