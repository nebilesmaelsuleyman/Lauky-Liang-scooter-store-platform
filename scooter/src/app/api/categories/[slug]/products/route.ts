// app/api/categories/[slug]/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategorySlug } from '@/lib/services/catogories.service'; // Import your service

/**
 * Handles GET requests to fetch all products for a given category slug.
 * URL: /api/categories/[slug]/products
 */
export async function GET(
  request: NextRequest,
  // The 'params' object contains the dynamic slug segment
  { params }: { params: { slug: string } } 
) {
  const categorySlug = params.slug;

  if (!categorySlug) {
    return NextResponse.json({ message: 'Category slug is required' }, { status: 400 });
  }

  try {
    // Call your service function
    const result = await getProductsByCategorySlug(categorySlug);

    // Check if the service returned no products (e.g., slug was invalid)
    if (!result.products || result.products.length === 0) {
      // You can return 404 if the slug didn't match a category, or 200 with an empty array.
      // Returning 200 with an empty array is often safer for APIs.
      if (!result.categoryName) {
         return NextResponse.json(
            { message: `Category with slug "${categorySlug}" not found.` },
            { status: 404 }
        );
      }
    }
    
    // Success: Return the products and category name
    return NextResponse.json({
        categoryName: result.categoryName,
        products: result.products,
    });

  } catch (error) {
    console.error('API Error fetching products by slug:', error);
    return NextResponse.json(
      { message: 'Internal server error while fetching products.' },
      { status: 500 }
    );
  }
}