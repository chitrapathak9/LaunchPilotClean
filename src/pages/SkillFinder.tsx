import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCcw,
  Sparkles,
  Layers,
  Terminal,
  Star,
  Users,
  BarChart,
  Rocket,
  Map as MapIcon,
  Library
} from 'lucide-react';

const SKILLS_DB = {
  'saas-builder': { id: 'saas-builder', title: 'SaaS Builder Skill', desc: 'Full-stack SaaS with auth, billing, and dashboards.', icon: <Layers size={24} />, price: 9 },
  'ios-builder': { id: 'ios-builder', title: 'iOS Builder Skill', desc: 'SwiftUI apps with backend integration.', icon: <Terminal size={24} />, price: 9 },
  'taste-design': { id: 'taste-design', title: 'Taste & Design Skill', desc: 'Pixel-perfect UI systems and styling.', icon: <Star size={24} />, price: 9 },
  'humanizer': { id: 'humanizer', title: 'Humanizer Skill', desc: 'AI copy that reads human.', icon: <Users size={24} />, price: 9 },
  'shadcn-dashboard': { id: 'shadcn-dashboard', title: 'shadcn Dashboard', desc: 'Admin panels with shadcn/ui components.', icon: <BarChart size={24} />, price: 9 },
  'guerrilla-marketing': { id: 'guerrilla-marketing', title: 'Guerrilla Marketing', desc: 'Viral growth + launch strategy playbook.', icon: <Rocket size={24} />, price: 9 },
  'seo-optimizer': { id: 'seo-optimizer', title: 'SEO Optimizer', desc: 'Technical SEO + structured data.', icon: <MapIcon size={24} />, price: 9 },
  'landing-page-builder': { id: 'landing-page-builder', title: 'Landing Page Builder', desc: 'High-converting marketing pages.', icon: <Library size={24} />, price: 9 },
};

const QUESTIONS = [
  {
    id: 'building',
    title: '🤔 What are you building?',
    options: [
      { id: 'saas', icon: '🏗️', label: 'SaaS Product', desc: 'Web app with auth, billing, dashboard' },
      { id: 'mobile', icon: '📱', label: 'Mobile App', desc: 'iOS or Android native app' },
      { id: 'landing-page', icon: '🛬', label: 'Landing Page', desc: 'High-converting marketing page' },
      { id: 'marketplace', icon: '🛒', label: 'Marketplace', desc: 'Buyers + sellers platform' },
      { id: 'content', icon: '📝', label: 'Content / Blog', desc: 'Newsletter, media or blog platform' },
      { id: 'ai-app', icon: '🤖', label: 'AI-powered App', desc: 'AI features at the core' },
    ]
  },
  {
    id: 'stage',
    title: '📍 Where are you right now?',
    options: [
      { id: 'idea', icon: '💡', label: 'Just an idea', desc: 'Haven\'t started building yet' },
      { id: 'plan', icon: '🗺️', label: 'I have a plan', desc: 'Ready to build the MVP' },
      { id: 'building', icon: '🔧', label: 'Already building', desc: 'Partway through the build' },
      { id: 'launch', icon: '🚀', label: 'Ready to launch', desc: 'Product exists, need users' },
    ]
  },
  {
    id: 'aiTool',
    title: '🤖 Which AI coding tool do you use?',
    options: [
      { id: 'claude', icon: '', label: 'Claude Code', desc: '' },
      { id: 'cursor', icon: '', label: 'Cursor', desc: '' },
      { id: 'lovable', icon: '', label: 'Lovable', desc: '' },
      { id: 'replit', icon: '', label: 'Replit', desc: '' },
      { id: 'bolt', icon: '', label: 'Bolt / v0', desc: '' },
      { id: 'not-sure', icon: '', label: 'Not sure yet', desc: '' },
    ]
  },
  {
    id: 'challenge',
    title: '😤 What\'s your biggest blocker right now?',
    options: [
      { id: 'fast', icon: '🧱', label: 'Building fast', desc: 'Takes too long to get things done' },
      { id: 'design', icon: '🎨', label: 'Design quality', desc: 'My UI looks bad and amateurish' },
      { id: 'getting-users', icon: '📣', label: 'Getting users', desc: 'No one knows I exist' },
      { id: 'content', icon: '✍️', label: 'Content & copy', desc: 'My writing sounds like a robot' },
      { id: 'seo', icon: '🔍', label: 'SEO & traffic', desc: 'Can\'t rank on Google' },
      { id: 'paid', icon: '💰', label: 'Getting paid', desc: 'Auth, billing, subscriptions' },
    ]
  },
  {
    id: 'budget',
    title: '💸 What\'s your budget for tools?',
    options: [
      { id: 'under-20', icon: '🪙', label: 'Under $20', desc: 'Just starting out' },
      { id: '20-50', icon: '💵', label: '$20 – $50', desc: 'Ready to invest in the right tools' },
      { id: '50-100', icon: '💳', label: '$50 – $100', desc: 'Serious builder' },
      { id: '100-plus', icon: '🏦', label: '$100+', desc: 'I want everything right now' },
    ]
  }
];

function getRecommendations(answers: Record<string, string>): string[] {
  const skills: string[] = [];

  // Q1 — What are you building
  if (answers.building === 'saas') skills.push('saas-builder', 'shadcn-dashboard');
  if (answers.building === 'mobile') skills.push('ios-builder');
  if (answers.building === 'landing-page') skills.push('landing-page-builder');
  if (answers.building === 'ai-app') skills.push('saas-builder');

  // Q4 — Biggest challenge
  if (answers.challenge === 'design') skills.push('taste-design');
  if (answers.challenge === 'getting-users') skills.push('guerrilla-marketing');
  if (answers.challenge === 'content') skills.push('humanizer');
  if (answers.challenge === 'seo') skills.push('seo-optimizer');

  // Fallbacks if nothing matched well
  if (skills.length === 0) skills.push('saas-builder', 'landing-page-builder', 'guerrilla-marketing');

  // Deduplicate and limit to top 3
  return [...new Set(skills)].slice(0, 3);
}

function PageHero() {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          🎯 Skill Finder
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">
          Not sure which skill you need?
        </h1>
        <p className="max-w-7xl mx-auto px-6 lg:px-8">
          Answer 5 quick questions and we'll recommend the exact skills for what you're building.
          Takes less than 2 minutes.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById('quiz-container');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#8B5CF6] text-white font-bold px-8 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/20 inline-flex items-center gap-2"
        >
          Start the Quiz <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export function SkillFinder() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resultsQuery = queryParams.get('results');

  const [step, setStep] = useState(1); // 1-5 for questions, 6 for results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommended, setRecommended] = useState<string[]>([]);

  // Check if loaded with results in URL
  useEffect(() => {
    if (resultsQuery) {
      setRecommended(resultsQuery.split(','));
      setStep(6);
    }
  }, [resultsQuery]);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Calculate results
      const recs = getRecommendations(answers);
      setRecommended(recs);
      navigate(`/skill-finder?results=${recs.join(',')}`, { replace: true });
      setStep(6);
    }
  };

  const handleBack = () => {
    if (step > 1 && step <= 5) {
      setStep(step - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(1);
    navigate('/skill-finder', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Results State
  if (step === 6) {
    const bestMatch = SKILLS_DB[recommended[0] as keyof typeof SKILLS_DB];
    const alsoRecommended = recommended.slice(1).map(id => SKILLS_DB[id as keyof typeof SKILLS_DB]);

    return (
      <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
        <Navbar />
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">🎯 Your Recommended Skills</h2>
              <p className="text-slate-500 text-center mb-10">Based on your answers, here is what you need:</p>

              {/* Best Match */}
              {bestMatch && (
                <div className="mb-6 relative">
                  <div className="absolute -top-3 left-6 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 shadow-lg flex items-center gap-1">
                    ⭐ Best Match
                  </div>
                  <div className="bg-slate-50 border-2 border-[#F59E0B] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                          <span className="text-[#8B5CF6]">{bestMatch.icon}</span> {bestMatch.title}
                        </h3>
                        <p className="text-slate-600 text-sm">{bestMatch.desc}</p>
                      </div>
                      <Link to={`/skills/${bestMatch.id}`} className="bg-[#F59E0B] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#D97706] transition-colors whitespace-nowrap w-full sm:w-auto text-center shrink-0 shadow-md">
                        Get this — ${bestMatch.price} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Also Recommended */}
              {alsoRecommended.length > 0 && (
                <div className="mb-10">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Also recommended</h4>
                  <div className="space-y-4">
                    {alsoRecommended.map(skill => (
                      <div key={skill.id} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[#8B5CF6] shrink-0">{skill.icon}</span>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{skill.title}</h4>
                            <p className="text-xs text-slate-500">{skill.desc}</p>
                          </div>
                        </div>
                        <Link to={`/skills/${skill.id}`} className="bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#8B5CF6] hover:bg-white font-bold px-4 py-2 rounded-lg transition-colors text-xs whitespace-nowrap w-full sm:w-auto text-center shrink-0">
                          Get this — ${skill.price} &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upsell Bundle */}
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-xl shadow-[#8B5CF6]/30 mb-8">
                <div className="absolute top-2 left-2 bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  🔥 Bundle Deal
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-4">Builder Bundle</h3>
                <p className="text-white/80 mb-6 max-w-sm mx-auto">Get all recommended skills + any other skill for just $29 (save up to $18).</p>
                <Link to="/pricing" className="bg-white text-[#0F172A] font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors inline-block w-full sm:w-auto shadow-lg">
                  Get Builder Bundle &rarr;
                </Link>
              </div>

              <div className="text-center">
                <button onClick={resetQuiz} className="text-[#64748B] hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 mx-auto">
                  <RefreshCcw size={14} /> Retake quiz
                </button>
              </div>

            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render Quiz Question State
  const currentQuestion = QUESTIONS[step - 1];
  const progressPercent = (step / 5) * 100;
  const currentAnswer = answers[currentQuestion.id];
  const canProceed = !!currentAnswer;

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />

        <section id="quiz-container" className="pb-24 px-6 bg-[#FAF9F6] pt-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100">
                <div
                  className="h-full bg-[#8B5CF6] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-6">
                  Step {step} of 5
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 leading-snug">
                  {currentQuestion.title}
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentAnswer === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(currentQuestion.id, opt.id)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${isSelected
                          ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                      >
                        {opt.icon && (
                          <div className="text-2xl shrink-0 leading-none">
                            {opt.icon}
                          </div>
                        )}
                        <div>
                          <div className={`font-bold mb-1 ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                            {opt.label}
                          </div>
                          {opt.desc && (
                            <div className={`text-xs ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                              {opt.desc}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="ml-auto text-[#8B5CF6]">
                            <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                  <button
                    onClick={handleBack}
                    className={`font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 ${step > 1
                      ? 'text-slate-700 hover:bg-slate-50 border border-slate-200'
                      : 'text-transparent pointer-events-none'
                      }`}
                  >
                    <ArrowLeft size={18} /> Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${canProceed
                      ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/20'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {step === 5 ? 'See my results' : 'Next'} <ArrowRight size={18} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
