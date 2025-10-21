
import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/services/product.service";
import connectDB from "@/lib/db/connectDB";


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    
    if (!id || id === "undefined") {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const updateData = await request.json();

    let updatedProduct;
    try {
      updatedProduct = await updateProduct(id, updateData);
    } catch (err: any) {
      console.error("MongoDB update error:", err);
      return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
    }

    if (!updatedProduct) {
      return NextResponse.json({ message: "No product found with this ID" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("PATCH handler error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "No product found to delete" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
