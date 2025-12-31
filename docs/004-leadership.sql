-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  position text NOT NULL,
  bio text,
  image_path text,
  start_date date NOT NULL,
  end_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;

-- Policies for leadership table
CREATE POLICY "Public read access"
ON leadership FOR SELECT
USING (true);

CREATE POLICY "Admin full access"
ON leadership FOR ALL
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Storage bucket for leadership
INSERT INTO storage.buckets (id, name, public)
VALUES ('leadership', 'leadership', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for leadership bucket
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'leadership');

CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'leadership' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'leadership' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'leadership' AND auth.jwt() ->> 'role' = 'admin');
