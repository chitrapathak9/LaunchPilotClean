
/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `startup_idea` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Anon/authenticated users can INSERT
    - Authenticated users can SELECT
*/

CREATE TABLE IF NOT EXISTS public.waitlist (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL DEFAULT '',
  email        text UNIQUE NOT NULL,
  startup_idea text NOT NULL DEFAULT '',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Anyone can join the waitlist'
  ) THEN
    CREATE POLICY "Anyone can join the waitlist"
      ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Authenticated users can read waitlist'
  ) THEN
    CREATE POLICY "Authenticated users can read waitlist"
      ON public.waitlist FOR SELECT TO authenticated USING (true);
  END IF;
END $$;
