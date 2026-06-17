import React from 'react';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

const footerLinks = {
  Services: [
    { label: 'SaaS Development', href: '/services/saas-development' },
    { label: 'MVP Development', href: '/services/mvp-development' },
    { label: 'AI Development', href: '/services/ai-development' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Mobile App Development', href: '/services/mobile-development' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  ],
  Solutions: [
    { label: 'AI Apps', href: '/solutions/ai-apps' },
    { label: 'CRM Development', href: '/solutions/crm-development' },
    { label: 'ERP Development', href: '/solutions/erp-development' },
    { label: 'Web Portal', href: '/solutions/web-portal' },
    { label: 'Mobile Apps', href: '/solutions/mobile-apps' },
  ],
  Industries: [
    { label: 'Healthcare', href: '/industries/healthcare' },
    { label: 'Ad Tech', href: '/industries/ad-tech' },
    { label: 'Hospital Management', href: '/industries/hospital-management' },
    { label: 'SaaS Apps', href: '/industries/saas-apps' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Why Launch AI Pilot', href: '/why-launch' },
  ],
  Contact: [
    { label: 'Book a Call', href: '/book-appointment' },
    { label: 'Contact Us', href: '/#contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function LaunchFooter() {
  return (
    <footer className="bg-white text-ink-900 border-t border-gray-200">

      {/* Top gradient accent - light mode */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="container-editorial py-16 lg:py-20">

        {/* Top section — brand + CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-14 pb-14 border-b border-gray-100">

          {/* Brand */}
          <div className="max-w-[360px]">
            <a href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="flex items-center justify-center">
                <LogoIcon className="w-7 h-7 text-ink-900" />
              </div>
              <span className="font-bold text-lg text-ink-900 tracking-[-0.025em]">Launch AI Pilot</span>
            </a>
            <p className="text-[0.875rem] text-ink-500 leading-relaxed mb-5 font-medium">
              We don't build software. We engineer unfair advantages for industry leaders.
              10+ MVPs shipped across 5+ countries. No ghosting after launch.
            </p>
            <a
              href="mailto:launchpilotai41@gmail.com"
              className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-cobalt-600 hover:text-cobalt-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              launchpilotai41@gmail.com
            </a>
          </div>

          {/* CTA */}
          <div className="lg:text-right">
            <p className="text-[0.875rem] text-ink-500 font-medium mb-3">Your competitor isn't waiting.</p>
            <a
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-ink-900 text-white font-bold text-[0.875rem] px-6 py-3 rounded-xl hover:bg-ink-800 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              Book Your Free 30-Min Call
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10"/>
                <path d="M7 17 17 7"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-14 pb-14 border-b border-gray-100">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[0.6875rem] font-extrabold text-ink-400 uppercase tracking-[0.12em] mb-5">
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => {
                  if (typeof link === 'string') {
                    return (
                      <li key={link}>
                        <a
                          href={`/#${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="text-[0.8125rem] font-medium text-ink-500 hover:text-cobalt-600 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.8125rem] font-medium text-ink-500 hover:text-cobalt-600 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.75rem] text-ink-400 font-medium">
            © {new Date().getFullYear()} Launch AI Pilot. All rights reserved.
          </p>


        </div>

      </div>
    </footer>
  );
}
