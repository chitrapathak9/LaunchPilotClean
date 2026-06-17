-- Create leads table for capturing form submissions (contact, bookings, newsletter)
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL,
  type text NOT NULL, -- 'contact', 'booking', 'newsletter'
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone (unauthenticated/anon or authenticated) to insert a lead
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Anyone can insert leads'
  ) THEN
    CREATE POLICY "Anyone can insert leads"
      ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- Policy to allow select access (for admin visualization in client app)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Anyone can read leads'
  ) THEN
    CREATE POLICY "Anyone can read leads"
      ON public.leads FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

-- Policy to allow delete access (for lead management)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Anyone can delete leads'
  ) THEN
    CREATE POLICY "Anyone can delete leads"
      ON public.leads FOR DELETE TO anon, authenticated USING (true);
  END IF;
END $$;
