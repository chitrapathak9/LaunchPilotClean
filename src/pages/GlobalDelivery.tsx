import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { ActionCTA } from '../components/ui/ActionCTA';
import { Globe } from 'lucide-react';

import { DeliveryHero } from '../components/company/DeliveryHero';
import { DeliveryFramework } from '../components/company/DeliveryFramework';
import { DeliverySecurity } from '../components/company/DeliverySecurity';
import { DeliveryHubs } from '../components/company/DeliveryHubs';

export function GlobalDelivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Page Hero */}
        <DeliveryHero />

        {/* 2. The Framework */}
        <DeliveryFramework />

        {/* 3. Security */}
        <DeliverySecurity />

        {/* 4. Global Footprint / Hubs */}
        <DeliveryHubs />

        {/* 5. Custom CTA */}
        <ActionCTA 
          pillText="Global Engineering"
          pillIcon={<Globe size={14} />}
          title={<>Ready to build your <span className="text-blue-600">remote team?</span></>}
          description="Don't let local hiring struggles slow you down. Let's talk about the skills you need and how we can help."
          buttonText="Schedule Your Call"
        />

        {/* 6. FAQs */}
        <LaunchFAQ />
      </main>

      <LaunchFooter />
    </div>
  );
}
