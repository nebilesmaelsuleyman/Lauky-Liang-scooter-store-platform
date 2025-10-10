import {NextResponse} from 'next/server'
import {getProductBySlug,} from '@/lib/services/product.service'
import connectDB from "@/lib/db/connectDB";


export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB()
    const data = await getProductBySlug(params.slug)
    if (!data) return NextResponse.json({ message: "Product not found" }, { status: 404 })

    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ Error in GET /api/products/[slug]", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


