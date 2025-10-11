import connectDB from '@/lib/db/connectDB'
import CategoryModel, { Category } from "@/lib/models/categoryModel"
import Product from '@/lib/models/productModel'
import  {ProductLean} from '@/lib/types/product'
type CategoryLeanArray = Category[];

import slugify from 'slugify'; // You may need to install 'slugify' (npm install slugify)

// Define the input type for the creation form
export interface CategoryFormInput {
  name: string;
  description: string;
  image?: string; // Optional image URL
}

export async function createCategory(data: CategoryFormInput): Promise<Category> {
  await connectDB();

  // 1. Generate slug and ensure uniqueness
  const baseSlug = slugify(data.name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await CategoryModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  // 2. Create the new document
  const newCategory = new CategoryModel({
    name: data.name,
    slug: slug,
    description: data.description,
    image: data.image || '',
    isActive: true,
  });

  await newCategory.save();

  // 3. Serialize and return the created document
  const serializedCategory = JSON.parse(JSON.stringify(newCategory.toObject()));
  return serializedCategory as Category;
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

// src/lib/services/category.service.ts (Add this function)

// Interface for the data returned to the Admin UI
export interface CategoryWithCount extends Category {
  productCount: number;
}

export async function getAdminCategoriesWithCount(): Promise<CategoryWithCount[]> {
  await connectDB();

  // 1. Get Product Counts using Aggregation
  const productCounts = await Product.aggregate([
    {
      $group: {
        // Group by the category field (which stores the slug/name string)
        _id: "$category", 
        count: { $sum: 1 },
      },
    },
  ]);

  // Convert the aggregation result into a map for quick lookup
  // Key: category slug/name (the _id from aggregation) | Value: product count
  const countMap = productCounts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {} as Record<string, number>);


  // 2. Fetch all Categories
  const categories = await CategoryModel.find()
    .select('name slug description image isActive createdAt updatedAt')
    .sort({ name: 1 })
    .lean<Category[]>();
  
  
  // 3. Combine and serialize data
  const categoriesWithCount = categories.map(c => ({
    ...c,
    // Look up the count using the category slug/name (which is c.slug)
    productCount: countMap[c.slug as string] || 0,
  }));

  // Safely serialize and return
  return JSON.parse(JSON.stringify(categoriesWithCount)) as CategoryWithCount[];
}