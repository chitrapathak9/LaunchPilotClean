import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { supabase } from '../lib/supabase';
import type { BlogWithAuthor } from '../types/database';
import { Clock, ArrowLeft, Loader2 } from 'lucide-react';

export function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('blogs')
        .select('*, profiles(full_name, avatar_url)')
        .eq('slug', id)
        .single();
      
      if (data) setPost(data as unknown as BlogWithAuthor);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </main>
        <LaunchFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 text-center">
          <h1 className="heading-lg text-ink-900 mb-4">Post not found</h1>
          <p className="body-lg text-ink-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <a href="/blog" className="btn-primary">Back to Blog</a>
        </main>
        <LaunchFooter />
      </div>
    );
  }

  const authorName = post.profiles?.full_name || 'Launch AI Pilot Team';
  const authorRole = 'AI Engineer'; // Default for now
  const dateString = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        
        {/* Header Section */}
        <div className="container-editorial mb-12">
          <a href="/blog" className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-indigo-600 hover:text-indigo-700 mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </a>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="badge-cobalt">{post.category || 'Engineering'}</span>
            <span className="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-500">
              <Clock size={16} /> {post.read_time_minutes || 5} min read
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[0.875rem] font-medium text-ink-500">{dateString}</span>
          </div>
          
          <h1 className="heading-hero text-ink-900 mb-10 text-balance">
            {post.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center gap-4 py-6 border-y border-gray-100">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-[1.25rem] text-indigo-600 overflow-hidden">
              {post.profiles?.avatar_url ? (
                <img src={post.profiles.avatar_url} alt={authorName} className="w-full h-full object-cover" />
              ) : (
                authorName.charAt(0)
              )}
            </div>
            <div>
              <p className="text-[1rem] font-bold text-ink-900 m-0">{authorName}</p>
              <p className="text-[0.875rem] text-ink-500 m-0">{authorRole}</p>
            </div>
          </div>
        </div>

        {post.cover_image_url && (
          <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mb-16">
            <img 
              src={post.cover_image_url} 
              alt={post.title} 
              className="w-full aspect-[21/9] object-cover rounded-[2rem] shadow-sm border border-gray-100"
            />
          </div>
        )}

        {/* Rich Text Content */}
        <div className="container-editorial">
          <article 
            className="prose prose-lg prose-indigo max-w-none text-ink-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Bottom Divider & CTA */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-gray-50 rounded-[2rem] p-10 text-center">
              <h3 className="text-[1.5rem] font-bold text-ink-900 mb-3">Want more technical insights?</h3>
              <p className="text-ink-500 mb-6 max-w-md mx-auto">
                We don't spam. Join our newsletter to get highly technical deep-dives sent straight to your inbox once a month.
              </p>
              <div className="flex max-w-md mx-auto gap-2">
                <input type="email" placeholder="Your email address" className="input-field" />
                <button className="btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

      </main>

      <LaunchFooter />
    </div>
  );
}
