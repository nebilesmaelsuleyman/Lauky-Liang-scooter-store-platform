"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Heart, Leaf, Bike } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-700 text-white overflow-hidden">
        <Image
          src="/images/blackscooter.webp"
          alt="LuckyLiang E-Bikes"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Think Green Ride Green.
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Redefining urban mobility through innovation, joy, and sustainability.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Our Core Beliefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Bike className="mx-auto h-10 w-10 mb-4 text-green-600" />,
                title: "Mission",
                text: "To make daily commuting effortless, speedy, eco-friendly, and fun.",
              },
              {
                icon: <Leaf className="mx-auto h-10 w-10 mb-4 text-green-600" />,
                title: "Vision",
                text: "To make high quality e-bikes accessible to all.",
              },
              {
                icon: <Heart className="mx-auto h-10 w-10 mb-4 text-green-600" />,
                title: "Values",
                text: "Joy • Diversity • Community • Sustainability.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`
                  relative p-6 rounded-2xl transition-all duration-500 border border-white/20
                  bg-white/10 backdrop-blur-md hover:text-black
                     hover:shadow-green-200
                  hover:shadow-xl hover:scale-105 group
                `}
              >
                <CardContent className="text-center text-gray-800 group-hover:text-gray-700">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    {/* Company Story */}
<section className="py-20 bg-gradient-to-b from-white to-green-50">
  <div className="max-w-8xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12  items-center">
    {/* Text Content */}
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 transition-all duration-500 hover:bg-gradient-to-b hover:from-white hover:to-green-200/40 hover:scale-[1.02]">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
        About <span className="text-green-600">LuckyLiang</span>
      </h2>
      <p className="text-gray-700 mb-3 leading-relaxed text-[15px]">
        At LuckyLiang, we believe green mobility should be effortless, fun, and within everyone’s reach.
      </p>
      <p className="text-gray-700 mb-3 leading-relaxed text-[15px]">
        Born from a team of passionate riders and innovators, we build e-scooters that turn everyday rides into eco-friendly adventures.
      </p>
      <p className="text-gray-700 leading-relaxed text-[15px]">
        From our UAE headquarters, we design, craft, and deliver scooters that redefine modern movement — one ride at a time.
      </p>
    </div>

    {/* Image Side */}
    <div className="relative h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.03] transition-transform duration-500">
      <Image
        src="/images/blackscooter.webp"
        alt="LuckyLiang factory and riders"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  </div>
</section>


      {/* Why Choose LuckyLiang */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
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
                  relative p-6 rounded-2xl transition-all duration-500 border border-white/20
                  bg-white/10 backdrop-blur-md hover:text-black
                     hover:shadow-green-200
                  hover:shadow-xl hover:scale-105 group
                `}
              >
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3 text-green-700 group-hover:text-green-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-green-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/community-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Users className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            We’re More Than a Brand — We’re a Movement
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
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
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Let’s Grow Together</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            LuckyLiang is a young, evolving brand that grows with your ideas. Share your
            thoughts anytime — we love hearing from you.
          </p>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-green-600 text-green-700 hover:bg-green-100"
          >
            <a href="#">support@luckyliang.com</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
