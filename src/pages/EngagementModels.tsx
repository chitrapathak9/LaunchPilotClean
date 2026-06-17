import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { ActionCTA } from '../components/ui/ActionCTA';
import { Settings } from 'lucide-react';

import { EngagementHero } from '../components/company/EngagementHero';
import { ServiceEngagement } from '../components/services/ServiceEngagement';
import { EngagementLifecycle } from '../components/company/EngagementLifecycle';

export function EngagementModels() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Page Hero */}
        <EngagementHero />

        {/* 2. Reused Engagement Component (The Cards & Compare Table) */}
        <ServiceEngagement />

        {/* 3. The Custom "How We Scale" Lifecycle block */}
        <EngagementLifecycle />

        {/* 4. Custom CTA */}
        <ActionCTA 
          pillText="Take Action"
          pillIcon={<Settings size={14} />}
          title={<>Ready to scale? <span className="text-emerald-600">Choose your model.</span></>}
          description="Whether you need a quick technical rescue or a dedicated 12-month squad, we have the framework ready."
          buttonText="Discuss Your Needs"
        />

        {/* 5. FAQs */}
        <LaunchFAQ />
      </main>

      <LaunchFooter />
    </div>
  );
}
