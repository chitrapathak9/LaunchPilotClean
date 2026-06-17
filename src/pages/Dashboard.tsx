import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  TrendingUp,
  CreditCard,
  Calendar,
  Settings,
  ArrowRight,
  X,
  Download,
  Plus,
  Search,
  Filter,
  Trash2,
  Share2,
  Lock,
  CheckCircle2,
  Activity,
  User,
  Copy,
  PlusCircle,
  DollarSign,
  AlertCircle,
  UserCheck,
  ExternalLink,
  ChevronDown,
  CopyCheck,
  Check,
  Info,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { SKILLS_DB, Skill } from './SkillsCatalog';


/* ── Typings ── */
interface StartupReport {
  id: string;
  name: string;
  industry: string;
  idea: string;
  problem: string;
  features: string;
  budget: string;
  timeline: string;
  platform: string;
  experience: string;
  score: number;
  date: string;
  status: 'Draft' | 'Validated' | 'Under Review';
  tam: string;
  sam: string;
  som: string;
  cagr: string;
  competitors: Array<{ name: string; threat: 'High' | 'Medium' | 'Low'; weakness: string }>;
  risks: Array<{ title: string; level: 'High' | 'Medium' | 'Low'; mitigation: string }>;
  verdict: string;
}

/* ── Initial Premium Saved Reports Mockup (Rich Data) ── */
const INITIAL_REPORTS: StartupReport[] = [
  {
    id: 'rep-medconnect',
    name: 'MedConnect AI',
    industry: 'HealthTech',
    idea: 'Automated patient intake, medical scribing, and secure clinical charting using HIPAA-compliant voice LLMs.',
    problem: 'Clinicians spend 3-4 hours daily on manual clinical charting, leading to burnout and administrative backlog.',
    features: 'Secure voice scribing microphone, automated SOAP note parser, EHR draft synchronizer, clinical term validator.',
    budget: '$10,000 - $25,000',
    timeline: '30 Days',
    platform: 'Mobile App',
    experience: 'Senior Engineer',
    score: 87,
    date: 'May 24, 2026',
    status: 'Validated',
    tam: '$45.2 Billion',
    sam: '$6.8 Billion',
    som: '$950 Million',
    cagr: '16.5% YoY',
    competitors: [
      { name: 'Nuance DAX', threat: 'High', weakness: 'Enterprise cost-prohibitive for boutique practitioners' },
      { name: 'Suki AI', threat: 'Medium', weakness: 'Rigid note templates, poor legacy EHR integrations' }
    ],
    risks: [
      { title: 'HIPAA Data Compliance', level: 'High', mitigation: 'Zero-retention APIs, SOC2 cloud vault, end-to-end data encryption' },
      { title: 'Acoustic Scribe Noise', level: 'Medium', mitigation: 'Acoustic filter models, background speech suppression algorithms' }
    ],
    verdict: 'High-viability market entry. Focusing on boutique physical therapy and chiropractic clinics offers low customer acquisition costs.'
  },
  {
    id: 'rep-finflow',
    name: 'FinFlow Audit',
    industry: 'FinTech',
    idea: 'Automated transaction reconciliation and real-time ledger accounting audits for e-commerce multi-store owners.',
    problem: 'Multi-store e-commerce brands lose 2% of revenue due to gateway fees mismatches and chargebacks delays.',
    features: 'Multi-store gateway aggregator, real-time fee auditor, disputed transactions redlining, accounting export.',
    budget: '$5,000 - $10,005',
    timeline: '21 Days',
    platform: 'Web App',
    experience: 'Product Manager',
    score: 76,
    date: 'May 20, 2026',
    status: 'Validated',
    tam: '$28.4 Billion',
    sam: '$3.5 Billion',
    som: '$420 Million',
    cagr: '12.8% YoY',
    competitors: [
      { name: 'TaxJar Auto-reconcile', threat: 'Medium', weakness: 'Focused strictly on tax filings, ignores fee discrepancies' },
      { name: 'Quickbooks Advanced', threat: 'High', weakness: 'Requires manual import rules, lacks native Shopify API sync' }
    ],
    risks: [
      { title: 'API Sync Latency', level: 'Medium', mitigation: 'Robust background syncing queues, fallback webhook receivers' },
      { title: 'Accounting Precision', level: 'High', mitigation: 'Dual-entry audit ledger engine, strict validation constraints' }
    ],
    verdict: 'Excellent MVP fit. High customer urgency due to direct cost-savings. Target Shopify and Stripe integrations first.'
  },
  {
    id: 'rep-adpilot',
    name: 'AdPilot Optimizer',
    industry: 'AdTech',
    idea: 'AI-driven programmatic ad campaign budget optimization and instant multivariate ad copy variant generation.',
    problem: 'Startup marketing teams waste 35% of ad budgets due to slow ad creative fatigue detection and manually tuned bids.',
    features: 'Automated ad creative rotation, real-time CPA triggers, AI headline builder, programmatic dashboard.',
    budget: '$5,000 - $10,000',
    timeline: '21 Days',
    platform: 'Web App',
    experience: 'Non-Technical Founder',
    score: 82,
    date: 'May 15, 2026',
    status: 'Validated',
    tam: '$60.5 Billion',
    sam: '$8.2 Billion',
    som: '$1.1 Billion',
    cagr: '14.2% YoY',
    competitors: [
      { name: 'AdEspresso', threat: 'High', weakness: 'Heavy legacy interface, slow campaign sync' },
      { name: 'Revealbot', threat: 'Medium', weakness: 'Requires complex custom logical rules, not AI-native' }
    ],
    risks: [
      { title: 'Ad Network Bans', level: 'High', mitigation: 'Pre-moderation filter checking policy compliance before live push' },
      { title: 'Spend Spikes', level: 'Medium', mitigation: 'Strict daily budget hard caps set in campaign handlers' }
    ],
    verdict: 'High traction vector. The instant multivariate creative builder is the highest value prop. Deliver via a simple SaaS dashboard.'
  },
  {
    id: 'rep-edupulse',
    name: 'EduPulse AI',
    industry: 'EdTech',
    idea: 'Interactive visual storytelling and voice-narrated educational quiz games for children with sensory reading challenges.',
    problem: 'Standard screen reading portals fail to adapt to neurodiverse learning styles, triggering visual fatigue.',
    features: 'Dynamic color-contrast tuner, interactive acoustic phonetic feedback, AI visual context generator.',
    budget: '$5,000 - $10,000',
    timeline: '30 Days',
    platform: 'Web App',
    experience: 'Junior Developer',
    score: 89,
    date: 'May 12, 2026',
    status: 'Validated',
    tam: '$18.6 Billion',
    sam: '$2.1 Billion',
    som: '$380 Million',
    cagr: '11.4% YoY',
    competitors: [
      { name: 'Duolingo ABC', threat: 'High', weakness: 'Rigid layout progression, lacks custom voice phonetic parsing' },
      { name: 'Epic Reading', threat: 'Medium', weakness: 'Static PDF library with zero accessibility customization' }
    ],
    risks: [
      { title: 'Sensory Calibration', level: 'Medium', mitigation: 'Design checks with licensed child occupational therapists' },
      { title: 'Child Safety Privacy', level: 'High', mitigation: 'COPPA-compliant, local voice capture caching with zero-retention' }
    ],
    verdict: 'Sensory audio playground viability is high. Deliver a simple web-browser trial version focused on immediate visual engagement.'
  },
  {
    id: 'rep-greenscale',
    name: 'GreenScale Carbon',
    industry: 'AI',
    idea: 'Automated API-first supply chain scope 3 carbon tracking ledger and real-time offsets checkout system.',
    problem: 'Enterprise buyers spend months collecting shipping emissions data to fulfill compliance audits.',
    features: 'Scope 3 database mapping API, shipping route carbon calculator, automated green verification certificates.',
    budget: '$25,000+',
    timeline: '60 Days',
    platform: 'Web + Mobile',
    experience: 'Senior Engineer',
    score: 91,
    date: 'May 08, 2026',
    status: 'Validated',
    tam: '$52.8 Billion',
    sam: '$7.4 Billion',
    som: '$1.2 Billion',
    cagr: '18.2% YoY',
    competitors: [
      { name: 'Watershed', threat: 'High', weakness: 'Extremely high yearly retainer limits target strictly Fortune 500' },
      { name: 'EcoVadis audits', threat: 'Medium', weakness: 'Primarily a human survey auditor, zero live API integrations' }
    ],
    risks: [
      { title: 'Ledger Audit Security', level: 'High', mitigation: 'Publicly auditable cryptography nodes, ISO-compliant data schemas' },
      { title: 'API Integration Rates', level: 'Medium', mitigation: 'Built-in support checklists and plug-and-play Shopify widgets' }
    ],
    verdict: 'Excellent Scope 3 logistics high-ticket validator. Scoped perfectly for B2B API integrations.'
  }
];

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  /* ── State Handlers ── */
  const [reports, setReports] = useState<StartupReport[]>(() => {
    const saved = localStorage.getItem('launchpilot_saved_reports');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_REPORTS;
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('launchpilot_wishlist');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('launchpilot_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const [selectedReport, setSelectedReport] = useState<StartupReport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');
  
  // Custom screen overlays & feedback systems
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);
  const [selectedCreditTier, setSelectedCreditTier] = useState<number>(3); // Default to 3 Credits bundle

  /* ── Admin Leads Panel State & Functions ── */
  interface Lead {
    id: string;
    name: string;
    email: string;
    type: 'contact' | 'booking' | 'newsletter';
    details: Record<string, any>;
    created_at: string;
  }
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQueryLeads, setSearchQueryLeads] = useState('');
  const [typeFilterLeads, setTypeFilterLeads] = useState('All');
  const [leadsError, setLeadsError] = useState('');

  const fetchLeads = async () => {
    if (user?.email !== 'launchpilotai41@gmail.com') return;
    setLoadingLeads(true);
    setLeadsError('');
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setLeadsError(err.message || 'Failed to load leads from Supabase.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setLeads(prev => prev.filter(l => l.id !== id));
      showToast('Lead deleted successfully.');
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete lead.');
    }
  };

  useEffect(() => {
    if (activeTab === 'leads' && user?.email === 'launchpilotai41@gmail.com') {
      fetchLeads();
    }
  }, [activeTab, user]);


  /* New Validation Wizard Fields - 10 Fields */
  const [wizardFields, setWizardFields] = useState({
    name: '',
    idea: '',
    industry: 'SaaS',
    problem: '',
    audience: '',
    features: '',
    goal: 'Product Validation',
    budget: '$5,000 - $10,000',
    timeline: '21 Days',
    platform: 'Web App',
    experience: 'Non-Technical Founder'
  });

  const [running, setRunning] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const PIPELINE_STEPS = [
    'Analyzing startup canvas and core variables...',
    'Calculating addressable market size (TAM, SAM, SOM)...',
    'Simulating competitor threat matrix & SWOT deficiencies...',
    'Compiling recommended tech stack & third-party integrations...',
    'Mapping 21-day MVP roadmap milestones & budget limits...',
    'Finalizing viability evaluation and expert verdict...'
  ];

  /* Strategy Booking Fields */
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ name: user?.name || '', email: user?.email || '', concept: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  /* Profile Settings Fields */
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [passwordFields, setPasswordFields] = useState({ current: '', newPassword: '', confirm: '' });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  /* Persist Reports in LocalStorage */
  useEffect(() => {
    localStorage.setItem('launchpilot_saved_reports', JSON.stringify(reports));
  }, [reports]);

  /* Handle Share Link Copy */
  const handleShare = (reportId: string) => {
    const shareUrl = `${window.location.origin}/demo?report=${reportId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(reportId);
      showToast('Shareable review link copied to clipboard!');
      setTimeout(() => setCopiedLink(null), 2000);
    });
  };

  /* Show floating screen notification toasts */
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  /* Handle Report Deletion */
  const handleDeleteReport = (reportId: string) => {
    if (confirm('Are you sure you want to permanently delete this validation report?')) {
      setReports(reports.filter(r => r.id !== reportId));
      showToast('Validation report deleted successfully.');
    }
  };

  /* Handle Duplicate Validation Report */
  const handleDuplicateReport = (report: StartupReport) => {
    const dupId = 'rep-dup-' + Math.random().toString(36).substring(2, 9);
    const duplicated: StartupReport = {
      ...report,
      id: dupId,
      name: `${report.name} (Duplicate)`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setReports([duplicated, ...reports]);
    showToast(`Duplicated ${report.name} successfully!`);
  };

  /* Handle New Validation Submission */
  const handleExecuteValidation = (e: React.FormEvent) => {
    e.preventDefault();
    setRunning(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    setTimeout(() => {
      clearInterval(stepInterval);
      
      const newScore = Math.floor(Math.random() * (92 - 72 + 1)) + 72;
      const randId = 'rep-' + Math.random().toString(36).substring(2, 9);
      
      const newReport: StartupReport = {
        id: randId,
        name: wizardFields.name || 'Startup Proj',
        industry: wizardFields.industry,
        idea: wizardFields.idea,
        problem: wizardFields.problem,
        features: wizardFields.features,
        budget: wizardFields.budget,
        timeline: wizardFields.timeline,
        platform: wizardFields.platform,
        experience: wizardFields.experience,
        score: newScore,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Validated',
        tam: `$${(Math.random() * 40 + 20).toFixed(1)} Billion`,
        sam: `$${(Math.random() * 8 + 3).toFixed(1)} Billion`,
        som: `$${(Math.random() * 800 + 200).toFixed(0)} Million`,
        cagr: `${(Math.random() * 5 + 11).toFixed(1)}% YoY`,
        competitors: [
          { name: `${wizardFields.name} Competitor A`, threat: 'High', weakness: 'Enterprise cost-prohibitive' },
          { name: `${wizardFields.name} Competitor B`, threat: 'Medium', weakness: 'Lacks native AI integrations' }
        ],
        risks: [
          { title: 'Validation Speed', level: 'High', mitigation: 'Build a light MVP inside ' + wizardFields.timeline },
          { title: 'User Acquisition', level: 'Medium', mitigation: 'Focus on high targeted cold email marketing' }
        ],
        verdict: `Solid concept with strong viability score of ${newScore}%. Scoped perfectly inside ${wizardFields.timeline} targeting a ${wizardFields.platform} with a ${wizardFields.budget} budget. High traction potential.`
      };

      setReports([newReport, ...reports]);
      setRunning(false);
      setSearchParams({ tab: 'reports' });
      showToast('AI Startup Validation Report created successfully!');
      
      // Reset wizard fields
      setWizardFields({
        name: '',
        idea: '',
        industry: 'SaaS',
        problem: '',
        audience: '',
        features: '',
        goal: 'Product Validation',
        budget: '$5,000 - $10,000',
        timeline: '21 Days',
        platform: 'Web App',
        experience: 'Non-Technical Founder'
      });
    }, 8000);
  };

  /* Filter Reports */
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.idea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || r.industry === industryFilter;
    const matchesScore = scoreFilter === 'All' || 
                         (scoreFilter === 'High' && r.score >= 80) || 
                         (scoreFilter === 'Medium' && r.score < 80);
    return matchesSearch && matchesIndustry && matchesScore;
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 select-none font-sans text-slate-700">
        
        {/* Floating toast notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-[#8B5CF6] text-white px-5 py-3 rounded-2xl flex items-center gap-3.5 shadow-xl shadow-[#8B5CF6]/20 animate-in slide-in-from-top-6 duration-200">
            <CheckCircle2 size={16} className="text-white shrink-0" />
            <span className="text-xs font-bold tracking-wide leading-none">{toastMessage}</span>
          </div>
        )}

        {/* ─── TAB 1: COCKPIT DASHBOARD ─── */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, {user?.name || 'Alex'}.
                </h1>
                <p className="text-slate-500 text-xs font-semibold mt-1">
                  Your next startup insight is one validation away.
                </p>
              </div>
              <button
                onClick={() => setSearchParams({ tab: 'new-validation' })}
                className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white rounded-xl px-5 py-3 text-xs font-bold transition-all shadow-md shadow-[#8B5CF6]/15 border border-[#8B5CF6]/10 flex items-center justify-center gap-2"
              >
                <Plus size={14} strokeWidth={3} />
                Generate New Report
              </button>
            </div>

            {/* Usage Stats Grid (Premium White-Card Spacing & Soft shadows) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Reports Generated', value: reports.length, desc: 'Investor-ready files', icon: FileText },
                { label: 'Remaining Credits', value: user?.plan === 'full-arsenal' ? 'Unlimited' : '3 / 5', desc: 'Resets June 25', icon: Sparkles },
                { label: 'Current Plan', value: user?.plan === 'full-arsenal' ? 'Full Pro' : 'Builder Bundle', desc: 'Paid Sandbox Tier', icon: CreditCard },
                { label: 'Last Validation Date', value: reports.length > 0 ? reports[0].date : 'N/A', desc: 'Recent audit schedule', icon: Calendar }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white border border-slate-200/70 rounded-2xl p-5 text-left hover:border-slate-350 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md duration-300">
                    <div className="flex justify-between items-start">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</span>
                      <Icon size={14} className="text-slate-400 group-hover:text-[#8B5CF6] transition-colors" />
                    </div>
                    <div className="mt-3">
                      <span className="text-xl font-bold text-slate-900 block leading-tight">{stat.value}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{stat.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Saved Reports Grid */}
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="text-[#8B5CF6]" size={16} />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Validation Reports</h3>
                </div>
                <button
                  onClick={() => setSearchParams({ tab: 'reports' })}
                  className="text-[#8B5CF6] hover:text-[#7c4ee4] text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  View All Reports <ArrowRight size={12} />
                </button>
              </div>

              {reports.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-slate-400 text-xs font-bold">No startup validation reports saved yet.</p>
                  <button 
                    onClick={() => setSearchParams({ tab: 'new-validation' })}
                    className="text-[#8B5CF6] hover:underline text-xs font-semibold"
                  >
                    Click here to run your first report &rarr;
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reports.slice(0, 4).map((rep) => (
                    <div 
                      key={rep.id}
                      className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left flex flex-col justify-between hover:border-slate-350 hover:shadow-md transition-all group duration-300"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <span className="bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-200/50">
                              {rep.industry}
                            </span>
                            {/* Color coded status badge with bullet */}
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 text-[8px] font-bold uppercase tracking-wide">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              {rep.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-semibold">{rep.date}</span>
                            <span className="text-xs font-extrabold text-[#8B5CF6]">{rep.score}% score</span>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">{rep.name}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 font-semibold">{rep.idea}</p>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                        <button
                          onClick={() => setSelectedReport(rep)}
                          className="text-xs text-slate-800 group-hover:text-[#8B5CF6] font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          View Report <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedReport(rep);
                              setTimeout(() => alert('Stripe Pro Upgrade Required: PDF downloading is a Premium feature.'), 200);
                            }}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                            title="Download PDF"
                          >
                            <Download size={12} />
                          </button>
                          <button
                            onClick={() => handleDuplicateReport(rep)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                            title="Duplicate Validation"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            onClick={() => handleShare(rep.id)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                            title="Copy share link"
                          >
                            {copiedLink === rep.id ? <CopyCheck size={12} className="text-green-600" /> : <Share2 size={12} />}
                          </button>
                          <button
                            onClick={() => handleDeleteReport(rep.id)}
                            className="p-1.5 bg-slate-50 hover:bg-red-50 border border-slate-200/60 rounded-lg text-slate-400 hover:text-red-600 transition-all"
                            title="Delete report"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dual CTAs Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Upgrade CTA */}
              <div className="bg-gradient-to-br from-[#8B5CF6]/[0.03] via-white to-white border border-[#8B5CF6]/20 rounded-3xl p-6 text-left flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block">
                    Premium Upgrade
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Unlock Investor-Grade Pro Tools</h3>
                  
                  {/* Premium Bullet checklist of locked features */}
                  <div className="space-y-2 py-1 font-semibold text-slate-655 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#8B5CF6]" />
                      <span>5-Year Monetization & SaaS Financial Forecasts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#8B5CF6]" />
                      <span>Competitor Weaknesses SWOT & Threats Index</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#8B5CF6]" />
                      <span>Unlimited Validation Audits (Full Command access)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSearchParams({ tab: 'billing' })}
                  className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold py-3 text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#8B5CF6]/10 border border-[#8B5CF6]/20"
                >
                  <Lock size={13} />
                  Upgrade to Pro Workspace
                </button>
              </div>

              {/* Consultation CTA */}
              <div className="bg-white border border-slate-200/70 rounded-3xl p-6 text-left flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block">
                    1-on-1 strategy
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Need expert guidance?</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                    Book a 1-on-1 startup strategy session to refine your MVP, roadmap, and launch plan directly with a senior technical founder.
                  </p>
                </div>
                <button
                  onClick={() => setSearchParams({ tab: 'strategy-call' })}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all border border-slate-200 hover:border-slate-350"
                >
                  <Calendar size={13} />
                  Book Strategy Call
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ─── TAB 2: MY REPORTS LIST ─── */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="text-left space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Audits Library</h1>
              <p className="text-slate-550 text-xs font-semibold">Browse, search, and duplicate your compiled validation reports.</p>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
              
              {/* Search bar */}
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                />
              </div>

              {/* Select filters */}
              <div className="flex gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                  <Filter size={12} className="text-slate-400" />
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="bg-transparent border-0 text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Industries</option>
                    {['SaaS', 'HealthTech', 'AdTech', 'FinTech', 'AI', 'EdTech'].map(ind => (
                      <option key={ind} value={ind} className="bg-white">{ind}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                  <TrendingUp size={12} className="text-slate-400" />
                  <select
                    value={scoreFilter}
                    onChange={(e) => setScoreFilter(e.target.value)}
                    className="bg-transparent border-0 text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Scores</option>
                    <option value="High" className="bg-white">High (&gt;80%)</option>
                    <option value="Medium" className="bg-white">Medium (&lt;80%)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Reports List Grid */}
            {filteredReports.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
                <p className="text-slate-400 text-xs font-bold">No validation reports match your search filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setIndustryFilter('All'); setScoreFilter('All'); }}
                  className="text-[#8B5CF6] hover:underline text-xs font-semibold"
                >
                  Reset all filters &rarr;
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="bg-white border border-slate-200/60 rounded-2xl p-5 hover:border-slate-350 hover:shadow-md transition-all flex flex-col justify-between text-left group duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200/50 rounded">
                          {rep.industry}
                        </span>
                        <span className="text-xs font-extrabold text-[#8B5CF6]">{rep.score}% score</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2 truncate">{rep.name}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6 font-semibold">{rep.idea}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="text-xs text-slate-800 group-hover:text-[#8B5CF6] font-bold inline-flex items-center gap-1.5 transition-all"
                      >
                        View Report <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedReport(rep);
                            setTimeout(() => alert('Stripe Pro Upgrade Required: PDF downloading is a Premium feature.'), 200);
                          }}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                          title="Download PDF"
                        >
                          <Download size={11} />
                        </button>
                        <button
                          onClick={() => handleDuplicateReport(rep)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                          title="Duplicate Validation"
                        >
                          <Copy size={11} />
                        </button>
                        <button
                          onClick={() => handleShare(rep.id)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                          title="Copy share link"
                        >
                          {copiedLink === rep.id ? <CopyCheck size={11} className="text-green-600" /> : <Share2 size={11} />}
                        </button>
                        <button
                          onClick={() => handleDeleteReport(rep.id)}
                          className="p-1.5 bg-slate-50 hover:bg-red-50 border border-slate-200/60 rounded-lg text-slate-400 hover:text-red-650 transition-all"
                          title="Delete report"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ─── TAB 3: NEW STARTUP VALIDATION WIZARD (10 Fields Form) ─── */}
        {activeTab === 'new-validation' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Audit a Startup Concept</h1>
              <p className="text-slate-550 text-xs font-semibold">Feed our AI model with your concept metrics to compile an immediate validation assessment.</p>
            </div>

            {running ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-2xl flex items-center justify-center mx-auto text-[#8B5CF6]">
                  <Activity className="animate-pulse" size={28} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Analyzing Startup Canvas</h3>
                  <p className="text-slate-500 text-xs font-semibold">Building addressable market size matrices and executing competitor threat simulation...</p>
                </div>

                <div className="max-w-md mx-auto space-y-3.5 text-left border border-slate-200 p-5 rounded-2xl bg-slate-50">
                  {PIPELINE_STEPS.map((s, idx) => {
                    const isDone = idx < loadingStep;
                    const isActive = idx === loadingStep;
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isDone ? 'bg-green-50 border border-green-200 text-green-600' :
                          isActive ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] animate-pulse' :
                          'bg-slate-100 border border-slate-200 text-slate-400'
                        }`}>
                          {isDone ? <Check size={11} strokeWidth={4} /> :
                           isActive ? <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-ping" /> :
                           <span className="text-[9px] font-bold">{idx + 1}</span>}
                        </div>
                        <span className={`text-xs ${
                          isDone ? 'text-slate-455 line-through font-medium' :
                          isActive ? 'text-slate-800 font-bold' : 'text-slate-400'
                        }`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-2 text-[10px] text-slate-450 font-bold uppercase tracking-wider">Estimated completion: {(8 - loadingStep * 1.2).toFixed(0)}s</div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                
                <form onSubmit={handleExecuteValidation} className="space-y-5">
                  
                  {/* Field 1: Startup Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">1. Startup Concept Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MedConnect AI"
                      value={wizardFields.name}
                      onChange={(e) => setWizardFields({ ...wizardFields, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Field 2 & 3: Industry & Goal (Business Goal) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">2. Industry Category</label>
                      <select
                        value={wizardFields.industry}
                        onChange={(e) => setWizardFields({ ...wizardFields, industry: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all cursor-pointer"
                      >
                        {['SaaS', 'HealthTech', 'AdTech', 'FinTech', 'AI', 'FoodTech', 'E-commerce', 'EdTech'].map(i => (
                          <option key={i} value={i} className="bg-white">{i}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">3. Business Goal</label>
                      <select
                        value={wizardFields.goal}
                        onChange={(e) => setWizardFields({ ...wizardFields, goal: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all cursor-pointer"
                      >
                        {['Product Validation', 'Pre-seed Funding', 'Launch Prep', 'Audience Growth'].map(g => (
                          <option key={g} value={g} className="bg-white">{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 4: Startup Idea Concept */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">4. Startup Idea (Core Value Proposal)</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Describe what services or products your platform delivers..."
                      value={wizardFields.idea}
                      onChange={(e) => setWizardFields({ ...wizardFields, idea: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Field 5: Problem Being Solved */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">5. Problem (The Friction)</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="What burning pain point are you resolving for your target customers?"
                      value={wizardFields.problem}
                      onChange={(e) => setWizardFields({ ...wizardFields, problem: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Field 6: Target Audience */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">6. Target Audience</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Boutique legal practitioners, medical clinics, e-commerce brand owners"
                      value={wizardFields.audience}
                      onChange={(e) => setWizardFields({ ...wizardFields, audience: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Field 7: Core Features */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">7. Core Features (MVP scope, 3 Max)</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="List the absolute core features necessary to validate this concept..."
                      value={wizardFields.features}
                      onChange={(e) => setWizardFields({ ...wizardFields, features: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Field 8, 9, 10: Budget, Timeline, platform */}
                  <div className="grid grid-cols-3 gap-4">
                    
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider">8. Budget</label>
                      <select
                        value={wizardFields.budget}
                        onChange={(e) => setWizardFields({ ...wizardFields, budget: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-[10px] text-slate-600 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all cursor-pointer"
                      >
                        {['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map(b => (
                          <option key={b} value={b} className="bg-white">{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline Field - Fully editable */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider">9. Timeline</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 21 Days"
                        value={wizardFields.timeline}
                        onChange={(e) => setWizardFields({ ...wizardFields, timeline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[10px] text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider">10. Platform</label>
                      <select
                        value={wizardFields.platform}
                        onChange={(e) => setWizardFields({ ...wizardFields, platform: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-[10px] text-slate-650 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all cursor-pointer"
                      >
                        {['Web App', 'Mobile App', 'Web + Mobile', 'Desktop App'].map(p => (
                          <option key={p} value={p} className="bg-white">{p}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Technical Experience */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider">Technical Experience Level</label>
                    <select
                      value={wizardFields.experience}
                      onChange={(e) => setWizardFields({ ...wizardFields, experience: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-650 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all cursor-pointer"
                    >
                      {['Non-Technical Founder', 'Junior Developer', 'Senior Engineer', 'Product Manager'].map(x => (
                        <option key={x} value={x} className="bg-white">{x}</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-4 border border-[#8B5CF6]/20 shadow-md shadow-[#8B5CF6]/15"
                  >
                    <Sparkles size={14} />
                    Run Automated Investor Audit
                  </button>

                </form>
              </div>
            )}

          </div>
        )}

        {/* ─── TAB 4: USAGE & LIMITS (With Credit Buy Top-ups) ─── */}
        {activeTab === 'usage' && (
          <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Usage & Core Credits</h1>
              <p className="text-slate-550 text-xs font-semibold">Track your startup validation usage limits and reset dates.</p>
            </div>

            {/* Progress Card */}
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest block w-fit">
                    Active Subscription
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-3">Builder Bundle Tier</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold block">Credits Remaining</span>
                  <span className="text-2xl font-extrabold text-slate-900">3 / 5</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-3 bg-slate-50 border border-slate-200 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '60%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>60% Credits Used</span>
                  <span>Monthly limits reset: June 25, 2026</span>
                </div>
              </div>
            </div>

            {/* What happens Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">What happens when credits run out?</h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                If your workspace exhausts its monthly runs, you can purchase individual top-up tokens ($9 each), upgrade your plan to Unlimited Full Arsenal access, or schedule a founder support call to review custom roadmap quotes at no charge.
              </p>
              
              <div className="grid grid-cols-3 gap-3 pt-4">
                <button
                  onClick={() => setSearchParams({ tab: 'billing' })}
                  className="bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold p-3 text-[10px] rounded-xl text-center shadow-md transition-all uppercase tracking-wider"
                >
                  Upgrade Plan
                </button>
                <button
                  onClick={() => setBuyCreditsOpen(true)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold p-3 text-[10px] rounded-xl text-center transition-all uppercase tracking-wider"
                >
                  Buy Credits
                </button>
                <button
                  onClick={() => setSearchParams({ tab: 'strategy-call' })}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold p-3 text-[10px] rounded-xl text-center transition-all uppercase tracking-wider"
                >
                  Book Session
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ─── TAB 5: BILLING & PAYMENT HISTORY ─── */}
        {activeTab === 'billing' && (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Billing & Invoices</h1>
              <p className="text-slate-550 text-xs font-semibold">Manage your startup subscriptions, payment methods, and historical receipts.</p>
            </div>

            {/* Current package card */}
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2">
                <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  Account Status: Active
                </span>
                <h3 className="text-lg font-bold text-slate-900">Builder Bundle Plan</h3>
                <p className="text-slate-500 text-xs font-semibold">One-time purchase that unlocks 3 high-fidelity AI startup validation reports.</p>
              </div>
              <div className="text-center md:text-right shrink-0">
                <span className="text-2xl font-extrabold text-slate-900">$29.00</span>
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">One-time payment</span>
              </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Payment History</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-semibold text-slate-550">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-wider">
                      <th className="py-3 text-left font-bold">Transaction ID</th>
                      <th className="py-3 text-left font-bold">Billing Date</th>
                      <th className="py-3 text-left font-bold">Amount Paid</th>
                      <th className="py-3 text-right font-bold">Receipt URL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { id: 'ch_3TavuWRFXAQMEApB1UoiSU7l', date: 'May 25, 2026', desc: 'Starter MVP Package Charge', price: '$4,999.00' },
                      { id: 'ch_3Tasv5RFXAQMEApB12BNaVLf', date: 'May 25, 2026', desc: 'Builder Bundle Upgrade Charge', price: '$29.00' },
                      { id: 'ch_3Ta9c0RFXAQMEApB01WnaFLp', date: 'May 20, 2026', desc: 'Single Skill Purchase', price: '$19.00' }
                    ].map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-slate-900 font-bold">{inv.id}</td>
                        <td className="py-4">{inv.date}</td>
                        <td className="py-4 text-slate-800">{inv.price}</td>
                        <td className="py-4 text-right">
                          <a 
                            href={`https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xVGFzUDhSRlhBUU1FQXBCK`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8B5CF6] hover:text-[#7c4ee4] font-bold inline-flex items-center gap-1 transition-colors"
                          >
                            Stripe Invoicing <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ─── TAB 6: 1-ON-1 STRATEGY SCHEDULER ─── */}
        {activeTab === 'strategy-call' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Book Strategy Session</h1>
              <p className="text-slate-550 text-xs font-semibold">Reserve a private 1-on-1 strategy meeting with a senior technical founder to structure your 21-day MVP roadmap.</p>
            </div>

            {bookingSuccess ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 animate-in zoom-in-95 duration-200 shadow-sm">
                <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-500 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 size={30} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Clarity Session Confirmed!</h3>
                  <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                    We have successfully scheduled your 30-minute founder consultation for **{selectedDate}** at **{selectedSlot}**. An invite with Google Meet credentials has been sent to your email.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setSelectedDate(null);
                    setSelectedSlot(null);
                  }}
                  className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all"
                >
                  Schedule Another Session
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                
                {/* 1. Date picker grid */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">1. Select meeting date</span>
                  <div className="grid grid-cols-4 gap-2.5">
                    {['Mon, May 26', 'Tue, May 27', 'Wed, May 28', 'Thu, May 29'].map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                          selectedDate === date
                            ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-350 hover:text-slate-900'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Slot picker grid */}
                {selectedDate && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">2. Available 30-min time slots (IST)</span>
                    <div className="grid grid-cols-4 gap-2.5">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            selectedSlot === slot
                              ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-sm'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-350 hover:text-slate-900'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Details Form */}
                {selectedDate && selectedSlot && (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }}
                    className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200"
                  >
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">3. Confirm Details</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={bookingDetails.name}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={bookingDetails.email}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Brief Startup Concept</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="What startup project or MVP concept do you plan to review during this session?"
                        value={bookingDetails.concept}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, concept: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold py-3.5 rounded-xl text-xs transition-all border border-[#8B5CF6]/20 shadow-md shadow-[#8B5CF6]/10"
                    >
                      Confirm strategy booking session
                    </button>
                  </form>
                )}

              </div>
            )}

          </div>
        )}

        {/* ─── TAB 7: PROFILE & SECURITY SETTINGS ─── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-slate-550 text-xs font-semibold">Manage your user profile details, credentials, and notification settings.</p>
            </div>

            {/* Profile form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <User size={14} className="text-[#8B5CF6]" />
                Profile Information
              </h3>

              {settingsSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl flex items-center gap-2.5 animate-in fade-in duration-150">
                  <CheckCircle2 size={16} />
                  <span className="text-xs leading-normal font-semibold">Settings updated successfully!</span>
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); setSettingsSuccess(true); setTimeout(() => setSettingsSuccess(false), 2500); }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-semibold focus:outline-none select-none cursor-not-allowed"
                    readOnly
                    title="Email changes are locked to secure payment history"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-[#8B5CF6]/10"
                  >
                    Save Profile Settings
                  </button>
                </div>
              </form>
            </div>

            {/* Password security change panel */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#8B5CF6]" />
                Security Credentials (Password)
              </h3>

              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (passwordFields.newPassword !== passwordFields.confirm) {
                    alert('Passwords do not match!');
                    return;
                  }
                  showToast('Password updated securely!'); 
                  setPasswordFields({ current: '', newPassword: '', confirm: '' });
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordFields.current}
                    onChange={(e) => setPasswordFields({ ...passwordFields, current: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordFields.newPassword}
                      onChange={(e) => setPasswordFields({ ...passwordFields, newPassword: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={passwordFields.confirm}
                      onChange={(e) => setPasswordFields({ ...passwordFields, confirm: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-[#8B5CF6]/10"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>

            {/* Notification settings panel */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm select-none">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Email Preferences</h3>
              
              <div className="space-y-3 font-semibold text-slate-500">
                {[
                  { label: 'Weekly Startup Insight Reports', desc: 'Get aggregated pre-seed funding reports and e-commerce product audits.' },
                  { label: 'New AI Skill Launch Announcements', desc: 'Receive instant alerts when a new battle-tested validation widget drops.' },
                  { label: 'Account Usage Limits Warnings', desc: 'Notify me when my monthly credits are close to expiring.' }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 rounded border-slate-300 text-[#8B5CF6] focus:ring-[#8B5CF6] bg-white mt-0.5 shrink-0 transition-colors cursor-pointer" 
                    />
                    <div>
                      <span className="block text-xs font-bold text-slate-800 group-hover:text-[#8B5CF6] transition-colors">{item.label}</span>
                      <span className="block text-[10px] text-slate-400 font-medium leading-normal mt-0.5">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-150 rounded-3xl p-6 text-left space-y-3.5">
              <h3 className="text-xs font-bold text-red-650 uppercase tracking-wider">Danger Zone</h3>
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                Deleting your account will permanently terminate your access to your saved validation reports, historical Stripe sandbox invoices, and custom workspace settings. This action is absolutely irreversible.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you absolutely sure you want to permanently delete your workspace? All data will be lost.')) {
                    alert('Workspace deleted successfully.');
                  }
                }}
                className="bg-red-600 hover:bg-red-750 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all border border-red-500/10 shadow-sm"
              >
                Permanently Delete Account
              </button>
            </div>

          </div>
        )}

        {/* ─── TAB 8: ADMIN LEADS PANEL ─── */}
        {activeTab === 'leads' && user?.email === 'launchpilotai41@gmail.com' && (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Leads Manager</h1>
                <p className="text-slate-550 text-xs font-semibold">Track, view details, and manage all leads captured from forms.</p>
              </div>
              <button 
                onClick={fetchLeads}
                disabled={loadingLeads}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                {loadingLeads ? 'Refreshing...' : 'Refresh Leads'}
              </button>
            </div>

            {/* Error Message */}
            {leadsError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-2.5 text-xs font-semibold">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <span>{leadsError}</span>
              </div>
            )}

            {/* Metrics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block">Total Leads</span>
                <span className="text-2xl font-extrabold text-slate-900 mt-2 block">{leads.length}</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <span className="text-[9px] text-[#8B5CF6] font-bold uppercase tracking-wider block">Bookings</span>
                <span className="text-2xl font-extrabold text-slate-900 mt-2 block">
                  {leads.filter(l => l.type === 'booking').length}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block">Contact Messages</span>
                <span className="text-2xl font-extrabold text-slate-900 mt-2 block">
                  {leads.filter(l => l.type === 'contact').length}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block">Newsletters</span>
                <span className="text-2xl font-extrabold text-slate-900 mt-2 block">
                  {leads.filter(l => l.type === 'newsletter').length}
                </span>
              </div>
            </div>

            {/* Filter / Search Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQueryLeads}
                  onChange={(e) => setSearchQueryLeads(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <Filter size={13} className="text-slate-400" />
                <select
                  value={typeFilterLeads}
                  onChange={(e) => setTypeFilterLeads(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-650 font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="booking">Bookings</option>
                  <option value="contact">Contact Messages</option>
                  <option value="newsletter">Newsletter Signups</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
              {loadingLeads ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 border-2 border-[#8B5CF6]/30 border-t-[#8B5CF6] rounded-full animate-spin mb-3" />
                  <p className="text-xs text-slate-450 font-semibold">Fetching leads from Supabase...</p>
                </div>
              ) : leads.length === 0 ? (
                <div className="py-12 text-center max-w-sm mx-auto space-y-4">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                    <Info size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-850">No Leads Found</h4>
                    <p className="text-xs text-slate-450 mt-1 font-semibold leading-relaxed">
                      Forms submitted by public visitors will appear here in real-time. Make sure your environment keys are set up.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-semibold text-slate-550">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-wider text-left">
                        <th className="py-3 font-bold">Type</th>
                        <th className="py-3 font-bold">Name</th>
                        <th className="py-3 font-bold">Email</th>
                        <th className="py-3 font-bold">Submitted At</th>
                        <th className="py-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {leads
                        .filter(l => {
                          const query = searchQueryLeads.toLowerCase();
                          const matchesSearch = l.email.toLowerCase().includes(query) || (l.name || '').toLowerCase().includes(query);
                          const matchesType = typeFilterLeads === 'All' || l.type === typeFilterLeads;
                          return matchesSearch && matchesType;
                        })
                        .map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-colors text-left">
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                lead.type === 'booking' ? 'bg-purple-50 text-purple-700 border border-purple-200/50' :
                                lead.type === 'contact' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                                'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              }`}>
                                {lead.type}
                              </span>
                            </td>
                            <td className="py-4 text-slate-900 font-bold">{lead.name || '—'}</td>
                            <td className="py-4"><a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a></td>
                            <td className="py-4 text-slate-450">{new Date(lead.created_at).toLocaleString()}</td>
                            <td className="py-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-all text-[10px]"
                              >
                                View details
                              </button>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-3 py-1.5 rounded-xl font-bold transition-all text-[10px]"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ─── FULL VALIDATION DETAILS MODAL PREVIEWER (Clean Light Mode) ─── */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-3xl shadow-2xl relative text-left overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            {/* Header / score bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
              <div className="space-y-1">
                <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {selectedReport.industry}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedReport.name} Report</h2>
                <p className="text-[10px] text-slate-400 font-bold">Saved: {selectedReport.date} · Report ID: {selectedReport.id.toUpperCase()}</p>
              </div>

              {/* Viability circular score */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="24" cy="24" r="21" fill="transparent" stroke="#e2e8f0" strokeWidth="5" />
                    <circle cx="24" cy="24" r="21" fill="transparent" stroke="#8b5cf6" strokeWidth="5" strokeDasharray={132} strokeDashoffset={132 - (132 * selectedReport.score) / 100} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[10px] font-extrabold text-slate-900">{selectedReport.score}%</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">Viability score</p>
                  <p className="text-xs font-bold text-green-600">High Traction Potential</p>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedReport(null)} 
                className="absolute top-4 right-4 p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-350 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-6">
              
              {/* startup idea */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Activity size={14} className="text-[#8B5CF6]" />
                  Startup Value Proposition
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">{selectedReport.idea}</p>
              </div>

              {/* 3 Columns: TAM SAM SOM */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#8B5CF6]" />
                  Market Projections (TAM, SAM, SOM)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'TAM (Total)', value: selectedReport.tam },
                    { label: 'SAM (Serviceable)', value: selectedReport.sam },
                    { label: 'SOM (Obtainable)', value: selectedReport.som }
                  ].map(m => (
                    <div key={m.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{m.label}</span>
                      <span className="text-xs font-bold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitors & Risks */}
              <div className="grid md:grid-cols-2 gap-6 text-left">
                
                {/* Competitors */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} className="text-[#8B5CF6]" />
                    Simulated Competitors
                  </h4>
                  <div className="space-y-2.5">
                    {selectedReport.competitors.map((c, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl space-y-1.5 shadow-sm">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-800">{c.name}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded ${
                            c.threat === 'High' ? 'bg-red-50 text-red-600 border border-red-200/50' : 'bg-amber-50 text-amber-600 border border-amber-200/50'
                          }`}>Threat: {c.threat}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold leading-normal"><strong className="text-slate-650">Weakness:</strong> {c.weakness}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#8B5CF6]" />
                    Core Risks & Mitigations
                  </h4>
                  <div className="space-y-2.5">
                    {selectedReport.risks.map((r, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl space-y-1.5 text-left shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-slate-800">{r.title}</span>
                          <span className="text-[9px] bg-red-50 text-red-600 border border-red-200/50 px-1.5 py-0.5 rounded">Risk: {r.level}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold leading-normal"><strong className="text-slate-650">Mitigation:</strong> {r.mitigation}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Expert Verdict */}
              <div className="bg-gradient-to-r from-[#8B5CF6]/10 via-slate-50 to-slate-50 border border-[#8B5CF6]/20 p-5 rounded-2xl text-left relative overflow-hidden shadow-sm">
                <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <UserCheck size={14} className="text-[#8B5CF6]" />
                  SaaS Architect Expert Verdict
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">{selectedReport.verdict}</p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="flex gap-3 justify-end pt-5 border-t border-slate-100 mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
              >
                Close Report
              </button>
              <button
                onClick={() => { alert('Stripe Pro Upgrade Required: PDF downloading is a Premium feature.'); }}
                className="bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-[#8B5CF6]/10 flex items-center gap-2"
              >
                <Download size={13} /> Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── BUY CREDITS MODAL POPUP OVERLAY (Clean Light Mode) ─── */}
      {buyCreditsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-left animate-in zoom-in-95 duration-200">
            
            {/* Close trigger button */}
            <button 
              onClick={() => setBuyCreditsOpen(false)} 
              className="absolute top-4 right-4 p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
            >
              <X size={15} />
            </button>

            {/* Icon & Title */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] border border-[#8B5CF6]/20">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Purchase Top-Up Credits</h3>
                <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Top-up instantly to run high-fidelity validation audits.</p>
              </div>
            </div>

            {/* Credit Selector Options */}
            <div className="space-y-3.5 mb-6">
              <span className="block text-[9px] text-slate-450 font-bold uppercase tracking-wider">Select Credit Tier Token Bundle</span>
              
              {[
                { count: 1, price: 9, discount: 'Pay-as-you-go basic' },
                { count: 3, price: 24, discount: 'Save 11% — Most popular' },
                { count: 5, price: 35, discount: 'Save 22% — Best value' }
              ].map(tier => (
                <button
                  key={tier.count}
                  type="button"
                  onClick={() => setSelectedCreditTier(tier.count)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                    selectedCreditTier === tier.count
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-350 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedCreditTier === tier.count ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-slate-300 bg-transparent'
                    }`}>
                      {selectedCreditTier === tier.count && <Check size={10} className="text-white" strokeWidth={4} />}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">{tier.count} Audit Run{tier.count > 1 ? 's' : ''}</span>
                      <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">{tier.discount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900">${tier.price}</span>
                    <span className="block text-[8px] text-slate-400 font-bold tracking-wider mt-0.5">USD One-time</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Checkout Sandbox Trigger */}
            <button
              onClick={() => {
                setBuyCreditsOpen(false);
                showToast(`Stripe Sandbox purchase of ${selectedCreditTier} runs complete!`);
              }}
              className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#8B5CF6]/15"
            >
              <CreditCard size={13} />
              Purchase via Stripe Sandbox
            </button>

          </div>
        </div>
      )}

      {/* ─── FULL LEAD DETAILS MODAL PREVIEWER (Clean Light Mode) ─── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative text-left overflow-y-auto max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                selectedLead.type === 'booking' ? 'bg-purple-50 text-purple-700 border border-purple-200/50' :
                selectedLead.type === 'contact' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
              }`}>
                {selectedLead.type}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">Lead Submission Details</h3>
                <p className="text-[9px] text-slate-455 font-bold">ID: {selectedLead.id.toUpperCase()}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)} 
                className="absolute top-4 right-4 p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-550 hover:text-slate-900 hover:border-slate-355 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Details Fields */}
            <div className="space-y-4 text-xs font-semibold text-slate-550 leading-relaxed">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3">
                <div>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Submitted By</span>
                  <span className="text-slate-800 font-bold text-sm mt-0.5 block">{selectedLead.name || 'Anonymous'}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-[#8B5CF6] hover:underline font-bold text-sm mt-0.5 block">{selectedLead.email}</a>
                </div>
              </div>

              <div className="border-b border-slate-50 pb-3">
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Date & Time Received</span>
                <span className="text-slate-800 mt-0.5 block">{new Date(selectedLead.created_at).toLocaleString()}</span>
              </div>

              {/* Form type specific fields */}
              {selectedLead.type === 'contact' && (
                <>
                  <div className="border-b border-slate-50 pb-3">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Message Topic</span>
                    <span className="text-slate-850 mt-0.5 block font-bold">{selectedLead.details?.topic || '—'}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Message Content</span>
                    <p className="text-slate-700 leading-relaxed text-xs whitespace-pre-wrap font-medium">{selectedLead.details?.message || '—'}</p>
                  </div>
                </>
              )}

              {selectedLead.type === 'booking' && (
                <>
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Booking Date</span>
                      <span className="text-slate-850 mt-0.5 block font-bold">{selectedLead.details?.bookingDateFormatted || selectedLead.details?.bookingDate || '—'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Booking Time (IST)</span>
                      <span className="text-slate-850 mt-0.5 block font-bold">{selectedLead.details?.bookingTime || '—'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Plan of Interest</span>
                      <span className="text-slate-850 mt-0.5 block font-bold">{selectedLead.details?.planDisplayName || selectedLead.details?.plan || '—'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Plan Price</span>
                      <span className="text-slate-850 mt-0.5 block font-bold">{selectedLead.details?.planPriceText || 'Free Consultation'}</span>
                    </div>
                  </div>
                  <div className="border-b border-slate-50 pb-3">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mutual NDA Required</span>
                    <span className={`mt-0.5 font-bold block ${selectedLead.details?.requireNda ? 'text-emerald-650' : 'text-slate-550'}`}>
                      {selectedLead.details?.requireNda ? '✓ NDA protection requested' : 'No NDA requested'}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Startup Concept Details</span>
                    <p className="text-slate-700 leading-relaxed text-xs whitespace-pre-wrap font-medium">{selectedLead.details?.startupConcept || '—'}</p>
                  </div>
                </>
              )}

              {selectedLead.type === 'newsletter' && (
                <div className="border-b border-slate-50 pb-3">
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Newsletter Signup Source</span>
                  <span className="text-slate-850 mt-0.5 block">{selectedLead.details?.signupSource || 'landing_newsletter_footer'}</span>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="flex gap-3 justify-end pt-5 border-t border-slate-100 mt-6">
              <button
                onClick={() => setSelectedLead(null)}
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 9: MY WISHLIST ─── */}
      {activeTab === 'wishlist' && (() => {
        const wishlistedSkills = SKILLS_DB.filter(s => wishlistIds.includes(s.id));

        const handleRemoveFromWishlist = (id: string, name: string) => {
          setWishlistIds(prev => prev.filter(item => item !== id));
          showToast(`Removed "${name}" from wishlist.`);
        };

        return (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Wishlist</h1>
              <p className="text-slate-550 text-xs font-semibold">Browse and manage AI skills you saved for later.</p>
            </div>

            {wishlistedSkills.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 text-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto">
                  <Heart size={28} className="text-[#8B5CF6]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Explore our catalog of custom-engineered AI prompt developer instruction sets and add them to your wishlist.
                  </p>
                </div>
                <Link 
                  to="/skills" 
                  className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-[#8B5CF6]/10"
                >
                  Browse Skills Catalog <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedSkills.map(skill => (
                  <div 
                    key={skill.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#8B5CF6]/50 hover:shadow-md transition-all flex flex-col justify-between group duration-300 shadow-sm relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200/50 rounded">
                          {skill.category}
                        </span>
                        <span className="text-sm font-extrabold text-[#8B5CF6]">${skill.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#8B5CF6]">
                          {skill.icon}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 truncate">{skill.name}</h3>
                      </div>
                      
                      <p className="text-slate-550 text-xs leading-relaxed line-clamp-3 mb-6 font-semibold">{skill.tagline}</p>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-2">
                      <button
                        onClick={() => navigate(`/checkout?plan=starter&price=${skill.price}`)}
                        className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold py-2.5 rounded-xl text-xs transition-all border border-[#8B5CF6]/15 flex items-center justify-center gap-1.5 shadow-sm shadow-[#8B5CF6]/5"
                      >
                        Buy Now
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/skills/${skill.slug}`}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold py-2 text-center text-[10px] transition-all"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleRemoveFromWishlist(skill.id, skill.name)}
                          className="bg-transparent hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg text-slate-500 hover:text-red-600 font-bold py-2 text-center text-[10px] transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

    </DashboardLayout>
  );
}
