import React, { useState } from 'react';
import { Sparkles, Check, Activity } from 'lucide-react';
import { Navbar, Footer } from '../App';
import { analyzeIdea } from '../lib/gemini';
import type { AnalysisResult } from '../lib/gemini';

const DEMO_STEPS = [
  'Parsing startup concept',
  'Running market sizing models',
  'Mapping competitor landscape',
  'Generating MVP feature roadmap',
  'Building launch strategy',
];

function ResultTabs({ result }: { result: AnalysisResult }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Analysis', 'Market', 'Roadmap'];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-1 p-1.5 border-b border-slate-100 bg-slate-50/50">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === i
              ? 'bg-white text-[#8B5CF6] shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
              }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-5 min-h-[300px]">
        {activeTab === 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={14} className="text-[#8B5CF6]" /> Executive Summary
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">{result.marketOpportunity.summary}</p>
          </div>
        )}
        {activeTab === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-sm font-bold text-slate-900">Market Size Estimates</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: 'TAM', v: result.marketOpportunity.tam },
                { l: 'SAM', v: result.marketOpportunity.sam },
                { l: 'SOM', v: result.marketOpportunity.som }
              ].map(x => (
                <div key={x.l} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="text-xs font-bold text-slate-400 mb-1">{x.l}</div>
                  <div className="text-sm font-semibold text-slate-700">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-sm font-bold text-slate-900">MVP Priorities</h4>
            <ul className="space-y-2">
              {result.mvpFeatures.slice(0, 4).map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <span className="font-semibold text-[#8B5CF6]">{f.priority}</span>
                  {f.feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveDemo() {
  const [input, setInput] = useState('AI-powered legal document automation for SMBs');
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);

  const run = async () => {
    if (!input.trim() || running) return;
    setRunning(true);
    setDone(false);
    setError('');
    setResult(null);

    let currentStep = 0;
    setStep(currentStep);
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < DEMO_STEPS.length) {
        setStep(currentStep);
      } else {
        clearInterval(interval);
      }
    }, 1500);

    try {
      const res = await analyzeIdea(input);
      setResult(res);
      setDone(true);
      setStep(DEMO_STEPS.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed.');
    } finally {
      setRunning(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-3">Startup Concept</div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setDone(false); setStep(-1); setResult(null); setError(''); }}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium resize-none focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all placeholder-slate-400"
            placeholder="Describe your startup idea…"
          />
          <button
            onClick={run}
            disabled={running}
            className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {running ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                {done ? 'Re-analyze Idea' : 'Run AI Analysis'}
              </>
            )}
          </button>
          {error && <p className="mt-3 text-red-500 text-xs font-medium">{error}</p>}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Analysis Pipeline</div>
          <div className="space-y-3">
            {DEMO_STEPS.map((s, i) => {
              const isDone = done || i < step;
              const isActive = !done && i === step;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isDone ? 'bg-emerald-100 text-emerald-600' :
                    isActive ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                    {isDone ? <Check size={12} strokeWidth={3} /> :
                      isActive ? <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse" /> :
                        <span className="text-[10px] font-bold">{i + 1}</span>}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${isDone ? 'text-slate-400' :
                    isActive ? 'text-slate-900' :
                      'text-slate-400'
                    }`}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {result ? (
          <ResultTabs result={result} />
        ) : (
          <div className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex items-center justify-center transition-all ${running ? 'opacity-50' : 'opacity-100'}`}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-100">
                <Activity className="text-slate-300" size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-400">Waiting for input...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#8B5CF6]/20 text-slate-800">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">See LaunchPilot in action</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Type any startup idea below and watch our AI instantly generate a market analysis and MVP roadmap.
            </p>
          </div>
          <InteractiveDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
}
