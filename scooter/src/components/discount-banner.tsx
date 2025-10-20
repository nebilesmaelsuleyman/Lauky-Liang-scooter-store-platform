'use client'

import { useState } from "react";
import { X } from "lucide-react"
import {Button} from '@/components/ui/button'
export function DiscountBanner({
    title='LuckyLiang Discount',
    description= 'Enjoy a special offer on all products',
    discountPercentage='10'
}){

    const [isVisble ,setVisible]= useState(true)
    if(!isVisble)return null

    return (
        <div className="relative bg-accent text-accent-foreground">
      <div className="container py-3">
        <div className="flex items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium">
            <span className="font-bold">{title}:</span> {description} - Get up to {discountPercentage}% off on all scooters!
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
    )
}