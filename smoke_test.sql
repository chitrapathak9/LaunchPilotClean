-- Smoke test: Blog
INSERT INTO blogs (
  title, slug, excerpt, content, category, author_id, status, read_time_minutes, published_at, seo_title, seo_description
) VALUES (
  'How to Launch an MVP in 7 Days',
  'how-to-launch-mvp-7-days',
  'A step-by-step guide on how to build and launch your startup MVP quickly using modern AI tools and frameworks.',
  '<p>Building an MVP doesn''t have to take months. By leveraging tools like Supabase, React, and AI copilots, you can go from idea to launch in just a week.</p><h3>Day 1: Planning and Scoping</h3><p>Keep the scope strictly to the core value proposition...</p>',
  'MVP Building',
  '81f3ee50-aca9-40ff-ac2e-bcecd023cf84',
  'published',
  3,
  now(),
  'Launch an MVP in 7 Days - LaunchPilot',
  'A step-by-step guide to building your MVP quickly.'
);

-- Smoke test: Case Study
INSERT INTO case_studies (
  title, slug, client_name, industry, challenge, solution, results, metrics, status, published_at
) VALUES (
  'Scaling an AI SaaS from 0 to $10k MRR',
  'scaling-ai-saas-10k-mrr',
  'Acme AI Solutions',
  'Technology',
  'The client had a working AI prototype but struggled with customer acquisition and a clunky user interface.',
  'We redesigned their dashboard, integrated Supabase for reliable authentication, and launched a targeted SEO strategy.',
  'Within 3 months, they hit their first 100 paying customers and stabilized their platform architecture.',
  '[{"label": "MRR Growth", "value": "$10,000+"}, {"label": "User Retention", "value": "85%"}]'::jsonb,
  'published',
  now()
);

-- Smoke test: Contact
INSERT INTO contacts (
  name, email, topic, message, status
) VALUES (
  'Jane Doe',
  'jane@example.com',
  'Custom App Build',
  'Hi there, I am looking to build a custom React application with a Supabase backend. I love the LaunchPilot interface and would like to discuss my project requirements.',
  'new'
);
