/*
  # Case Studies Table

  1. New Tables
    - `case_studies` — full case study content with metrics, gallery, SEO

  2. Security
    - Public can SELECT published case studies
    - Admins can do full CRUD
*/

CREATE TABLE IF NOT EXISTS case_studies (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title               text NOT NULL DEFAULT '',
  slug                text UNIQUE NOT NULL,
  client_name         text NOT NULL DEFAULT '',
  industry            text NOT NULL DEFAULT 'Technology',
  challenge           text NOT NULL DEFAULT '',
  solution            text NOT NULL DEFAULT '',
  results             text NOT NULL DEFAULT '',
  content             text NOT NULL DEFAULT '',
  cover_image_url     text,
  gallery_images      text[] DEFAULT '{}',
  metrics             jsonb DEFAULT '[]',
  timeline            text DEFAULT '',
  status              text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_title           text,
  seo_description     text,
  og_image_url        text,
  published_at        timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- metrics jsonb format example:
-- [{"label": "Revenue Increase", "value": "40%"}, {"label": "Time Saved", "value": "12hrs/week"}]

-- Indexes
CREATE INDEX IF NOT EXISTS case_studies_slug_idx ON case_studies(slug);
CREATE INDEX IF NOT EXISTS case_studies_status_idx ON case_studies(status);
CREATE INDEX IF NOT EXISTS case_studies_published_at_idx ON case_studies(published_at DESC);
CREATE INDEX IF NOT EXISTS case_studies_industry_idx ON case_studies(industry);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read published case studies
CREATE POLICY "Public can read published case studies"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admins can read all case studies
CREATE POLICY "Admins can read all case studies"
  ON case_studies FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert case studies
CREATE POLICY "Admins can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update case studies
CREATE POLICY "Admins can update case studies"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete case studies
CREATE POLICY "Admins can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_case_studies_updated_at ON case_studies;
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
