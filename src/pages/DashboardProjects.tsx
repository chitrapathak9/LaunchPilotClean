import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  FolderClosed, 
  Plus, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Trash2,
  X,
  PlusCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  tech: string[];
  progress: number;
  status: 'In Planning' | 'Active Integration' | 'QA & Review' | 'Completed';
  daysLeft?: number;
  date: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-finflow',
    name: 'FinFlow Reconciliation MVP',
    type: 'SaaS Platform',
    tech: ['React', 'Node.js', 'Express', 'Stripe'],
    progress: 75,
    status: 'Active Integration',
    daysLeft: 8,
    date: 'May 20, 2026'
  },
  {
    id: 'proj-medconnect',
    name: 'MedConnect Voice Scribe',
    type: 'SwiftUI Mobile App',
    tech: ['SwiftUI', 'Apple Speech', 'Python', 'FastAPI'],
    progress: 40,
    status: 'Active Integration',
    daysLeft: 16,
    date: 'May 24, 2026'
  },
  {
    id: 'proj-adpilot',
    name: 'AdPilot Copy variant generator',
    type: 'Web Portal',
    tech: ['Next.js', 'Tailwind CSS', 'OpenAI SDK'],
    progress: 100,
    status: 'Completed',
    date: 'May 15, 2026'
  },
  {
    id: 'proj-greenscale',
    name: 'GreenScale Scope 3 Calculator',
    type: 'REST API',
    tech: ['TypeScript', 'Supabase RLS', 'Vercel Edge'],
    progress: 15,
    status: 'In Planning',
    daysLeft: 30,
    date: 'May 08, 2026'
  }
];

export function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'Web App',
    tech: '',
    status: 'In Planning' as Project['status'],
    daysLeft: 21,
    progress: 0
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = newProject.tech.split(',').map(t => t.trim()).filter(Boolean);
    const added: Project = {
      id: 'proj-' + Math.random().toString(36).substring(2, 9),
      name: newProject.name,
      type: newProject.type,
      tech: techArray.length > 0 ? techArray : ['React', 'Tailwind'],
      progress: newProject.status === 'Completed' ? 100 : newProject.progress,
      status: newProject.status,
      daysLeft: newProject.status === 'Completed' ? undefined : Number(newProject.daysLeft),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    setProjects([added, ...projects]);
    setIsModalOpen(false);
    // Reset form
    setNewProject({
      name: '',
      type: 'Web App',
      tech: '',
      status: 'In Planning',
      daysLeft: 21,
      progress: 0
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <main className="flex-1 p-6 md:p-10 max-w-[1200px] w-full mx-auto bg-[#FAF9F6] min-h-screen text-left">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">My Projects</h1>
            <p className="text-slate-500 text-sm font-medium">Manage and track your active AI-assisted MVP builds</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-md shadow-[#8B5CF6]/15"
          >
            <Plus size={16} /> New Project
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-slate-200/70 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm mb-8">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <span className="text-xs text-slate-400 font-semibold">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-0 text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="All">All Projects</option>
                <option value="In Planning">In Planning</option>
                <option value="Active Integration">Active Integration</option>
                <option value="QA & Review">QA & Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 text-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto">
              <FolderClosed size={28} className="text-[#8B5CF6]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Add your active startup MVP repositories and trace your AI code integration pipelines.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all"
            >
              Add New Project <PlusCircle size={14} />
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map(proj => (
              <div 
                key={proj.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all flex flex-col justify-between group duration-300 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">{proj.type}</span>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-tight">{proj.name}</h3>
                    </div>
                    
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      proj.status === 'Completed'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : proj.status === 'Active Integration'
                          ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]/20 text-[#8B5CF6]'
                          : proj.status === 'QA & Review'
                            ? 'bg-amber-50 border-amber-200 text-amber-600'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* Progress Tracker */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-450">Build progress</span>
                      <span className="text-slate-800">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          proj.progress === 100 ? 'bg-emerald-500' : 'bg-[#8B5CF6]'
                        }`}
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map(t => (
                      <span key={t} className="bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer details */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={14} className="text-slate-400" />
                    <span>{proj.status === 'Completed' ? 'Completed' : `${proj.daysLeft} days left`}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-lg text-slate-400 hover:text-red-550 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 size={13} />
                    </button>
                    
                    <button
                      onClick={() => alert(`Opening workspace pipeline for ${proj.name}...`)}
                      className="bg-slate-550 hover:bg-slate-900 border border-slate-200 text-slate-800 hover:text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-colors"
                    >
                      Workspace <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50 rounded-t-3xl">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <FolderClosed className="text-[#8B5CF6]" size={20} />
                Create New Project
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My SaaS Product"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all animate-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Platform Type</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="REST API">REST API</option>
                    <option value="Browser Extension">Chrome Ext.</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  >
                    <option value="In Planning">In Planning</option>
                    <option value="Active Integration">Active Integration</option>
                    <option value="QA & Review">QA & Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Days to Launch</label>
                  <input
                    type="number"
                    min={1}
                    value={newProject.daysLeft}
                    onChange={(e) => setNewProject({ ...newProject, daysLeft: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Completion progress (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newProject.progress}
                    onChange={(e) => setNewProject({ ...newProject, progress: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, NextJS, Supabase"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] border border-[#8B5CF6]/20 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center mt-6 shadow-md shadow-[#8B5CF6]/10"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
