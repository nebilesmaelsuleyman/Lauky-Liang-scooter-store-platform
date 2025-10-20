import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/services/product.service'; 
export async function GET() {
  try {
    const featuredProducts = await getFeaturedProducts();
    return NextResponse.json(featuredProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to retrieve featured products for the homepage.' }, 
      { status: 500 }
    );
  }
}