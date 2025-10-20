"use client"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-3xl font-bold text-green-500 mb-6">Terms of Service</h1>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">1) Overview</h2>
          <p className="mb-4">
            1.1 This website is operated by LuckyLiang Technovation UAE. The terms “we”, “us” and “our” refer to LuckyLiang.
            We provide this website and its services conditioned upon your acceptance of all terms here.
          </p>
          <p className="mb-4">
            1.2 By using our site or purchasing from us, you agree to these Terms of Service. They apply to all users of the site.
          </p>
          <p className="mb-4">
            1.3 If you do not agree to the Terms, you may not use this site.
          </p>
          <p className="mb-4">
            1.4 We may update these Terms anytime. Your continued use after changes means you accept them.
          </p>
          <p className="mb-4">
            1.5 Our store is hosted on WordPress, providing us the online e-commerce platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">2) Online Store Terms</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be of legal age or have permission from a guardian to use this site.</li>
            <li>You must not use our services for illegal purposes or violate any UAE laws.</li>
            <li>No viruses or harmful code may be transmitted.</li>
            <li>Breach of these terms will result in immediate termination of services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">3) General Conditions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We may refuse service at any time.</li>
            <li>Your non-card data may transfer unencrypted over networks. Card data is always encrypted.</li>
            <li>You may not reproduce or exploit any part of our service without written permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">4) Accuracy of Information</h2>
          <p>We do not guarantee accuracy or timeliness of site content. Historical info is for reference only. We may change content at any time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">5) Modifications to Service and Prices</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Product prices may change without notice.</li>
            <li>We may modify or discontinue the service at any time.</li>
            <li>We are not liable for any such modifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">6) Products or Services</h2>
          <p>
            Products may be limited and subject to our Return Policy. We offer a 2-year warranty (5 years for frames) against manufacturing defects.
            Product images are as accurate as possible, but we can’t guarantee screen accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">19) Governing Law</h2>
          <p>These Terms are governed by the laws of the United Arab Emirates.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">21) Contact Information</h2>
          <p>Questions? Email us at <span className="text-green-400">support@luckyliangev.com</span></p>
        </section>
      </main>
    </div>
  )
}
