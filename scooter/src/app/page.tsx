import {SiteHeader} from '@/components/site-header'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {DiscountBanner} from '@/components/discount-banner'
import { Card, CardContent } from '@/components/ui/card'
export default function Home() {
  
  return (
    <div className="min-h-screen flex flex-col">

    <DiscountBanner
      title='spring sales'
      description='limited time offer'
      discountPercentage='10'
    />
      <SiteHeader />

      <main className="flex-1">
         {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
               <span className='text-green-700'>Ride the Future</span>  of Urban Mobility
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
       
        </main>
        </div>
    
  )
}