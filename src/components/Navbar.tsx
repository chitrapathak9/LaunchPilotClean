import React, { useState, useEffect } from 'react';
import { IconMenu2, IconX, IconChevronDown, IconArrowRight } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

const navLinks = [
  {
    name: 'Solutions',
    items: [
      { name: 'AI Apps', href: '/solutions/ai-apps' },
      { name: 'CRM Development', href: '/solutions/crm-development' },
      { name: 'ERP Development', href: '/solutions/erp-development' },
      { name: 'Web Portal', href: '/solutions/web-portal' },
      { name: 'Mobile Apps', href: '/solutions/mobile-apps' },
    ],
  },
  {
    name: 'Industries',
    href: '/#industries',
  },
  {
    name: 'Services',
    items: [
      { name: 'SaaS Development', href: '/services/saas-development' },
      { name: 'MVP Development', href: '/services/mvp-development' },
      { name: 'AI Development', href: '/services/ai-development' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Mobile App Development', href: '/services/mobile-development' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    ],
  },
  {
    name: 'Company',
    items: ['About Us', 'Careers', 'Case Studies', 'Blog', 'Engagement Models', 'Global Delivery', 'Why Launch AI Pilot'],
  },
];

export function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change / click-outside (simplified)
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-ink-200/70 shadow-[0_1px_24px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-md border-b border-ink-100'
      }`}
    >
      <div className="container-editorial h-[72px] flex items-center justify-between">

        {/* ── Logo ── */}
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <LogoIcon className="w-6 h-6 text-ink-900" />
          </div>
          <span className="font-bold text-[1.0625rem] text-ink-950 tracking-[-0.025em]">
            Launch AI Pilot
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center gap-1 pr-8 border-r border-ink-200">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative h-[72px] flex items-center"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.items ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-semibold text-ink-500 hover:text-ink-900 transition-colors duration-150 rounded-lg hover:bg-ink-50 focus:outline-none">
                      {link.name}
                      <IconChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180 text-cobalt-600' : ''}`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-[68px] left-1/2 -translate-x-1/2 w-52 bg-white border border-ink-100 rounded-2xl shadow-card-lg py-2 transition-all duration-200 origin-top ${
                        activeDropdown === link.name
                          ? 'opacity-100 scale-100 visible pointer-events-auto'
                          : 'opacity-0 scale-95 invisible pointer-events-none'
                      }`}
                    >
                      <div className="py-1">
                        {link.items.map((item) => {
                          const label = typeof item === 'string' ? item : item.name;
                          const href = typeof item === 'string' ? `/#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : item.href;
                          return (
                            <a
                              key={label}
                              href={href}
                              className="flex items-center px-4 py-2.5 text-[0.8125rem] font-semibold text-ink-500 hover:text-cobalt-600 hover:bg-cobalt-50/50 transition-colors"
                            >
                              {label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="px-3 py-2 text-[0.8125rem] font-semibold text-ink-500 hover:text-ink-900 transition-colors duration-150 rounded-lg hover:bg-ink-50"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA group */}
          <div className="flex items-center gap-3 pl-8">
            <a
              href="/book-appointment"
              className="text-[0.8125rem] font-semibold text-ink-500 hover:text-ink-900 transition-colors duration-150 whitespace-nowrap"
            >
              Book a call
            </a>
            <a
              href="#contact"
              className="btn-primary text-[0.8125rem] py-2.5 px-5 rounded-full"
            >
              Contact us
              <IconArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ── Mobile Trigger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-ink-100 transition-colors text-ink-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden transition-all duration-300 ease-spring overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-ink-100 px-6 py-6 space-y-1">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <div key={link.name} className="py-0.5">
                {link.items ? (
                  <div>
                    <p className="px-3 py-2.5 text-[0.8125rem] font-bold text-ink-900">{link.name}</p>
                    <div className="ml-3 pl-4 border-l-2 border-ink-100 flex flex-col gap-0.5 mb-2">
                      {link.items.map((item) => {
                        const label = typeof item === 'string' ? item : item.name;
                        const href = typeof item === 'string' ? `/#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : item.href;
                        return (
                          <a
                            key={label}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2 text-[0.8125rem] font-semibold text-ink-500 hover:text-ink-900 transition-colors rounded-lg"
                          >
                            {label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-[0.8125rem] font-bold text-ink-900 hover:text-cobalt-600 transition-colors rounded-lg"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="pt-5 border-t border-ink-100 flex flex-col gap-3">
            <a
              href="/book-appointment"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full text-center text-[0.875rem] py-3"
            >
              Book a clarity call
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full text-center text-[0.875rem] py-3 rounded-xl"
            >
              Contact us <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
