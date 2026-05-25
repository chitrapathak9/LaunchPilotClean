import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientStrip } from './components/ClientStrip';
import { StatsBar } from './components/StatsBar';
import { Industries } from './components/Industries';
import { LaunchValidatorCTA } from './components/LaunchValidatorCTA';
import { Showcase } from './components/Showcase';
import { LaunchHowItWorks } from './components/LaunchHowItWorks';
import { Comparison } from './components/Comparison';
import { LaunchTestimonials } from './components/LaunchTestimonials';
import { LaunchFounder } from './components/LaunchFounder';
import { LaunchPricing } from './components/LaunchPricing';
import { LaunchFAQ } from './components/LaunchFAQ';
import { LaunchFinalCTA } from './components/LaunchFinalCTA';
import { LaunchFooter } from './components/LaunchFooter';
import { LogoIcon } from './components/LogoIcon';

// Exports for back-compatibility with pricing/bundles pages
export { Navbar };
export { LaunchFooter as Footer };
export { LogoIcon };

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-violet-500/20 text-zinc-650 overflow-x-hidden antialiased">
      <Navbar />
      <main>
        <Hero />
        <ClientStrip />
        <StatsBar />
        <Industries />
        <LaunchValidatorCTA />
        <Showcase />
        <LaunchHowItWorks />
        <Comparison />
        <LaunchTestimonials />
        <LaunchFounder />
        <LaunchPricing />
        <LaunchFAQ />
        <LaunchFinalCTA />
      </main>
      <LaunchFooter />
    </div>
  );
}

