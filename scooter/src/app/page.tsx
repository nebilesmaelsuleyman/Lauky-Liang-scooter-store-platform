"use client"

import {SiteHeader} from '@/components/site-header'
import {SiteFooter} from '@/components/site-footer'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap ,Truck} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DiscountBanner } from "@/components/discount-banner"
import { Card, CardContent } from '@/components/ui/card'
import {ProductCard} from '@/components/product-card'
import {CategoryCard} from '@/components/category-card'
import { useEffect, useState } from 'react' // <-- Add hooks
import { Product } from "@/lib/models/productModel" // <-- Add type
import { Category } from "@/lib/models/categoryModel" // <-- Add type

export default function Home() {
  // 1. State for real data, replacing mock data initialization
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [displayCategories, setDisplayCategories] = useState<Category[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([]) // Needed for product card category lookup
  const [isLoading, setIsLoading] = useState(true)
  
  // 2. Data Fetching Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // A. Fetch Featured Products (using the dedicated API route)
        const featuredRes = await fetch('/api/products/featured-products')
        const featuredData = await featuredRes.json()
        setFeaturedProducts(featuredData)

        // B. Fetch ALL Categories (using the API route)
        const categoriesRes = await fetch('/api/categories')
        const categoriesData = await categoriesRes.json()
        
        // Store all categories for product card lookup
        setAllCategories(categoriesData); 
        // Display only the first 4 for the category grid section, matching the old mock slice
        setDisplayCategories(categoriesData.slice(0, 4)) 

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [])

  // 3. Loading State
  if (isLoading) {
    // Keeping this simple loading state for user feedback while data loads
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-primary">Loading the store data...</p>
        </div>
    );
  }
  

  return (
     
    <div className="min-h-screen flex flex-col  ">

        <DiscountBanner
              title='spring sales'
              description='limited time offer'
              discountPercentage='10'
            />
      <SiteHeader />
      <main className="flex-1  container">
         {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground min-h-[80vh] md:min-h-[60vh] sm:min-h-[20vh] items-center">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-xl text-center ">
              <h1 className="font-sanserif text-4xl md:text-6xl font-bold mb-6 text-balance">
               <span className='text-green-700  '>Ride the Future </span>  of Urban Mobility
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-pretty">
                Discover premium electric scooters designed for the modern commuter. Performance meets elegance in every
                ride.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-green-700 hover:bg-green-600 ">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

         {/* Features Section */}
        <section className="py-20 bg-muted/30 min-h-[60vh] md:min-h-[35vh] sm:min-h-[27vh] items-center ">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold">High <span className='text-green-700'>Performance</span> </h3>
                  <p className="text-muted-foreground">
                    Powerful motors delivering speeds up to 40 mph with exceptional range.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold"><span className='text-green-700'>Built to</span> Last</h3>
                  <p className="text-muted-foreground">
                    Premium materials and rigorous testing ensure durability and safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold">Eco <span className='text-green-700'>Friendly</span> </h3>
                  <p className="text-muted-foreground">
                    Zero emissions and energy-efficient design for a greener tomorrow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

         {/* Featured Products */}
        <section className="py-8 p-8">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2"> Top Scooters</h2>
                <p className="text-muted-foreground">Our most popular models loved by riders</p>
              </div>
              <Link href="/products">
                <Button variant="secondary">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Using the fetched featuredProducts state */}
              {featuredProducts.map((product) => (
                <ProductCard
                  key={String(product._id)}
                  id={String(product._id)}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.images[0]}
                  // Lookup category name from the fetched allCategories state
                  category={allCategories.find((c) => c._id === product.category)?.name || ""}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect scooter for your lifestyle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Using the fetched displayCategories state */}
              {displayCategories.map((category) => (
                <CategoryCard
                  key={String(category._id)}
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          </div>
        </section>
        
            {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commute?</h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Join thousands of satisfied riders who have upgraded their daily travel
              </p>
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>    
        </main>
        <SiteFooter/>
        </div>
    
  )
}
