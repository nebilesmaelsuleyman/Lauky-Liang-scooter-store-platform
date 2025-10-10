import Product, { Product as ProductType } from "@/lib/models/productModel"
import Category from "@/lib/models/categoryModel"
import { ProductLean } from "@/lib/types/product"

import connectDb from '@/lib/db/connectDB'


type ProductData = {
  product: ProductLean
  category: any
  relatedProduct: ProductLean[]
}

export async function getAllproducts(): Promise<ProductType[] > {
  return await Product.find({ isActive: true })
}

// Create new product
export async function createProduct(data: any) {
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
  await connectDb()
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
