import React from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/home/HomeHero';
import { HomeTrusted } from './components/home/HomeTrusted';
import { HomeProblem } from './components/home/HomeProblem';
import { HomeSolution } from './components/home/HomeSolution';
import { HomeWhoWeWorkedWith } from './components/home/HomeWhoWeWorkedWith';
import { HomeWhyUs } from './components/home/HomeWhyUs';
import { HomeWhyWeExist } from './components/home/HomeWhyWeExist';
import { HomeContact } from './components/home/HomeContact';
import { HomeServices } from './components/home/HomeServices';
import { HomeCTAStats } from './components/home/HomeCTAStats';
import { HomeTechStack } from './components/home/HomeTechStack';
import { HomeProcess } from './components/home/HomeProcess';
import { HomeTestimonials } from './components/home/HomeTestimonials';
import { LaunchFAQ } from './components/LaunchFAQ';
import { LaunchFooter } from './components/LaunchFooter';
import { LogoIcon } from './components/LogoIcon';

// Exports for back-compatibility with pricing/bundles pages
export { Navbar };
export { LaunchFooter as Footer };
export { LogoIcon };

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden antialiased">
      <Navbar />
      <main>
        <HomeHero />
        <HomeTrusted />
        <HomeProblem />
        <HomeSolution />
        <HomeTechStack />
        <HomeWhoWeWorkedWith />
        <HomeServices />
        <HomeProcess />
        <HomeWhyUs />
        <HomeWhyWeExist />
        <HomeTestimonials />
        <LaunchFAQ />
        <HomeCTAStats />
        <HomeContact />
      </main>
      <LaunchFooter />
    </div>
  );
}
