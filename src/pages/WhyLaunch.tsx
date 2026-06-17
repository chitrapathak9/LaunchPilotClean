import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { ActionCTA } from '../components/ui/ActionCTA';
import { Phone } from 'lucide-react';

import { WhyHero } from '../components/company/WhyHero';
import { WhyProblems } from '../components/company/WhyProblems';
import { WhyScale } from '../components/company/WhyScale';

export function WhyLaunch() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Page Hero */}
        <WhyHero />

        {/* 2. The Real Problems */}
        <WhyProblems />

        {/* 3. The Scale Guarantee */}
        <WhyScale />

        {/* 4. Custom CTA */}
        <ActionCTA 
          pillText="Let's Talk"
          pillIcon={<Phone size={14} />}
          title={<>We are just one call away. <br/><span className="text-amber-600">What are you waiting for?</span></>}
          description="Let's connect and discuss the future of your product. Tell us your problems, and we will give you the solution."
          buttonText="Connect With Us"
        />

        {/* 5. FAQs */}
        <LaunchFAQ />
      </main>

      <LaunchFooter />
    </div>
  );
}
