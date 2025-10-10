import {NextResponse} from 'next/server'
import {getProductBySlug, updateProduct,deleteProduct} from '@/lib/services/product.service'
import connectDB from "@/lib/db/connectDB";

export async function Get(request:Request,{params}:{params:{slug:string}}){
    try{
      await connectDB()
        const product = await getProductBySlug(params.slug)
        if(!product){
            return NextResponse.json({error:"product not found"},{status:404})  
        }
        return NextResponse.json(product)
    }catch(error){
        console.error({error:'Failed to fetch product'})
    }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const product = await updateProduct(params.id, body)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const success = await deleteProduct(params.id)
    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}