
import Product ,{Product as ProductType } from '@/lib/models/productModel'

import Category from "@/lib/models/categoryModel"

// get all products
export async function getAllproducts():Promise<ProductType[]>{
    return await Product.find({isActive:true})
}


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
    images: data.images, // already uploaded to Cloudinary
    specifications: data.specifications || {},
  });

  await product.save();
  return product;
}

export async function getProductBySlug(slug: string): Promise< typeof Product | null> {
  
  return Product.findOne({ slug }) // returns Mongoose Document
}