import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { LaunchFAQ } from '../components/LaunchFAQ';
import { SolutionHero } from '../components/solutions/SolutionHero';
import { SolutionReality } from '../components/solutions/SolutionReality';
import { SolutionEdgeCases } from '../components/solutions/SolutionEdgeCases';
import { SolutionRevenueLoss } from '../components/solutions/SolutionRevenueLoss';
import { solutions } from '../data/solutions';

export function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full overflow-hidden">
        {/* 1. Mini Hero */}
        <SolutionHero solution={solution} />

        {/* 2. The industry reality (Problem with other Agency) */}
        <SolutionReality solution={solution} />

        {/* 3. Deep Industry Edge Cases (Healthcare, Ad Tech, etc) */}
        <SolutionEdgeCases solution={solution} />

        {/* 4. Cost of Inaction / Strong CTA */}
        <SolutionRevenueLoss />

        {/* 5. FAQs */}
        <LaunchFAQ />
      </main>

      <LaunchFooter />
    </div>
  );
}
