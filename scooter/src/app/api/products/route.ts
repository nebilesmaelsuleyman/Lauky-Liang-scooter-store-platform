
import { NextResponse } from "next/server"
import { createProduct, getAllproducts} from "@/lib/services/product.service"
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await createProduct(body);

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {

    return NextResponse.json(
      { message: "Failed to create product", error },
      { status: 500 }
    );
  }
}

export async function GET(request:Request){
  const products = await  getAllproducts()
  return new Response(JSON.stringify(products),{status:200})
}

