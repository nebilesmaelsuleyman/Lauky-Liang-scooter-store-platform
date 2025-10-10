// /app/api/products/route.ts
import { NextResponse } from "next/server"

import  connectDB  from "@/lib/db/connectDB"
import { createProduct } from "@/lib/services/product.service"
import Product from "@/lib/models/productModel"


export async function POST(request: Request) {
  try {
    console.log("🧭 POST /api/products hit");
    await connectDB();

    const body = await request.json();
    console.log("📦 Received JSON body:", body);

    const product = await createProduct(body);

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product", error },
      { status: 500 }
    );
  }
}

export async function GET(request:Request){
  await connectDB();
  console.log('get api is triggered ')
  const products = await Product.find({}).lean()

console.log(products)
  return new Response(JSON.stringify(products),{status:200})
}

