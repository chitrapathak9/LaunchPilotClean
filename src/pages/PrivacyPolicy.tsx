import { useEffect } from 'react';
import { LegalPageLayout, LegalHeader, LegalSection } from './TermsOfService';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  useEffect(() => {
    document.body.style.backgroundColor = '#FAF9F6';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const toc = [
    { id: 'info-collection', label: 'Information We Collect' },
    { id: 'use-info', label: 'How We Use Your Information' },
    { id: 'data-sharing', label: 'Data Sharing & Disclosure' },
    { id: 'data-security', label: 'Data Security' },
    { id: 'your-rights', label: 'Your Privacy Rights' },
    { id: 'cookies', label: 'Cookies & Tracking' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <LegalPageLayout toc={toc}>
      <LegalHeader 
        title="Privacy Policy"
        lastUpdated="January 15, 2025"
        summary="This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from LaunchPilot."
      />

      <hr className="border-[#E2E8F0] my-10" />

      <LegalSection id="info-collection" title="1. Information We Collect">
        <p>We collect information you provide directly to us when you create an account, make a purchase, or contact support. This includes:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li><strong className="text-[#0F172A] font-bold">Personal Information:</strong> Name, email address, and billing address.</li>
          <li><strong className="text-[#0F172A] font-bold">Payment Information:</strong> Handled securely by our payment processor (Stripe). We do not store full credit card details.</li>
          <li><strong className="text-[#0F172A] font-bold">Usage Data:</strong> Information about how you interact with our website, collected automatically via cookies.</li>
        </ul>
      </LegalSection>

      <LegalSection id="use-info" title="2. How We Use Your Information">
        <p>We use the collected information for various purposes, including:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>To provide and maintain our Service</li>
          <li>To process your transactions and send related information</li>
          <li>To notify you about changes to our Service or updates to purchased skills</li>
          <li>To provide customer support</li>
          <li>To monitor the usage of our Service and improve our offerings</li>
        </ul>
      </LegalSection>

      <LegalSection id="data-sharing" title="3. Data Sharing & Disclosure">
        <p>We do not sell your personal data. We may share your data with trusted third-party service providers solely to operate our Service (e.g., payment processing via Stripe, transactional emails via SendGrid/Resend).</p>
        <p>We may also disclose your information if required by law or to protect our legal rights.</p>
      </LegalSection>

      <LegalSection id="data-security" title="4. Data Security">
        <p>The security of your data is important to us. We implement standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
      </LegalSection>

      <LegalSection id="your-rights" title="5. Your Privacy Rights">
        <p>Depending on your location, you may have rights regarding your personal data, such as:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>The right to access the personal information we hold about you</li>
          <li>The right to request that we correct or delete your personal information</li>
          <li>The right to opt-out of marketing communications</li>
        </ul>
        <p>To exercise these rights, please contact us at launchpilotai41@gmail.com.</p>
      </LegalSection>

      <LegalSection id="cookies" title="6. Cookies & Tracking">
        <p>We use cookies and tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
      </LegalSection>

      <LegalSection id="contact" title="7. Contact Us">
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-5 mt-4 font-mono text-sm text-[#334155] shadow-sm">
          <p className="mb-2">📧 <span className="text-[#94A3B8] w-20 inline-block">Email:</span> launchpilotai41@gmail.com</p>
          <p className="mb-2">🌐 <span className="text-[#94A3B8] w-20 inline-block">Website:</span> <Link to="/contact" className="hover:text-[#8B5CF6] transition-colors">launchpilot.ai/contact</Link></p>
          <p>📍 <span className="text-[#94A3B8] w-20 inline-block">Address:</span> Ahmedabad, India</p>
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
