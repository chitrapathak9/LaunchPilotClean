import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { RichTextEditor } from '../../../components/admin/RichTextEditor';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import { supabase } from '../../../lib/supabase';
import type { CaseStudy, CaseStudyMetric } from '../../../types/database';
import {
  Save, Globe, FileText, AlertCircle, CheckCircle, Loader2,
  ChevronDown, Plus, Trash2, Eye, X
} from 'lucide-react';

const INDUSTRY_OPTIONS = ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Marketing', 'Manufacturing', 'Real Estate', 'Other'];

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().substring(0, 80);
}

interface FormData {
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: string;
  content: string;
  cover_image_url: string | null;
  gallery_images: string[];
  metrics: CaseStudyMetric[];
  status: 'draft' | 'published';
  seo_title: string;
  seo_description: string;
  og_image_url: string | null;
  published_at: string;
}

const EMPTY_FORM: FormData = {
  title: '', slug: '', client_name: '', industry: 'Technology', timeline: '',
  challenge: '', solution: '', results: '', content: '',
  cover_image_url: null, gallery_images: [], metrics: [],
  status: 'draft', seo_title: '', seo_description: '', og_image_url: null,
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
      <label className="text-sm font-semibold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function CaseStudyEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newMetric, setNewMetric] = useState({ label: '', value: '' });

  useEffect(() => {
    if (isEditing && id) {
      supabase.from('case_studies').select('*').eq('id', id).single().then(({ data, error: err }) => {
        if (err || !data) { setError('Case study not found'); return; }
        setForm({
          title: data.title,
          slug: data.slug,
          client_name: data.client_name,
          industry: data.industry,
          timeline: data.timeline ?? '',
          challenge: data.challenge,
          solution: data.solution,
          results: data.results,
          content: data.content,
          cover_image_url: data.cover_image_url,
          gallery_images: data.gallery_images ?? [],
          metrics: (data.metrics as CaseStudyMetric[]) ?? [],
          status: data.status,
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
          og_image_url: data.og_image_url,
          published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        });
        setSlugManuallyEdited(true);
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const set = (field: keyof FormData, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : generateSlug(title),
      seo_title: prev.seo_title || title,
    }));
  };

  const addMetric = () => {
    if (!newMetric.label || !newMetric.value) return;
    set('metrics', [...form.metrics, { ...newMetric }]);
    setNewMetric({ label: '', value: '' });
  };

  const removeMetric = (i: number) => set('metrics', form.metrics.filter((_, idx) => idx !== i));

  const handleSave = async (publishNow?: boolean) => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.slug.trim()) { setError('Slug is required'); return; }
    if (!form.client_name.trim()) { setError('Client name is required'); return; }

    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      client_name: form.client_name.trim(),
      industry: form.industry,
      timeline: form.timeline,
      challenge: form.challenge.trim(),
      solution: form.solution.trim(),
      results: form.results.trim(),
      content: form.content,
      cover_image_url: form.cover_image_url,
      gallery_images: form.gallery_images,
      metrics: form.metrics,
      status: publishNow ? 'published' : form.status,
      seo_title: form.seo_title || form.title,
      seo_description: form.seo_description || form.challenge,
      og_image_url: form.og_image_url || form.cover_image_url,
      published_at: (publishNow || form.status === 'published') ? new Date(form.published_at).toISOString() : null,
    } as const;

    let result;
    if (isEditing && id) {
      result = await supabase.from('case_studies').update(payload).eq('id', id).select().single();
    } else {
      result = await supabase.from('case_studies').insert(payload).select().single();
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setSuccess(publishNow ? 'Published!' : 'Saved!');
    setTimeout(() => setSuccess(''), 3000);
    if (!isEditing && result.data) navigate(`/admin/case-studies/${result.data.id}/edit`, { replace: true });
    if (publishNow) set('status', 'published');
    setSaving(false);
  };

  if (loading) return (
    <AdminLayout title="Loading...">
      <div className="flex items-center justify-center py-24"><Loader2 className="text-[#8B5CF6] animate-spin" size={28} /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout
      title={isEditing ? 'Edit Case Study' : 'New Case Study'}
      breadcrumbs={[{ label: 'Case Studies', href: '/admin/case-studies' }, { label: isEditing ? 'Edit' : 'New' }]}
      actions={
        <div className="flex items-center gap-2">
          {form.status === 'published' && (
            <a href={`/case-studies/${form.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-xl px-3 py-2 bg-white hover:text-[#8B5CF6] transition-colors">
              <Eye size={13} /> Preview
            </a>
          )}
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-4 py-2 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-xl px-4 py-2 hover:bg-[#7C3AED] transition-colors shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />} Publish
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
        {/* Left — main content */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Basic Info">
            <Field label="Title" required>
              <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Case study title..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-lg font-semibold focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all" />
            </Field>
            <Field label="Slug" required hint={`/case-studies/${form.slug || 'your-slug'}`}>
              <input type="text" value={form.slug} onChange={e => { set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-')); setSlugManuallyEdited(true); }} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Client Name" required>
                <input type="text" value={form.client_name} onChange={e => set('client_name', e.target.value)} placeholder="Acme Corp" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 text-sm transition-all" />
              </Field>
              <Field label="Timeline">
                <input type="text" value={form.timeline} onChange={e => set('timeline', e.target.value)} placeholder="e.g. 3 months, Q1 2025" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 text-sm transition-all" />
              </Field>
            </div>
          </Section>

          <Section title="Challenge, Solution & Results">
            <Field label="The Challenge">
              <textarea value={form.challenge} onChange={e => set('challenge', e.target.value)} rows={3} placeholder="What problem did the client face?" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none text-sm transition-all" />
            </Field>
            <Field label="Our Solution">
              <textarea value={form.solution} onChange={e => set('solution', e.target.value)} rows={3} placeholder="How did you solve it?" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none text-sm transition-all" />
            </Field>
            <Field label="Results & Impact">
              <textarea value={form.results} onChange={e => set('results', e.target.value)} rows={3} placeholder="What was the outcome?" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none text-sm transition-all" />
            </Field>
          </Section>

          {/* Metrics Builder */}
          <Section title="Key Metrics">
            <div className="space-y-3">
              {form.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{m.value}</p>
                    <p className="text-xs text-slate-500">{m.label}</p>
                  </div>
                  <button onClick={() => removeMetric(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Value (e.g. 40%)"
                  value={newMetric.value}
                  onChange={e => setNewMetric(p => ({ ...p, value: e.target.value }))}
                  className="w-28 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] text-center font-bold text-slate-700"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Revenue Increase)"
                  value={newMetric.label}
                  onChange={e => setNewMetric(p => ({ ...p, label: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addMetric()}
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] text-slate-700"
                />
                <button onClick={addMetric} className="px-3 py-2.5 bg-[#8B5CF6] text-white rounded-xl text-xs font-semibold hover:bg-[#7C3AED] transition-colors flex items-center gap-1">
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </Section>

          <Section title="Full Content">
            <RichTextEditor
              content={form.content}
              onChange={html => set('content', html)}
              placeholder="Write the detailed case study content..."
            />
          </Section>

          <Section title="SEO">
            <Field label="Meta Title" hint={`${(form.seo_title || form.title).length}/60 chars`}>
              <input type="text" value={form.seo_title} onChange={e => set('seo_title', e.target.value)} placeholder={form.title} maxLength={70} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm transition-all" />
            </Field>
            <Field label="Meta Description">
              <textarea value={form.seo_description} onChange={e => set('seo_description', e.target.value)} rows={2} maxLength={165} placeholder={form.challenge || 'Meta description...'} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] resize-none text-sm transition-all" />
            </Field>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SERP Preview</p>
              <p className="text-[#1a0dab] text-base font-medium truncate">{form.seo_title || form.title || 'Case Study Title'}</p>
              <p className="text-green-700 text-xs">launchaipilot.com/case-studies/{form.slug || 'slug'}</p>
              <p className="text-slate-600 text-sm line-clamp-2 mt-1">{form.seo_description || form.challenge || 'Description...'}</p>
            </div>
          </Section>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <Section title="Publish">
            <div className="flex gap-2">
              {(['draft', 'published'] as const).map(s => (
                <button key={s} type="button" onClick={() => set('status', s)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.status === s ? (s === 'published' ? 'bg-green-500 text-white' : 'bg-amber-400 text-white') : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Publish Date</label>
              <input type="datetime-local" value={form.published_at} onChange={e => set('published_at', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm" />
            </div>
          </Section>

          <Section title="Classification">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Industry</label>
              <div className="relative">
                <select value={form.industry} onChange={e => set('industry', e.target.value)} className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#8B5CF6] text-sm bg-white cursor-pointer pr-8">
                  {INDUSTRY_OPTIONS.map(i => <option key={i}>{i}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </Section>

          <Section title="Cover Image">
            <ImageUpload value={form.cover_image_url} onChange={url => set('cover_image_url', url)} folder="case-studies" label="" aspectRatio="video" />
          </Section>
        </div>
      </div>
    </AdminLayout>
  );
}
