import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { ActionCTA } from '../components/ui/ActionCTA';
import { HomeTestimonials } from '../components/home/HomeTestimonials';
import { Users } from 'lucide-react';

import { AboutHero } from '../components/company/AboutHero';
import { AboutDifference } from '../components/company/AboutDifference';
import { AboutMission } from '../components/company/AboutMission';
import { AboutJourney } from '../components/company/AboutJourney';

export function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Page Hero */}
        <AboutHero />

        {/* 2. We're not the agency you've worked with before */}
        <AboutDifference />

        {/* 3. Our Mission & Vision */}
        <AboutMission />

        {/* 4. Our Journey */}
        <AboutJourney />

        {/* 5. Social Proof */}
        <HomeTestimonials />

        {/* 6. Custom About Us CTA */}
        <ActionCTA 
          pillText="Partner With Us"
          pillIcon={<Users size={14} />}
          title={<>Now you know who we are. <span className="text-indigo-600">Let's talk about what you need.</span></>}
          description="Stop settling for standard outsourcing. Partner with an elite engineering task force."
          buttonText="Schedule Your Call"
        />
      </main>

      <LaunchFooter />
    </div>
  );
}
