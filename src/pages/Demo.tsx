import React, { useState, useEffect } from 'react';
import { 
  IconSparkles, 
  IconCheck, 
  IconLock, 
  IconRocket, 
  IconDownload, 
  IconCreditCard, 
  IconActivity, 
  IconTrendingUp, 
  IconAlertTriangle, 
  IconArrowRight, 
  IconLayersSubtract, 
  IconAlertCircle,
  IconArrowUpRight,
  IconClock,
  IconUserCheck
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoIcon } from '../components/LogoIcon';
import { analyzeIdea } from '../lib/gemini';
import type { AnalysisResult } from '../lib/gemini';

// Interactive Pipeline Steps
const PIPELINE_STEPS = [
  'Analyzing startup canvas...',
  'Calculating addressable market size...',
  'Simulating competitor threat matrix...',
  'Compiling recommended tech stack...',
  'Mapping 21-day MVP roadmap milestones...',
  'Finalizing viability evaluation...'
];

export function Demo() {
  // Rate limits tracking (exactly 1 free validation limit)
  const [hasValidated, setHasValidated] = useState<boolean>(() => {
    return localStorage.getItem('launchpilot_validated') === 'true';
  });

  // Upgrade status
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('launchpilot_premium') === 'true' || 
           localStorage.getItem('launchpilot_user_plan') === 'starter' ||
           localStorage.getItem('launchpilot_user_plan') === 'builder' ||
           localStorage.getItem('launchpilot_user_plan') === 'full-arsenal';
  });

  // Modal overlays
  const [showPaywall, setShowPaywall] = useState(false);

  // 5 Strategic Essential Fields State (Optimized for quick response & no fatigue)
  const [fields, setFields] = useState({
    idea: 'AI-powered legal contract automation for boutique law firms and freelance consultants.',
    industry: 'AI',
    problem: 'Manual contract drafting takes 5-10 billable hours per agreement. Slow cycle times delay sales closures.',
    features: 'SOC2-compliant PDF secure upload, clause risk highlighter, multi-party comments diff, instant automated NDAs.',
    budget: '$5,000 - $10,000'
  });

  // Execution Flow states
  const [running, setRunning] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');
  const [currentReport, setCurrentReport] = useState<AnalysisResult | null>(null);

  // Default starter mock report for backup
  const initialMockReport: AnalysisResult = {
    marketOpportunity: {
      summary: "A premium AI-native contract review workspace solving critical manual delays. Captures high transactional legal tech value in a massive market.",
      tam: "$28.5 Billion",
      sam: "$4.2 Billion",
      som: "$850 Million",
      cagr: "14.2% YoY growth",
      keyTrends: [
        "Rapid adoption of LLMs in legal compliance",
        "Shift toward fixed-fee boutique legal consultations",
        "Increased focus on remote document signature security"
      ]
    },
    targetAudience: {
      primary: "Boutique law firms and freelance contract attorneys",
      secondary: "Corporate HR leads and operations managers",
      painPoints: ["High hourly legal review overheads", "Contract validation latency", "Lack of audit trails"],
      demographics: "Independent attorneys & tech-forward law firms in North America and EMEA."
    },
    competitorAnalysis: [
      { name: "Ironclad Enterprise", threat: "High", pct: 75, weakness: "Enterprise-only pricing, extremely complex setup for boutique agencies" },
      { name: "Luminance AI", threat: "Medium", pct: 45, weakness: "Heavy desktop orientation, poor custom integrations" }
    ],
    risks: [
      { title: "Legal Liability Accuracy", level: "High", mitigation: "Clear legal disclaimers, dual human-in-the-loop audit mode." },
      { title: "Data Security Compliance", level: "Medium", mitigation: "Store files locally on AWS GovCloud with SOC2 standard encryption." }
    ],
    mvpFeatures: [
      { feature: "Secure Client Document Upload & Encryption", priority: "Must-Have", effort: "Low" },
      { feature: "AI Risk Engine (Redline Highlights)", priority: "Critical", effort: "Medium" },
      { feature: "Interactive Diff & Clause Editor Workspace", priority: "Should-Have", effort: "High" }
    ],
    launchStrategy: {
      phase1: { name: "Private Beta Launch", actions: ["Invite 10 select law firm partners", "Collect raw performance logs"] },
      phase2: { name: "Public Launch Strategy", actions: ["SEO push on contract automation tools", "Direct cold email campaigns"] },
      phase3: { name: "Scale Operations", actions: ["Partner with SaaS startups directories", "Release developer APIs"] },
      channels: [
        { channel: "Organic Legal Tech Directories", score: 8.5, rationale: "Highly targeted audience with high budget readiness" },
        { channel: "LinkedIn Cold Outreach", score: 9.0, rationale: "Direct contact with partners and decision makers" }
      ]
    }
  };

  // Handle Form Submission with Serialized Prompt
  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cost control check
    if (hasValidated && !isPremium) {
      setShowPaywall(true);
      return;
    }

    setRunning(true);
    setError('');
    setCurrentReport(null);
    setLoadingStep(0);

    // Simulated loading timeline
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    try {
      // Compiled simplified prompt to speed up OpenAI response
      const serializedPrompt = `
Startup Idea: ${fields.idea}
Industry: ${fields.industry}
Problem: ${fields.problem}
Features: ${fields.features}
Budget: ${fields.budget}

Please perform a swift validation check. Focus on high MVP actionability. Be concise.
      `.trim();

      const analysisResult = await analyzeIdea(serializedPrompt);
      setCurrentReport(analysisResult);
      
      if (!isPremium) {
        localStorage.setItem('launchpilot_validated', 'true');
        setHasValidated(true);
      }

    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred during startup validation. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-violet-500/20 text-zinc-650 overflow-x-hidden antialiased">
      
      {/* NAV BAR */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 font-bold text-xl text-zinc-900 tracking-tight">
              <LogoIcon className="w-7 h-7 text-violet-600" />
              <span>LaunchAIPilot</span>
            </a>
            <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
            <span className="text-xs bg-violet-50 border border-violet-200 text-violet-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Idea Validator Studio
            </span>
          </div>

          <div>
            <a 
              href="/#contact" 
              className="bg-violet-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:bg-violet-500 transition-all duration-200 shadow-sm"
            >
              Book a free call
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* HEADER STATEMENT */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-violet-600 tracking-wider uppercase bg-violet-50 border border-violet-200 rounded-full px-3 py-1 mb-4 inline-block">
            Founder MVP Planning Engine
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-none mb-6">
            Investor-Grade AI <br />
            <span className="text-violet-600">
              Startup Idea Validator
            </span>
          </h1>
          <p className="text-base text-zinc-655 font-semibold leading-relaxed max-w-2xl mx-auto">
            Stop building products without market validation. Supply our structured model with your core startup details and receive an immediate viability audit, tech recommendations, and cost breakdown.
          </p>
        </div>

        {/* WORKSPACE COLUMN SETS */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 5-FIELD STRUCTURED FORM */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/[0.02] blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <IconSparkles className="text-violet-600" size={20} />
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Startup Concept details</h3>
                </div>
                <span className="text-[10px] bg-zinc-50 border border-zinc-200 text-zinc-550 font-bold px-2.5 py-1 rounded-lg">
                  {isPremium ? 'PRO MODE' : hasValidated ? '0 Free Runs Left' : '1 Free Run Available'}
                </span>
              </div>

              <form onSubmit={handleValidate} className="space-y-4">
                
                {/* FIELD 1: STARTUP CONCEPT */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    1. Startup Idea Concept
                  </label>
                  <textarea
                    value={fields.idea}
                    onChange={(e) => setFields({ ...fields, idea: e.target.value })}
                    required
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 text-sm font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder-zinc-400 resize-none"
                    placeholder="Describe your core product or services..."
                  />
                </div>

                {/* TWO COLUMN: FIELD 2 & 5 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* FIELD 2: INDUSTRY */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                      2. Industry
                    </label>
                    <select
                      value={fields.industry}
                      onChange={(e) => setFields({ ...fields, industry: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-sm font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                    >
                      {['SaaS', 'HealthTech', 'AdTech', 'FinTech', 'FoodTech', 'AI', 'E-commerce', 'EdTech'].map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* FIELD 5: BUDGET RANGE */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                      3. Target Budget
                    </label>
                    <select
                      value={fields.budget}
                      onChange={(e) => setFields({ ...fields, budget: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-sm font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                    >
                      {['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* FIELD 3: PROBLEM */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    4. Problem Being Solved
                  </label>
                  <textarea
                    value={fields.problem}
                    onChange={(e) => setFields({ ...fields, problem: e.target.value })}
                    required
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 text-sm font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder-zinc-400 resize-none"
                    placeholder="What friction do you solve?"
                  />
                </div>

                {/* FIELD 4: FEATURES */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    5. Key MVP Features
                  </label>
                  <textarea
                    value={fields.features}
                    onChange={(e) => setFields({ ...fields, features: e.target.value })}
                    required
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 text-sm font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder-zinc-400 resize-none"
                    placeholder="Describe main components of the MVP..."
                  />
                </div>

                {/* RUN SUBMIT */}
                <button
                  type="submit"
                  disabled={running}
                  className="mt-6 w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2.5 transition-all shadow-md shadow-violet-600/10 disabled:opacity-55 border border-violet-500/20"
                >
                  {running ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Validating Concept...</span>
                    </>
                  ) : (
                    <>
                      <IconSparkles size={16} />
                      <span>{hasValidated && !isPremium ? 'Unlock Pro to Re-analyze' : 'Run Startup Analysis'}</span>
                    </>
                  )}
                </button>
                {error && (
                  <div className="mt-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-start gap-2.5">
                    <IconAlertCircle className="shrink-0 mt-0.5" size={16} />
                    <span className="text-xs leading-normal font-semibold">{error}</span>
                  </div>
                )}
              </form>
            </div>

            {/* LOADERPipeline STATUS */}
            {running && (
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 text-left">
                  <IconActivity className="text-violet-655 animate-pulse" size={18} />
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Analysis Pipeline Execution</span>
                </div>

                <div className="space-y-3 text-left font-semibold">
                  {PIPELINE_STEPS.map((s, idx) => {
                    const isDone = idx < loadingStep;
                    const isActive = idx === loadingStep;
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isDone ? 'bg-emerald-50 border border-emerald-250 text-emerald-600' :
                          isActive ? 'bg-violet-50 border border-violet-200 text-violet-600' :
                          'bg-zinc-50 border border-zinc-200 text-zinc-400'
                        }`}>
                          {isDone ? <IconCheck size={11} strokeWidth={4} /> :
                           isActive ? <div className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-ping" /> :
                           <span className="text-[9px] font-bold">{idx + 1}</span>}
                        </div>
                        <span className={`text-xs ${
                          isDone ? 'text-zinc-400 line-through' :
                          isActive ? 'text-zinc-800' : 'text-zinc-500'
                        }`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: VALUATION BREAKDOWN DISPLAY */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Loader skeleton if wait state */}
            {!currentReport && !running && (
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center mb-6">
                  <IconActivity className="text-zinc-400" size={28} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Startup Analysis Engine Offline</h3>
                <p className="text-sm text-zinc-550 font-semibold max-w-sm">
                  Input your startup concept on the left and run analysis to compile your custom validation score, tech stack, and risk mitigations.
                </p>
                <button
                  onClick={() => setCurrentReport(initialMockReport)}
                  className="mt-6 text-xs text-violet-600 hover:text-violet-755 font-bold flex items-center gap-1.5 border border-zinc-200 px-4 py-2 rounded-xl bg-white hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <IconSparkles size={13} />
                  Load Default Demo Report
                </button>
              </div>
            )}

            {/* LIVE VALUATION REPORT DISPLAY */}
            {currentReport && !running && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* GAUGE HERO SUMMARY */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-48 h-48 bg-violet-600/[0.01] blur-3xl pointer-events-none" />
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] bg-emerald-50 border border-emerald-255 text-emerald-700 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                      Free Report Activated
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-900 mt-1">Validation Audit</h2>
                    <p className="text-xs text-zinc-455 font-bold">Analysis Date: {new Date().toLocaleDateString()} · ID: VAL-{(fields.idea.length * 17) % 10000}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-zinc-50/50 border border-zinc-200 p-4 rounded-2xl shrink-0">
                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="transparent" stroke="#e4e4e7" strokeWidth="6" />
                        <circle cx="32" cy="32" r="28" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray={175} strokeDashoffset={175 - (175 * 84) / 100} strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-sm font-extrabold text-zinc-900">84%</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider">Viability Score</p>
                      <p className="text-sm font-bold text-emerald-600">High Traction Potential</p>
                      <p className="text-[10px] text-zinc-500 font-semibold">Pre-Seed Ready</p>
                    </div>
                  </div>
                </div>

                {/* 1. EXECUTIVE SUMMARY */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm text-left">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <IconSparkles size={16} className="text-violet-600" />
                    1. Executive Summary
                  </h3>
                  <p className="text-sm text-zinc-650 leading-relaxed font-semibold">
                    {currentReport.marketOpportunity.summary}
                  </p>
                </div>

                {/* 3. MARKET OPPORTUNITY */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm text-left space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <IconTrendingUp size={16} className="text-violet-600" />
                    3. Market Size & Opportunity
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'TAM (Total)', value: currentReport.marketOpportunity.tam },
                      { label: 'SAM (Serviceable)', value: currentReport.marketOpportunity.sam },
                      { label: 'SOM (Obtainable)', value: currentReport.marketOpportunity.som }
                    ].map(m => (
                      <div key={m.label} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center">
                        <span className="block text-[9px] text-zinc-455 font-bold uppercase tracking-wider mb-1 leading-normal">{m.label}</span>
                        <span className="text-sm font-bold text-zinc-800">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold border-b border-zinc-200 pb-2">
                      <span className="text-zinc-555">Projected Market Growth</span>
                      <span className="text-emerald-600">{currentReport.marketOpportunity.cagr || '12.8% CAGR'}</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider mb-2">Market Acceleration Trends</p>
                      <ul className="space-y-1.5">
                        {currentReport.marketOpportunity.keyTrends.map((t, idx) => (
                          <li key={idx} className="text-xs text-zinc-655 font-semibold flex items-start gap-2">
                            <span className="text-violet-600 font-bold text-xs mt-0.5">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. MVP FEATURE PRIORITIES */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm text-left space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <IconRocket size={16} className="text-violet-600" />
                    4. Core MVP Recommended Scope
                  </h3>
                  <p className="text-xs text-zinc-455 font-semibold leading-normal">
                    LaunchPilot recommended technical scope optimized for cost-efficient product validation:
                  </p>
                  
                  <div className="space-y-2.5">
                    {currentReport.mvpFeatures.map((f, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-zinc-800">{f.feature}</span>
                          <div className="flex gap-2">
                            <span className="text-[9px] bg-violet-55 border border-violet-200 text-violet-600 px-2 py-0.5 rounded font-bold uppercase">
                              {f.priority}
                            </span>
                            <span className="text-[9px] bg-zinc-200 text-zinc-550 px-2 py-0.5 rounded font-bold uppercase">
                              Build Effort: {f.effort}
                            </span>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center shrink-0">
                          <IconCheck size={12} strokeWidth={3} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. TECH STACKS & 6 & 7 TIMELINE & BUDGET GRIDS */}
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  
                  {/* RECOMMENDED TECH STACK */}
                  <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                      <IconLayersSubtract size={16} className="text-violet-600" />
                      5. Developer Tech Stack
                    </h3>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
                      <div>
                        <span className="block text-[10px] text-zinc-450 font-bold uppercase tracking-wider mb-1">Architecture Format</span>
                        <span className="text-xs text-zinc-850 font-bold">Web Application Suite</span>
                      </div>
                      <div className="h-px bg-zinc-200" />
                      <div>
                        <span className="block text-[10px] text-zinc-455 font-bold uppercase tracking-wider mb-2">Recommended Stack</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['Next.js (React)', 'Tailwind CSS', 'Supabase (DB & Auth)', 'Stripe API', 'Vercel'].map((item) => (
                            <span key={item} className="text-[10px] bg-white border border-zinc-200 text-zinc-700 font-bold px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TIMELINE & BUDGET */}
                  <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                      <IconClock size={16} className="text-violet-600" />
                      6 & 7. Milestones & Budget
                    </h3>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-455 font-bold uppercase tracking-wider font-semibold">Milestone timeline</span>
                        <span className="text-violet-600 font-bold bg-violet-50 border border-violet-200 px-2 py-0.5 rounded uppercase">
                          21 Days Delivery
                        </span>
                      </div>
                      <div className="h-px bg-zinc-200" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-455 font-bold uppercase tracking-wider font-semibold">Fixed Agency Pricing</span>
                        <span className="text-emerald-600 font-extrabold text-sm">
                          {fields.budget === '$1,000 - $5,000' ? '$4,900 Starter' : '$9,900 Full Suite'}
                        </span>
                      </div>
                      <div className="h-px bg-zinc-200" />
                      <p className="text-[10px] text-zinc-450 font-semibold leading-normal">
                        *Guarantees 100% intellectual property source code ownership.
                      </p>
                    </div>
                  </div>

                </div>

                {/* 8. EXECUTION RISKS */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm text-left space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <IconAlertTriangle size={16} className="text-violet-600" />
                    8. Critical Startup Execution Risks
                  </h3>
                  
                  <div className="space-y-3">
                    {currentReport.risks.map((r, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col md:flex-row justify-between gap-3 text-left">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-800">{r.title}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                              r.level === 'High' ? 'bg-red-50 border border-red-205 text-red-600' :
                              'bg-amber-50 border border-amber-200 text-amber-600'
                            }`}>
                              Risk: {r.level}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 font-semibold leading-normal">
                            <strong className="text-zinc-655">Mitigation: </strong>{r.mitigation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 9. EXPERT VERDICT */}
                <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-100 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/[0.02] blur-3xl pointer-events-none" />
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <IconUserCheck size={16} className="text-violet-600" />
                    9. Investor Expert Verdict
                  </h3>
                  <p className="text-sm text-zinc-655 leading-relaxed font-semibold">
                    This concept holds solid commercial viability. The primary risk lies in validation delivery latency. We strongly recommend building a streamlined Web application MVP scoped exclusively around high-priority features. Launching a restricted private cohort inside 21 days will generate the necessary transactional traction data to de-risk investment and secure strategic growth rounds.
                  </p>
                </div>

                {/* LOCKED PREMIUM 10 SECTIONS SUMMARY PREVIEW */}
                <div className="bg-zinc-50/50 border border-zinc-200 rounded-3xl p-6 space-y-6 relative overflow-hidden">
                  
                  {/* Padlock blur overlay */}
                  <div className="absolute inset-x-0 bottom-0 top-16 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/95 to-transparent backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 bg-violet-50 border border-violet-200 rounded-2xl flex items-center justify-center mb-4 text-violet-600 shadow-sm">
                      <IconLock size={22} className="animate-bounce" />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-2">Unlock Full Investor-Grade Analysis</h4>
                    <p className="text-xs text-zinc-555 font-bold max-w-md mb-6 leading-relaxed">
                      Your free report covers baseline market metrics. Upgrade to PRO to reveal advanced marketing playbooks, scalable architectures, and 5-year financials.
                    </p>
                    
                    {/* TRIPLE CTA SUITE */}
                    <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl">
                      {/* CTA 1: UNLOCK REPORT */}
                      <a 
                        href="/checkout?plan=builder-bundle&price=49"
                        className="bg-violet-600 hover:bg-violet-500 text-white rounded-2xl p-4 flex flex-col items-center justify-between text-center gap-3 transition-all shadow-lg shadow-violet-600/20 border border-violet-500/30"
                      >
                        <div className="text-left w-full">
                          <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">RECOMMENDED</span>
                          <h5 className="text-xs font-bold text-white mt-1.5">Unlock Full Report</h5>
                        </div>
                        <p className="text-[10px] text-white/80 leading-snug font-semibold">Instant access to 10 locked segments & PDF export.</p>
                        <span className="text-sm font-extrabold text-white mt-1 flex items-center gap-1.5">
                          $49 One-Time <IconArrowUpRight size={14} />
                        </span>
                      </a>

                      {/* CTA 2: BOOK STRATEGY CALL */}
                      <a 
                        href="mailto:contact@launchaipilot.com"
                        className="bg-white hover:bg-zinc-50 text-zinc-700 rounded-2xl p-4 flex flex-col items-center justify-between text-center gap-3 border border-zinc-300 transition-all shadow-sm"
                      >
                        <div className="text-left w-full">
                          <span className="text-[9px] bg-zinc-100 text-zinc-550 px-2 py-0.5 rounded font-bold uppercase tracking-wider">STRATEGY</span>
                          <h5 className="text-xs font-bold text-zinc-800 mt-1.5">Book Strategy Call</h5>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-semibold leading-snug">Review details directly with an experienced startup builder.</p>
                        <span className="text-xs font-bold text-violet-600 mt-1 flex items-center gap-1">
                          Email Strategy Team <IconArrowUpRight size={14} />
                        </span>
                      </a>

                      {/* CTA 3: BUILD MVP IN 21 DAYS */}
                      <a 
                        href="/bundles" 
                        className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl p-4 flex flex-col items-center justify-between text-center gap-3 border border-zinc-800 transition-all shadow-md relative"
                      >
                        <div className="absolute top-0 right-0 w-8 h-8 bg-white/[0.05] blur-md rounded-full pointer-events-none" />
                        <div className="text-left w-full">
                          <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">AGENCY</span>
                          <h5 className="text-xs font-bold text-white mt-1.5">Get MVP in 21 Days</h5>
                        </div>
                        <p className="text-[10px] text-white/80 font-semibold leading-snug">Let LaunchPilot build your structured validation MVP.</p>
                        <span className="text-xs font-bold text-violet-400 mt-1 flex items-center gap-1">
                          Ship Fixed MVP <IconArrowUpRight size={14} />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Fake Locked Item Fields */}
                  <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
                    <IconLock className="text-violet-600/50" size={16} />
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Locked Premium Workspace (10 Sections)</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'Advanced GTM Strategy', desc: 'Direct outreach lists, landing page templates, and product hook ideas.' },
                      { title: 'Investor Readiness Score', desc: 'Breakdowns of seed investment eligibility, key metrics target formulas.' },
                      { title: 'AI Scaling Opportunities', desc: 'How to scale your platform and features using smart assistant helpers.' },
                      { title: 'Full Technical Architecture', desc: 'Complete architecture map detailing databases, worker nodes, and security.' },
                      { title: 'Revenue Forecast', desc: '5-year mathematical modeling table based on conversion rates.' },
                      { title: 'Competitor Breakdown', desc: 'In-depth analysis of weaknesses, funding history, and feature gaps.' },
                      { title: 'Growth Roadmap', desc: 'Quarterly feature deployment milestone calendars for the scaling phase.' },
                      { title: 'Hiring Recommendations', desc: 'Core engineer hire structures, salary metrics, and key skill requirements.' },
                      { title: 'Launch Strategy', desc: 'Day-by-day cohort checklist for Product Hunt, HackerNews, and directories.' },
                      { title: 'Market Entry Plan', desc: 'Tactical localized regulatory strategy for medical, fintech, and adtech.' }
                    ].map((locked) => (
                      <div key={locked.title} className="bg-white border border-zinc-200 p-4 rounded-2xl flex items-start gap-3 select-none">
                        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 shrink-0">
                          <IconLock size={15} />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-zinc-800">{locked.title}</h5>
                          <p className="text-[10px] text-zinc-400 leading-normal blur-[1.5px]">{locked.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-cream border-t border-zinc-200 py-16 text-zinc-555 text-xs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div className="space-y-4 text-left">
              <a href="/" className="flex items-center gap-2 font-bold text-base text-zinc-900 tracking-tight">
                <LogoIcon className="w-5 h-5 text-violet-600" />
                LaunchAIPilot
              </a>
              <p className="text-zinc-500 font-semibold leading-relaxed">
                Building premium, production-ready MVPs in 21 days under fixed-price contracts. Ahmedabad, India.
              </p>
            </div>

            <div className="text-left space-y-3">
              <h4 className="text-zinc-900 font-bold uppercase tracking-wider text-[10px]">Validator Hub</h4>
              <p className="text-zinc-555 leading-relaxed font-semibold">
                Helping serious founders stress-test, structure, and refine their products so they can launch with total confidence.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-zinc-900 font-bold uppercase tracking-wider text-[10px] mb-4">Jump To</h4>
              <ul className="space-y-2 font-semibold">
                <li><a href="/" className="hover:text-zinc-900 transition-colors">Main Agency Website</a></li>
                <li><a href="/#pricing" className="hover:text-zinc-900 transition-colors">Pricing Packages</a></li>
                <li><a href="/#faq" className="hover:text-zinc-900 transition-colors">FAQ & Support</a></li>
              </ul>
            </div>

            <div className="text-left space-y-2">
              <h4 className="text-zinc-900 font-bold uppercase tracking-wider text-[10px] mb-3">Clarity Session</h4>
              <a 
                href="mailto:contact@launchaipilot.com"
                className="text-violet-600 hover:text-violet-500 font-bold inline-flex items-center gap-1 text-[11px]"
              >
                Schedule Free Consultation →
              </a>
            </div>

          </div>

          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 font-semibold">
            <div>
              © 2026 LaunchAIPilot. All rights reserved. Registered trademark of LaunchPilot Clean.
            </div>
            <div>
              Designed for serious founders. Premium aesthetics built with React & Tailwind CSS.
            </div>
          </div>
        </div>
      </footer>

      {/* PAYWALL BLOCKED OVERLAY */}
      <AnimatePresence>
        {showPaywall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-left"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 pb-3">
                <IconLock className="text-violet-600" size={18} />
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Free Generation Limit Reached</h3>
              </div>
              <p className="text-xs text-zinc-655 font-semibold mb-6 leading-relaxed">
                You have successfully executed your <strong>1 free startup validation run</strong>. To analyze another startup concept or unlock advanced competitor analysis and financial modeling, please choose an upgrade option.
              </p>

              <div className="space-y-3 mb-6">
                <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center shrink-0">
                    <IconCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Full 19-Section Report Upgrade</p>
                    <p className="text-[10px] text-zinc-550 font-semibold">Unlocks Advanced GTM, hiring plans, revenue modeling.</p>
                  </div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-250 text-violet-600 flex items-center justify-center shrink-0">
                    <IconDownload size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Unlimited PDF Asset Downloads</p>
                    <p className="text-[10px] text-zinc-550 font-semibold">High-resolution investor-ready PDFs for decks.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPaywall(false)}
                  className="bg-zinc-100 hover:bg-zinc-50 border border-zinc-200 text-zinc-650 rounded-xl py-3 text-xs font-bold transition-all text-center shrink-0 px-4"
                >
                  Close
                </button>
                <a
                  href="/checkout?plan=builder-bundle&price=49"
                  className="grow bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-3 text-xs font-bold transition-all text-center shadow-md shadow-violet-600/10 border border-violet-500/20 flex items-center justify-center gap-2"
                >
                  <IconCreditCard size={14} />
                  Unlock Pro Access ($49)
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
