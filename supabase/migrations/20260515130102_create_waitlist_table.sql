/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `name` (text, required) — founder's name
      - `email` (text, unique, required) — contact email
      - `startup_idea` (text) — brief description of startup idea
      - `created_at` (timestamptz) — submission timestamp

  2. Security
    - Enable RLS on `waitlist` table
    - INSERT policy: anyone (anon + authenticated) can submit an entry
    - SELECT policy: only authenticated users can read entries (admin use)
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL DEFAULT '',
  email        text UNIQUE NOT NULL,
  startup_idea text NOT NULL DEFAULT '',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read waitlist"
  ON waitlist FOR SELECT
  TO authenticated
  USING (true);
