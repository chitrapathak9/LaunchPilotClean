import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { supabase } from '../../../lib/supabase';
import type { Blog } from '../../../types/database';
import {
  PlusCircle, Search, Edit2, Trash2, Eye, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, Globe, FileText, Calendar, Clock
} from 'lucide-react';
import { format } from 'date-fns';

const PAGE_SIZE = 15;

const CATEGORY_OPTIONS = ['All', 'MVP Building', 'AI Tools', 'SaaS', 'Launch Strategy', 'iOS', 'SEO', 'Marketing', 'General'];

export function BlogsList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (categoryFilter !== 'All') query = query.eq('category', categoryFilter);
      if (search) query = query.ilike('title', `%${search}%`);

      const { data, count, error: err } = await query;
      if (err) throw err;
      setBlogs(data ?? []);
      setTotal(count ?? 0);
    } catch (e) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, statusFilter, categoryFilter, search]);

  const handleDelete = async (blog: Blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    setDeleting(blog.id);
    await supabase.from('blogs').delete().eq('id', blog.id);
    setBlogs(prev => prev.filter(b => b.id !== blog.id));
    setTotal(prev => prev - 1);
    setDeleting(null);
  };

  const toggleStatus = async (blog: Blog) => {
    setTogglingId(blog.id);
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    const updates: Partial<Blog> = {
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    };
    const { error } = await supabase.from('blogs').update(updates).eq('id', blog.id);
    if (!error) {
      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, ...updates } : b));
    }
    setTogglingId(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <AdminLayout
      title="Blog Posts"
      breadcrumbs={[{ label: 'Blogs' }]}
      actions={
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 bg-[#8B5CF6] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#7C3AED] transition-colors shadow-sm"
        >
          <PlusCircle size={15} /> New Post
        </Link>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search posts..."
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
        <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(0); }} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#8B5CF6] text-slate-700 font-medium">
          {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-600">{total} posts</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="text-[#8B5CF6] animate-spin" size={24} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-400 text-sm mb-4">No blog posts found</p>
            <Link to="/admin/blogs/new" className="inline-flex items-center gap-2 text-[#8B5CF6] font-semibold text-sm hover:underline">
              <PlusCircle size={14} /> Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Title</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Category</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Read Time</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-semibold text-slate-800 truncate">{blog.title}</p>
                      <p className="text-xs text-slate-400 font-mono truncate mt-0.5">/blog/{blog.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-1 rounded-full">{blog.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleStatus(blog)}
                        disabled={togglingId === blog.id}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                          blog.status === 'published'
                            ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
                            : 'bg-amber-100 text-amber-700 hover:bg-green-100 hover:text-green-700'
                        } disabled:opacity-50`}
                        title={blog.status === 'published' ? 'Click to unpublish' : 'Click to publish'}
                      >
                        {togglingId === blog.id ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : blog.status === 'published' ? (
                          <><Globe size={11} /> Published</>
                        ) : (
                          <><FileText size={11} /> Draft</>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} /> {blog.read_time_minutes} min
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={12} /> {format(new Date(blog.created_at), 'MMM d, yyyy')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {blog.status === 'published' && (
                          <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" title="View live" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                            <Eye size={14} />
                          </a>
                        )}
                        <Link to={`/admin/blogs/${blog.id}/edit`} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors">
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog)}
                          disabled={deleting === blog.id}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deleting === blog.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
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
              <button onClick={() => setPage(p => p - 1)} disabled={page === 0} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-semibold text-slate-700">{page + 1} / {totalPages}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
