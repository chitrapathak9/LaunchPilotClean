import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="container-narrow bg-white border border-gray-200 rounded-[2rem] p-8 md:p-16 shadow-sm">
          
          <div className="mb-12 border-b border-gray-100 pb-8">
            <h1 className="heading-display text-ink-900 mb-4">Privacy Policy</h1>
            <p className="text-ink-500 text-[1.125rem]">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-10 text-ink-600 text-[1.0625rem] leading-relaxed">
            
            <section>
              <h2 className="heading-lg text-ink-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Launch AI Pilot. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website, engage with our services, and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">2. The Data We Collect</h2>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-ink-700">
                <li><strong className="text-ink-900">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong className="text-ink-900">Contact Data:</strong> includes email address, billing address, and telephone numbers.</li>
                <li><strong className="text-ink-900">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong className="text-ink-900">Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">3. How We Use Your Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-ink-700">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., to provide agency services).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">4. Data Sharing & Disclosure</h2>
              <p className="mb-4">
                We do not sell your personal data. We may share your data with trusted third-party service providers solely to operate our Service (e.g., payment processing, cloud hosting, client communication platforms). We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">6. Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
            </section>

            <section>
              <h2 className="heading-lg text-ink-900 mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, including any requests to exercise your legal rights, please contact us using the details set out below:
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
