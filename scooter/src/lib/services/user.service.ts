// lib/services/userService.ts
import bcrypt from "bcryptjs";
import User, { IUser } from "@/lib/models/userModel";
import connectDB from "@/lib/db/connectDB";



    
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

