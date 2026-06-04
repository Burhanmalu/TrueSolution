'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#09090B]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center group transition-transform duration-300 hover:scale-[1.02]">
            <img src="/logo.png" alt="TrueSolution Logo" className="h-20 md:h-24 lg:h-28 w-auto object-contain" />
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-[13px] font-medium text-[#71717A] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-6 pt-40 pb-20">
        <div className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6366F1] mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[14px] text-[#52525B]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-[#A1A1AA]">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using TrueSolution's website and services, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Services</h2>
            <p>
              TrueSolution provides professional software development services including but not limited to web application development,
              mobile app development, SaaS product engineering, AI/ML integration, UI/UX design, and cloud infrastructure management.
              Specific terms for individual projects are outlined in separate Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#71717A] mt-3">
              <li>Provide accurate and complete project requirements</li>
              <li>Respond to queries and review deliverables within agreed timelines</li>
              <li>Provide necessary access credentials, assets, and content for project execution</li>
              <li>Make payments according to the agreed schedule</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>
              Upon full payment, all custom code, designs, and deliverables created specifically for your project will be transferred to you.
              TrueSolution retains the right to use general frameworks, libraries, and methodologies developed independently.
              We may reference the project in our portfolio unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Payment Terms</h2>
            <p>
              Payment schedules, milestones, and amounts are defined in individual project agreements.
              Late payments may result in project delays or suspension of services.
              All fees are non-refundable unless specified in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of proprietary information shared during the course of the engagement.
              This includes business strategies, technical architectures, source code, and user data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Warranties & Disclaimers</h2>
            <p>
              TrueSolution delivers services with professional care and industry best practices. However, we do not guarantee
              specific business outcomes, revenue results, or uninterrupted availability of deployed systems.
              Post-launch support and maintenance are provided as separately agreed upon.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              TrueSolution's total liability for any claim arising from our services shall not exceed the total fees paid
              by the client for the specific project in question. We shall not be liable for indirect, incidental,
              or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
            <p>
              Either party may terminate the engagement with 30 days' written notice. Upon termination,
              the client is responsible for payment of all work completed up to the termination date.
              All deliverables completed up to that point will be transferred to the client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:True.Solution.21@gmail.com" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
                True.Solution.21@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#06060A]">
        <div className="max-w-[800px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#3F3F46]">
            &copy; {new Date().getFullYear()} TrueSolution. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-[11px] text-[#3F3F46] hover:text-[#71717A] transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-[11px] text-[#6366F1] font-medium">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
