// Dummy data mirroring a typical Supabase JSON response

export const mockBlogs = [
  {
    id: '1',
    slug: 'future-of-ai-agents',
    title: 'Why Autonomous AI Agents Are the Next Frontier for SaaS',
    excerpt: 'LLMs are great at text generation, but the real value lies in systems that can take actions. Here is how we are building autonomous agents for our clients.',
    content: `
      <p>The tech industry is moving past simple chatbots. While LLMs (Large Language Models) are incredible at generating text, businesses don't just need more text—they need actions executed reliably.</p>
      <h2>The Shift from Chat to Action</h2>
      <p>Right now, most "AI" features are just wrappers around ChatGPT. You type a prompt, you get text back. But the real ROI for enterprises lies in <strong>Autonomous Agents</strong>. These are systems that can:</p>
      <ul>
        <li>Read an incoming customer support email.</li>
        <li>Query your internal database for the user's recent orders.</li>
        <li>Identify a shipping delay.</li>
        <li>Issue a refund via the Stripe API.</li>
        <li>Draft and send an apology email.</li>
      </ul>
      <p>All without human intervention.</p>
      <h2>How We Build Them</h2>
      <p>At Launch AI Pilot, we build these systems using cutting-edge orchestration frameworks. We ensure that these agents operate within strict, sandboxed environments with clear guardrails so they never take an action they shouldn't.</p>
    `,
    category: 'AI Engineering',
    author: 'David',
    authorRole: 'Founder & Lead Architect',
    date: 'Oct 12, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: '2',
    slug: 'scaling-react-monorepos',
    title: 'Scaling React: When to Move to a Monorepo Architecture',
    excerpt: 'As your engineering team grows, managing multiple repositories becomes a bottleneck. Here is a practical guide on when and how to adopt a monorepo.',
    content: '<p>Content coming soon...</p>',
    category: 'Web Development',
    author: 'Rahul M.',
    authorRole: 'Senior Backend Engineer',
    date: 'Oct 05, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: '3',
    slug: 'offshore-hiring-mistakes',
    title: 'The Hidden Costs of Cheap Offshore Development',
    excerpt: 'A low hourly rate looks great on paper, but fixing bad architecture costs 10x more. Why elite engineering is the cheapest option in the long run.',
    content: '<p>Content coming soon...</p>',
    category: 'Business Strategy',
    author: 'Priya S.',
    authorRole: 'Lead Frontend Developer',
    date: 'Sep 28, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

export const mockCaseStudies = [
  {
    id: '1',
    slug: 'fintech-scale',
    client: 'FinPay Global',
    industry: 'Fintech',
    title: 'Scaling a Payment Gateway to Process $1M Daily Volume',
    headline: 'Zero Downtime Architecture',
    stats: [
      { label: 'Volume Increase', value: '400%' },
      { label: 'Latency Reduced', value: '60%' },
      { label: 'Uptime', value: '99.99%' }
    ],
    challenge: 'FinPay Global was struggling with a legacy monolithic architecture. Every time they ran a marketing campaign, the sudden influx of users caused database deadlocks, resulting in failed transactions and furious customers.',
    solution: 'We completely decoupled their architecture, migrating them to a robust microservices infrastructure on AWS. We implemented heavy caching with Redis and split their databases for read/write heavy operations to ensure high availability.',
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'AWS ECS', 'Docker'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2',
    slug: 'healthcare-ai',
    client: 'MediTrack',
    industry: 'Healthcare',
    title: 'Automating Patient Triage with Custom LLMs',
    headline: 'AI in Healthcare',
    stats: [
      { label: 'Triage Time', value: '-80%' },
      { label: 'Accuracy', value: '96%' },
      { label: 'Hours Saved', value: '10k+' }
    ],
    challenge: 'Doctors were spending 3 hours a day just reading and categorizing incoming patient symptoms submitted via an online portal.',
    solution: 'We trained and deployed a custom, HIPAA-compliant Language Model that instantly reads patient submissions, categorizes the urgency, and routes it to the correct department.',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'React', 'AWS HIPAA-Compliant Enclave'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    slug: 'ecommerce-migration',
    client: 'StyleStore',
    industry: 'E-Commerce',
    title: 'Migrating a Legacy Magento Store to a Headless Next.js Architecture',
    headline: 'Lightning Fast Commerce',
    stats: [
      { label: 'Page Load', value: '0.8s' },
      { label: 'Conversion Rate', value: '+35%' },
      { label: 'Mobile Sales', value: '2x' }
    ],
    challenge: 'StyleStore had a beautiful brand but a terrible, slow, bloated Magento website that took 5 seconds to load on mobile.',
    solution: 'We ripped out the front-end and replaced it with a lightning-fast Headless Next.js application, utilizing static site generation for sub-second page loads.',
    techStack: ['Next.js', 'Vercel', 'Shopify Storefront API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
  }
];
