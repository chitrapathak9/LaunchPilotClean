import React from 'react';
import { Target, Workflow, Zap, Code2, Activity, LayoutDashboard, Database, CheckCircle2, FolderGit2 } from 'lucide-react';

const sections = [
  {
    step: '01',
    title: 'Deep Business Understanding',
    description:
      "We don't just write code. We spend time understanding your operational bottlenecks, your market, and your goals. By mapping your exact workflow, we ensure the AI solution actually solves a real problem — not a hypothetical one.",
    icon: <Target size={20} />,
    graphic: (
      <div className="w-full h-full bg-gradient-to-br from-ink-50 to-white p-5 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt-100/50 rounded-full blur-[60px]" />
        <div className="bg-white rounded-2xl shadow-card-md border border-ink-100 overflow-hidden flex flex-col w-full h-[300px] relative z-10">
          {/* Header */}
          <div className="h-10 border-b border-ink-100 flex items-center px-4 justify-between bg-ink-50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[10px] font-bold text-ink-500 flex items-center gap-1.5 bg-white px-3 py-1 rounded-md shadow-sm border border-ink-100">
              <Activity size={12} className="text-cobalt-600" />
              Operational Audit Console
            </div>
            <div className="w-10" />
          </div>
          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            <div className="w-[38%] border-r border-ink-100 p-3 flex flex-col gap-3">
              <div className="text-[9px] font-bold text-ink-400 uppercase tracking-widest">Bottlenecks</div>
              <div className="space-y-2">
                <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="text-[10px] font-semibold text-rose-700">Manual Entry (4h/day)</span>
                </div>
                <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-[10px] font-semibold text-amber-700">Support Triage Delay</span>
                </div>
                <div className="p-2 bg-white border border-ink-200 rounded-xl flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 shrink-0" />
                  <span className="text-[10px] font-semibold text-ink-600">Lead Qualification</span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <div className="text-[9px] font-bold text-ink-400 uppercase tracking-widest mb-3">AI Workflow Mapping</div>
              <div className="flex-1 border border-ink-100 bg-ink-50/50 rounded-xl p-3 flex items-center justify-between relative">
                <div className="w-9 h-9 bg-white border border-ink-200 shadow-sm rounded-lg flex items-center justify-center">
                  <Database size={14} className="text-ink-400" />
                </div>
                <div className="flex-1 mx-2 h-px border-t border-dashed border-ink-300" />
                <div className="p-2 bg-cobalt-600 shadow-lg shadow-cobalt-600/25 rounded-xl flex items-center gap-1.5">
                  <Zap size={12} className="text-white fill-white" />
                  <span className="text-[9px] font-bold text-white hidden sm:block">LLM Agent</span>
                </div>
                <div className="flex-1 mx-2 h-px border-t border-ink-300" />
                <div className="w-9 h-9 bg-white border border-emerald-200 shadow-sm rounded-lg flex items-center justify-center ring-2 ring-emerald-500/15">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '02',
    title: 'Architecting the Right Flow',
    description:
      'Once we understand the problem, we map the precise technical direction. We choose the right AI models, databases, and APIs tailored specifically to your needs — ignoring the hype to focus exclusively on what actually works at production scale.',
    icon: <Workflow size={20} />,
    graphic: (
      <div className="w-full h-full bg-ink-50 p-4 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="relative z-10 w-full max-w-[380px] h-full flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none text-ink-200" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
            <path d="M 90 80 Q 160 130 205 130" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M 90 180 Q 160 130 205 130" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M 245 130 L 320 130" stroke="#1A56DB" strokeWidth="2" fill="none" opacity="0.4" />
            <circle cx="0" cy="0" r="3" fill="#1A56DB">
              <animateMotion path="M 90 80 Q 160 130 205 130" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="absolute left-2 top-[22%] w-[110px] bg-white border border-ink-200 rounded-xl p-2 shadow-card flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
              <Database size={11} className="text-emerald-600" />
            </div>
            <span className="text-[10px] font-mono font-bold text-ink-700">Client CRM</span>
          </div>
          <div className="absolute left-2 bottom-[22%] w-[110px] bg-white border border-ink-200 rounded-xl p-2 shadow-card flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
              <Activity size={11} className="text-amber-600" />
            </div>
            <span className="text-[10px] font-mono font-bold text-ink-700">Live API</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[130px] bg-cobalt-50 border border-cobalt-200 shadow-[0_0_24px_rgba(26,86,219,0.12)] rounded-2xl p-3 flex flex-col items-center gap-2">
            <div className="p-1.5 bg-cobalt-600 rounded-lg">
              <Workflow size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-ink-900 tracking-wide text-center">AI Orchestrator</span>
            <div className="px-2 py-0.5 bg-white rounded text-[8px] font-mono font-bold text-cobalt-600 border border-cobalt-100">gpt-4-turbo</div>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[105px] bg-white border border-emerald-200 rounded-xl p-2.5 shadow-card flex flex-col items-center gap-1.5">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <span className="text-[9px] font-bold text-emerald-700 text-center">Production App</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '03',
    title: 'Rapid Enterprise Deployment',
    description:
      'Traditional agencies string you along for months. Our specialized team executes with clarity. Because we defined the right flow from day one, we build and deploy your custom AI solution securely and rapidly — with daily transparency.',
    icon: <Zap size={20} />,
    graphic: (
      <div className="w-full h-full bg-ink-50 p-5 flex items-center justify-center relative overflow-hidden">
        <div className="w-full h-full flex flex-col xl:flex-row gap-4 relative z-10 max-h-full">
          <div className="flex-[3] bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden flex flex-col font-mono text-[10px]">
            <div className="h-8 bg-ink-50 border-b border-ink-100 flex items-center px-3 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-bold text-ink-500">deploy.sh</span>
            </div>
            <div className="p-4 flex flex-col gap-2 text-ink-600 overflow-y-auto font-medium">
              <div className="text-cobalt-600 font-bold">$ yarn launch-ai-infrastructure --prod</div>
              <div>[1/4] Building secure VPC network... <span className="text-emerald-600 font-bold">Done</span></div>
              <div>[2/4] Provisioning Vector DB... <span className="text-emerald-600 font-bold">Done</span></div>
              <div className="flex items-center gap-2">
                [3/4] Deploying edge functions...
                <span className="w-3 h-3 border-2 border-cobalt-600 border-t-transparent rounded-full animate-spin shrink-0" />
              </div>
            </div>
          </div>
          <div className="flex-[2] bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden flex flex-col shrink-0">
            <div className="p-3 border-b border-ink-100 flex items-center justify-between bg-ink-50">
              <span className="text-[10px] font-bold text-ink-600 uppercase tracking-wider">Live Status</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span className="font-bold text-ink-500">API Latency</span>
                  <span className="font-mono font-bold text-ink-700">42ms</span>
                </div>
                <div className="w-full h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span className="font-bold text-ink-500">Success Rate</span>
                  <span className="font-mono font-bold text-ink-700">99.99%</span>
                </div>
                <div className="w-full h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div className="w-[99%] h-full bg-cobalt-500 rounded-full" />
                </div>
              </div>
              <div className="mt-auto p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span className="text-[9px] font-bold text-emerald-800 leading-tight">Production environment deployed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '04',
    title: '100% Code Ownership',
    description:
      'You are never locked into proprietary platforms. From day one, you own the IP and the codebase. We transfer everything to you, ensuring your business has a fully scalable asset that your internal team can maintain, extend, and scale indefinitely.',
    icon: <Code2 size={20} />,
    graphic: (
      <div className="w-full h-full bg-ink-50 p-5 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-100/50 rounded-full blur-[70px]" />
        <div className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden flex flex-col w-full h-[300px] relative z-10">
          <div className="h-10 bg-ink-50 border-b border-ink-100 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex text-ink-400 text-[10px] font-mono gap-3 font-bold">
                <span className="text-ink-700 bg-white px-2 py-0.5 rounded shadow-sm border border-ink-200">launch_ai_app.py</span>
                <span className="py-0.5">config.ts</span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-[35%] max-w-[130px] bg-ink-50/50 border-r border-ink-100 p-3 font-mono text-[10px] font-bold text-ink-600 flex flex-col gap-2">
              <div className="text-[8px] font-extrabold text-ink-400 uppercase mb-1 tracking-wider">Explorer</div>
              <div className="flex items-center gap-1.5 text-ink-700"><FolderGit2 size={12} className="text-cobalt-500 shrink-0" /><span className="truncate">src</span></div>
              <div className="flex items-center gap-1.5 pl-3"><span className="text-cobalt-500">TS</span><span className="truncate">index.ts</span></div>
              <div className="flex items-center gap-1.5 pl-3 bg-cobalt-50 text-cobalt-900 py-0.5 -ml-1 pl-4 border-l-2 border-cobalt-500"><span className="text-cobalt-600">PY</span><span className="truncate text-ink-800">app.py</span></div>
              <div className="flex items-center gap-1.5 pl-3"><span className="text-rose-500">{'{ }'}</span><span className="truncate">package.json</span></div>
            </div>
            <div className="flex-1 bg-white p-4 font-mono font-bold text-[10px] leading-relaxed relative overflow-hidden">
              <div><span className="text-cobalt-600">import</span> <span className="text-ink-800">os</span></div>
              <div><span className="text-cobalt-600">from</span> <span className="text-ink-800">langchain.agents</span> <span className="text-cobalt-600">import</span> <span className="text-teal-600">AgentExecutor</span></div>
              <br />
              <div className="text-emerald-600 bg-emerald-50 px-1 rounded w-fit"># 100% Client Owned Infrastructure</div>
              <div><span className="text-cobalt-600">def</span> <span className="text-amber-600">initialize_custom_ai</span><span className="text-ink-800">():</span></div>
              <div className="pl-4 text-ink-800">api_key = os.environ.get(<span className="text-amber-700">'OWNED_KEY'</span>)</div>
              <div className="pl-4"><span className="text-purple-600">return</span> <span className="text-teal-600">AgentExecutor</span>(api_key)</div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-ink-950 text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 shadow-xl border border-ink-800">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  Full IP Transferred
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function HomeSolution() {
  return (
    <section className="section-2xl bg-canvas-warm">
      <div className="container-content">

        {/* Section header */}
        <div className="mb-20 lg:mb-28 max-w-[740px]">
          <div className="section-overline">How We Work</div>
          <h2 className="heading-display mt-1">
            From concept to production <br />
            <span className="text-ink-400 font-medium">with zero friction.</span>
          </h2>
          <p className="body-xl text-ink-500 mt-5 max-w-[520px]">
            A precise, repeatable framework that takes you from vague idea to production-grade AI infrastructure — without the endless discovery cycles.
          </p>
        </div>

        {/* Alternating sections */}
        <div className="space-y-28 lg:space-y-36">
          {sections.map((section, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <div
                    className="inline-block font-display font-bold text-ink-100 leading-none select-none mb-6"
                    style={{ fontSize: '5rem' }}
                  >
                    {section.step}
                  </div>
                  <h3 className="heading-xl text-ink-900 mb-5">{section.title}</h3>
                  <p className="body-xl text-ink-500 leading-relaxed max-w-[480px]">
                    {section.description}
                  </p>
                </div>

                {/* Graphic */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-card-lg border border-ink-100 group">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.015]">
                      {section.graphic}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
