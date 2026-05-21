import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../App';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Components ── */

export function LegalHeader({ title, lastUpdated, summary }: { title: string, lastUpdated: string, summary: string }) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{title}</h1>
      <p className="text-[#94A3B8] mb-6 font-medium">Last updated: {lastUpdated}</p>
      <p className="text-[#64748B] text-[15px] leading-[1.8] max-w-3xl">{summary}</p>
    </div>
  );
}

export function LegalSection({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-[#8B5CF6] text-2xl font-bold mb-5">{title}</h2>
      <div className="text-[#64748B] text-[15px] leading-[1.8] space-y-4">
        {children}
      </div>
    </section>
  );
}

export function AllowedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Check size={18} className="text-[#10B981] mt-1 shrink-0" />
          <span className="text-[#334155] font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProhibitedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <X size={18} className="text-[#ef4444] mt-1 shrink-0" />
          <span className="text-[#334155] font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ items }: { items: { id: string, label: string }[] }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 hidden lg:block sticky top-28 w-64 shrink-0 h-fit shadow-sm">
      <h3 className="text-[#0F172A] font-bold mb-4">Table of Contents</h3>
      <ul className="space-y-2.5 text-sm">
        {items.map((item, i) => (
          <li key={i}>
            <a href={`#${item.id}`} className="text-[#64748B] hover:text-[#8B5CF6] font-medium transition-colors flex gap-2">
              <span className="text-[#94A3B8]">{i + 1}.</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LegalPageLayout({ children, toc }: { children: React.ReactNode, toc: { id: string, label: string }[] }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#8B5CF6]/20">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto flex gap-12 items-start">
          <TableOfContents items={toc} />
          
          <div className="flex-1 max-w-[800px] bg-white border border-[#E2E8F0] rounded-2xl p-8 md:p-12 shadow-sm">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── Content ── */

export function TermsOfService() {
  useEffect(() => {
    document.body.style.backgroundColor = '#FAF9F6';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const toc = [
    { id: 'acceptance', label: 'Acceptance of Terms' },
    { id: 'description', label: 'Description of Service' },
    { id: 'account', label: 'Account Registration' },
    { id: 'purchases', label: 'Purchases & Payment' },
    { id: 'license', label: 'License & Usage Rights' },
    { id: 'prohibited', label: 'Prohibited Uses' },
    { id: 'ip', label: 'Intellectual Property' },
    { id: 'updates', label: 'Skill Updates & Availability' },
    { id: 'disclaimers', label: 'Disclaimers & Limitation of Liability' },
    { id: 'termination', label: 'Termination' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'changes', label: 'Changes to Terms' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <LegalPageLayout toc={toc}>
      <LegalHeader 
        title="Terms of Service"
        lastUpdated="January 15, 2025"
        summary="Please read these Terms of Service carefully before using LaunchPilot. By accessing or using our service, you agree to be bound by these terms."
      />

      <hr className="border-[#E2E8F0] my-10" />

      <LegalSection id="acceptance" title="1. Acceptance of Terms">
        <p>By creating an account, making a purchase, or using any part of LaunchPilot (the "Service"), you agree to these Terms of Service ("Terms").</p>
        <p>If you do not agree to these Terms, do not use the Service.</p>
        <p>These Terms apply to all users including visitors, registered users, and paying customers.</p>
      </LegalSection>

      <LegalSection id="description" title="2. Description of Service">
        <p>LaunchPilot provides:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li><strong className="text-[#0F172A] font-bold">AI Skill Files</strong> — Markdown instruction files (SKILL.md) designed to guide AI coding agents in building software products</li>
          <li><strong className="text-[#0F172A] font-bold">Example Projects</strong> — GitHub repositories demonstrating real-world usage of each skill</li>
          <li><strong className="text-[#0F172A] font-bold">Dashboard</strong> — A web interface to manage your purchased skills and projects</li>
          <li><strong className="text-[#0F172A] font-bold">Blog & Educational Content</strong> — Articles and guides for founders and builders</li>
        </ul>
        <p>The Service is provided "as is" and may be updated, modified, or discontinued at any time.</p>
      </LegalSection>

      <LegalSection id="account" title="3. Account Registration">
        <p>To purchase skills or access the dashboard, you must:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>Be at least 13 years old (or the minimum legal age in your country)</li>
          <li>Provide accurate and complete information during registration</li>
          <li>Keep your login credentials secure and confidential</li>
          <li>Notify us immediately of any unauthorized access to your account</li>
        </ul>
        <p>You are responsible for all activity that occurs under your account.</p>
        <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
      </LegalSection>

      <LegalSection id="purchases" title="4. Purchases & Payment">
        <p><strong className="text-[#0F172A] font-bold">Pricing:</strong><br/>All prices are listed in USD. Prices may change at any time — changes do not affect existing purchases.</p>
        <p><strong className="text-[#0F172A] font-bold">One-time purchases:</strong><br/>Skills and bundles are sold as one-time purchases. There are no recurring charges unless explicitly stated.</p>
        <p><strong className="text-[#0F172A] font-bold">Payment processing:</strong><br/>All payments are processed securely by Stripe. We do not store your payment card information.</p>
        <p><strong className="text-[#0F172A] font-bold">Taxes:</strong><br/>You are responsible for any applicable taxes in your jurisdiction. We may collect GST/VAT where legally required.</p>
        <p><strong className="text-[#0F172A] font-bold">Receipts:</strong><br/>An email receipt will be sent to your registered email address after each purchase.</p>
        <p><strong className="text-[#0F172A] font-bold">Failed payments:</strong><br/>If a payment fails, access to the skill will not be granted until payment is successfully completed.</p>
      </LegalSection>

      <LegalSection id="license" title="5. License & Usage Rights">
        <p>When you purchase a skill, we grant you a:</p>
        <p><strong className="text-[#0F172A] font-bold">Personal, non-exclusive, non-transferable, lifetime license</strong> to:</p>
        
        <AllowedList items={[
          "Use the SKILL.md file on your own projects",
          "Use the skill with any AI coding tool (Claude Code, Cursor, Lovable, etc.)",
          "Use the skill on unlimited personal and commercial projects",
          "Modify the skill file for your own use",
          "Use the included GitHub example project as a starting point"
        ]} />

        <p className="mt-6 mb-2"><strong className="text-[#0F172A] font-bold">You may NOT:</strong></p>
        
        <ProhibitedList items={[
          "Resell, sublicense, or redistribute the skill files",
          "Share your skill files publicly (e.g. on GitHub, Discord, forums)",
          "Include skill files in a product or service you sell to others",
          "Remove any attribution or copyright notices from skill files",
          "Claim the skill content as your own original work",
          "Use the skills to build a competing skill marketplace"
        ]} />

        <p className="mt-6"><strong className="text-[#0F172A] font-bold">Team use:</strong><br/>Each license covers one individual. If multiple team members need access, each must purchase their own license (or contact us for team pricing).</p>
      </LegalSection>

      <LegalSection id="prohibited" title="6. Prohibited Uses">
        <p>You agree not to use the Service to:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>Violate any applicable law or regulation</li>
          <li>Infringe the intellectual property rights of others</li>
          <li>Build products that facilitate illegal activity</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Scrape, crawl, or copy our website content without permission</li>
          <li>Use automated bots to access the Service</li>
          <li>Reverse engineer or attempt to extract proprietary logic from our skill files beyond personal use</li>
          <li>Impersonate LaunchPilot or any of our team members</li>
        </ul>
        <p>Violation of these prohibitions may result in immediate account termination without refund.</p>
      </LegalSection>

      <LegalSection id="ip" title="7. Intellectual Property">
        <p><strong className="text-[#0F172A] font-bold">Our content:</strong><br/>All skill files, README files, blog posts, website copy, design, and code owned by LaunchPilot are protected by copyright and other intellectual property laws.</p>
        <p><strong className="text-[#0F172A] font-bold">Your content:</strong><br/>Any products you build using our skills are entirely yours. We make no claim over anything you create.</p>
        <p><strong className="text-[#0F172A] font-bold">Feedback:</strong><br/>If you provide feedback, suggestions, or ideas about the Service, you grant us the right to use them without restriction or compensation.</p>
        <p><strong className="text-[#0F172A] font-bold">Trademarks:</strong><br/>LaunchPilot and associated logos are trademarks of our company. You may not use our trademarks without written permission.</p>
      </LegalSection>

      <LegalSection id="updates" title="8. Skill Updates & Availability">
        <p><strong className="text-[#0F172A] font-bold">Lifetime updates:</strong><br/>Purchases include lifetime updates to that specific skill. Updates are delivered via email with a new download link.</p>
        <p><strong className="text-[#0F172A] font-bold">What "lifetime" means:</strong><br/>Updates are provided for as long as LaunchPilot continues to operate and maintain that skill. We make no guarantee about a specific update frequency.</p>
        <p><strong className="text-[#0F172A] font-bold">Skill changes:</strong><br/>We may update skill content at any time to reflect improvements, AI tool changes, or best practice updates. Updated versions do not replace your existing download — both are accessible.</p>
        <p><strong className="text-[#0F172A] font-bold">Skill removal:</strong><br/>In rare cases, we may retire a skill. If a skill you purchased is retired:
          <br/>• You keep access to the last available version
          <br/>• We will notify you by email at least 30 days in advance
        </p>
        <p><strong className="text-[#0F172A] font-bold">Service availability:</strong><br/>We aim for 99% uptime but do not guarantee uninterrupted access. Scheduled maintenance will be announced in advance where possible.</p>
      </LegalSection>

      <LegalSection id="disclaimers" title="9. Disclaimers & Limitation of Liability">
        <p><strong className="text-[#0F172A] font-bold">No warranty:</strong><br/>The Service is provided "as is" without warranties of any kind, either express or implied. We do not warrant that:
          <br/>• The skills will produce specific results
          <br/>• The skills will work perfectly with every AI tool or project
          <br/>• The Service will be error-free or uninterrupted
        </p>
        <p><strong className="text-[#0F172A] font-bold">AI output disclaimer:</strong><br/>Our skills guide AI coding agents. The quality of AI-generated output depends on the AI tool used, your project context, and many other factors beyond our control. We do not guarantee any specific outcome from using our skills.</p>
        <p><strong className="text-[#0F172A] font-bold">Limitation of liability:</strong><br/>To the maximum extent permitted by law, LaunchPilot and its founders shall not be liable for:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>Any indirect, incidental, or consequential damages</li>
          <li>Loss of profits, data, or business opportunities</li>
          <li>Damages exceeding the amount you paid for the skill in question</li>
        </ul>
        <p>Some jurisdictions do not allow limitation of liability — in those cases, our liability is limited to the maximum extent permitted.</p>
      </LegalSection>

      <LegalSection id="termination" title="10. Termination">
        <p><strong className="text-[#0F172A] font-bold">By you:</strong><br/>You may close your account at any time via Settings → Danger Zone. Closing your account does not entitle you to a refund unless within the refund window.</p>
        <p><strong className="text-[#0F172A] font-bold">By us:</strong><br/>We reserve the right to suspend or terminate your account without notice if you:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>Violate these Terms</li>
          <li>Engage in fraudulent activity</li>
          <li>Abuse the refund policy</li>
        </ul>
        <p>On termination, your license to use purchased skills is revoked. You should delete all copies of skill files from your systems.</p>
      </LegalSection>

      <LegalSection id="governing-law" title="11. Governing Law">
        <p>These Terms are governed by the laws of <strong className="text-[#0F172A] font-bold">India</strong>, without regard to conflict of law principles.</p>
        <p>Any disputes arising from these Terms shall be resolved through:</p>
        <ol className="list-decimal pl-5 space-y-1 my-3 text-[#334155]">
          <li>Good faith negotiation (30 days)</li>
          <li>Mediation if negotiation fails</li>
          <li>Binding arbitration as a last resort</li>
        </ol>
        <p>You agree to resolve disputes individually — not as part of a class action.</p>
      </LegalSection>

      <LegalSection id="changes" title="12. Changes to Terms">
        <p>We may update these Terms at any time.</p>
        <p>When we make significant changes:</p>
        <ul className="list-disc pl-5 space-y-1 my-3 text-[#334155]">
          <li>We will update the "Last updated" date</li>
          <li>We will notify registered users via email</li>
          <li>Continued use of the Service after changes means you accept the new Terms</li>
        </ul>
        <p>If you disagree with updated Terms, you may close your account.</p>
      </LegalSection>

      <LegalSection id="contact" title="13. Contact Us">
        <p>For questions about these Terms:</p>
        <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-5 mt-4 font-mono text-sm text-[#334155] shadow-sm">
          <p className="mb-2">📧 <span className="text-[#94A3B8] w-20 inline-block">Email:</span> launchpilotai41@gmail.com</p>
          <p className="mb-2">🌐 <span className="text-[#94A3B8] w-20 inline-block">Website:</span> <Link to="/contact" className="hover:text-[#8B5CF6] transition-colors">launchpilot.ai/contact</Link></p>
          <p>📍 <span className="text-[#94A3B8] w-20 inline-block">Address:</span> Ahmedabad, India</p>
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
