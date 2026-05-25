import React from 'react';

export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3.5 3.5" opacity="0.8" />
      <polygon points="16,7 9,18 23,18" fill="#A855F7" />
      <polygon points="9,17 16,11 23,17 20,25 16,21 12,25" fill="#6D28D9" />
      <circle cx="16" cy="16" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}
