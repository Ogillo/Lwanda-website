# KE 258 Lwanda CYDC - Supabase Database Documentation

## Overview

This document provides comprehensive documentation for the Supabase database backend of the KE 258 Lwanda Child Development Centre website.

## Database Structure

The database is organized into several logical groups:

### 1. Children & Sponsorship Management
- **children**: Core table storing all children in the program
- **sponsors**: Information about all sponsors
- **sponsorships**: Links children with sponsors, tracks relationships

### 2. Financial Management
- **donations**: Tracks all financial contributions
- Supports multiple donation types (one-time, monthly, annual)
- Links to sponsors where applicable

### 3. Events Management
- **events**: Stores all community events and activities
- **event_registrations**: Tracks who registers for events

### 4. Content Management
- **gallery_items**: Media gallery with images and videos
- **stories**: Success stories and testimonials
- Supports categorization and tagging

### 5. Communications
- **contact_submissions**: Contact form submissions
- **newsletter_subscriptions**: Newsletter subscriber management

### 6. Volunteer Management
- **volunteer_applications**: Tracks volunteer applications and status

### 7. Programs & Statistics
- **programs**: Core program information
- **monthly_statistics**: Aggregated monthly metrics

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize
3. Note your project URL and anon/public API key

### Step 2: Run SQL Scripts

Run the SQL scripts in this order:

1. **001-create-tables.sql**: Creates all database tables with proper relationships
2. **002-row-level-security.sql**: Sets up RLS policies for security
3. **003-seed-data.sql**: (Optional) Adds sample data for testing

To run scripts:
1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste each script
4. Click "Run" to execute

### Step 3: Configure Storage

Create storage buckets for images:

\`\`\`sql
-- Run in SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('gallery', 'gallery', true),
  ('children-photos', 'children-photos', false),
  ('events', 'events', true),
  ('stories', 'stories', true);
\`\`\`

Set storage policies:

\`\`\`sql
-- Public read access for gallery
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Admin upload access
CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('gallery', 'events', 'stories') AND auth.jwt() ->> 'role' = 'admin');
\`\`\`

### Step 4: Set Environment Variables

Add these to your Vercel project or `.env.local`:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Public Read Access:**
- Published gallery items
- Published stories
- Published events
- Active programs
- Monthly statistics

**Public Write Access:**
- Contact form submissions
- Newsletter subscriptions
- Volunteer applications
- Event registrations
- Donation records (insert only)

**Admin Access:**
- Full CRUD operations on all tables
- Requires authenticated user with admin role

### Setting Up Admin Users

To set up admin users, run this in SQL Editor:

\`\`\`sql
-- Create custom claims function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'role') = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant admin role to specific user (replace with actual user ID)
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
WHERE email = 'admin@ke258lwanda.org';
\`\`\`

## Data Relationships

### Children → Sponsorships → Sponsors
\`\`\`
children (1) ←→ (many) sponsorships (many) ←→ (1) sponsors
\`\`\`

### Events → Event Registrations
\`\`\`
events (1) ←→ (many) event_registrations
\`\`\`

### Children → Stories
\`\`\`
children (1) ←→ (many) stories
\`\`\`

### Sponsors → Donations
\`\`\`
sponsors (1) ←→ (many) donations
\`\`\`

## Key Features

### Automatic Timestamps
All tables with `updated_at` fields have triggers that automatically update the timestamp on record modification.

### Unique Constraints
- Children: `registration_number`
- Sponsors: `sponsor_code`, `email`
- Events: `slug`
- Stories: `slug`
- Newsletter: `email`

### Indexes
Performance indexes created on frequently queried fields:
- Status fields
- Date fields
- Category/type fields
- Foreign keys

## Statistics Tracking

The `monthly_statistics` table aggregates key metrics:
- Total children enrolled
- New enrollments
- Total active sponsors
- New sponsors
- Total donations
- Events held
- Volunteer hours

Update statistics monthly with this query:

\`\`\`sql
INSERT INTO monthly_statistics (
  month,
  total_children,
  new_enrollments,
  total_sponsors,
  new_sponsors,
  total_donations,
  total_events
)
SELECT
  DATE_TRUNC('month', CURRENT_DATE) as month,
  (SELECT COUNT(*) FROM children WHERE status = 'Active'),
  (SELECT COUNT(*) FROM children WHERE enrollment_date >= DATE_TRUNC('month', CURRENT_DATE)),
  (SELECT COUNT(*) FROM sponsors WHERE status = 'Active'),
  (SELECT COUNT(*) FROM sponsors WHERE start_date >= DATE_TRUNC('month', CURRENT_DATE)),
  (SELECT COALESCE(SUM(amount), 0) FROM donations WHERE donation_date >= DATE_TRUNC('month', CURRENT_DATE) AND status = 'Completed'),
  (SELECT COUNT(*) FROM events WHERE start_date >= DATE_TRUNC('month', CURRENT_DATE) AND start_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month');
\`\`\`

## Backup and Maintenance

### Automated Backups
Supabase automatically backs up your database daily. Configure retention in project settings.

### Manual Backup
\`\`\`bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Restore
supabase db restore backup.sql
\`\`\`

### Data Cleanup
Run quarterly to clean old data:

\`\`\`sql
-- Archive old events (older than 2 years)
UPDATE events 
SET status = 'Completed', is_published = false
WHERE end_date < CURRENT_DATE - INTERVAL '2 years'
AND status != 'Completed';

-- Clean unsubscribed newsletter records (older than 1 year)
DELETE FROM newsletter_subscriptions
WHERE status = 'Unsubscribed'
AND unsubscribed_at < CURRENT_DATE - INTERVAL '1 year';
\`\`\`

## Support and Troubleshooting

### Common Issues

**Issue: RLS blocking admin access**
Solution: Ensure admin role is properly set in user metadata

**Issue: Slow queries**
Solution: Check indexes are created, analyze query performance in Supabase dashboard

**Issue: Storage upload failures**
Solution: Verify bucket policies and authentication

### Contact
For database support, contact the technical team at tech@ke258lwanda.org
