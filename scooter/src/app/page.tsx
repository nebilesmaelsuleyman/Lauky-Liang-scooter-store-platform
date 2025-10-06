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
       
        </main>
        </div>
    
  )
}