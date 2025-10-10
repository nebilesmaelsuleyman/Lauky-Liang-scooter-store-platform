import connectDB from '@/lib/db/connectDB'
import CategoryModel, { Category } from "@/lib/models/categoryModel"


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
  await connectDB()
  return CategoryModel.find().lean() as unknown as Category[]
}