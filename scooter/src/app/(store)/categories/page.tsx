// import { SiteHeader } from "@/components/site-header"
// import { SiteFooter } from "@/components/site-footer"
// import { DiscountBanner } from "@/components/discount-banner"
import { CategoryCard } from "@/components/category-card";
import { getAllCategories } from "@/lib/services/catogories.service";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    // Note: The actual implementation of getAllCategories is assumed to be correct
    const categories = await getAllCategories();
    return categories as Category[];
};

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    return (
        
        <div className="flex min-h-screen flex-col text-gray-800 pb-14"> 
            <main className="flex-1">
                <div className="container mx-auto px-6 md:px-12 mt-12 lg:mt-20">
                    <div className="mb-8 md:mb-12"> 
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">
                           
                            Explore Our Categories
                        </h1>
                        <p className="text-lg text-gray-600">
                            Find the perfect ride tailored to your urban commuting lifestyle.
                        </p>
                    </div>

                    {categories.length > 0 ? (
                       
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                        <div className="text-center py-20 bg-gray-50 rounded-lg text-gray-500">
                            <p className="text-xl">No categories available to display at this time.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}