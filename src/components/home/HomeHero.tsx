import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROTATING_PHRASES = [
  'Right AI Partner',
  'Measurable Growth',
  'Smart Automation',
  'Scalable Systems',
  'Genuine Results',
];

const STATS = [
  { value: '10+', label: 'MVP Shipped' },
  { value: '5+', label: 'Countries' },
  { value: '5+', label: 'Years Building' },
  { value: '5.0★', label: 'Client Rating' },
];

export function HomeHero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleType = () => {
      const current = loopNum % ROTATING_PHRASES.length;
      const fullText = ROTATING_PHRASES[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2500); // Pause at end before deleting
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before typing next word
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-white"
      style={{ paddingTop: '72px' }}
    >
      {/* Subtle background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[#6D28D9]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-sky-50/60 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="container-editorial relative z-10 py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto text-center">

          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-ink-200 shadow-[0_2px_16px_rgba(0,0,0,0.06)] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9] animate-pulse shrink-0" />
            <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-ink-500">
              AI Solutions Partner
            </span>
            <span className="h-3.5 w-px bg-ink-200" />
            <span className="text-[0.6875rem] font-semibold text-ink-400">
              Trusted in 5+ Countries
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6">
            {/* Line 1 */}
            <span
              className="block font-sans font-semibold text-ink-800 leading-[1.05] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)' }}
            >
              Every Company Is Selling Tech.
            </span>

            {/* Line 2 — the differentiated message */}
            <span
              className="block font-sans font-semibold leading-[1.06] tracking-[-0.035em] mt-2"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
            >
              <span className="text-ink-600">In the AI Era, You Need</span>
              <br className="hidden sm:block" />{' '}
              {/* Rotating phrase */}
              <span
                className="relative inline-flex items-center align-bottom"
                style={{ height: '1.1em', minWidth: 'clamp(220px, 30vw, 480px)', verticalAlign: 'bottom' }}
              >
                <span className="text-[#6D28D9] whitespace-nowrap">
                  {text}
                  <span className="animate-[pulse_1s_ease-in-out_infinite] border-r-4 border-[#6D28D9] ml-[2px] h-[0.9em] inline-block align-middle" style={{ marginTop: '-0.1em' }} />
                </span>
              </span>
            </span>
          </h1>

          {/* Sub-headline — the value hook */}
          <p
            className="text-ink-500 mt-6 mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(1.0625rem, 2vw, 1.1875rem)', maxWidth: '820px', lineHeight: '1.72' }}
          >
            Most companies burn money chasing the wrong AI tools.
            We don't sell technology — <strong className="text-ink-800 font-semibold">we provide outcomes.</strong>{' '}
            Our team guides you to the exact AI strategy that fits your business,
            builds it with precision, and hands you 100% ownership. No lock-ins. No guesswork.<br />
            <span className="text-[#6D28D9] font-semibold"> Just results that scale.</span>
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link
              to="/book-appointment"
              className="btn-primary text-[0.9375rem] py-3.5 px-8 group w-full sm:w-auto shadow-[0_4px_24px_rgba(0,0,0,0.16)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
            >
              Get Your Free AI Strategy Call
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="btn-secondary text-[0.9375rem] py-3.5 px-8 w-full sm:w-auto"
            >
              See How We Work
            </Link>
          </div>

          {/* Urgency nudge */}
          <p className="mt-4 text-[0.8125rem] text-ink-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 align-middle animate-pulse" />
            Limited client spots — We take on a focused number of engagements per quarter.
          </p>



        </div>
      </div>

      {/* Scroll cue */}


    </section>
  );
}
