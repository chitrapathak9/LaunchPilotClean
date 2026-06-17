import React from 'react';
import { BrainCircuit, CloudCog, Database, LayoutTemplate, ChevronRight } from 'lucide-react';

const CAPABILITIES = [
  {
    category: 'AI & Data Engineering',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z" />
      </svg>
    ),
    description: 'Custom LLMs, RAG pipelines, and predictive models.',
    technologies: ['OpenAI / Anthropic', 'LangChain & LlamaIndex', 'Pinecone / Weaviate', 'PyTorch / TensorFlow', 'Snowflake / BigQuery'],
  },
  {
    category: 'Cloud Infrastructure',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 640 512">
        <path d="M0 0h640v512H0z" fill="none" />
        <path fill="currentColor" d="M180.41 203.01c-.72 22.65 10.6 32.68 10.88 39.05a8.16 8.16 0 0 1-4.1 6.27l-12.8 8.96a10.66 10.66 0 0 1-5.63 1.92c-.43-.02-8.19 1.83-20.48-25.61a78.6 78.6 0 0 1-62.61 29.45c-16.28.89-60.4-9.24-58.13-56.21c-1.59-38.28 34.06-62.06 70.93-60.05c7.1.02 21.6.37 46.99 6.27v-15.62c2.69-26.46-14.7-46.99-44.81-43.91c-2.4.01-19.4-.5-45.84 10.11c-7.36 3.38-8.3 2.82-10.75 2.82c-7.41 0-4.36-21.48-2.94-24.2c5.21-6.4 35.86-18.35 65.94-18.18a76.86 76.86 0 0 1 55.69 17.28a70.3 70.3 0 0 1 17.67 52.36zM93.99 235.4c32.43-.47 46.16-19.97 49.29-30.47c2.46-10.05 2.05-16.41 2.05-27.4c-9.67-2.32-23.59-4.85-39.56-4.87c-15.15-1.14-42.82 5.63-41.74 32.26c-1.24 16.79 11.12 31.4 29.96 30.48m170.92 23.05c-7.86.72-11.52-4.86-12.68-10.37l-49.8-164.65c-.97-2.78-1.61-5.65-1.92-8.58a4.61 4.61 0 0 1 3.86-5.25c.24-.04-2.13 0 22.25 0c8.78-.88 11.64 6.03 12.55 10.37l35.72 140.83l33.16-140.83c.53-3.22 2.94-11.07 12.8-10.24h17.16c2.17-.18 11.11-.5 12.68 10.37l33.42 142.63L420.98 80.1c.48-2.18 2.72-11.37 12.68-10.37h19.72c.85-.13 6.15-.81 5.25 8.58c-.43 1.85 3.41-10.66-52.75 169.9c-1.15 5.51-4.82 11.09-12.68 10.37h-18.69c-10.94 1.15-12.51-9.66-12.68-10.75L328.67 110.7l-32.78 136.99c-.16 1.09-1.73 11.9-12.68 10.75h-18.3zm273.48 5.63c-5.88.01-33.92-.3-57.36-12.29a12.8 12.8 0 0 1-7.81-11.91v-10.75c0-8.45 6.2-6.9 8.83-5.89c10.04 4.06 16.48 7.14 28.81 9.6c36.65 7.53 52.77-2.3 56.72-4.48c13.15-7.81 14.19-25.68 5.25-34.95c-10.48-8.79-15.48-9.12-53.13-21c-4.64-1.29-43.7-13.61-43.79-52.36c-.61-28.24 25.05-56.18 69.52-55.95c12.67-.01 46.43 4.13 55.57 15.62c1.35 2.09 2.02 4.55 1.92 7.04v10.11c0 4.44-1.62 6.66-4.87 6.66c-7.71-.86-21.39-11.17-49.16-10.75c-6.89-.36-39.89.91-38.41 24.97c-.43 18.96 26.61 26.07 29.7 26.89c36.46 10.97 48.65 12.79 63.12 29.58c17.14 22.25 7.9 48.3 4.35 55.44c-19.08 37.49-68.42 34.44-69.26 34.42m40.2 104.86c-70.03 51.72-171.69 79.25-258.49 79.25A469.13 469.13 0 0 1 2.83 327.46c-6.53-5.89-.77-13.96 7.17-9.47a637.37 637.37 0 0 0 316.88 84.12a630.2 630.2 0 0 0 241.59-49.55c11.78-5 21.77 7.8 10.12 16.38m29.19-33.29c-8.96-11.52-59.28-5.38-81.81-2.69c-6.79.77-7.94-5.12-1.79-9.47c40.07-28.17 105.88-20.1 113.44-10.63c7.55 9.47-2.05 75.41-39.56 106.91c-5.76 4.87-11.27 2.3-8.71-4.1c8.44-21.25 27.39-68.49 18.43-80.02" />
      </svg>
    ),
    description: 'Scalable, fault-tolerant enterprise architectures.',
    technologies: ['AWS / GCP', 'Docker / Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Serverless Compute'],
  },
  {
    category: 'Backend Systems',
    icon: <Database size={20} />,
    description: 'High-performance APIs and distributed databases.',
    technologies: ['Node.js / Express', 'Python / FastAPI', 'PostgreSQL / MongoDB', 'Redis / Kafka', 'GraphQL / REST'],
  },
  {
    category: 'Frontend & Mobile',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M20 10.128c0-3.832 0-5.747-1.172-6.938S15.771 2 12 2h-2C6.229 2 4.343 2 3.172 3.19S2 6.296 2 10.128s0 5.747 1.172 6.938c.47.477 1.054.763 1.828.934" />
          <path d="M22 17.5c0-1.875 0-2.812-.477-3.47a2.5 2.5 0 0 0-.553-.553C20.312 13 19.375 13 17.5 13h-5c-1.875 0-2.812 0-3.47.477a2.5 2.5 0 0 0-.553.553C8 14.689 8 15.626 8 17.5s0 2.812.477 3.47a2.5 2.5 0 0 0 .554.553C9.688 22 10.625 22 12.5 22h5c1.875 0 2.812 0 3.47-.477a2.5 2.5 0 0 0 .553-.553C22 20.312 22 19.375 22 17.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 16l.92.793c.387.333.58.5.58.707s-.193.374-.58.707L16.5 19m-3-3l-.92.793c-.387.333-.58.5-.58.707s.193.374.58.707l.92.793M2.5 6h17" />
        </g>
      </svg>
    ),
    description: 'Pixel-perfect, lightning-fast user interfaces.',
    technologies: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Framer Motion'],
  },
];

export function HomeTechStack() {
  return (
    <section className="bg-gray-50 py-24 lg:py-32 border-y border-gray-200">
      <div className="container-editorial">

        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center max-w-[640px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
            <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-ink-500">
              Enterprise Tech Stack
            </span>
          </div>
          <h2 className="heading-xl text-ink-900 mb-5 leading-tight">
            Built with the world's <span className="text-[#6D28D9]">best stack.</span>
          </h2>
          <p className="body-lg text-ink-500">
            We work with the tools that actually matter in production. No trend-chasing toys—just scalable, battle-tested technologies that power industry leaders.
          </p>
        </div>

        {/* Capabilities Grid (Plus Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[1000px] mx-auto relative">
          
          {CAPABILITIES.map((cap, idx) => {
            // Determine borders for the plus layout
            let borderClasses = "border-gray-200 ";
            if (idx === 0) borderClasses += "border-b md:border-r";
            if (idx === 1) borderClasses += "border-b";
            if (idx === 2) borderClasses += "border-b md:border-b-0 md:border-r";
            if (idx === 3) borderClasses += "";

            return (
              <div
                key={idx}
                className={`group bg-transparent p-8 lg:p-12 transition-all duration-300 relative flex flex-col hover:bg-white ${borderClasses}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6D28D9] mb-6 group-hover:bg-[#6D28D9]/5 group-hover:border-[#6D28D9]/20 group-hover:shadow-md transition-all">
                  {cap.icon}
                </div>

                {/* Category */}
                <h3 className="text-[1.125rem] font-bold text-ink-900 mb-3 tracking-tight">
                  {cap.category}
                </h3>
                
                <p className="text-[0.875rem] text-ink-500 leading-relaxed mb-8 flex-1">
                  {cap.description}
                </p>

                {/* Tech List */}
                <ul className="space-y-3.5 mt-auto">
                  {cap.technologies.map((tech, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2.5">
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#6D28D9]/60 transition-colors shrink-0" />
                      <span className="text-[0.875rem] font-semibold text-ink-700">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
