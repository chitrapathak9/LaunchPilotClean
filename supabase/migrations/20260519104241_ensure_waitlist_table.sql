/*
  # Ensure waitlist table exists with correct schema and RLS

  Creates the waitlist table if it doesn't already exist, with:
  - id, name, email, startup_idea, created_at columns
  - RLS enabled
  - INSERT policy for anon users (public signups)
  - SELECT policy for authenticated users (admin)
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL DEFAULT '',
  email        text UNIQUE NOT NULL,
  startup_idea text NOT NULL DEFAULT '',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Anyone can join the waitlist'
  ) THEN
    CREATE POLICY "Anyone can join the waitlist"
      ON waitlist FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Authenticated users can read waitlist'
  ) THEN
    CREATE POLICY "Authenticated users can read waitlist"
      ON waitlist FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;
