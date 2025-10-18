import { NextRequest, NextResponse } from 'next/server';
import { deleteCategoryBySlug } from '@/lib/services/catogories.service'; // Import your service


type Params = { params: { slug: string } };
export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = params;
  if (!slug) {
    console.log("no slug")
    return NextResponse.json({ success: false, message: "Missing slug" }, { status: 400 });
  }
  const result = await deleteCategoryBySlug(slug);
  if (!result.success) {
    console.log('result of delete in the api',result)
    return NextResponse.json(result, {
      status: result.message === "Category not found" ? 404 : 500,
    });
  }
  return NextResponse.json(result, { status: 200 });
}