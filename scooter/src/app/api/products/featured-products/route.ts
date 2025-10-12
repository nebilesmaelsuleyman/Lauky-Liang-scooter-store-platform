import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connectDB';
// Assumes getFeaturedProducts is exported from your product service file
import { getFeaturedProducts } from '@/lib/services/product.service'; 

/**
 * Handles GET requests for the /api/featured-products path.
 * Returns ONLY products marked as featured for use on the homepage.
 */
export async function GET() {
  // Ensure the database connection is established
 
  console.log('fetching featured products')
  try {
    // 1. Fetch only featured products using the dedicated service function
    const featuredProducts = await getFeaturedProducts();
        console.log('featured product :', featuredProducts)
    // 2. Return the data as a standard JSON response
    return NextResponse.json(featuredProducts, { status: 200 });

  } catch (error) {
    console.error('API Error fetching featured products:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve featured products for the homepage.' }, 
      { status: 500 }
    );
  }
}