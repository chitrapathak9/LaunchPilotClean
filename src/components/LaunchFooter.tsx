import React from 'react';
import { IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

export function LaunchFooter() {
  const footerLinks = {
    services: ['AI Development', 'SaaS Development', 'Web Development', 'Mobile App Development', 'UI/UX Design'],
    solutions: ['AI Apps', 'CRM Development', 'ERP Development', 'Web Portal', 'Mobile Apps'],
    company: ['About Us', 'Careers', 'Case Studies', 'Blog', 'Engagement models', 'Global delivery', 'Why Launch AI Pilot'],
    contact: ['Book a Call', 'Contact Us']
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          
          {/* Brand & Tagline */}
          <div className="max-w-md">
            <a href="/" className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight mb-4">
              <LogoIcon className="w-8 h-8 shrink-0" />
              Launch AI Pilot
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
              We don't build software. We engineer unfair advantages for industry leaders. 50+ products shipped. 20+ countries. No ghosting after launch.
            </p>
            <a href="mailto:launchpilotai41@gmail.com" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              launchpilotai41@gmail.com
            </a>
          </div>

          {/* Top CTA */}
          <div className="md:text-right flex flex-col md:items-end">
            <p className="text-slate-500 text-sm font-medium mb-3">Your competitor isn't waiting.</p>
            <a href="/book-appointment" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors whitespace-nowrap">
              Book Your Free 30-Min Call
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-slate-100">
          
          <div>
            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map(link => (
                <li key={link}><a href={`/#${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-6">Solutions</h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map(link => (
                <li key={link}><a href={`/#${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link}><a href={`/#${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              {footerLinks.contact.map(link => (
                <li key={link}><a href={link === 'Book a Call' ? '/book-appointment' : '/#contact'} className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
          <p>© {new Date().getFullYear()} Launch AI Pilot. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

