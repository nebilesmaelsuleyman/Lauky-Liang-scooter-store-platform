import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | LuckyLiang",
  description:
    "Read LuckyLiang's Privacy Policy to learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen  bg-[#0D1F3C] text-white">
      

      <main className="px-6 py-12 flex justify-center">
        <div className="max-w-4xl space-y-10">
          <h1 className="text-4xl font-bold text-green-600 text-center mb-10">
            Privacy Policy
          </h1>

       
          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Overview
            </h2>
            <p className="mb-4">
              This privacy policy explains how LuckyLiang Technovation UAE LLC
              (“LuckyLiang”, “we”, “our”, or “us”) and our affiliates manage
              your personal data when you use our products and services. Please
              review this policy carefully to understand our privacy practices.
            </p>
            <p className="mb-4">
              This policy describes how we may collect, store, use, and share
              your personal data when you:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Visit our websites</li>
              <li>Place orders through our websites</li>
              <li>Download and use our iOS or Android mobile apps</li>
              <li>Use our services and devices, including IoT features</li>
              <li>
                Communicate with us via email, text, forms, or other methods
              </li>
            </ul>
            <p className="mt-4">
              This policy does not apply to third-party websites, apps, or ads.
              For any questions, contact us at{" "}
              <a
                href="mailto:support@luckyliang.com"
                className="text-green-600 underline"
              >
                luckyliangevuae.com
              </a>
              .
            </p>
          </section>

         
          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              I. How We Collect Personal Data
            </h2>

            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Information You Provide
            </h3>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email, and phone
                number for account creation.
              </li>
              <li>
                <strong>Order Information:</strong> Recipient name, address,
                phone, email, ordered items, and billing details.
              </li>
              <li>
                <strong>Payment Information:</strong> Method, card or PayPal
                details, Klarna account (if used).
              </li>
              <li>
                <strong>Customer Support:</strong> Name, contact info, related
                order/service IDs, and communication content.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-green-500 mb-2">
              Information Automatically Collected
            </h3>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                <strong>Device Information:</strong> IP address, model, OS,
                browser, and location data.
              </li>
              <li>
                <strong>Bike & IoT Data:</strong> Bike ID, battery level, usage
                logs, and ride history.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies for better experience.
                You can disable them via browser settings.
              </li>
            </ul>
          </section>

         
          <section>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              II. Legal Basis for Processing (UAE & Applicable Laws)
            </h2>
            <p className="mb-4">
              We process your personal data for specific lawful purposes,
              including contract performance, legitimate interest, and user
              consent. For questions, contact{" "}
              <a
                href="mailto:support@luckyliang.com"
                className="text-green-600 underline"
              >
                support@luckyliang.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              III. How We Use Your Data
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Deliver and personalize our services and devices</li>
              <li>Provide customer support and handle feedback</li>
              <li>Improve and develop products</li>
              <li>Ensure network security and fraud prevention</li>
              <li>
                Send marketing communications (only with your consent — you can
                opt out anytime)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              IV. How We Share Your Data
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> We share data with trusted
                third parties under contract.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or
                to protect rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> In mergers, sales, or
                restructuring events.
              </li>
            </ul>
          </section>

       
          <section>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              V. Data Security & Retention
            </h2>
            <p>
              We use security measures to protect your data. Data is kept only
              as long as necessary for service delivery or legal compliance, and
              securely deleted or anonymized afterward.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              VI. Your Rights
            </h2>
            <p className="mb-4">
              You have the right to access, correct, erase, or restrict
              processing of your personal data, and to object to marketing or
              withdraw consent.
            </p>
            <p>
              Contact{" "}
              <a
                href="mailto:support@luckyliang.com"
                className="text-green-500 underline"
              >
                support@luckyliang.com
              </a>{" "}
              to exercise your rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-500">
              VII. Children’s Privacy
            </h2>
            <p>
              Our services are not intended for children under 16. We do not
              knowingly collect their data.
            </p>

            <h2 className="text-2xl font-semibold text-green-500">
              VIII. International Transfers
            </h2>
            <p>
              Your data may be processed outside your country, including China.
              We use safeguards like Standard Contractual Clauses where
              required.
            </p>

            <h2 className="text-2xl font-semibold text-green-500">
              IX. Updates to this Policy
            </h2>
            <p>
              We may update this policy periodically. The latest version will
              always be available on our website.
            </p>

            <h2 className="text-2xl font-semibold text-green-500">
              X. Contact
            </h2>
            <p>
              For privacy questions, reach us at{" "}
              <a
                href="mailto:support@luckyliang.com"
                className="text-green-500 underline"
              >
                support@luckyliang.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
