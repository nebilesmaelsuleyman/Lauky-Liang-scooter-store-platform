import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/models/productModel";





export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newProduct = await Product.create(body);
  return NextResponse.json({ message: "Product created", product: newProduct }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}