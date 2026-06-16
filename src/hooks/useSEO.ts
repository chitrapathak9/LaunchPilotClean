import { useEffect, useRef } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  structuredData?: Record<string, unknown>;
}

const DEFAULT_TITLE = 'LaunchPilot — AI-Powered Startup Launch Platform';
const DEFAULT_DESCRIPTION = 'Build and launch your startup faster with AI-powered skills, tools, and mentorship. LaunchPilot helps founders go from idea to revenue in days.';
const SITE_URL = 'https://launchpilot.ai';

export function useSEO(options: SEOOptions = {}) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    publishedAt,
    modifiedAt,
    author,
    structuredData,
  } = options;

  const pageTitle = title ? `${title} | LaunchPilot` : DEFAULT_TITLE;
  const structuredDataRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Set document title
    document.title = pageTitle;

    // Helper to set/update meta tag
    const setMeta = (selector: string, value: string, attr = 'content') => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrValue.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper to set/update link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:site_name"]', 'LaunchPilot');

    if (canonicalUrl) {
      setLink('canonical', canonicalUrl);
      setMeta('meta[property="og:url"]', canonicalUrl);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
      setMeta('meta[property="og:image:width"]', '1200');
      setMeta('meta[property="og:image:height"]', '630');
      setMeta('meta[name="twitter:image"]', ogImage);
    }

    setMeta('meta[name="twitter:card"]', ogImage ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', description);

    if (publishedAt) setMeta('meta[property="article:published_time"]', publishedAt);
    if (modifiedAt) setMeta('meta[property="article:modified_time"]', modifiedAt);
    if (author) setMeta('meta[property="article:author"]', author);

    // JSON-LD structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
      structuredDataRef.current = script;
    }

    return () => {
      // Clean up structured data on unmount
      if (structuredDataRef.current) {
        document.head.removeChild(structuredDataRef.current);
        structuredDataRef.current = null;
      }
    };
  }, [pageTitle, description, canonicalUrl, ogImage, ogType, publishedAt, modifiedAt, author, JSON.stringify(structuredData)]);
}

// Helper to build blog post structured data
export function buildBlogStructuredData(blog: {
  title: string;
  excerpt: string;
  slug: string;
  author?: string;
  publishedAt?: string | null;
  updatedAt?: string;
  coverImage?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    url: `${SITE_URL}/blog/${blog.slug}`,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: blog.author ? {
      '@type': 'Person',
      name: blog.author,
    } : undefined,
    image: blog.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'LaunchPilot',
      url: SITE_URL,
    },
  };
}

// Helper to build case study structured data
export function buildCaseStudyStructuredData(cs: {
  title: string;
  excerpt: string;
  slug: string;
  client: string;
  publishedAt?: string | null;
  coverImage?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.excerpt,
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    datePublished: cs.publishedAt,
    about: { '@type': 'Organization', name: cs.client },
    image: cs.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'LaunchPilot',
      url: SITE_URL,
    },
  };
}
