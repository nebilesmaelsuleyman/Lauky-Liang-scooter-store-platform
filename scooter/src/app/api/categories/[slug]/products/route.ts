
import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategorySlug, deleteCategoryBySlug } from '@/lib/services/catogories.service'; // Import your service


export async function GET(
  request: NextRequest,
  
  { params }: { params: { slug: string } } 
) {
  const categorySlug = params.slug;

  if (!categorySlug) {
    return NextResponse.json({ message: 'Category slug is required' }, { status: 400 });
  }

  try {
    
    const result = await getProductsByCategorySlug(categorySlug);

    
    if (!result.products || result.products.length === 0) {
      
      if (!result.categoryName) {
         return NextResponse.json(
            { message: `Category with slug "${categorySlug}" not found.` },
            { status: 404 }
        );
      }
    }
    
   
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

