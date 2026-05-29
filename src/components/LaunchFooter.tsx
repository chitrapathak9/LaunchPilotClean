import React from 'react';
import { IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

export function LaunchFooter() {
  return (
    <footer className="bg-cream border-t border-zinc-200/80 py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Col 1: Branding & Socials */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 tracking-tight">
              <LogoIcon className="w-6 h-6 shrink-0" />
              Launch AI Pilot
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              AI Automation Agency. Built in Ahmedabad, India.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://x.com/LaunchPilotAI" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-350 transition-colors shadow-sm"
              >
                <IconBrandTwitter size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/company/118514098/" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-350 transition-colors shadow-sm"
              >
                <IconBrandLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-zinc-900 text-sm font-bold tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Work', href: '/#work' },
                { name: 'How it works', href: '/#how-it-works' },
                { name: 'ROI Calculator', href: '/#roi-calculator' },
                { name: 'Pricing', href: '/#pricing' },
                { name: 'FAQ', href: '/#faq' },
                { name: 'Contact', href: '/#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-zinc-655 text-sm hover:text-zinc-900 font-semibold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-zinc-900 text-sm font-bold tracking-wider uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-3 font-semibold text-sm">
              <a 
                href="mailto:launchpilotai41@gmail.com" 
                className="text-zinc-655 hover:text-zinc-900 transition-colors block"
              >
                launchpilotai41@gmail.com
              </a>
              <a 
                href="#contact" 
                className="text-violet-600 hover:text-violet-755 hover:underline inline-flex items-center gap-1.5 mt-2 font-bold"
              >
                Free operations audit →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs font-semibold">
          <div>
            © 2025 Launch AI Pilot. All rights reserved.
          </div>
          <div>
            Built by CodeIntelli · Ahmedabad, India
          </div>
        </div>

      </div>
    </footer>
  );
}

