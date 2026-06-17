import React from 'react';
import { Stethoscope, Megaphone, Building, Rocket, Database, Smartphone, Cpu, LayoutTemplate, Users } from 'lucide-react';

export interface IndustryCapability {
  title: string;
  category: 'Service' | 'Solution';
  description: string;
  icon: React.ReactNode;
}

export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  heroSubtitle: string;
  marketingContent: string;
  coreChallenges: string[];
  capabilities: IndustryCapability[];
}

export const industries: IndustryData[] = [
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare',
    heroSubtitle: 'HIPAA-compliant, high-performance software engineering for the modern medical ecosystem.',
    marketingContent: 'The healthcare industry operates on the thinnest margins of error, yet relies on some of the most outdated, fragmented software infrastructures in the world. We engineer bespoke, HIPAA-compliant platforms that eliminate the friction between clinicians, patients, and administrators. From consumer-grade patient portals that drive high engagement, to complex data-routing engines that securely bridge legacy EHRs with modern microservices, we build technology that lets healthcare providers focus entirely on patient outcomes rather than administrative overhead.',
    coreChallenges: [
      'Severe administrative burnout caused by manual data entry into clunky EHR systems.',
      'Massive patient drop-off rates due to slow, confusing, and non-mobile-friendly intake portals.',
      'Siloed clinical data preventing real-time, holistic patient care decisions.',
      'Debilitating security breaches and HIPAA non-compliance fines from outdated legacy code.'
    ],
    capabilities: [
      {
        title: 'Patient Web Portals',
        category: 'Solution',
        description: 'Lightning-fast, edge-optimized patient portals that reduce intake time by 70% and bridge securely into your existing EHR backend.',
        icon: <LayoutTemplate size={24} />
      },
      {
        title: 'Clinical Mobile Apps',
        category: 'Solution',
        description: 'Offline-first React Native applications enabling home health nurses to capture and sync vital patient data without relying on cellular service.',
        icon: <Smartphone size={24} />
      },
      {
        title: 'Autonomous Data Agents',
        category: 'Service',
        description: 'Custom AI agents that ingest unstructured clinical notes and automatically structure them directly into your database with 99% accuracy.',
        icon: <Cpu size={24} />
      },
      {
        title: 'HIPAA Cloud Architecture',
        category: 'Service',
        description: 'Bulletproof, cloud-native backend development designed specifically for high-availability and strict healthcare compliance standards.',
        icon: <Database size={24} />
      }
    ]
  },
  {
    id: 'ad-tech',
    slug: 'ad-tech',
    name: 'Ad Tech',
    heroSubtitle: 'Sub-millisecond data processing and predictive engines that maximize ROAS across the programmatic landscape.',
    marketingContent: 'In Ad Tech, a delay of milliseconds is the difference between winning a high-value impression and bleeding campaign budgets dry. We architect extreme-performance programmatic infrastructure capable of processing millions of bid requests and massive data streams in real-time. Whether it is building custom algorithmic bidding engines, low-latency DSP/SSP architectures, or advanced predictive analytics dashboards, we empower agencies and ad networks to pivot faster than the market and drastically maximize their return on ad spend.',
    coreChallenges: [
      'Latency bottlenecks in bid-processing pipelines causing massive missed inventory opportunities.',
      'Account managers spending weeks manually aggregating campaign data instead of optimizing strategy.',
      'Generic CRM software failing to track complex, real-time programmatic ad inventory accurately.',
      'Publishers facing severe cash-flow delays due to manual, multi-platform revenue reconciliation.'
    ],
    capabilities: [
      {
        title: 'Programmatic AI Agents',
        category: 'Solution',
        description: 'LLM-powered agents that ingest real-time campaign data to instantly generate client narratives and autonomously execute bid optimizations.',
        icon: <Cpu size={24} />
      },
      {
        title: 'Real-Time ERP Automation',
        category: 'Solution',
        description: 'An automated financial ERP module executing real-time, micro-cent publisher reconciliation across fragmented ad-server data.',
        icon: <Database size={24} />
      },
      {
        title: 'High-Frequency SaaS',
        category: 'Service',
        description: 'Developing highly scalable, multi-tenant ad platforms designed for sub-millisecond response times and high availability.',
        icon: <Rocket size={24} />
      },
      {
        title: 'Inventory CRM Development',
        category: 'Service',
        description: 'Custom CRMs built on graph databases that instantly match live ad inventory with specific client purchasing habits to drive massive upsells.',
        icon: <Users size={24} />
      }
    ]
  },
  {
    id: 'hospital-management',
    slug: 'hospital-management',
    name: 'Hospital Management',
    heroSubtitle: 'Centralizing massive hospital networks into intelligent, unified operational dashboards.',
    marketingContent: 'Running a hospital network requires orchestrating thousands of moving parts—from surgical schedules and specialized supply chains to massive workforce compliance tracking. We replace fragmented, disjointed departmental software with unified, intelligent management systems. Our custom architectures break down data silos, providing hospital administrators with real-time, predictive visibility across their entire operational footprint. The result is millions of dollars saved in supply chain waste, optimized surgical utilization, and drastically reduced compliance risk.',
    coreChallenges: [
      'Operating rooms sitting empty and bleeding thousands of dollars per hour due to manual scheduling conflicts.',
      'HR teams drowning in manual credentialing and compliance tracking across thousands of traveling staff.',
      'Fragmented supply chains causing critical shortages of specialized medical equipment during surgical hours.',
      'Physician liaison teams blindly pitching referral networks without real-time data on specialty capacity.'
    ],
    capabilities: [
      {
        title: 'Workforce ERP Systems',
        category: 'Solution',
        description: 'A unified workforce ERP that completely automates license verification, optimizes shift coverage, and prevents multimillion-dollar compliance lapses.',
        icon: <Database size={24} />
      },
      {
        title: 'Referral Network CRMs',
        category: 'Solution',
        description: 'Specialized Provider Relationship CRMs tracking referral patterns and flagging hospital capacity issues before liaisons make their pitch.',
        icon: <Users size={24} />
      },
      {
        title: 'Predictive Scheduling AI',
        category: 'Service',
        description: 'Custom AI orchestration models analyzing historical discharge data to autonomously optimize the surgical calendar and maximize OR utilization.',
        icon: <Cpu size={24} />
      },
      {
        title: 'Floor Operations Apps',
        category: 'Service',
        description: 'Blazing-fast, consumer-grade mobile applications designed specifically for one-handed operation and instant data capture by facilities teams.',
        icon: <Smartphone size={24} />
      }
    ]
  },
  {
    id: 'saas-apps',
    slug: 'saas-apps',
    name: 'SaaS Apps',
    heroSubtitle: 'Engineering high-velocity, scalable platforms designed for massive enterprise user acquisition.',
    marketingContent: 'For B2B SaaS companies, the product is the entire business. You cannot afford to launch with technical debt, brittle architecture, or a poor user experience. We partner with ambitious founders to engineer world-class, multi-tenant SaaS applications designed to scale from the very first line of code. We specialize in complex product-led growth (PLG) mechanics, consumption-based billing engines, and flawless enterprise UI/UX, ensuring your platform not only acquires users rapidly but retains them aggressively.',
    coreChallenges: [
      'Sales teams losing massive enterprise deals because generic CRMs cannot track complex product-led growth metrics.',
      'High customer churn caused by frustrating, rule-based support chatbots failing to resolve technical issues.',
      'Revenue operations losing up to 8% of unbilled usage revenue due to complex consumption billing models.',
      'Enterprise clients churning because the core app lacks granular role-based access control and white-labeling.'
    ],
    capabilities: [
      {
        title: 'Core SaaS Engineering',
        category: 'Service',
        description: 'End-to-end development of highly scalable, multi-tenant software architectures built specifically for high availability and rapid user growth.',
        icon: <Rocket size={24} />
      },
      {
        title: 'Consumption Billing ERPs',
        category: 'Solution',
        description: 'Bespoke billing engines engineered specifically to ingest real-time API usage metrics and generate flawless complex invoices automatically.',
        icon: <Database size={24} />
      },
      {
        title: 'Enterprise Sub-Portals',
        category: 'Solution',
        description: 'Scalable, multi-tenant portal architectures featuring absolute granular RBAC and seamless, on-the-fly white-labeling for your biggest clients.',
        icon: <LayoutTemplate size={24} />
      },
      {
        title: 'L2 Autonomous Support',
        category: 'Service',
        description: 'Fine-tuned, autonomous AI agents capable of resolving highly complex billing and technical support tickets via deep API integration.',
        icon: <Cpu size={24} />
      }
    ]
  }
];
