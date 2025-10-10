// /app/api/products/route.ts
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import  connectDB  from "@/lib/db/connectDB"
import { createProduct } from "@/lib/services/product.service"
import Product from "@/lib/models/productModel"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})
export async function POST(request: Request) {
  try {
    console.log("🧭 POST /api/products hit")

    await connectDB()

    const body = await request.json()
    console.log("📦 Received JSON body:", body)

    const product = new Product({
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: body.price,
      compareAtPrice: body.compareAtPrice,
      category: body.category,
      stock: body.stock,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
      images: body.images, // already uploaded to Cloudinary
      specifications: body.specifications || {},
    })

    await product.save()

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    )
  } catch (error) {
    console.error("❌ Error creating product:", error)
    return NextResponse.json(
      { message: "Failed to create product", error },
    { status: 500 }
    )
  }
}
