'use client'

import { useState, useEffect } from 'react'
import FullBackgroundSlider from './BackgroundImageSlider'

interface SliderImage {
  src: string
  alt: string
  link: string
  label: string
}

interface ClientOnlySliderProps {
  images: SliderImage[]
  interval: number
}

export default function ClientOnlySlider({ images, interval }: ClientOnlySliderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null 

  return <FullBackgroundSlider images={images} interval={interval} />
}
