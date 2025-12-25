import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | SuchGrime',
  description: 'SuchGrime privacy policy - how we handle and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-primary">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 mb-12">
            <strong>Last Updated:</strong> December 24, 2025
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-neutral-700">
              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Overview
                </h2>
                <p className="leading-relaxed">
                  SuchGrime (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. We are committed to protecting your personal data and complying with applicable privacy laws, including GDPR and CCPA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, phone number, and company information when you contact us or request a quote</li>
                  <li>Payment information when you engage our services (processed securely through third-party payment processors)</li>
                  <li>Communications, feedback, and correspondence with us</li>
                  <li>Website usage data, including IP address, browser type, pages visited, and time spent on pages (via analytics tools)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and fulfill your requests</li>
                  <li>Send you technical notices, updates, security alerts, and support messages</li>
                  <li>Communicate with you about services, offers, and promotions (you can opt out at any time)</li>
                  <li>Analyze website usage and optimize user experience</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Data Sharing and Disclosure
                </h2>
                <p className="leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist with hosting, analytics, payment processing, and email delivery</li>
                  <li><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition (with notice to you)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Your Rights (GDPR/CCPA)
                </h2>
                <p className="leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                  <li>Opt out of marketing communications</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise these rights, contact us at{' '}
                  <a href="mailto:suchgrime@guerrillasocialclub.com" className="text-primary hover:underline">
                    suchgrime@guerrillasocialclub.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Cookies and Tracking
                </h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to analyze website traffic and improve user experience. You can control cookies through your browser settings. Disabling cookies may affect site functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Third-Party Links
                </h2>
                <p className="leading-relaxed">
                  Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Children&apos;s Privacy
                </h2>
                <p className="leading-relaxed">
                  Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our services after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Contact Us
                </h2>
                <p className="leading-relaxed">
                  For questions about this Privacy Policy or our data practices, contact us at:
                </p>
                <div className="mt-4 p-6 bg-neutral-50 border border-neutral-200">
                  <p className="font-bold text-primary mb-2">SuchGrime</p>
                  <p>Milwaukee, Wisconsin</p>
                  <p>
                    <a href="mailto:suchgrime@guerrillasocialclub.com" className="text-primary hover:underline">
                      suchgrime@guerrillasocialclub.com
                    </a>
                  </p>
                  <p>
                    <a href="tel:+14144396211" className="text-primary hover:underline">
                      (414) 439-6211
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

