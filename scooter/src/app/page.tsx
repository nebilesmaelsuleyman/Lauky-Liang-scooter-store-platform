import {SiteHeader} from '@/components/site-header'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap ,Truck} from 'lucide-react'
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

      <main className="flex-1 ">
         {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground min-h-[82vh] ">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-xl text-center">
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
        </main>
        </div>
    
  )
}