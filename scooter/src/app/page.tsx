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
import AutoImageSlider from '@/components/AuthoImageSlider'
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
        <section className="relative bg-[#0D1F3C] text-white min-h-[80vh] flex items-center">
      {/* Background Gradient for Depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0D1F3C]/90 to-[#0D1F3C]/60" />

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 gap-10 py-20">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-green-500">Ride the Future</span> <br />
            of Urban Mobility
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            Discover premium electric scooters designed for modern commuters. Elegant design meets high performance in every ride.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Link href="/products">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-medium"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-green-700 hover:bg-white hover:text-[#0D1F3C] font-medium"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 relative w-full max-w-lg min-h-[400px] md:min-h-[500px]">
           <AutoImageSlider />
        </div>

      </div>
    </section>
  

         {/* Features Section */}
       <section className="py-24 md:py-32 bg-gray-50 dark:bg-zinc-900 min-h-[50vh]">
  <div className="container px-4 md:px-6">
    {/* Optional: Add a title/heading for the section if it doesn't already have one */}
    {/* <div className="text-center mb-16 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
        Why Choose Our <span className='text-green-600 dark:text-green-500'>Electric Boards</span>?
      </h2>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Experience the next generation of personal transportation.
      </p>
    </div> */}

    <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
      {/* Card 1: High Performance */}
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-zinc-700">
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center shadow-md">
            <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            High <span className='text-green-600 dark:text-green-400'>Performance</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Powerful motors delivering speeds up to 40 mph with exceptional range. Experience the thrill of power.
          </p>
        </div>
      </div>

      {/* Card 2: Built to Last (Durability) */}
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-zinc-700">
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center shadow-md">
            <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            <span className='text-green-600 dark:text-green-400'>Built to</span> Last
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Premium materials and rigorous testing ensure unparalleled durability and safety for every ride.
          </p>
        </div>
      </div>

      {/* Card 3: Eco Friendly */}
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-zinc-700">
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center shadow-md">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Eco <span className='text-green-600 dark:text-green-400'>Friendly</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Zero emissions and an energy-efficient design contribute to a cleaner, greener tomorrow.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

         {/* Featured Products */}
        <section className="py-8 p-8 bg-gradient-to-b">
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
        <section className="relative py-28">
  <img
    src="/images/all-terrain-electric-scooter.jpg"
    alt="Scooters in city"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative container mx-auto text-center text-white px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Commute?</h2>
    <p className="text-lg mb-8 text-white/90">
      Join thousands of satisfied riders who have upgraded their daily travel.
    </p>
    <Link href="/products">
      <Button size="lg" variant="secondary" className="bg-green-600 hover:bg-green-500">
        Start Shopping
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
</section>
  
        </main>
        <SiteFooter/>
        </div>
    
  )
}
