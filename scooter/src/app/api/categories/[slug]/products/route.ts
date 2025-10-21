import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategorySlug } from '@/lib/services/catogories.service';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // 👈 await params since it’s a Promise

  if (!slug) {
    return NextResponse.json({ message: 'Category slug is required' }, { status: 400 });
  }

  try {
    const result = await getProductsByCategorySlug(slug);

    if (!result.products || result.products.length === 0) {
      if (!result.categoryName) {
        return NextResponse.json(
          { message: `Category with slug "${slug}" not found.` },
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
