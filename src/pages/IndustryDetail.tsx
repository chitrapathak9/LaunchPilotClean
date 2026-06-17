import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { ServiceWhyUs } from '../components/services/ServiceWhyUs';
import { ServiceEngagement } from '../components/services/ServiceEngagement';
import { IndustryCTA } from '../components/industries/IndustryCTA';

import { IndustryHero } from '../components/industries/IndustryHero';
import { IndustryChallenges } from '../components/industries/IndustryChallenges';
import { IndustryCapabilities } from '../components/industries/IndustryCapabilities';
import { industries } from '../data/industries';

export function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Industry Hero */}
        <IndustryHero industry={industry} />

        {/* 2. Industry Challenges (Deep Dive) */}
        <IndustryChallenges industry={industry} />

        {/* 3. Industry Capabilities (Services/Solutions Mix) */}
        <IndustryCapabilities industry={industry} />

        {/* 4. Why Hire Us (Trust) */}
        <ServiceWhyUs />

        {/* 5. Engagement Models (How we partner) */}
        <ServiceEngagement />

        {/* 6. Custom Industry CTA */}
        <IndustryCTA industry={industry} />

        {/* 7. FAQs */}
        <LaunchFAQ />
      </main>

      <LaunchFooter />
    </div>
  );
}
