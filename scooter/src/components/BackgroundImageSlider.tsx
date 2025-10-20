'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ImageItem {
  src: string
  alt?: string
  cta?: string
  link?: string
}

interface FullBackgroundSliderProps {
  images: ImageItem[]
  interval?: number
}

const FullBackgroundSlider: React.FC<FullBackgroundSliderProps> = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          aria-hidden={index !== currentImageIndex}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt || `Slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />

          
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/40 via-transparent to-transparent">
            {image.link && (
              <Link
                href={image.link}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
              >
                {image.cta || 'Order Now'}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FullBackgroundSlider
