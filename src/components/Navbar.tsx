import React, { useState, useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { LogoIcon } from './LogoIcon';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '/#work' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'ROI Calculator', href: '/#roi-calculator' },
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-cream/90 backdrop-blur-md border-zinc-200/80 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 tracking-tight">
          <LogoIcon className="w-6 h-6 shrink-0" />
          Launch AI Pilot
        </a>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-zinc-600 hover:text-zinc-900 text-sm font-semibold transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="hidden md:flex items-center">
          <a 
            href="#contact" 
            className="bg-violet-600 text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-violet-500 transition-all duration-200 shadow-sm"
          >
            Free Audit
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-650 hover:text-zinc-900 focus:outline-none transition-colors"
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-zinc-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-600 hover:text-zinc-900 text-base font-semibold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-zinc-200">
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-violet-600 text-white rounded-full py-3 text-sm font-semibold hover:bg-violet-500 transition-colors"
            >
              Free Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
