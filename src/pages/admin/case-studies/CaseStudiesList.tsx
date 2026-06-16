import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { supabase } from '../../../lib/supabase';
import type { CaseStudy } from '../../../types/database';
import {
  PlusCircle, Search, Edit2, Trash2, Eye, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, Globe, FileText, Calendar, Briefcase
} from 'lucide-react';
import { format } from 'date-fns';

const PAGE_SIZE = 15;
const INDUSTRIES = ['All', 'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Marketing', 'Manufacturing', 'Real Estate', 'Other'];

export function CaseStudiesList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase
        .from('case_studies')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (industryFilter !== 'All') query = query.eq('industry', industryFilter);
      if (search) query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%`);

      const { data, count, error: err } = await query;
      if (err) throw err;
      setItems(data ?? []);
      setTotal(count ?? 0);
    } catch (e) {
      setError('Failed to load case studies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, statusFilter, industryFilter, search]);

  const handleDelete = async (item: CaseStudy) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeleting(item.id);
    await supabase.from('case_studies').delete().eq('id', item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    setDeleting(null);
  };

  const toggleStatus = async (item: CaseStudy) => {
    setTogglingId(item.id);
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    await supabase.from('case_studies').update({
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    }).eq('id', item.id);
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i));
    setTogglingId(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <AdminLayout
      title="Case Studies"
      breadcrumbs={[{ label: 'Case Studies' }]}
      actions={
        <Link
          to="/admin/case-studies/new"
          className="flex items-center gap-2 bg-[#8B5CF6] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#7C3AED] transition-colors shadow-sm"
        >
          <PlusCircle size={15} /> New Case Study
        </Link>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by title or client..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 bg-white"
          />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value as any); setPage(0); }} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#8B5CF6] text-slate-700 font-medium">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <select value={industryFilter} onChange={e => { setIndustryFilter(e.target.value); setPage(0); }} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#8B5CF6] text-slate-700 font-medium">
          {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-600">{total} case studies</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="text-[#8B5CF6] animate-spin" size={24} />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-400 text-sm mb-4">No case studies found</p>
            <Link to="/admin/case-studies/new" className="inline-flex items-center gap-2 text-[#8B5CF6] font-semibold text-sm hover:underline">
              <PlusCircle size={14} /> Create your first case study
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Title</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Client</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Industry</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400 font-mono truncate mt-0.5">/case-studies/{item.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">{item.client_name}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">{item.industry}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleStatus(item)}
                        disabled={togglingId === item.id}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                          item.status === 'published'
                            ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
                            : 'bg-amber-100 text-amber-700 hover:bg-green-100 hover:text-green-700'
                        } disabled:opacity-50`}
                      >
                        {togglingId === item.id ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : item.status === 'published' ? (
                          <><Globe size={11} /> Published</>
                        ) : (
                          <><FileText size={11} /> Draft</>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={12} /> {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {item.status === 'published' && (
                          <a href={`/case-studies/${item.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                            <Eye size={14} />
                          </a>
                        )}
                        <Link to={`/admin/case-studies/${item.id}/edit`} className="p-1.5 rounded-lg text-slate-400 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors">
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deleting === item.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deleting === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 0} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-semibold text-slate-700">{page + 1} / {totalPages}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
