import Product, { Product as ProductType } from "@/lib/models/productModel"
import Category from "@/lib/models/categoryModel"
import { ProductLean } from "@/lib/types/product"

import connectDB from '@/lib/db/connectDB'


type ProductData = {
  product: ProductLean
  category: any
  relatedProduct: ProductLean[]
}

export async function getAllproducts(): Promise<ProductLean[]> {
  await connectDB();

  try {
    // Fetch ALL products, sorting them by creation date
    const products = await Product.find()
      .sort({ createdAt: -1 }) 
      .lean<ProductLean[]>();

    // Serialize the array for API safety
    const serializedProducts = JSON.parse(JSON.stringify(products));

    return serializedProducts as ProductLean[];
  } catch (error) {
    console.error("Error in getAllProducts service:", error);
    throw new Error("Failed to retrieve all products from the database.");
  }
}


// Create new product
export async function createProduct(data: any) {
  await connectDB()
  const product = new Product({
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    compareAtPrice: data.compareAtPrice,
    category: data.category,
    stock: data.stock,
    isActive: data.isActive,
    isFeatured: data.isFeatured,
    images: data.images,
    specifications: data.specifications || {},
  })

  await product.save()
  return product
}


export async function getProductBySlug(
  slug: string
): Promise<ProductData | null> {
  await connectDB()
  const product = await Product.findOne({ slug }).lean<ProductLean>()
  if (!product) return null

  const category = await Category.findOne({slug:product.category}).lean()

  const relatedProduct = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  })
    .limit(3)
    .lean<ProductLean>()

  const relatedProductsArray: ProductLean[] = Array.isArray(relatedProduct) 
    ? relatedProduct 
    : [] 

   const result = { 
    product: product as ProductLean, 
    category: category ?? null, 
    relatedProduct: relatedProductsArray
  }
  return JSON.parse(JSON.stringify(result))as ProductData
}

export async function getFeaturedProducts(): Promise<ProductLean[]> {

 await connectDB();
  try {
    
    const products = await Product.find({ isFeatured: true })
      .limit(6) 
      .sort({ createdAt: -1 }) 
      .lean<ProductLean[]>();

   
    const serializedProducts = JSON.parse(JSON.stringify(products));

    return serializedProducts as ProductLean[];
  } catch (error) {
    console.error("Error in getFeaturedProducts service:", error);
    
    throw new Error("Failed to retrieve featured products from the database.");
  }
}