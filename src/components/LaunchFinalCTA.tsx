import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './FadeUp';
import { Mail, Copy, Check, ExternalLink, Send, MessageSquare, X } from 'lucide-react';

export function LaunchFinalCTA() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailAddress = 'launchpilotai41@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailModal(true);
    // Also try opening the default client
    window.location.href = `mailto:${emailAddress}?subject=Operations%20Audit%20Inquiry%20-%20Launch%20AI%20Pilot`;
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-zinc-200 text-center relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Headline */}
        <FadeUp delay={0.1}>
          <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold max-w-2xl mx-auto tracking-tight leading-tight">
            Ready to automate your business operations?
          </h2>
        </FadeUp>

        {/* Body Description */}
        <FadeUp delay={0.2}>
          <p className="text-zinc-600 text-lg mt-5 max-w-xl mx-auto font-medium leading-relaxed">
            Two openings left this month. Book a free 30-minute operations audit — no pitch, no pressure. 
            Just a data-driven roadmap to eliminate manual bottlenecks and scale.
          </p>
        </FadeUp>

        {/* Action Buttons */}
        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/book-appointment"
              className="w-full sm:w-auto bg-violet-600 text-white font-bold rounded-full px-8 py-4 hover:bg-violet-500 transition-colors duration-200 text-base shadow-md shadow-violet-600/10 min-w-[240px] text-center"
            >
              Schedule free operations audit
            </Link>
            <button 
              type="button"
              onClick={handleEmailClick}
              className="w-full sm:w-auto border border-zinc-300 text-zinc-800 font-bold rounded-full px-8 py-4 hover:bg-zinc-50 bg-white transition-colors duration-200 text-base min-w-[240px] text-center shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail size={18} className="text-violet-600" />
              Email us directly
            </button>
          </div>
        </FadeUp>

        {/* Trust Line */}
        <FadeUp delay={0.4}>
          <div className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mt-10 border-t border-zinc-200 pt-8 max-w-md mx-auto">
            NDA signed beforehand · Fixed price · System is 100% yours
          </div>
        </FadeUp>

      </div>

      {/* Email Direct Contact Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-zinc-150 relative text-left animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 p-2 rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Reach Us Directly</h3>
                <p className="text-xs text-zinc-500 font-semibold">We respond within 24 hours (Mon – Fri)</p>
              </div>
            </div>

            {/* Email Address with Copy Button */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 my-5 flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Direct Email</span>
                <span className="text-sm font-bold text-zinc-900 select-all font-mono">{emailAddress}</span>
              </div>
              <button
                onClick={handleCopy}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Options list */}
            <div className="space-y-2.5 pt-1">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Operations%20Audit%20Inquiry%20-%20Launch%20AI%20Pilot`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 hover:border-violet-300 hover:bg-violet-50/50 text-zinc-800 hover:text-violet-900 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-[10px]">M</span>
                  Open in Gmail (Web)
                </span>
                <ExternalLink size={14} className="text-zinc-400 group-hover:text-violet-600" />
              </a>

              <a
                href={`mailto:${emailAddress}?subject=Operations%20Audit%20Inquiry%20-%20Launch%20AI%20Pilot`}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 hover:border-violet-300 hover:bg-violet-50/50 text-zinc-800 hover:text-violet-900 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Send size={16} className="text-violet-600" />
                  Open Default Mail App
                </span>
                <ExternalLink size={14} className="text-zinc-400 group-hover:text-violet-600" />
              </a>

              <Link
                to="/contact"
                onClick={() => setShowEmailModal(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 hover:border-violet-300 hover:bg-violet-50/50 text-zinc-800 hover:text-violet-900 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquare size={16} className="text-violet-600" />
                  Use Web Contact Form
                </span>
                <ExternalLink size={14} className="text-zinc-400 group-hover:text-violet-600" />
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-150 flex justify-end">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-5 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}


