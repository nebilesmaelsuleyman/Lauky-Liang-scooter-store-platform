import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { CategoryCard } from "@/components/category-card"
import {getAllCategories} from '@/lib/services/catogories.service'


interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const categories = await getAllCategories();
    return categories as Category[];
};


export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="flex  min-h-screen flex-col bg-[#0D1F3C]/90 text-white mb-10">
      
      <DiscountBanner />
      <SiteHeader/>

      <main className="flex-1 ">
        <div className="container px-10 mb-24 ">
          <div className="mb-16 ">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">Browse Categories</h1>
            <p className="text-white/70">Find the perfect scooter for your lifestyle and needs</p>
          </div>

          
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12 text-white/70">
              <p>No categories available</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}