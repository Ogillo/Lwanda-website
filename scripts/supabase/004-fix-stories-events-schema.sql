-- Stories table columns
ALTER TABLE stories ADD COLUMN IF NOT EXISTS excerpt text;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS slug varchar(255);
ALTER TABLE stories ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS featured_image_path text;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS media_paths jsonb DEFAULT '[]'::jsonb;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS publish_date timestamptz;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Optional unique index on slug (skip if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_stories_slug_unique'
  ) THEN
    CREATE UNIQUE INDEX idx_stories_slug_unique ON stories(slug);
  END IF;
END$$;

-- Events table columns
ALTER TABLE events ADD COLUMN IF NOT EXISTS event_time time;
ALTER TABLE events ADD COLUMN IF NOT EXISTS event_date date;
ALTER TABLE events ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS capacity integer;
ALTER TABLE events ADD COLUMN IF NOT EXISTS media_paths jsonb DEFAULT '[]'::jsonb;
ALTER TABLE events ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;
