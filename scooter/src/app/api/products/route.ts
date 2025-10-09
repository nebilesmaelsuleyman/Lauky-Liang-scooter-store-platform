// /app/api/products/route.ts
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import  connectDB  from "@/lib/db/connectDB"
import { createProduct } from "@/lib/services/product.service"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(request: Request) {
  try {
    console.log("🧭 POST /api/products hit")

    await connectDB()
    console.log("✅ Database connected")

    const formData = await request.formData()
    console.log("📦 Received form data")

    // Extract text fields
    const fields: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      if (key !== "images") {
        fields[key] = value
      }
    }

    console.log("🧩 Fields parsed:", fields)

    // Handle image uploads
    const files = formData.getAll("images") as File[]
    const uploadedUrls: string[] = []

    for (const file of files) {
      console.log("🚀 Uploading:", file.name)
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
          .end(buffer)
      })

      console.log("✅ Uploaded to Cloudinary:", uploadResult.secure_url)
      uploadedUrls.push(uploadResult.secure_url)
    }

    // Save product to MongoDB
    const productData = {
      ...fields,
      images: uploadedUrls,
    }

    console.log("💾 Saving product:", productData)

    const product = await createProduct(productData)
    console.log("✅ Product created successfully:", product._id)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
