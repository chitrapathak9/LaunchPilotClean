import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { RichTextEditor } from '../../../components/admin/RichTextEditor';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import type { Blog } from '../../../types/database';
import {
  Save, Globe, FileText, AlertCircle, CheckCircle, Loader2,
  ChevronDown, Tag, X, Clock, Eye
} from 'lucide-react';

const CATEGORY_OPTIONS = ['General', 'MVP Building', 'AI Tools', 'SaaS', 'Launch Strategy', 'iOS', 'SEO', 'Marketing'];

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

function estimateReadTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  seo_title: string;
  seo_description: string;
  og_image_url: string | null;
  read_time_minutes: number;
  published_at: string;
}

const EMPTY_FORM: FormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: null,
  category: 'General',
  tags: [],
  status: 'draft',
  seo_title: '',
  seo_description: '',
  og_image_url: null,
  read_time_minutes: 1,
  published_at: new Date().toISOString().slice(0, 16),
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">{title}</h3>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Load existing blog for editing
  useEffect(() => {
    if (isEditing && id) {
      supabase.from('blogs').select('*').eq('id', id).single().then(({ data, error: err }) => {
        if (err || !data) { setError('Blog not found'); return; }
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          cover_image_url: data.cover_image_url,
          category: data.category,
          tags: data.tags ?? [],
          status: data.status,
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
          og_image_url: data.og_image_url,
          read_time_minutes: data.read_time_minutes,
          published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        });
        setSlugManuallyEdited(true);
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const set = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (title: string) => {
    set('title', title);
    if (!slugManuallyEdited) {
      set('slug', generateSlug(title));
    }
    // Auto-populate SEO title if empty
    setForm(prev => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : generateSlug(title),
      seo_title: prev.seo_title || title,
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (tag && !form.tags.includes(tag)) {
      set('tags', [...form.tags, tag]);
    }
    setTagInput('');
  };

  const handleWordCountChange = useCallback((count: number) => {
    setWordCount(count);
    set('read_time_minutes', estimateReadTime(count));
  }, []);

  const handleSave = async (publishNow?: boolean) => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.slug.trim()) { setError('Slug is required'); return; }

    setSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      cover_image_url: form.cover_image_url,
      category: form.category,
      tags: form.tags,
      author_id: user?.id ?? null,
      status: publishNow ? 'published' : form.status,
      seo_title: form.seo_title || form.title,
      seo_description: form.seo_description || form.excerpt,
      og_image_url: form.og_image_url || form.cover_image_url,
      read_time_minutes: form.read_time_minutes,
      published_at: (publishNow || form.status === 'published') ? new Date(form.published_at).toISOString() : null,
    } as const;

    let result;
    if (isEditing && id) {
      result = await supabase.from('blogs').update(payload).eq('id', id).select().single();
    } else {
      result = await supabase.from('blogs').insert(payload).select().single();
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setSuccess(publishNow ? 'Published successfully!' : 'Draft saved!');
    setTimeout(() => setSuccess(''), 3000);

    if (!isEditing && result.data) {
      navigate(`/admin/blogs/${result.data.id}/edit`, { replace: true });
    }

    if (publishNow) set('status', 'published');
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center py-24">
          <Loader2 className="text-[#8B5CF6] animate-spin" size={28} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditing ? 'Edit Blog Post' : 'New Blog Post'}
      breadcrumbs={[{ label: 'Blogs', href: '/admin/blogs' }, { label: isEditing ? 'Edit' : 'New' }]}
      actions={
        <div className="flex items-center gap-2">
          {form.status === 'published' && form.slug && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#8B5CF6] transition-colors border border-slate-200 rounded-xl px-3 py-2 bg-white">
              <Eye size={13} /> Preview
            </a>
          )}
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-4 py-2 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-xl px-4 py-2 hover:bg-[#7C3AED] transition-colors shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin text-white" /> : <Globe size={14} />} Publish
          </button>
        </div>
      }
    >
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-700 text-sm">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Content">
            <Field label="Title" required>
              <input
                type="text"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Your blog post title..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 text-lg font-semibold placeholder:text-slate-300 transition-all"
              />
            </Field>

            <Field label="Slug" required hint={`/blog/${form.slug || 'your-post-slug'}`}>
              <input
                type="text"
                value={form.slug}
                onChange={e => { set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-')); setSlugManuallyEdited(true); }}
                placeholder="url-friendly-slug"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 font-mono text-sm transition-all"
              />
            </Field>

            <Field label="Excerpt" hint="Used on blog listings and as default meta description">
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                rows={3}
                placeholder="A brief summary of this post..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 placeholder:text-slate-300 resize-none transition-all text-sm"
              />
            </Field>

            <Field label="Content" required>
              <RichTextEditor
                content={form.content}
                onChange={html => set('content', html)}
                onWordCountChange={handleWordCountChange}
                placeholder="Start writing your blog post..."
              />
            </Field>
          </Section>

          {/* SEO Section */}
          <Section title="SEO & Metadata">
            <Field label="SEO Title" hint={`${(form.seo_title || form.title).length}/60 chars (falls back to post title)`}>
              <input
                type="text"
                value={form.seo_title}
                onChange={e => set('seo_title', e.target.value)}
                placeholder={form.title || 'SEO title (optional)'}
                maxLength={70}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 text-sm transition-all"
              />
            </Field>
            <Field label="Meta Description" hint={`${(form.seo_description || form.excerpt).length}/160 chars (falls back to excerpt)`}>
              <textarea
                value={form.seo_description}
                onChange={e => set('seo_description', e.target.value)}
                rows={2}
                maxLength={165}
                placeholder={form.excerpt || 'Meta description for search engines...'}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none text-sm transition-all"
              />
            </Field>
            <Field label="OG Image URL" hint="Falls back to cover image if empty">
              <input
                type="url"
                value={form.og_image_url ?? ''}
                onChange={e => set('og_image_url', e.target.value || null)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 text-sm font-mono transition-all"
              />
            </Field>

            {/* SERP Preview */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Search Preview</p>
              <p className="text-[#1a0dab] text-lg font-medium truncate">{form.seo_title || form.title || 'Post Title'}</p>
              <p className="text-green-700 text-xs mb-1">launchaipilot.com/blog/{form.slug || 'your-slug'}</p>
              <p className="text-slate-600 text-sm line-clamp-2">{form.seo_description || form.excerpt || 'Post description will appear here...'}</p>
            </div>
          </Section>
        </div>

        {/* Right sidebar — 1/3 */}
        <div className="space-y-6">
          <Section title="Publish Settings">
            <Field label="Status">
              <div className="flex gap-2">
                {(['draft', 'published'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set('status', s)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      form.status === s
                        ? s === 'published' ? 'bg-green-500 text-white shadow-sm' : 'bg-amber-400 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {s === 'published' ? <><Globe size={11} className="inline mr-1" />Published</> : <><FileText size={11} className="inline mr-1" />Draft</>}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Publish Date">
              <input
                type="datetime-local"
                value={form.published_at}
                onChange={e => set('published_at', e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm transition-all"
              />
            </Field>

            <Field label="Read Time" hint="Auto-calculated from word count">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-slate-400" />
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={form.read_time_minutes}
                  onChange={e => set('read_time_minutes', parseInt(e.target.value) || 1)}
                  className="w-24 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm text-center"
                />
                <span className="text-sm text-slate-500">min read</span>
              </div>
              {wordCount > 0 && <p className="text-xs text-slate-400">{wordCount} words</p>}
            </Field>
          </Section>

          <Section title="Organization">
            <Field label="Category">
              <div className="relative">
                <select
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm bg-white cursor-pointer pr-8"
                >
                  {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </Field>

            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Tag size={10} /> {tag}
                    <button type="button" onClick={() => set('tags', form.tags.filter(t => t !== tag))} className="ml-0.5 hover:text-red-500 transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Add tag..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm"
                />
                <button type="button" onClick={addTag} className="px-3 py-2 bg-slate-100 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] text-slate-600 rounded-xl text-xs font-semibold transition-colors">
                  Add
                </button>
              </div>
            </Field>
          </Section>

          <Section title="Cover Image">
            <ImageUpload
              value={form.cover_image_url}
              onChange={url => set('cover_image_url', url)}
              folder="blogs"
              label=""
              aspectRatio="video"
            />
          </Section>
        </div>
      </div>
    </AdminLayout>
  );
}
