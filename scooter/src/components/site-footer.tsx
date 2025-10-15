"use client"

import type React from "react"
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Youtube, PhoneCall } from "lucide-react"
import { useState } from "react"

export function SiteFooter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#0D1F3C] text-white">
      
      {/* 1. Newsletter Section - Now WHITE/LIGHT background */}
      <div className="bg-[#f8f8ff] py-16 border-b border-gray-200">
        <div className="container mx-auto text-center px-4">
          <Mail className="mx-auto h-10 w-10 mb-4 text-green-600" />
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-[#0D1F3C]">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 mb-6">
            Get exclusive deals and updates on the latest scooters
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // Input styling adjusted for light background
              className="flex-1 border-gray-300 text-gray-800 placeholder:text-gray-400"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-500 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Content - Applied Gradient from transparent to deep blue */}
      <div 
        className="container mx-auto py-16 px-4"
        style={{
          // Gradient starts transparent (so the light background shows through) and ends in the solid deep blue.
          backgroundImage: `linear-gradient(to bottom, rgba(13, 31, 60, 0.0) 0%, #0D1F3C 100%)`
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/Logo (Lucky liang)-2.png"
                alt="Company Logo"
                width={180}
                height={40}
                priority
              />
            </Link>
            <p className="text-white/70 mb-4 text-sm">
              Premium electric scooters for modern urban living. Quality, performance, and style.
            </p>
            <div className="flex space-x-4">
              {[Youtube, Facebook, Instagram, Twitter].map((Icon, idx) => (
                <Link key={idx} href="#" className="text-white/70 hover:text-green-500 transition-colors">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/products" className="hover:text-green-500 transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-green-500 transition-colors">Categories</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-green-500 transition-colors">Featured</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Service</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/service/support" className="hover:text-green-500 transition-colors">Customer Support</Link></li>
              <li><Link href="/faq" className="hover:text-green-500 transition-colors">Service Center</Link></li>
              <li><Link href="/shipping" className="hover:text-green-500 transition-colors">Find A Store</Link></li>
              <li><Link href="/returns" className="hover:text-green-500 transition-colors">Returns</Link></li>
              <li><Link href="/service/warranty" className="hover:text-green-500 transition-colors">Warrenty</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/aboutus" className="hover:text-green-500 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-6">
        <div className="container mx-auto text-center text-white/70 text-sm">
          © {new Date().getFullYear()} ScootHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}