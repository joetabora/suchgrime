import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | SuchGrime',
  description: 'SuchGrime terms of service - project terms, payment structure, and service agreements.',
}

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-neutral-600 mb-12">
            <strong>Last Updated:</strong> December 24, 2025
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-neutral-700">
              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Agreement to Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing or using SuchGrime&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. We reserve the right to modify these terms at any time, with changes effective upon posting to this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Services Provided
                </h2>
                <p className="leading-relaxed mb-4">
                  SuchGrime provides web design, development, and SEO services for small to medium-sized businesses. Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Website design, redesign, and refresh projects</li>
                  <li>E-commerce website development</li>
                  <li>Search Engine Optimization (SEO) services</li>
                  <li>Website maintenance and ongoing optimization</li>
                  <li>Custom web application development</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Project Terms
                </h2>
                
                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Scope and Timeline
                </h3>
                <p className="leading-relaxed">
                  Each project begins with a detailed scope document outlining deliverables, timeline, and cost. Project timelines are estimates and may vary based on client feedback, content availability, and complexity. We will communicate any delays promptly.
                </p>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Client Responsibilities
                </h3>
                <p className="leading-relaxed mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing timely feedback and approvals</li>
                  <li>Supplying content, images, logos, and brand assets</li>
                  <li>Access to necessary accounts (hosting, domain, analytics, etc.)</li>
                  <li>Timely payment per the agreed schedule</li>
                </ul>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Revisions
                </h3>
                <p className="leading-relaxed">
                  Each project package includes a specified number of revision rounds. Additional revisions beyond the agreed scope will be billed at our hourly rate of $150/hour. Major scope changes may require a new project agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Payment Structure
                </h2>
                
                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Project Payments
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Deposit:</strong> 50% upfront deposit required to begin work</li>
                  <li><strong>Milestone Payments:</strong> For larger projects ($7k+), payments may be split into milestones</li>
                  <li><strong>Final Payment:</strong> Remaining balance due before website launch</li>
                </ul>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Monthly Services
                </h3>
                <p className="leading-relaxed">
                  Ongoing SEO and maintenance services are billed monthly in advance. Services continue on a month-to-month basis unless canceled with 30 days&apos; notice.
                </p>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Late Payments
                </h3>
                <p className="leading-relaxed">
                  Invoices are due within 15 days of issuance. Late payments may result in project suspension and a 5% monthly late fee. We reserve the right to take down websites for non-payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Intellectual Property
                </h2>
                
                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Ownership
                </h3>
                <p className="leading-relaxed">
                  Upon full payment, clients own the final website design and custom code developed specifically for their project. SuchGrime retains rights to reusable code libraries, frameworks, and design patterns. We may showcase completed projects in our portfolio unless otherwise agreed.
                </p>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Third-Party Assets
                </h3>
                <p className="leading-relaxed">
                  Clients are responsible for licensing any third-party fonts, stock photos, plugins, or software used in their project. We will provide recommendations and guidance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## SEO and Rankings Disclaimer
                </h2>
                <p className="leading-relaxed">
                  <strong>No Guarantees:</strong> While we implement industry best practices and proven SEO strategies, we cannot guarantee specific search rankings or traffic levels. Search engines use proprietary algorithms that change frequently. Results depend on many factors including competition, content quality, and ongoing optimization.
                </p>
                <p className="leading-relaxed mt-4">
                  We provide regular reporting on SEO performance and make data-driven recommendations for improvement. Success in SEO typically requires ongoing effort over several months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Warranties and Disclaimers
                </h2>
                
                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Service Warranty
                </h3>
                <p className="leading-relaxed">
                  We warrant that services will be performed professionally and in accordance with industry standards. We will correct any defects in workmanship reported within 30 days of project completion at no charge.
                </p>

                <h3 className="text-xl font-display font-bold text-primary mb-3 mt-6">
                  ### Disclaimer of Other Warranties
                </h3>
                <p className="leading-relaxed">
                  EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL IMPLIED WARRANTIES INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  SuchGrime&apos;s total liability for any claim arising from our services shall not exceed the amount paid for those services. We are not liable for indirect, incidental, consequential, or punitive damages including lost profits or business interruption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Termination
                </h2>
                <p className="leading-relaxed">
                  Either party may terminate a project with written notice. Upon termination, client pays for work completed to date. SuchGrime will provide deliverables completed up to termination point. No refunds on deposits or work already performed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Confidentiality
                </h2>
                <p className="leading-relaxed">
                  Both parties agree to keep confidential any proprietary information shared during the project. This does not apply to information that is publicly available or independently developed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Dispute Resolution
                </h2>
                <p className="leading-relaxed">
                  Any disputes arising from these terms will first be addressed through good-faith negotiation. If unresolved, disputes will be settled through binding arbitration in Milwaukee, Wisconsin under Wisconsin law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## General Provisions
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Governing Law:</strong> These terms are governed by the laws of the State of Wisconsin</li>
                  <li><strong>Entire Agreement:</strong> These terms constitute the entire agreement between parties</li>
                  <li><strong>Severability:</strong> If any provision is unenforceable, remaining provisions remain in effect</li>
                  <li><strong>Assignment:</strong> These terms may not be assigned without written consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  ## Contact
                </h2>
                <p className="leading-relaxed">
                  Questions about these Terms of Service? Contact us:
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

