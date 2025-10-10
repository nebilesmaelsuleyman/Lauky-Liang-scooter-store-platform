import connectDB from '@/lib/db/connectDB'
import CategoryModel, { Category } from "@/lib/models/categoryModel"
import Product from '@/lib/models/productModel'
import  {ProductLean} from '@/lib/types/product'
type CategoryLeanArray = Category[];


export async function createCategory(
  category: Omit<Category, "_id" | "createdAt" | "updatedAt">
): Promise<Category> {
  await connectDB()

  const now = new Date()
  const newCategory = new CategoryModel({
    ...category,
    createdAt: now,
    updatedAt: now,
    isActive: true,
  })

  await newCategory.save()
  return newCategory
}

export async function getAllCategories(): Promise<Category[]> {
  // 1. Fetch all documents and use .lean() for performance
  const categories = await CategoryModel.find().lean<Category[]>();
  const serializedCategories = JSON.parse(JSON.stringify(categories));
  
  
  return serializedCategories as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await CategoryModel.findOne({ slug })
    .select('name slug description')
    .lean<Category>();
    
  if (!category) return null;

  // Ensure the data is serializable for Next.js
  return JSON.parse(JSON.stringify(category)) as Category;
}

export async function getProductsByCategorySlug(slug: string): Promise<ProductLean[]> {
  // This service requires finding the products that reference the category by its slug/name.
  // Assuming your Product model's 'category' field stores the category SLUG/NAME string.
  const products = await Product.find({ category: slug })
    .limit(100) // Example limit
    .lean<ProductLean[]>();

  // Ensure the data is serializable for Next.js
  return JSON.parse(JSON.stringify(products)) as ProductLean[];
}