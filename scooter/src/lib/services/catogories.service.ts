import connectDB from '@/lib/db/connectDB';

import CategoryModel from '@/lib/models/categoryModel';
import Product from '@/lib/models/productModel';
import slugify from 'slugify';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  
}

export interface CategoryFormInput {
  name: string;
  description: string;
  image?: string; 
}

export async function createCategory(data: CategoryFormInput): Promise<Category> {
  await connectDB();


  const baseSlug = slugify(data.name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await CategoryModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const newCategory = new CategoryModel({
    name: data.name,
    slug: slug,
    description: data.description,
    image: data.image || '',
    isActive: true,
  });

  await newCategory.save();


  const serializedCategory = JSON.parse(JSON.stringify(newCategory.toObject()));
  return serializedCategory as Category;
}

export async function getAllCategories(): Promise<Category[]> {
  await connectDB()
  const categories = await CategoryModel.find().lean<Category[]>();
  const serializedCategories = JSON.parse(JSON.stringify(categories));
  return serializedCategories as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await connectDB()
  const category = await CategoryModel.findOne({ slug })
    .select('name slug description')
    .lean<Category>();
    
  if (!category) return null;

  return JSON.parse(JSON.stringify(category)) as Category;
}

export async function getProductsByCategorySlug(slug: string) {
  await connectDB();
  const category = await CategoryModel.findOne({ slug }).lean<Category>();

  if (!category) {
    return { products: [], categoryName: null };
  }


  const products = await Product.find({ category: category._id }).lean<Product[]>();
  
  return { 

    products: JSON.parse(JSON.stringify(products)) as Product[], 
    categoryName: category.name 
  };
}

export interface CategoryWithCount extends Category {
  image: string;
  productCount: number;
}

export async function getAdminCategoriesWithCount(): Promise<CategoryWithCount[]> {
  await connectDB();


  const productCounts = await Product.aggregate([
    {
      $group: {
       
        _id: "$category", 
        count: { $sum: 1 },
      },
    },
  ]);


  const countMap = productCounts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {} as Record<string, number>);


 
  const categories = await CategoryModel.find()
    .select('name slug description image isActive createdAt updatedAt')
    .sort({ name: 1 })
    .lean<Category[]>();
  
  
 
  const categoriesWithCount = categories.map(c => ({
    ...c,

    productCount: countMap[c.slug as string] || 0,
  }));


  return JSON.parse(JSON.stringify(categoriesWithCount)) as CategoryWithCount[];
}


export async function deleteCategoryBySlug(slug: string) {
  try {
    await connectDB();

    const deletedCategory = await CategoryModel.findOneAndDelete({ slug });

    if (!deletedCategory) {
      return { success: false, message: "Category not found" };
    }

    return {
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    };
  } catch (error: any) {
    console.error("Error deleting category by slug:", error);
    return { success: false, message: "Server error", error: error.message };
  }
}