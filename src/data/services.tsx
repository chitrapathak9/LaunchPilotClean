import React from 'react';
import { Globe, Smartphone, Palette } from 'lucide-react';

export interface ServiceData {
  id: string;
  slug: string;
  num: string;
  icon: React.ReactNode;
  name: string;
  tagline: string;
  heroSubtitle: string;
  description: string;
  marketingContent: string;
  highlights: string[];
  traditionalApproach: string[];
  ourApproach: string[];
}

export const services: ServiceData[] = [
  {
    id: 'saas',
    slug: 'saas-development',
    num: '01',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="m5.189 11.217l2.45 1.037q.465-.931 1.013-1.802t1.21-1.694l-1.535-.294q-.154-.039-.298.009t-.26.163zm3.242 1.671l2.83 2.826q1.185-.535 2.385-1.36t2.308-1.933q1.615-1.615 2.468-3.445t.959-4.226q-2.396.106-4.22.959q-1.822.853-3.438 2.468q-1.107 1.108-1.932 2.317t-1.36 2.394m4.74-3.431q0-.617.44-1.057q.441-.44 1.07-.44t1.069.44t.44 1.057t-.44 1.056t-1.07.44t-1.068-.44t-.44-1.056m-.259 9.504l2.581-2.58q.115-.116.164-.26q.048-.144.01-.298l-.295-1.535q-.823.662-1.694 1.207t-1.802 1.01zM20.316 3.83q.168 2.756-.78 5.07q-.947 2.315-2.95 4.318l-.174.173l-.173.173l.404 2.052q.081.404-.03.783q-.112.379-.404.671l-3.642 3.623l-1.658-3.905l-3.564-3.564l-3.905-1.677l3.617-3.623q.292-.292.674-.413t.786-.04l2.09.422q.096-.096.163-.173t.164-.173q2.004-2.004 4.315-2.944t5.068-.773m-15.2 12.337q.587-.586 1.426-.58t1.426.594t.584 1.426q-.003.84-.59 1.426q-.51.51-1.635.873t-2.605.502q.139-1.48.512-2.605t.882-1.636m.714.727q-.289.289-.539.942t-.33 1.347q.694-.081 1.347-.338q.652-.256.941-.545q.3-.3.306-.715q.005-.416-.295-.716t-.715-.287q-.415.012-.715.312" />
      </svg>
    ),
    name: 'SaaS Development',
    tagline: 'Multi-tenant platforms built for scale',
    heroSubtitle: 'We engineer highly scalable, multi-tenant SaaS architectures that handle rapid user acquisition without breaking a sweat.',
    description:
      'Architecting scalable, multi-tenant software platforms designed for high availability and rapid user acquisition. We handle everything from database architecture to API design and deployment pipelines.',
    marketingContent: 'At Launch AI Pilot, SaaS development isn\'t just about writing code; it\'s about architecting scalable, revenue-generating engines. We build robust, multi-tenant platforms designed from day one to handle rapid user acquisition, complex subscription billing, and enterprise-grade security. We understand that a successful SaaS must have a flawless user experience coupled with a bulletproof backend. That is why our elite engineering team focuses on clean cloud-native architectures that allow you to ship features faster than your competitors, pivot without rewriting your entire codebase, and ultimately position your product as a top 1% market leader.',
    highlights: ['Multi-tenant architecture', 'High availability design', 'API-first approach'],
    traditionalApproach: [
      'Monolithic codebases that are impossible to scale.',
      'Hidden fees and ongoing "maintenance" retainers.',
      'Siloed databases leading to compliance nightmares.',
      'Months of discovery before writing a single line of code.'
    ],
    ourApproach: [
      'Cloud-native microservices built for immediate scale.',
      '100% IP ownership handed to your team at launch.',
      'Enterprise-grade security and SOC2-ready architecture.',
      'Rapid 2-week agile sprints with working software delivered consistently.'
    ]
  },
  {
    id: 'mvp',
    slug: 'mvp-development',
    num: '02',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 14v4.4a.6.6 0 0 0 .6.6H10m9-5v4.4a.6.6 0 0 1-.6.6H14m0-14h4.4a.6.6 0 0 1 .6.6V10M4 10V5.6a.6.6 0 0 1 .6-.6H10m4 14v1a2 2 0 1 1-4 0v-1m-6-9h1a2 2 0 1 1 0 4H4m15-4h1a2 2 0 1 1 0 4h-1m-5-9V4a2 2 0 1 0-4 0v1" />
      </svg>
    ),
    name: 'MVP Development',
    tagline: 'Market validation without technical debt',
    heroSubtitle: 'Launch your core product in weeks, not months. Investor-ready quality built on a foundation that actually scales.',
    description:
      'Rapidly prototyping and launching core product offerings to validate market fit without accumulating technical debt. We ship fast, but with the right foundations to build upon.',
    marketingContent: 'Stop wasting months and hundreds of thousands of dollars on bloated initial releases. Our MVP development service is engineered for speed to market without sacrificing the foundation. We help early-stage founders and enterprise innovation labs ruthlessly prioritize their core value proposition. In just 4-6 weeks, we deliver a sleek, investor-ready product that looks and feels like a Series-A company. We build on highly scalable frameworks so that when you validate your market fit and are ready to scale, you won\'t need to throw away the code and start over.',
    highlights: ['2–6 week timelines', 'Clean scalable codebase', 'Investor-ready quality'],
    traditionalApproach: [
      'Fragile code that has to be completely rewritten post-funding.',
      'Bloated scopes containing features users don\'t actually want.',
      'Using cheap templates that damage your brand perception.',
      'Agencies holding your codebase hostage.'
    ],
    ourApproach: [
      'Production-ready architecture from Day 1.',
      'Ruthless prioritization of the core value proposition.',
      'Premium, custom-designed interfaces that win trust immediately.',
      'Complete codebase handover with zero vendor lock-in.'
    ]
  },
  {
    id: 'ai',
    slug: 'ai-development',
    num: '03',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z" />
      </svg>
    ),
    name: 'AI Development',
    tagline: 'Production-grade AI, not experiments',
    heroSubtitle: 'Deploy autonomous agents and fine-tuned proprietary models to engineer intelligent layers into your business operations.',
    description:
      'Deploying autonomous agents and fine-tuning proprietary models to engineer intelligent layers into your operations. RAG pipelines, LLM orchestration, and custom AI workflows.',
    marketingContent: 'AI is no longer just a buzzword; it is a critical competitive advantage. We move beyond simple ChatGPT wrappers to build deeply integrated, production-grade AI systems that solve real operational bottlenecks. Whether it is deploying autonomous agents that handle customer support, constructing secure RAG pipelines that leverage your proprietary enterprise data, or fine-tuning models for specific industry tasks, we engineer intelligence into your business. Our expertise ensures that your AI implementations are not only cutting-edge but also highly secure, reliable, and capable of delivering immediate ROI.',
    highlights: ['LLM orchestration', 'RAG pipelines', 'Autonomous AI agents'],
    traditionalApproach: [
      'Basic ChatGPT wrappers masquerading as custom AI.',
      'Unpredictable hallucinations breaking production systems.',
      'Exposing sensitive company data to public models.',
      'AI features that sound cool but solve no real business problems.'
    ],
    ourApproach: [
      'Deep integration of custom RAG pipelines with your proprietary data.',
      'Multi-agent orchestration with robust guardrails and fallbacks.',
      'Private, secure model hosting protecting your intellectual property.',
      'AI implementations laser-focused on automating costly manual workflows.'
    ]
  },
  {
    id: 'web',
    slug: 'web-development',
    num: '04',
    icon: <Globe size={20} />,
    name: 'Web Development',
    tagline: 'Performance-first web applications',
    heroSubtitle: 'High-performance, edge-optimized web applications built with modern frameworks to deliver flawless user experiences.',
    description:
      'Building high-performance, highly scalable web applications with modern frameworks and flawless responsive design. From enterprise portals to consumer apps.',
    marketingContent: 'The modern web demands lightning-fast load times, exceptional accessibility, and pixel-perfect design. We engineer high-performance web applications using edge-optimized frameworks like Next.js and React. Our approach guarantees sub-second page loads that significantly boost your SEO and conversion rates. Whether we are building a complex B2B enterprise portal or a high-traffic consumer application, we prioritize clean, component-driven architecture. This ensures that your web app is not only a joy for your users to navigate but also incredibly easy for your internal teams to maintain and scale.',
    highlights: ['Next.js / React', 'Edge-optimized delivery', 'Accessibility-first'],
    traditionalApproach: [
      'Slow, bloated legacy frameworks that hurt SEO and conversions.',
      'Generic templates that look like every other competitor.',
      'Messy codebases that are impossible for internal teams to update.',
      'Poor mobile experiences treated as an afterthought.'
    ],
    ourApproach: [
      'Next.js and React foundations for sub-second page loads.',
      'Bespoke, award-winning UI/UX that establishes market leadership.',
      'Clean, component-driven architecture for effortless maintenance.',
      'Mobile-first, responsive perfection across every device.'
    ]
  },
  {
    id: 'mobile',
    slug: 'mobile-development',
    num: '05',
    icon: <Smartphone size={20} />,
    name: 'Mobile App Development',
    tagline: 'Native-feeling apps that users love',
    heroSubtitle: 'Disruptive, native-feeling mobile experiences that prioritize user retention, smooth animations, and intuitive interactions.',
    description:
      'Creating disruptive, native-feeling mobile experiences that prioritize user retention and intuitive interactions. iOS and Android with shared codebases where appropriate.',
    marketingContent: 'In a crowded App Store, average doesn\'t cut it. We design and engineer disruptive mobile applications that captivate users from the first tap. By leveraging modern frameworks like React Native, we deliver true 60fps native-feeling performance across both iOS and Android from a single, unified codebase—saving you significant development costs and time. We focus heavily on offline-first capabilities, smooth micro-animations, and intuitive UX to maximize user retention. From concept to guaranteed App Store approval, we ensure your mobile presence stands out in the top 1%.',
    highlights: ['React Native / Flutter', 'Offline-first design', 'App Store ready'],
    traditionalApproach: [
      'Clunky, slow hybrid apps that feel like wrapped websites.',
      'Building twice (iOS and Android) doubling the cost and timeline.',
      'Apps that break without a perfect internet connection.',
      'Getting rejected by Apple/Google during the launch phase.'
    ],
    ourApproach: [
      'React Native architecture delivering true 60fps native performance.',
      'Single unified codebase cutting development costs in half.',
      'Robust offline-first capabilities and seamless state syncing.',
      'Guaranteed App Store and Google Play compliance and successful launch.'
    ]
  },
  {
    id: 'uiux',
    slug: 'ui-ux-design',
    num: '06',
    icon: <Palette size={20} />,
    name: 'UI/UX Design',
    tagline: 'Design that converts and retains',
    heroSubtitle: 'Digital interfaces that deliver intuitive user journeys, blending behavioral psychology with data-driven design principles.',
    description:
      'Designing digital interfaces that deliver intuitive user journeys, blending behavioral psychology with data-driven design principles. Systems that scale.',
    marketingContent: 'Great design is about more than aesthetics; it is about engineering user behavior. Our UI/UX design process bridges the gap between stunning visual fidelity and data-driven conversion optimization. We don\'t just design screens in a vacuum—we build comprehensive, scalable design systems complete with tokens and components that translate perfectly into code. By understanding behavioral psychology and your specific business goals, we create intuitive user journeys that reduce friction, build trust, and ultimately drive revenue. With our seamless developer handoffs, what you see is exactly what gets built.',
    highlights: ['Design systems', 'User research', 'Figma to production'],
    traditionalApproach: [
      '"Pretty" designs that completely ignore user conversion paths.',
      'Inconsistent components that confuse users and frustrate devs.',
      'Designing in a vacuum without understanding the technical constraints.',
      'Handing over messy Figma files with no design system.'
    ],
    ourApproach: [
      'Conversion-optimized user flows built on behavioral psychology.',
      'Comprehensive, scalable design systems (tokens, components, variants).',
      'Technical feasibility validated at every stage of the design process.',
      'Developer-ready handoffs bridging the gap between Figma and code.'
    ]
  },
];
