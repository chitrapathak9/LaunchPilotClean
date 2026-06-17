import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { HomeProcess } from '../components/home/HomeProcess';
import { HomeTechStack } from '../components/home/HomeTechStack';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { HomeCTAStats } from '../components/home/HomeCTAStats';
import { ServiceHero } from '../components/services/ServiceHero';
import { ServiceOverview } from '../components/services/ServiceOverview';
import { ServiceReality } from '../components/services/ServiceReality';
import { ServiceEngagement } from '../components/services/ServiceEngagement';
import { ServiceWhyUs } from '../components/services/ServiceWhyUs';
import { services } from '../data/services';

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the matching service by slug
  const service = services.find((s) => s.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If invalid slug, redirect to home
  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-ink-900 overflow-x-hidden antialiased">
      <Navbar />
      
      <main>
        {/* 1. Mini Hero */}
        <ServiceHero service={service} />

        {/* 1.5. Overview / Marketing content */}
        <ServiceOverview service={service} />

        {/* 2. The industry reality (Problem with other Agency) */}
        <ServiceReality service={service} />

        {/* 3. Why Hire Us (Chaos vs Clarity) */}
        <ServiceWhyUs />

        {/* 4. Engagement Models & Comparison */}
        <ServiceEngagement />

        {/* 5. Our process */}
        <HomeProcess />

        {/* 6. Our capabilities (Enterprise Tech Stack) */}
        <HomeTechStack />

        {/* 7. FAQs */}
        <LaunchFAQ />

        {/* 8. CTA */}
        <HomeCTAStats />
      </main>

      {/* 7. Footer */}
      <LaunchFooter />
    </div>
  );
}
