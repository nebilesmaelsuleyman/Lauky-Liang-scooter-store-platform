import { NextResponse } from "next/server"
import { createCategory, getAllCategories } from "@/lib/services/catogories.service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const category = await createCategory(body)
    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    )
  } catch (error) {
    console.error("❌ Error creating category:", error)
    return NextResponse.json(
      { message: "Failed to create category", error },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const categories = await getAllCategories()
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching categories:", error)
    return NextResponse.json(
      { message: "Failed to fetch categories", error },
      { status: 500 }
    )
  }
}
