import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  X,
  AlertCircle,
  FileText
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: 'Billing' | 'Skill Setup' | 'Bug Report' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  description: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-001',
    subject: 'Stripe subscription webhook failure config',
    category: 'Skill Setup',
    priority: 'High',
    status: 'In Progress',
    date: 'Jun 02, 2026',
    description: 'Having issues getting the sandbox stripe invoice webhooks to execute successfully on my local nextjs port. Need instructions.'
  },
  {
    id: 'tkt-002',
    subject: 'Refund request for duplicate bundle purchase',
    category: 'Billing',
    priority: 'Medium',
    status: 'Resolved',
    date: 'May 25, 2026',
    description: 'Accidentally checked out twice. Resolved same-day by team.'
  }
];

export function DashboardSupport() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  // New ticket form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formFields, setFormFields] = useState({
    subject: '',
    category: 'Skill Setup' as Ticket['category'],
    priority: 'Medium' as Ticket['priority'],
    description: ''
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    { q: 'How do I download the SKILL.md instruction files?', a: 'Navigate to "My Skills" inside your dashboard layout. You will see cards for all your owned skills. Click "Download SKILL.md" to download the markdown prompt instructions file directly.' },
    { q: 'How do I integrate the skills inside Cursor or Claude Code?', a: 'For Claude Code, load the skill using: `claude --skill SKILL.md "instructions"`. For Cursor, copy the content into a `.cursorrules` file in your project root, or reference the file using the "@" symbol.' },
    { q: 'Can I request a custom-made AI skill for my project?', a: 'Yes! We custom-engineer specialized prompts and MVPs. Click the "Book Strategy Call" tab in the sidebar to review your requirements with our technical lead founder.' }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const added: Ticket = {
      id: 'tkt-' + Math.random().toString(36).substring(2, 5).toUpperCase() + Math.floor(Math.random() * 900 + 100),
      subject: formFields.subject,
      category: formFields.category,
      priority: formFields.priority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: formFields.description
    };

    setTickets([added, ...tickets]);
    setIsModalOpen(false);
    // Reset Form
    setFormFields({
      subject: '',
      category: 'Skill Setup',
      priority: 'Medium',
      description: ''
    });
    showToast('Support ticket submitted successfully. Our team will review it.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <main className="flex-1 p-6 md:p-10 max-w-[1200px] w-full mx-auto bg-[#FAF9F6] min-h-screen text-left">
        
        {/* Floating toast notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-[#8B5CF6] text-white px-5 py-3 rounded-2xl flex items-center gap-3.5 shadow-xl animate-in slide-in-from-top-6 duration-200">
            <CheckCircle2 size={16} className="text-white shrink-0" />
            <span className="text-xs font-bold tracking-wide leading-none">{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">Help & Support</h1>
            <p className="text-slate-550 text-sm font-medium">Create tickets, track issues, and search common setup questions</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-md shadow-[#8B5CF6]/15"
          >
            <Plus size={16} /> Create Ticket
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Tickets List (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MessageSquare className="text-[#8B5CF6]" size={16} />
                Active Support Tickets
              </h3>

              {tickets.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-semibold text-xs">
                  No active support tickets found. Click "Create Ticket" to get help.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {tickets.map((tkt) => (
                    <div 
                      key={tkt.id} 
                      onClick={() => setSelectedTicket(tkt)}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 px-2 rounded-xl transition-all"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] text-slate-400 font-mono font-bold">{tkt.id}</span>
                          <span className="text-slate-300 text-[10px]">•</span>
                          <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200/50">
                            {tkt.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 truncate">{tkt.subject}</h4>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          tkt.priority === 'High' 
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : tkt.priority === 'Medium'
                              ? 'bg-amber-50 border-amber-200 text-amber-600'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}>
                          {tkt.priority} Priority
                        </span>
                        
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : tkt.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'bg-slate-50 text-slate-550 border border-slate-200'
                        }`}>
                          {tkt.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Support FAQ */}
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <HelpCircle className="text-[#8B5CF6]" size={16} />
                Frequently Asked Setup Questions
              </h3>
              
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-bold text-slate-900 text-xs pr-6">{faq.q}</span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 pt-0 text-[#475569] leading-relaxed text-xs font-semibold">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Information/Resources (1/3 width) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#8B5CF6]/[0.03] via-white to-white border border-[#8B5CF6]/20 rounded-3xl p-6 shadow-sm">
              <span className="text-[10px] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-3">
                Need Fast Help?
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Priority Developer Support</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-4">
                Pro members receive guaranteed response times under 2 hours. Need priority setup assistance with example GitHub templates?
              </p>
              <button 
                onClick={() => alert('Opening consultation booking scheduler...')}
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold py-2.5 rounded-xl text-xs transition-all text-center shadow-md shadow-[#8B5CF6]/10"
              >
                Request Priority Setup Help
              </button>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Developer Resources</h3>
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li>
                  <a href="#" className="hover:text-[#8B5CF6] flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" /> API documentation setup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#8B5CF6] flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" /> Stripe sandbox guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#8B5CF6] flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" /> RLS Database security rules
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
          <div className="relative bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl flex flex-col p-6 animate-in zoom-in-95 duration-200 text-left">
            <button onClick={() => setSelectedTicket(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X size={20} />
            </button>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold">{selectedTicket.id}</span>
                <span className="text-slate-300 text-[10px]">•</span>
                <span className="bg-slate-100 text-slate-655 text-[9px] font-bold px-2 py-0.5 rounded border">
                  {selectedTicket.category}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{selectedTicket.subject}</h3>
            </div>

            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between text-xs border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-semibold">Priority:</span>
                <span className="text-slate-800 font-bold">{selectedTicket.priority}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-semibold">Current Status:</span>
                <span className="text-slate-800 font-bold">{selectedTicket.status}</span>
              </div>
              <div className="flex justify-between text-xs pb-1">
                <span className="text-slate-400 font-semibold">Submitted Date:</span>
                <span className="text-slate-800 font-bold">{selectedTicket.date}</span>
              </div>
            </div>

            <div className="mb-6 space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Description</span>
              <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-medium">{selectedTicket.description}</p>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center"
            >
              Close Ticket details
            </button>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 text-left">
            
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50 rounded-t-3xl">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <MessageSquare className="text-[#8B5CF6]" size={20} />
                Create Support Ticket
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Ticket Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your issue..."
                  value={formFields.subject}
                  onChange={(e) => setFormFields({ ...formFields, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select
                    value={formFields.category}
                    onChange={(e) => setFormFields({ ...formFields, category: e.target.value as Ticket['category'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  >
                    <option value="Skill Setup">Skill Setup</option>
                    <option value="Billing">Billing</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Priority</label>
                  <select
                    value={formFields.priority}
                    onChange={(e) => setFormFields({ ...formFields, priority: e.target.value as Ticket['priority'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Ticket Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail the issue, including error logs or configuration steps taken..."
                  value={formFields.description}
                  onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center mt-6 shadow-md shadow-[#8B5CF6]/10"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
