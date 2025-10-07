import {SiteHeader} from '@/components/site-header'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap ,Truck} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import {ProductCard} from '@/components/product-card'
import { mockProducts, mockCategories, } from "@/lib/db/placeholders"
import {CategoryCard} from '@/components/category-card'

export default function Home() {
   const featuredProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 3)
  const displayCategories = mockCategories.slice(0, 4)
  

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 ">
         {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground min-h-[82vh] ">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-xl text-center">
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
        <section className="py-20 bg-muted/30 min-h-[60vh] items-center ">
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
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.images[0]}
                  category={mockCategories.find((c) => c._id === product.category)?.name || ""}
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
              {displayCategories.map((category) => (
                <CategoryCard
                  key={category._id}
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
        </div>
    
  )
}