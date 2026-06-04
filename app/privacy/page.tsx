'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[14px] text-[#52525B]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-[#A1A1AA]">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              When you use TrueSolution's website or services, we may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#71717A]">
              <li><strong className="text-[#A1A1AA]">Contact Information:</strong> Name, email address, phone number, and company name submitted via our contact form.</li>
              <li><strong className="text-[#A1A1AA]">Usage Data:</strong> Pages visited, time spent on pages, browser type, device information, and IP address.</li>
              <li><strong className="text-[#A1A1AA]">Project Information:</strong> Details about your project requirements submitted through our inquiry forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#71717A] mt-3">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Communicate about project updates, timelines, and deliverables</li>
              <li>Improve our website, services, and user experience</li>
              <li>Send relevant updates about our services (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. All data transmitted through our contact forms is encrypted using TLS/SSL protocols.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics (such as Google Analytics), hosting (Vercel), and communication.
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience.
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#71717A] mt-3">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
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
            <a href="/privacy" className="text-[11px] text-[#6366F1] font-medium">Privacy Policy</a>
            <a href="/terms" className="text-[11px] text-[#3F3F46] hover:text-[#71717A] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
