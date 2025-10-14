import { NextResponse } from "next/server";
// Assuming you named your services file 'category.service' previously
import { createCategory, getAllCategories ,CategoryFormInput } from "@/lib/services/catogories.service"; 
import connectDB from '@/lib/db/connectDB'

export async function POST(request: Request) {
  try {
    await connectDB()
    const data: CategoryFormInput = await request.json();

    
    if (!data.name || !data.description) {
      return NextResponse.json(
        { message: "Name and description are required." },
        { status: 400 } 
      );
    }
    const newCategory = await createCategory({
        name: data.name,
        description: data.description,
        image: data.image, 
    });


    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 } 
    );

  } catch (error) {
    console.error(" Error creating category:", error);

   
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { message: "A category with this name or slug already exists." },
        { status: 409 } 
      );
    }

    
    return NextResponse.json(
      { message: "Failed to create category", error: (error as Error).message },
      { status: 500 } 
    );
  }
}


export async function GET() {
  try {
     await connectDB();
    
    const categories = await getAllCategories(); 
    console.log("list of categories",categories)
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(" Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories", error: (error as Error).message },
      { status: 500 }
    );
  }
}