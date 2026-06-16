/*
  # Contacts Table

  1. New Tables
    - `contacts` — stores contact form submissions
      - name, email, topic, message, company (optional), phone (optional)
      - status: 'new' | 'read' | 'replied'
      - admin_notes: internal notes by admin

  2. Security
    - Anon users can INSERT (submit form)
    - Admins can SELECT, UPDATE, DELETE
*/

CREATE TABLE IF NOT EXISTS contacts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL,
  topic         text NOT NULL DEFAULT 'General question',
  message       text NOT NULL,
  company       text,
  phone         text,
  status        text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  admin_notes   text DEFAULT '',
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts(status);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(email);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can submit contact form
CREATE POLICY "Anyone can submit contact"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can read all contacts
CREATE POLICY "Admins can read contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update contacts (change status, add notes)
CREATE POLICY "Admins can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete contacts
CREATE POLICY "Admins can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
