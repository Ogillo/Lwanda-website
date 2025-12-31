# **Massive Implementation Prompt — “Rebuild Admin UI from Scratch”**

**Target:** Next.js 14 \+ React 19 \+ TypeScript \+ Tailwind v4 \+ Supabase storage & DB \+ shadcn components \+ TipTap. Keep DB & storage; delete current admin UI code only. Provide Storybook-ready components. Implement server APIs under `app/api/**/route.ts`. Follow existing app conventions (app router, `lib/supabase/client.ts`).

---

## **Goals (short)**

* Replace admin UI with a clean, responsive, accessible admin app.

* Dashboard with contact-submissions KPI and sparkline trends, latest messages quick links.

* Gallery Management System (Hero images \+ Gallery images) with CRUD, bulk upload, drag-and-drop, progress, auto-thumbs, and create category (folder) input with parent slug.

* Content Management System (Stories \+ Events) with full CRUD, TipTap editor, server-side search & filters, infinite scroll, slugs, featured images, publish toggle.

* Auto-scan Supabase storage buckets and map existing folders → categories on first run.

* Single `admin` role authentication. Use existing Supabase auth flow; admin endpoints validate role server-side.

* Deliverable: precise component map, file paths, API endpoints, SQL migrations, Storybook stories, and dev checklist.

References: parts of current docs describing admin layouts, API patterns, upload flows and tokens.

---

## **Repo structure (new files \+ edits)**

Place new files here. Keep `app/admin/*` routes and replace old admin pages.

app/  
  admin/  
    layout.tsx                // Admin shell: header \+ slide-in drawer for mobile  
    page.tsx                  // Dashboard (new)  
    gallery/  
      page.tsx                // Gallery Management System root  
      hero-tab.tsx            // Hero images management tab  
      gallery-tab.tsx         // Gallery images management tab  
    content/  
      page.tsx                // Content Management System root  
      stories-tab.tsx  
      events-tab.tsx  
    api/  
      (no route files here; use app/api below)  
components/  
  admin/  
    Dashboard/  
      DashboardShell.tsx  
      StatCard.tsx  
      Sparkline.tsx  
      LatestMessages.tsx  
    Gallery/  
      GalleryShell.tsx  
      BucketScanner.tsx  
      ImageGrid.tsx  
      ImageUploader.tsx  
      ImageCard.tsx  
      CategoryForm.tsx  
      ImageDetailModal.tsx  
    Content/  
      ContentShell.tsx  
      StoryList.tsx  
      EventList.tsx  
      StoryEditor.tsx (TipTap wrapper)  
      EventEditor.tsx  
    UI/  
      AdminSidebar.tsx  
      MobileDrawer.tsx  
      ConfirmDialog.tsx  
      PaginationInfinite.tsx  
lib/  
  supabase/  
    client.ts (existing)  
    admin.ts (new helpers: adminAuth, listBuckets, listFolders)  
app/api/  
  admin/  
    stats/route.ts          // GET: dashboard stats  
    contact-latest/route.ts // GET: latest messages  
    images/  
      list/route.ts         // GET: list images (bucket, folder, page, limit)  
      upload/route.ts       // POST: upload-image (admin)  
      delete/route.ts       // DELETE: delete-image (admin)  
      scan-buckets/route.ts // POST: scan and map folders \-\> categories  
      create-category/route.ts // POST: create folder in bucket  
    content/  
      stories/  
        list/route.ts       // GET: server-side search \+ filters \+ pagination  
        get/route.ts        // GET: single story  
        create/route.ts     // POST: create story  
        update/route.ts     // PATCH  
        delete/route.ts     // DELETE  
      events/  
        list/route.ts  
        get/route.ts  
        create/route.ts  
        update/route.ts  
        delete/route.ts  
scripts/  
  supabase/  
    001-add-gallery-categories.sql  
storybook/  
  stories/ (Storybook stories for components)

---

## **Design system & tokens**

* Keep site fonts and base tokens from `app/globals.css`. Upgrade brand colors to "premium" versions: keep the amber \+ purple identity but with richer values:

  * Primary: `--brand-amber: #c56a00` (deeper amber)

  * Accent: `--brand-purple: #6f4cf0` (muted vivid)

  * Neutral palette: scaled greys with increased contrast

* Buttons: consolidate `.btn-primary` and `.btn-secondary` into shadcn `Button` variants. All new Admin components must use `components/ui/*` primitives where possible. Docs confirm token usage and components — follow those patterns.

---

## **Accessibility \+ Responsive baseline**

* All interactive elements must have keyboard focus states and ARIA: dialogs, drawers, tab panels, file uploader.

* Mobile: admin shell uses a slide-in drawer (`MobileDrawer.tsx`). Sidebar collapses to hamburger → open as full-height drawer with nested nav.

* Desktop: left persistent sidebar; topbar includes search & quick actions.

* Breakpoints: use Tailwind `sm`, `md`, `lg`, `xl` consistent with existing app. For mobile grids, collapse to 1 column; cards \>2 columns at `md`.

* UX: confirmation dialogs for destructive actions; soft-delete with Trash for safety.

---

## **Dashboard specifics (app/admin/page.tsx)**

**What it shows**

1. Stat cards row

   * Contact messages count (total)

   * New messages in last 7 days

   * Upcoming stories count (stories with `publish_date >= today and is_published = false`) — minimal.

2. Sparkline: daily/weekly trend of contact submissions (last 14 days and last 12 weeks toggle).

3. Latest messages: show three latest contact messages with quick actions: open detail, mark as read, create ticket (optional).

4. Quick links: Upload image, Create story, Create event.

**API**

* `GET /api/admin/stats` → returns:

{  
  "contact\_total": 123,  
  "contact\_last\_7\_days": 5,  
  "contact\_trend\_daily": \[{ "date":"2025-11-20", "count":3 }, ...\],  
  "contact\_trend\_weekly": \[{ "week\_start":"2025-10-01", "count":12 }, ...\],  
  "upcoming\_stories\_count": 2  
}

* `GET /api/admin/contact-latest?limit=3` → returns latest messages: id, name, email, title, subject, message\_preview, date.

**Components**

* `DashboardShell.tsx` (layout), `StatCard.tsx` (reusable), `Sparkline.tsx` (small chart using lightweight SVG path), `LatestMessages.tsx`.

**Notes**

* Use server components for initial data; client components for interactive parts (actions).

---

## **Gallery Management System (app/admin/gallery/page.tsx)**

Top-level UI with two tabs: **Hero Images** and **Gallery Images**.

### **Hero Images tab (`hero-tab.tsx`)**

* Each hero page maps to a folder in the `hero` bucket path: `hero/<page-slug>/`.

* Show a list of pages (home, contact, get-involved, programs/child-survival, programs/child-development, programs/youth-development, about, stories, gallery).

* For each page: show current active hero (one), and an "Upload / Change" control. Only 1 active hero per page.

* Upload flow: select image → optional aspect crop (16:9 or 4:1 hero preset) → create thumbnail automatically → upload to `hero/<page-slug>/` and optionally set expiry/scheduling.

* Endpoint: `POST /api/admin/images/upload` with JSON body or multipart-form: `{ bucket: 'hero', folder: 'hero/<page-slug>', file }` Authorization: Bearer admin token.

### **Gallery Images tab (`gallery-tab.tsx`)**

* Category list: Education, Sponsorship, Community Work, Celebration (map to folders in `gallery` bucket: `education`, `sponsorship`, `communitywork`, `celebration`).

* Admin can CRUD images: upload, bulk upload, delete, edit metadata (title, caption, alt text).

* Bulk upload UI: drag-and-drop area that accepts multiple files, shows per-file progress, auto-thumbnail generation on upload server-side (or via client cropping/resizing before upload).

* Create category: `CategoryForm.tsx` — inputs:

  * Category name (required)

  * Slug (optional; auto-generate from name)

  * Parent category (optional dropdown)

* Creating a category triggers `POST /api/admin/images/create-category`:

  * Server should create a folder in supabase storage and optionally write a `gallery_categories` DB table record.

**APIs**

* `GET /api/admin/images/list?bucket=gallery&folder=<folder>&page=<n>&limit=<m>`

* `POST /api/admin/images/upload` (supports single & bulk; returns `{ files: [{ path, url, thumbUrl, width, height, size }] }`)

* `DELETE /api/admin/images/delete` body `{ bucket, path }`

* `POST /api/admin/images/create-category` body `{ bucket: 'gallery', name, slug, parent }`

* `POST /api/admin/images/scan-buckets` — server scans `NEXT_PUBLIC_GALLERY_BUCKET` and `NEXT_PUBLIC_HERO_BUCKET` and returns folder tree and maps to `gallery_categories` rows.

**Server-side behavior**

* Upload handler must validate admin JWT and use Supabase storage `upload` with service role as needed.

* For bulk uploads, the API should accept multiple files, queue uploads concurrently with concurrency limit (e.g. 4\) and return results.

**Auto-thumb & metadata**

* On server upload, generate a thumbnail (e.g., using `@vercel/og` is overkill — use server-side sharp or Supabase Image Transformations if supported) and store `thumbUrl` (or produce signed URL). Save basic metadata to `gallery_items` table (optional) via `POST /api/admin/images/record`.

**Client-side components**

* `ImageUploader.tsx`: drag-and-drop, progress bars, validation (type, max size), client-side image compression/resizing (using `browser-image-compression` or canvas fallback).

* `ImageGrid.tsx`: responsive masonry/grid with infinite scroll. Each `ImageCard` shows actions: copy URL, set as featured, edit metadata, delete.

* `BucketScanner.tsx`: button "Scan existing bucket" — calls `/api/admin/images/scan-buckets` that returns folder list; UI shows mapping preview and allows admin to confirm import. On confirm, server records categories and optionally sample items to `gallery_items`.

**DB migration for categories** (`scripts/supabase/001-add-gallery-categories.sql`)

\-- Migration: add gallery\_categories table  
CREATE TABLE IF NOT EXISTS gallery\_categories (  
  id uuid PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  name varchar(255) NOT NULL,  
  slug varchar(255) UNIQUE NOT NULL,  
  parent\_id uuid REFERENCES gallery\_categories(id),  
  bucket varchar(255) NOT NULL DEFAULT 'gallery',  
  folder\_path text NOT NULL,  
  created\_at timestamptz DEFAULT now()  
);

\-- Optional: index on slug  
CREATE INDEX IF NOT EXISTS idx\_gallery\_categories\_slug ON gallery\_categories(slug);

Add `gallery_items` record columns if not present (schema likely exists; check docs).

---

## **Content Management System (app/admin/content/page.tsx)**

Two tabs: **Stories** and **Events**.

### **Stories tab (`stories-tab.tsx`)**

**List view**

* Columns: Featured image thumbnail, Title, Tags, Excerpt (first 120 chars), Publish status (toggle), Publish date, Actions (Edit, Duplicate, Delete).

* Supports server-side search (query param `q`), filters by tag, published state, date range.

* Infinite scroll (page & limit) with server-side pagination.

**Editor**

* `StoryEditor.tsx` — TipTap editor wrapper with:

  * Title (text)

  * Slug (auto-generate from title; editable)

  * Excerpt (text area)

  * Tags (multi-select with suggestions)

  * Featured Image (separate media field; upload or select from gallery)

  * Media carousel (multiple images) — stored as array of paths

  * Publish toggle and publish date

  * Content editor (TipTap) supporting image embed (upload images via `/api/admin/images/upload` and insert URL automatically), headings, lists, quotes, links, code blocks.

* API endpoints:

  * `GET /api/admin/content/stories/list?q=&tags=&is_published=&page=&limit=`

  * `GET /api/admin/content/stories/get?id=...`

  * `POST /api/admin/content/stories/create`

  * `PATCH /api/admin/content/stories/update?id=...`

  * `DELETE /api/admin/content/stories/delete?id=...`

**DB**

* Existing `stories` table should be extended (if needed) to support: `excerpt`, `slug`, `tags jsonb`, `featured_image_path`, `media_paths jsonb`, `publish_date timestamptz`, `is_published bool`.

* SQL snippet (migration):

ALTER TABLE stories  
  ADD COLUMN IF NOT EXISTS excerpt text,  
  ADD COLUMN IF NOT EXISTS slug varchar(255) UNIQUE,  
  ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '\[\]'::jsonb,  
  ADD COLUMN IF NOT EXISTS featured\_image\_path text,  
  ADD COLUMN IF NOT EXISTS media\_paths jsonb DEFAULT '\[\]'::jsonb,  
  ADD COLUMN IF NOT EXISTS publish\_date timestamptz,  
  ALTER COLUMN content SET DATA TYPE text;  
\-- Add index  
CREATE INDEX IF NOT EXISTS idx\_stories\_slug ON stories(slug);  
CREATE INDEX IF NOT EXISTS idx\_stories\_publish\_date ON stories(publish\_date);

(If `slug` exists already, skip.)

**Behavior**

* Slug auto-generation: `slugify(title).slice(0,240)` and ensure unique with `-n` suffix if collision.

* Publish toggle should update `is_published`. Publishing sets `publish_date` if not set.

* TipTap image upload: plugin triggers client upload to `/api/admin/images/upload` returning path/url; insert into editor content as `<img src="...">`.

### **Events tab (`events-tab.tsx`)**

**Fields**

* title, event\_time (time), event\_date (date), location (text), capacity (int), media\_path (single or array), content (rich text), is\_published (bool).

**APIs**

* `GET /api/admin/content/events/list?q=&date_from=&date_to=&is_published=&page=&limit=`

* `GET /api/admin/content/events/get?id=...`

* `POST /api/admin/content/events/create`

* `PATCH /api/admin/content/events/update?id=...`

* `DELETE /api/admin/content/events/delete?id=...`

**DB**

* Existing `events` table exists; ensure columns: `event_time time`, `event_date date`, `capacity int`, `media_paths jsonb`, `content text` (or `text`), `location text`.

* SQL snippet:

ALTER TABLE events  
  ADD COLUMN IF NOT EXISTS event\_time time,  
  ADD COLUMN IF NOT EXISTS event\_date date,  
  ADD COLUMN IF NOT EXISTS capacity integer,  
  ADD COLUMN IF NOT EXISTS media\_paths jsonb DEFAULT '\[\]'::jsonb,  
  ADD COLUMN IF NOT EXISTS location text;

**List behavior**

* Support server-side filters by date (upcoming/past), search, and tag (if tags exist). Infinite scroll.

---

## **Server-side search & filters (content/list endpoints)**

* Implement parameterized queries using Supabase query builder. E.g., for stories:

const q \= supabase.from('stories').select('\*');  
if (search) q.ilike('title', \`%${search}%\`).or(\`content.ilike.%${search}%\`);  
if (tags) q.contains('tags', tagsArray);  
if (is\_published \!== undefined) q.eq('is\_published', is\_published);  
q.order('publish\_date', { ascending: false }).range(offset, offset+limit-1);

* Return `total_count` in response for UI pagination/infinite scroll triggers.

---

## **Auto-scan Supabase buckets & mapping**

**Purpose**: On initial run (or on-demand), scan `NEXT_PUBLIC_HERO_BUCKET` and `NEXT_PUBLIC_GALLERY_BUCKET` and map detected folders into `gallery_categories` and hero page mappings.

**API**

* `POST /api/admin/images/scan-buckets`:

  * Server calls Supabase storage list API per bucket with recursive listing and builds folder tree.

  * For `hero` bucket: map `hero/<page-slug>/` to built-in pages list. If matches, create/update `hero_images` record in DB (`hero_page`,`path`,`active`).

  * For `gallery` bucket: find top-level folders like `education`, `sponsorship`, etc., create `gallery_categories` rows with `folder_path` set.

  * Return `{ mapped: [...], unmapped: [...] }` showing what was created and what needs manual review.

**Implementation detail**

* Use Supabase Admin SDK `storage.list()` to list folder prefixes (existing docs show `/api/storage/folders?bucket=&prefix=` endpoints). Follow that pattern.

---

## **Image upload & processing details**

* Client: `ImageUploader.tsx` performs preliminary resizing/compression. Provide aspect presets: `hero: 1600x600` and `thumb: 400x300`.

* Server: `POST /api/admin/images/upload` accepts file(s). Use the Supabase `storage.upload()` server method with paths like `gallery/<category>/<timestamp>-<random>-<filename>`.

* After upload, server returns `url` and `thumbUrl`. If server can't generate thumbnails, store original and rely on Supabase transformations (or provide signed `?width=400` style URL).

* For large bulk uploads, return per-file status and overall progress.

---

## **Authentication & Authorization**

* All `app/api/admin/**` endpoints must validate Supabase JWT and check `auth.jwt() ->> 'role' = 'admin'` in server code.

* Use `SUPABASE_SERVICE_ROLE_KEY` for server-side sensitive ops when necessary (but keep its usage limited and secure).

* RLS on DB tables continue as existing docs recommend.

---

## **Storybook & components**

* Each UI component must have a Storybook story under `storybook/stories/components/admin/**`.

* Stories should show default, mobile, and error states for critical components: `ImageUploader`, `ImageGrid`, `StoryEditor`, `Sparkline`, `MobileDrawer`.

* Use `msw` or similar to stub API responses in Storybook.

---

## **File-by-file implementation checklist (copy into ticket)**

(Concise items devs actually use)

* Remove old admin pages at `app/admin/*` (commit in a branch; keep DB/storage)

* Add new admin route files and components per structure above

* Implement `app/api/admin/**` endpoints (upload, list, delete, scan, content CRUD)

* Add migrations `scripts/supabase/001-add-gallery-categories.sql` and stories/events alterations

* Implement `lib/supabase/admin.ts` helpers for admin auth and storage listing

* Implement TipTap onboarding in `StoryEditor.tsx`

* Implement drag-and-drop with concurrency-limited bulk upload

* Implement scan-buckets server logic and DB record mapping

* Add Storybook stories and tests for critical components

* QA: test mobile drawer, infinite scroll lists, server search & filters, publish-schedule, slug uniqueness

* Accessibility audit: keyboard nav, ARIA, color contrast

* Performance: ensure images use `next/image` where appropriate on public pages; admin UI should lazy-load heavy libs (TipTap, image libs)

---

## **Example API route skeletons (very specific)**

`app/api/admin/images/upload/route.ts`

import { NextRequest } from 'next/server';  
import { getAdminSupabase } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {  
  const token \= req.headers.get('authorization')?.replace('Bearer ', '');  
  const supabase \= getAdminSupabase();  
  // validate token \-\> admin role  
  // parse multipart, perform upload(s), optionally generate thumb  
  // return JSON { files: \[...\] }  
}

`app/api/admin/content/stories/create/route.ts`

export async function POST(req: NextRequest) {  
  // validate admin  
  // parse JSON body { title, excerpt, slug, tags, featured\_image\_path, media\_paths, content, publish\_date }  
  // ensure slug uniqueness: check stories table; append "-n" on conflicts  
  // insert into stories  
}

---

## **UI specifics, micro decisions (so no hand-holding later)**

* Sidebar: left, fixed on desktop; collapses to 72px mini icon view, fully hidden on mobile and accessed by hamburger \-\> slide-in drawer.

* Buttons: larger tap targets (min 44px), primary CTA uses `--brand-amber` with elevated shadow, secondary uses `--brand-purple` subtle outline.

* Cards: radius `lg`, shadow `sm`, padding `p-4`.

* Spacing: generous (rem-based) so the admin feels premium and uncluttered.

* Forms: inline validation, friendly errors, server validation messages show under inputs.

* Text-overflow: button text wraps never — prefer icons \+ label or `truncate` with tooltip to avoid overlap (you had overlapping buttons; no more).

---

## **SQL snippets for contact message stats / sparkline**

Add a view or server route to compute daily counts:

CREATE VIEW admin\_contact\_daily AS  
SELECT date\_trunc('day', date) AS day, COUNT(\*) AS count  
FROM contact\_submissions  
GROUP BY day  
ORDER BY day DESC;

Dashboard API uses this view to return last 14 days for sparkline.

---

## **Testing \+ QA notes**

* Test upload of 100 images in bulk (simulate concurrency), ensure no rate limit failures.

* Verify scan-buckets correctly maps existing folders and doesn't create duplicates.

* Ensure TipTap image embed uploads to the admin upload endpoint and that images inserted in content are accessible publicly when published.

* Verify server-side search handles unicode, stops SQL injection (use Supabase query builder).

---

## **Deliverables for the vibe coder (exact)**

1. Pull request `feature/admin-rebuild` with:

   * All new files under `app/admin`, `components/admin`, `app/api/admin`.

   * Migration SQL under `scripts/supabase`.

   * Storybook stories for admin components.

   * README `docs/admin-rebuild.md` with run instructions and env vars.

2. Demo checklist: include screenshots of mobile drawer, dashboard sparkline, hero image flow, bulk uploader, TipTap editor with an embedded image.

3. Automated tests (if possible): simple unit tests for slug generation and API endpoints (mocked).

---

## **Quick dev tips (because your coder will pretend they know everything)**

* Use shadcn components for common primitives; extend them for admin-specific variants. Keep Tailwind token naming consistent with `app/globals.css`.

* Keep heavy libraries (TipTap, compression libs) lazy-loaded on the editor route so the rest of the admin remains snappy.

* Use server components for list hydration when possible; use client components for interactivity (drag drop, editor).

* Use Supabase storage `list({ limit, offset })`\-style listing for pagination rather than recursive full-list on UI loads for big buckets. Docs show relevant storage API patterns.

---

## **Where this ties back to your existing docs**

* Follow the existing admin shell `app/admin/layout.tsx` and token conventions in `app/globals.css` while implementing a cleaner sidebar/drawer. See Admin Layout and tokens in your docs.

* Upload/list/delete APIs follow the documented patterns (`/api/upload-image`, `/api/get-images`, `/api/delete-image`) — extend them into `app/api/admin/**`.

* Database and storage structure referenced in the docs — use existing tables where possible and add migrations for categories and fields.

