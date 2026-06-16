/*
  # Blogs Table

  1. New Tables
    - `blogs`
      - Full CMS fields: title, slug, content, seo meta, author, status, etc.
      - cover_image_url stored as Cloudflare R2 CDN URL

  2. Security
    - RLS enabled
    - Public can SELECT published blogs
    - Admins can do full CRUD
*/

CREATE TABLE IF NOT EXISTS blogs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title               text NOT NULL DEFAULT '',
  slug                text UNIQUE NOT NULL,
  excerpt             text NOT NULL DEFAULT '',
  content             text NOT NULL DEFAULT '',
  cover_image_url     text,
  category            text NOT NULL DEFAULT 'General',
  tags                text[] DEFAULT '{}',
  author_id           uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status              text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_title           text,
  seo_description     text,
  og_image_url        text,
  read_time_minutes   integer NOT NULL DEFAULT 1,
  published_at        timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS blogs_category_idx ON blogs(category);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs
CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admins can read all blogs
CREATE POLICY "Admins can read all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert blogs
CREATE POLICY "Admins can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update blogs
CREATE POLICY "Admins can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete blogs
CREATE POLICY "Admins can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
