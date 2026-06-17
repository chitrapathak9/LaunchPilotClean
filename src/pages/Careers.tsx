import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';

import { CareersHero } from '../components/company/CareersHero';
import { CareersValues } from '../components/company/CareersValues';
import { CareersBenefits } from '../components/company/CareersBenefits';
import { CareersProcess } from '../components/company/CareersProcess';
import { CareersTestimonials } from '../components/company/CareersTestimonials';
import { CareersOpenings } from '../components/company/CareersOpenings';

export function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Page Hero */}
        <CareersHero />

        {/* 2. Core Values */}
        <CareersValues />

        {/* 3. Why Join Us (Benefits) */}
        <CareersBenefits />

        {/* 4. Interview Process */}
        <CareersProcess />

        {/* 6. Employee Testimonials */}
        <CareersTestimonials />

        {/* 7. Open Positions (None right now) */}
        <CareersOpenings />
      </main>

      <LaunchFooter />
    </div>
  );
}
