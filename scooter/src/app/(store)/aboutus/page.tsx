"use client"

import React from "react" // Import React explicitly
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Heart, Leaf, Bike } from "lucide-react"
import {SiteFooter} from '@/components/site-footer'
import {SiteHeader} from '@/components/site-header'

export default function AboutPage() {
  return (
    // Updated main wrapper to dark background
    <div className="flex flex-col min-h-screen bg-gray-950">
      <SiteHeader/>
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden border-b border-green-700/50">
        <img
          src="/images/commuter-electric-scooter-city.jpg"
          alt="LuckyLiang E-Bikes"
          // Replaced 'fill' with standard image classes for full coverage
          className="absolute inset-0 w-full h-full object-cover opacity-30" 
          
        />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-xl text-white">
            Think Green Ride Green.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light">
            Redefining urban mobility through innovation, joy, and sustainability.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Our Core Beliefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Bike className="mx-auto h-10 w-10 mb-4 text-green-400" />,
                title: "Mission",
                text: "To make daily commuting effortless, speedy, eco-friendly, and fun.",
              },
              {
                icon: <Leaf className="mx-auto h-10 w-10 mb-4 text-green-400" />,
                title: "Vision",
                text: "To make high quality e-bikes accessible to all.",
              },
              {
                icon: <Heart className="mx-auto h-10 w-10 mb-4 text-green-400" />,
                title: "Values",
                text: "Joy • Diversity • Community • Sustainability.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`
                  relative p-6 rounded-2xl transition-all duration-500 border border-gray-700
                  bg-gray-800 text-white 
                  hover:bg-gray-700 hover:shadow-green-700/50 // Dark mode hover shadow
                  hover:shadow-xl hover:scale-105 group
                `}
              >
                <CardContent className="text-center">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    {/* Company Story */}
<section className="py-24 bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Text Content */}
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-500 hover:bg-gray-700/70 hover:scale-[1.02]">
      <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">
        About <span className="text-green-400">LuckyLiang</span>
      </h2>
      <p className="text-gray-300 mb-3 leading-relaxed text-[15px]">
        At LuckyLiang, we believe green mobility should be effortless, fun, and within everyone’s reach.
      </p>
      <p className="text-gray-300 mb-3 leading-relaxed text-[15px]">
        Born from a team of passionate riders and innovators, we build e-scooters that turn everyday rides into eco-friendly adventures.
      </p>
      <p className="text-gray-300 leading-relaxed text-[15px]">
        From our UAE headquarters, we design, craft, and deliver scooters that redefine modern movement — one ride at a time.
      </p>
    </div>

    {/* Image Side */}
    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.03] transition-transform duration-500 border-2 border-gray-700">
      <img
        src="/images/fast-performance-electric-scooter.jpg"
        alt="LuckyLiang factory and riders"
        // Replaced 'fill' with standard image classes for full coverage
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
  </div>
</section>


      {/* Why Choose LuckyLiang */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Why Choose LuckyLiang?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Effortless Commuting",
                text: "Say goodbye to delays, traffic jams, and crowded rides. With LuckyLiang, commuting becomes effortless, speedy, and fun.",
              },
              {
                title: "Quality, Fair Price",
                text: "Our vertically integrated process allows us to deliver top-tier performance and reliability at competitive prices.",
              },
              {
                title: "Community & Support",
                text: "From your first ride onward, you’re part of a diverse, global family. Our team and community are always here to support you.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`
                  relative p-6 rounded-2xl transition-all duration-500 border border-gray-700
                  bg-gray-800 text-white 
                  hover:bg-gray-700 hover:shadow-green-500/50 // Dark mode hover shadow
                  hover:shadow-xl hover:scale-105 group
                `}
              >
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3 text-green-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-gray-800 text-center relative overflow-hidden border-t border-b border-green-700/50">
        <div className="absolute inset-0 bg-[url('/images/community-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Users className="mx-auto h-12 w-12 text-green-400 mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-white">
            We’re More Than a Brand — We’re a Movement
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            LuckyLiang is about life-long connections and shared adventures. Join our global
            e-bike community to share your moments, learn from others, and explore the many
            ways people ride green across the world.
          </p>
          <Button
            size="lg"
            className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/50"
          >
            Join Our Community <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Contact / Feedback Section */}
      <section className="py-16 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-white">Let’s Grow Together</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            LuckyLiang is a young, evolving brand that grows with your ideas. Share your
            thoughts anytime — we love hearing from you.
          </p>
          <Button
            variant="outline"
            size="lg"
            asChild
            // Inverted the outline button colors for dark mode
            className="border-green-600 text-green-400 hover:bg-green-900/40 hover:text-green-300 transition-colors"
          >
            <a href="#">support@luckyliang.com</a>
          </Button>
        </div>
      </section>
      <SiteFooter/>
    </div>
  )
}
