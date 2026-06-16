import React, { useState, useEffect } from 'react';
import { IconMenu2, IconX, IconChevronDown, IconArrowRight } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Solutions', 
      items: ['AI Apps', 'CRM Development', 'ERP Development', 'Web Portal', 'Mobile Apps']
    },
    { 
      name: 'Industries', 
      href: '/#industries' 
    },
    { 
      name: 'Services', 
      items: ['AI Development', 'SaaS Development', 'Web Development', 'Mobile App Development', 'UI/UX Design']
    },
    { 
      name: 'Company', 
      items: ['About Us', 'Careers', 'Case Studies', 'Blog', 'Engagement models', 'Global delivery', 'Why Launch AI Pilot']
    }
  ];

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-sm' 
          : 'bg-white border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight">
          <LogoIcon className="w-6 h-6 shrink-0" />
          Launch AI Pilot
        </a>

        {/* Right Side Group (Nav + CTA) */}
        <div className="hidden md:flex items-center">
          
          {/* Nav links */}
          <nav className="flex items-center gap-8 pr-8 border-r border-slate-200">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.items ? (
                  <>
                    <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors duration-200 focus:outline-none">
                      {link.name}
                      <IconChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Dropdown Menu */}
                    <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 py-3 transition-all duration-200 transform origin-top ${
                      activeDropdown === link.name ? 'opacity-100 scale-100 visible pointer-events-auto' : 'opacity-0 scale-95 invisible pointer-events-none'
                    }`}>
                      {link.items.map((item) => (
                        <a key={item} href={`/#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="block px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                          {item}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a 
                    href={link.href} 
                    className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-6 pl-8">
            <a 
              href="/book-appointment" 
              className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors duration-200"
            >
              Book a clarity call
            </a>
            <a 
              href="#contact" 
              className="bg-slate-900 text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-slate-800 transition-all duration-200 shadow-sm flex items-center gap-2"
            >
              Contact us
              <IconArrowRight size={16} />
            </a>
          </div>

        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-3">
                {link.items ? (
                  <>
                    <span className="text-slate-900 text-base font-bold">{link.name}</span>
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100">
                      {link.items.map((item) => (
                        <a 
                          key={item} 
                          href={`/#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-900 hover:text-slate-900 text-base font-bold transition-colors"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>
          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            <a 
              href="/book-appointment" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center text-slate-600 hover:text-slate-900 py-3 text-sm font-bold transition-colors border border-slate-200 rounded-xl"
            >
              Book a clarity call
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-slate-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Contact us
              <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
