import { NextResponse } from "next/server";
// Assuming you named your services file 'category.service' previously
import { createCategory, getAllCategories ,CategoryFormInput } from "@/lib/services/catogories.service"; 
// import { CategoryFormInput } from "@/lib/services/category.service"; // Import the input type

// Handler for POST /api/categories (CREATE CATEGORY)
export async function POST(request: Request) {
  try {
    const data: CategoryFormInput = await request.json();

    // 1. Basic Validation
    if (!data.name || !data.description) {
      return NextResponse.json(
        { message: "Name and description are required." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 2. Call the service to create the category (The service handles slug generation)
    const newCategory = await createCategory({
        name: data.name,
        description: data.description,
        // The image property is correctly included if available, otherwise it's undefined/empty
        image: data.image, 
    });

    // 3. Success Response
    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("❌ Error creating category:", error);

    // 4. Handle MongoDB Duplicate Key Error (e.g., if slug or name is already taken)
    // Mongoose duplicate key errors have a specific code (11000)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { message: "A category with this name or slug already exists." },
        { status: 409 } // 409 Conflict
      );
    }

    // 5. Generic Error Response
    return NextResponse.json(
      { message: "Failed to create category", error: (error as Error).message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}

// Handler for GET /api/categories (FETCH ALL CATEGORIES)
export async function GET() {
  try {
    // We assume getAllCategories only fetches active/public categories for the storefront
    const categories = await getAllCategories(); 
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories", error: (error as Error).message },
      { status: 500 }
    );
  }
}