'use client'
import {SiteFooter} from '@/components/site-footer'
import Link from 'next/link'

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#0D1F3C] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0B1A30] py-6 shadow-md">
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">LuckyLiang</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-white hover:text-green-400 transition">
              Home
            </Link>
            <Link href="/warranty" className="text-green-400 font-semibold">
              Warranty
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 md:px-10 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl font-bold text-green-400 mb-6">Warranty Policy</h2>

          {/* Overview Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold border-b border-green-500 pb-2">1 Overview</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-200">
              <li>If you are a consumer purchasing directly from luckyliang.com and not in the course of business, you are entitled to a 1-year limited warranty against manufacturing defects, valid within GCC countries only.</li>
              <li>The 1-year warranty covers electronic parts and non-wear components, including motor, controller, sensor, battery, etc. Frame warranty is 1 year.</li>
              <li>The warranty excludes consumables, wear and tear, unauthorized parts, misuse, neglect, alterations, improper assembly, extreme riding, water damage, and unauthorized repairs.</li>
              <li>Warranty is void if you modify the product, including using third-party apps to change motor settings.</li>
              <li>Warranty applies only to LuckyLiang-branded products sold through our official store. For other purchases, contact your local dealer.</li>
              <li>For detailed component warranty periods, contact <a href="mailto:support@luckyliang.com" className="text-green-400 underline">support@luckyliang.com</a>.</li>
            </ol>
          </section>

          {/* Process Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold border-b border-green-500 pb-2">2 Process</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-200">
              <li>Contact LuckyLiang customer service to begin a warranty claim, provide proof of purchase, description, and images/videos. Stop using the product during the process.</li>
              <li>We may guide self-repair, direct you to a service point, or request return shipment.</li>
              <li>Unauthorized repairs void the warranty.</li>
            </ol>
          </section>

          {/* Important Notice Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold border-b border-green-500 pb-2">3 Important Notice</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-200">
              <li>Riding a bicycle involves risks of injury or worsening health conditions. By using a LuckyLiang product, you assume all such risks.</li>
              <li>You acknowledge inherent hazards in bicycle use. You agree to hold LuckyLiang harmless from claims, costs, and liabilities arising from your use of the product. You assume all risk and responsibility for any loss, damage, or injury, including death, resulting from use, operation, or care of the bicycle.</li>
            </ol>
          </section>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter/>
    </div>
  )
}
