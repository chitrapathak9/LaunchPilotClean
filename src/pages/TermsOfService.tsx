import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';

export function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="container-narrow bg-white border border-gray-200 rounded-[2rem] p-8 md:p-16 shadow-sm">
          
          <div className="mb-12 border-b border-gray-100 pb-8">
            <h1 className="heading-display text-ink-900 mb-4">Terms of Service</h1>
            <p className="text-ink-500 text-[1.125rem]">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-10 text-ink-600 text-[1.0625rem] leading-relaxed">
            
            <section>
              <h2 className="heading-lg text-ink-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the services provided by Launch AI Pilot ("we," "our," or "us"), including our website and custom software development services (the "Service"), you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p>
                If you do not agree to these Terms, do not use our Service. These Terms apply to all visitors, clients, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">2. Description of Services</h2>
              <p className="mb-4">
                Launch AI Pilot operates as an elite software engineering and AI automation agency. We provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-ink-700">
                <li><strong className="text-ink-900">Custom Software Development:</strong> SaaS platforms, MVP development, Web Portals, and Mobile Applications.</li>
                <li><strong className="text-ink-900">AI & Automation:</strong> Autonomous AI agents, LLM integrations, and custom CRM/ERP development.</li>
                <li><strong className="text-ink-900">Consulting & Architecture:</strong> Technical discovery, UI/UX design, and architectural mapping.</li>
              </ul>
              <p>
                The specifics of any engagement, including deliverables, timelines, and costs, will be outlined in a separate Master Services Agreement (MSA) or Statement of Work (SOW) executed between Launch AI Pilot and the client.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">3. Client Obligations</h2>
              <p className="mb-4">
                To ensure the successful delivery of our services, clients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-ink-700">
                <li>Provide timely and accurate information, feedback, and approvals as requested by our team.</li>
                <li>Ensure they have the legal right to share any proprietary data, assets, or third-party APIs provided to us for the project.</li>
                <li>Designate a primary point of contact authorized to make binding decisions regarding the project.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                <strong className="text-ink-900">Our Content:</strong> The Launch AI Pilot website, branding, design, and marketing materials are owned by us and protected by intellectual property laws.
              </p>
              <p className="mb-4">
                <strong className="text-ink-900">Client Deliverables:</strong> Upon full payment of all undisputed invoices related to a specific Statement of Work, Launch AI Pilot assigns to the client all rights, title, and interest in the custom software deliverables created specifically for them, excluding any pre-existing background technology, open-source components, or general-purpose code libraries which we retain ownership of (but grant a license to use).
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">5. Confidentiality</h2>
              <p className="mb-4">
                Both parties agree to hold in strict confidence any proprietary or confidential information disclosed during the course of the relationship. This includes business strategies, source code, financial data, and trade secrets. Confidential information will not be disclosed to third parties without prior written consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, Launch AI Pilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to your use of our Services. 
              </p>
              <p>
                Our total liability in any matter arising out of or related to these Terms or a specific engagement is limited to the amount paid by you to Launch AI Pilot for the services giving rise to the claim during the 12 months preceding the event.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">7. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising from or relating to the subject matter of these Terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, India.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">8. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4 font-mono text-[0.9375rem] text-ink-700 shadow-sm">
                <p className="mb-2">📧 <span className="text-ink-400 w-24 inline-block font-sans">Email:</span> launchpilotai41@gmail.com</p>
                <p className="mb-2">🌐 <span className="text-ink-400 w-24 inline-block font-sans">Website:</span> <a href="/contact" className="hover:text-cobalt-600 transition-colors underline">launchaipilot.com/contact</a></p>
                <p>📍 <span className="text-ink-400 w-24 inline-block font-sans">Address:</span> Ahmedabad, India</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <LaunchFooter />
    </div>
  );
}
