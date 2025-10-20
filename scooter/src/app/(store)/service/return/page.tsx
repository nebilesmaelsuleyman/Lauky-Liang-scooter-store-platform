import Link from "next/link"

export const metadata = {
  title: "Return & Refund Policy | LuckyLiang",
  description:
    "Learn about LuckyLiang's return, refund, and exchange policy for online purchases.",
}

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0D1F3C] text-white">
      <main className="px-6 py-12 flex justify-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
            Return & Refund Policy
          </h1>

          
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              1. Overview
            </h2>
            <p className="mb-4">
              1.1 If you are a consumer purchasing from our official website
              <span className="text-green-400"> luckyliang.com </span> and are
              not buying our product(s) for business, trade, or professional
              use, you have the right to return products without giving a
              reason.
            </p>
            <p className="mb-4">
              1.2 We offer a 14-day return window from the date you receive your
              item.
            </p>
            <p className="mb-4">
              1.3 To be eligible for a return, the product must be unused, in
              its original packaging with tags, and accompanied by proof of
              purchase. If you do not have the original packaging, we can
              provide one for approximately{" "}
              <span className="text-green-400">600 AED</span>. We strongly
              advise keeping the original packaging for at least 14 days.
            </p>
            <p className="mb-4">
              1.4 You must notify LuckyLiang customer service within 14 days of
              receiving the product to start a return. Returns not requested or
              approved by customer service will not be accepted.
            </p>
            <p className="mb-4">
              1.5 Depending on your location in the GCC, we may request you to
              send back the product via courier, drop it at a specified
              location, or hand it over to a carrier arranged by us. You must
              follow the instructions provided by our customer service team.
            </p>
            <p className="mb-4">
              1.6 Return shipping costs are your responsibility. Depending on
              the situation, we may deduct shipping costs from your refund if we
              arrange the return shipping.
            </p>
            <p>
              1.7 For return inquiries, please contact us at{" "}
              <a
                href="mailto:support@luckyliang.com"
                className="text-green-400 underline"
              >
                support@luckyliang.com
              </a>
              .
            </p>
          </section>

        
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              2. Damages and Issues
            </h2>
            <p>
              2.1 Inspect your order upon delivery and notify us within 24 hours
              if the item is defective, damaged, or incorrect so we can address
              the issue.
            </p>
          </section>

         
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              3. Exceptions / Non-Returnable Items
            </h2>
            <p className="mb-4">
              3.1 Used products and gifted orders cannot be returned unless
              faulty.
            </p>
            <p>3.2 We do not accept returns for items on sale.</p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              4. Exchanges
            </h2>
            <p>
              4.1 If you want a different item, return the original product
              (following the return process) and place a new order once
              approved.
            </p>
          </section>

        
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              5. Refunds
            </h2>
            <p className="mb-4">
              5.1 We inspect returned products for damage, wear, or missing
              parts. Any reduction in value will be deducted from the refund.
            </p>
            <p>
              5.2 Refunds are processed within 14 days of receiving the returned
              item or proof of return. We will refund via the original payment
              method, minus any deductions, and you will not be charged
              additional fees.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
