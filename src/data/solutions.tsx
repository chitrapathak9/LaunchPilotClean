import React from 'react';
import { Cpu, Users, Database, LayoutTemplate, Smartphone } from 'lucide-react';

export interface EdgeCase {
  industry: string;
  problem: string;
  revenueLoss: string;
  solution: string;
}

export interface SolutionData {
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
  edgeCases: EdgeCase[];
}

export const solutions: SolutionData[] = [
  {
    id: 'ai-apps',
    slug: 'ai-apps',
    num: '01',
    icon: <Cpu size={20} />,
    name: 'AI Apps',
    tagline: 'Intelligent applications that do the heavy lifting',
    heroSubtitle: 'From generative AI chatbots to fully autonomous business workflows, we build AI applications that give you an unfair advantage.',
    description: 'We design and develop custom AI-powered applications that integrate seamlessly with your existing infrastructure, enabling new revenue streams and massive operational efficiencies.',
    marketingContent: 'Off-the-shelf AI tools force you to adapt your business to their limitations. We build custom AI applications that adapt to you. By leveraging fine-tuned large language models, advanced RAG architectures, and autonomous multi-agent workflows, we create intelligent systems capable of handling complex reasoning and task execution. We don\'t just plug into an API; we engineer intelligent layers that understand your proprietary data, automate your most expensive manual processes, and establish an unbridgeable competitive moat in your industry.',
    highlights: ['Multi-agent architectures', 'Private RAG pipelines', 'Proprietary model fine-tuning'],
    traditionalApproach: [
      'Basic ChatGPT wrappers that hallucinate constantly.',
      'Siloed AI tools that refuse to integrate with your core database.',
      'Sending sensitive company IP to public, unsecure LLMs.',
      'AI features that sound cool in pitches but fail in production.'
    ],
    ourApproach: [
      'Deep, secure integration with your proprietary data silos.',
      'Complex multi-agent orchestration for autonomous task execution.',
      'Private model hosting to ensure 100% intellectual property security.',
      'Rigorous testing frameworks to eliminate hallucinations before launch.'
    ],
    edgeCases: [
      {
        industry: 'Healthcare',
        problem: 'Clinicians spend up to 40% of their shift manually structuring unstructured clinical notes into EHR systems, leading to severe burnout.',
        revenueLoss: '$4.6M/year lost in clinical inefficiency per 100 physicians.',
        solution: 'Deploy an autonomous RAG-pipeline that instantly extracts, normalizes, and injects clinical notes directly into Epic/Cerner with 99% accuracy.'
      },
      {
        industry: 'Ad Tech',
        problem: 'Account managers manually analyzing massive, unstructured campaign data to generate weekly client reports, delaying critical bid adjustments.',
        revenueLoss: 'Losing 15% of ad-spend ROI due to delayed campaign pivots.',
        solution: 'Custom LLM agents that ingest real-time campaign data, instantly generate narrative reports, and automatically execute bid optimizations.'
      },
      {
        industry: 'Hospital Management',
        problem: 'Operating rooms sit empty due to manual, phone-based scheduling conflicts and unpredictable patient discharge predictions.',
        revenueLoss: '$1,200 lost per hour, per unused operating room.',
        solution: 'Predictive AI agents that analyze historical discharge data and autonomously optimize the surgical calendar in real-time.'
      },
      {
        industry: 'SaaS Apps',
        problem: 'High customer churn due to generic, rule-based chatbots that frustrate users and fail to resolve complex account issues.',
        revenueLoss: '30% of support tickets escalate to expensive L2 human engineers.',
        solution: 'Fine-tuned autonomous agents capable of resolving complex billing and technical support tickets via API integration without human intervention.'
      }
    ]
  },
  {
    id: 'crm',
    slug: 'crm-development',
    num: '02',
    icon: <Users size={20} />,
    name: 'CRM Development',
    tagline: 'Customer relationship engines built for scale',
    heroSubtitle: 'Custom CRM solutions engineered to align perfectly with your unique sales pipelines and operational workflows.',
    description: 'When Salesforce or HubSpot becomes too bloated or restrictive, we architect custom CRM platforms that supercharge your sales teams and perfectly map to your business logic.',
    marketingContent: 'Enterprise CRM platforms are notoriously rigid and expensive, often requiring you to change your successful business processes to fit their generic software. We engineer bespoke CRM systems that mirror the exact way your company generates revenue. From intelligent lead scoring algorithms to seamless third-party ERP integrations and predictive sales analytics, we build lightweight, lightning-fast interfaces that your sales team will actually love using—completely free from monthly per-user licensing fees.',
    highlights: ['Zero per-seat licensing fees', 'Custom workflow automation', 'Predictive lead scoring'],
    traditionalApproach: [
      'Paying massive monthly per-user licensing fees forever.',
      'Forcing your sales team to adapt to rigid, generic software.',
      'Clunky, slow interfaces that discourage accurate data entry.',
      'Endless reliance on third-party consultants just to add a new field.'
    ],
    ourApproach: [
      '100% IP ownership with zero ongoing licensing fees.',
      'Workflows designed exactly around your unique sales methodology.',
      'Lightning-fast, intuitive UI built on Next.js to ensure high adoption.',
      'Flexible backend architecture that you control completely.'
    ],
    edgeCases: [
      {
        industry: 'Healthcare',
        problem: 'Patient intake coordinators tracking high-value elective surgery leads across disjointed spreadsheets and non-compliant legacy CRMs.',
        revenueLoss: '30% drop-off rate for high-margin elective procedures.',
        solution: 'A HIPAA-compliant, bespoke CRM that automates patient follow-ups and securely maps the entire surgical journey from inquiry to post-op.'
      },
      {
        industry: 'Ad Tech',
        problem: 'Sales teams failing to upsell enterprise clients because Salesforce cannot handle complex, real-time programmatic inventory data.',
        revenueLoss: '$2.5M/year in missed upsell opportunities.',
        solution: 'A custom CRM built on a graph database that instantly matches live ad inventory with specific client purchasing habits.'
      },
      {
        industry: 'Hospital Management',
        problem: 'Physician liaison teams blindly pitching referral networks without real-time data on specialty capacity or recent referral drop-offs.',
        revenueLoss: '$5M+ lost annually in misdirected referral leakage.',
        solution: 'A specialized Provider Relationship Management (PRM) system that tracks referral patterns and flags capacity issues before liaisons make the call.'
      },
      {
        industry: 'SaaS Apps',
        problem: 'Sales teams losing massive enterprise deals because generic CRMs cannot track complex product-led growth (PLG) usage metrics.',
        revenueLoss: '25% lower conversion rate on enterprise freemium accounts.',
        solution: 'A CRM deeply integrated with your application database that triggers high-value sales alerts the moment an enterprise account hits critical usage limits.'
      }
    ]
  },
  {
    id: 'erp',
    slug: 'erp-development',
    num: '03',
    icon: <Database size={20} />,
    name: 'ERP Development',
    tagline: 'The central nervous system for your enterprise',
    heroSubtitle: 'Unify your supply chain, HR, finance, and operations into a single, custom-built source of truth.',
    description: 'We develop highly secure, custom Enterprise Resource Planning (ERP) systems that eliminate data silos and automate complex, multi-departmental business processes.',
    marketingContent: 'Off-the-shelf ERP systems are notorious for multi-year implementation times and astronomical costs. We take a different approach. By utilizing modern cloud-native architectures and agile methodologies, we build custom ERPs that solve your most critical operational bottlenecks first. Whether you need to unify a fragmented global supply chain, automate complex financial reporting, or streamline HR operations, we deliver a scalable, centralized platform that provides real-time visibility across your entire organization.',
    highlights: ['Unified data architecture', 'Real-time financial analytics', 'Supply chain automation'],
    traditionalApproach: [
      'Multi-year implementations that go vastly over budget.',
      'Incredibly outdated UI that requires weeks of employee training.',
      'Data silos caused by poorly integrated third-party modules.',
      'Vendor lock-in that paralyzes your ability to pivot.'
    ],
    ourApproach: [
      'Phased, agile rollouts that deliver ROI in months, not years.',
      'Consumer-grade, intuitive interfaces that require zero training.',
      'A single, unified backend ensuring data integrity across departments.',
      'Complete codebase handover ensuring you own your core infrastructure.'
    ],
    edgeCases: [
      {
        industry: 'Healthcare',
        problem: 'Fragmented supply chains causing critical shortages of specialized medical equipment during peak surgical hours.',
        revenueLoss: '$500k/month in delayed or canceled high-value procedures.',
        solution: 'A custom ERP that unifies procurement, inventory, and surgical scheduling to ensure just-in-time equipment delivery.'
      },
      {
        industry: 'Ad Tech',
        problem: 'Finance teams spending weeks manually reconciling complex publisher payouts against fragmented programmatic ad-server data.',
        revenueLoss: 'Significant cash-flow bottlenecks and costly audit penalties.',
        solution: 'An automated financial ERP module that ingests massive ad-server logs and executes real-time, micro-cent publisher reconciliation.'
      },
      {
        industry: 'Hospital Management',
        problem: 'HR teams drowning in manual credentialing, shift-scheduling, and compliance tracking across thousands of traveling nurses and doctors.',
        revenueLoss: '$1.2M/year in compliance fines and premium agency staffing costs.',
        solution: 'A unified workforce management ERP that automates license verification, optimizes shift coverage, and prevents compliance lapses.'
      },
      {
        industry: 'SaaS Apps',
        problem: 'Revenue operations unable to track complex consumption-based billing models alongside fixed subscription tiers.',
        revenueLoss: 'Up to 8% of unbilled usage revenue slipping through the cracks.',
        solution: 'A bespoke billing ERP engineered specifically to ingest real-time API usage metrics and generate flawless complex invoices automatically.'
      }
    ]
  },
  {
    id: 'web-portal',
    slug: 'web-portal',
    num: '04',
    icon: <LayoutTemplate size={20} />,
    name: 'Web Portal',
    tagline: 'Secure, high-performance gateways for users and partners',
    heroSubtitle: 'B2B and B2C web portals designed for high-volume transactions, ironclad security, and effortless navigation.',
    description: 'We build enterprise-grade web portals—from patient dashboards to B2B vendor management systems—that securely expose core business functionalities to external stakeholders.',
    marketingContent: 'A web portal is often the primary touchpoint between your enterprise and your most important stakeholders—be it vendors, partners, or customers. It cannot afford to be slow, confusing, or vulnerable. We engineer high-performance portals using edge-optimized networks that guarantee lightning-fast load times globally. With granular role-based access control (RBAC), intuitive dashboards, and seamless integration into your legacy backend systems, we ensure your stakeholders have a premium, frictionless experience.',
    highlights: ['Granular Role-Based Access Control', 'High-volume transaction processing', 'Legacy system integration'],
    traditionalApproach: [
      'Slow load times that frustrate partners and damage your brand.',
      'Weak security protocols exposing sensitive user data.',
      'Confusing navigation that drives up customer support tickets.',
      'Brittle integrations that crash when legacy systems update.'
    ],
    ourApproach: [
      'Sub-second page loads globally via edge-optimized frameworks.',
      'Enterprise-grade security and strict SOC2 compliance readiness.',
      'Intuitive, user-tested UX that drastically reduces support overhead.',
      'Robust API layers that safely bridge modern portals with legacy backends.'
    ],
    edgeCases: [
      {
        industry: 'Healthcare',
        problem: 'Patients abandoning critical pre-authorization and intake forms because legacy portals are slow, confusing, and not mobile-friendly.',
        revenueLoss: '20% increase in administrative overhead and delayed billing cycles.',
        solution: 'A lightning-fast, mobile-optimized patient portal built on Next.js that reduces intake time by 70% and securely bridges legacy EHR systems.'
      },
      {
        industry: 'Ad Tech',
        problem: 'Advertisers churning because self-serve campaign reporting portals take minutes to load large datasets.',
        revenueLoss: '$1M+ in lost recurring revenue from frustrated enterprise clients.',
        solution: 'An edge-optimized reporting dashboard using advanced caching to render massive campaign analytics instantaneously.'
      },
      {
        industry: 'Hospital Management',
        problem: 'External vendors struggling to submit compliance documents and invoices through clunky, outdated procurement portals.',
        revenueLoss: 'Thousands of hours lost resolving vendor disputes and delayed supply chain deliveries.',
        solution: 'A frictionless B2B vendor portal with automated OCR document processing and real-time invoice status tracking.'
      },
      {
        industry: 'SaaS Apps',
        problem: 'Enterprise clients demanding complex, white-labeled sub-portals for their own teams, which the core app cannot support.',
        revenueLoss: 'Losing multi-million dollar contracts to competitors with better multi-tier access control.',
        solution: 'A scalable, multi-tenant portal architecture featuring absolute granular RBAC and seamless, on-the-fly white-labeling.'
      }
    ]
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    num: '05',
    icon: <Smartphone size={20} />,
    name: 'Mobile Apps',
    tagline: 'Native experiences that command the home screen',
    heroSubtitle: 'Disruptive iOS and Android applications that prioritize fluid animations, offline capabilities, and aggressive user retention.',
    description: 'We architect and develop flagship mobile applications that dominate the App Store. From consumer social platforms to complex enterprise field-service tools.',
    marketingContent: 'Your users judge your brand by the responsiveness of your app. We don\'t settle for clunky hybrid wrappers. By leveraging React Native and advanced native modules, we engineer mobile applications that deliver true 60fps performance across both iOS and Android. From complex offline state synchronization for enterprise field workers to fluid micro-animations that delight consumers, we build apps designed to secure a permanent spot on your users\' home screens.',
    highlights: ['True 60fps native performance', 'Advanced offline-sync logic', 'Single unified codebase'],
    traditionalApproach: [
      'Building twice (iOS and Android) doubling the cost and timeline.',
      'Clunky, slow hybrid apps that feel cheap to the end user.',
      'Apps that completely break without a perfect internet connection.',
      'Failing Apple or Google\'s rigorous App Store review processes.'
    ],
    ourApproach: [
      'React Native architecture delivering flawless native performance.',
      'Single unified codebase cutting development costs significantly.',
      'Robust offline-first capabilities ensuring the app always works.',
      'Guaranteed App Store compliance and a seamless launch strategy.'
    ],
    edgeCases: [
      {
        industry: 'Healthcare',
        problem: 'Home health nurses losing critical patient data because their hybrid mobile app crashes when transitioning out of cellular service zones.',
        revenueLoss: 'Critical compliance violations and thousands of lost billing hours.',
        solution: 'A robust offline-first React Native app that perfectly queues and synchronizes clinical data the moment a connection is restored.'
      },
      {
        industry: 'Ad Tech',
        problem: 'Executives demanding real-time campaign alerts on mobile, but current web-wrappers fail to deliver reliable push notifications.',
        revenueLoss: 'Missed emergency campaign pauses leading to hundreds of thousands in wasted ad spend.',
        solution: 'A true native-feeling app with deeply integrated push notification pipelines and real-time websockets.'
      },
      {
        industry: 'Hospital Management',
        problem: 'Facilities managers using paper checklists because the existing hospital mobile app is too clunky and slow to use on the floor.',
        revenueLoss: 'Severe inefficiencies causing delayed maintenance and regulatory audit failures.',
        solution: 'A blazing-fast, consumer-grade mobile tool designed specifically for one-handed operation and instant data capture.'
      },
      {
        industry: 'SaaS Apps',
        problem: 'Desktop-first SaaS products launching poor mobile companions, causing a massive spike in 1-star App Store reviews.',
        revenueLoss: 'Devastated brand reputation and 40% reduction in user adoption rates.',
        solution: 'A ground-up mobile experience that completely reimagines complex desktop workflows into fluid, intuitive mobile interactions.'
      }
    ]
  }
];
