# Rebuild Admin UI from Scratch

## Scope & Assumptions
- Replace all UI under `app/admin/**` and related `components/admin/**` with the new architecture.
- Keep Supabase DB and Storage intact; preserve current non-admin routes.
- Follow app router conventions and `lib/supabase/client.ts` for client access; add `lib/supabase/admin.ts` for server helpers.
- Align dependencies to target: Next 14, React 19, Tailwind v4, Supabase, shadcn, TipTap.

## Dependencies & Setup
- Upgrade React to 19: `react@^19`, `react-dom@^19`, update `@types/react` as compatible.
- Add TipTap: `@tiptap/react`, `@tiptap/starter-kit`, plus image extension.
- Ensure Tailwind v4 already configured; retain `@tailwindcss/postcss` and PostCSS.
- Add testing: `jest` or `vitest` for unit tests, `@playwright/test` already present for e2e.

## Design Tokens & UI Primitives
- Update `app/globals.css` tokens:
  - `--brand-amber: #c56a00` (primary)
  - `--brand-purple: #6f4cf0` (accent)
  - Scale neutrals for higher contrast.
- Consolidate `.btn-primary`/`.btn-secondary` into shadcn `Button` variants used across admin.

## Remove Legacy Admin
- Delete legacy pages: `app/admin/**` existing content (`content`, `images`, `settings`, `page.tsx`, `layout.tsx`).
- Remove old `components/admin/**` (hero-manager, gallery-manager-new, programs-manager, image-gallery, image-uploader).
- Keep existing public pages and API routes unrelated to admin.

## New File Structure
- `app/admin/layout.tsx` – Admin shell with header and mobile slide-in drawer.
- `app/admin/page.tsx` – Dashboard.
- `app/admin/gallery/page.tsx`, `hero-tab.tsx`, `gallery-tab.tsx` – Gallery Management.
- `app/admin/content/page.tsx`, `stories-tab.tsx`, `events-tab.tsx` – CMS.
- `components/admin/Dashboard/*` – `DashboardShell`, `StatCard`, `Sparkline`, `LatestMessages`.
- `components/admin/Gallery/*` – `GalleryShell`, `BucketScanner`, `ImageGrid`, `ImageUploader`, `ImageCard`, `CategoryForm`, `ImageDetailModal`.
- `components/admin/Content/*` – `ContentShell`, `StoryList`, `EventList`, `StoryEditor` (TipTap), `EventEditor`.
- `components/admin/UI/*` – `AdminSidebar`, `MobileDrawer`, `ConfirmDialog`, `PaginationInfinite`.
- `lib/supabase/admin.ts` – `adminAuth`, `listBuckets`, `listFolders`, server Supabase client.
- `app/api/admin/**` – All admin endpoints per spec.
- `scripts/supabase/001-add-gallery-categories.sql` – Migration.
- `storybook/stories/components/admin/**` – Storybook stories.

## Admin Shell & Navigation
- Desktop: persistent left sidebar; topbar with search and quick actions.
- Mobile: hamburger toggles `MobileDrawer` full-height slide-in; nested nav.
- Accessibility: ARIA roles for nav, dialog, drawer; focus management.

## Dashboard (app/admin/page.tsx)
- Server component fetches:
  - `GET /api/admin/stats` → `contact_total`, `contact_last_7_days`, daily/weekly trend, `upcoming_stories_count`.
  - `GET /api/admin/contact-latest?limit=3` → latest messages.
- UI: Stat cards row, Sparkline (SVG path; daily/weekly toggle), Latest messages list, Quick links.
- Error and loading states: skeletons for stat cards and sparkline; empty messages state.

## Gallery Management (app/admin/gallery)
- Two tabs: Hero Images and Gallery Images.
- Hero tab:
  - Pages mapped to `hero/<page-slug>/`.
  - Show current active hero per page; upload/change via `POST /api/admin/images/upload`.
  - Aspect presets (16:9, 4:1), auto-thumb; optional scheduling.
- Gallery tab:
  - Category list (Education, Sponsorship, Community Work, Celebration) mapped to folders in `gallery` bucket.
  - CRUD images: single/bulk upload, delete, metadata edit (title, caption, alt).
  - Bulk upload: drag-and-drop, per-file progress, concurrency limit 4.
  - Category create via `CategoryForm` → `POST /api/admin/images/create-category`.
- Infinite scroll: `ImageGrid` paginated via `GET /api/admin/images/list?bucket=gallery&folder=<folder>&page=&limit=`.
- Actions: copy URL, set featured, edit metadata, delete, open detail modal.

## Content Management (app/admin/content)
- Two tabs: Stories and Events.
- Stories list:
  - Columns: thumb, title, tags, excerpt (120 chars), publish toggle, publish date, actions.
  - Server-side search (`q`), filters (tag, published, date range), infinite scroll.
- Story editor (`StoryEditor`): title, slug (auto), excerpt, tags, featured image, media carousel, publish toggle/date, TipTap rich text with image embed via admin upload.
- Events list/editor: fields per spec; filters by date, search, tags (if present), infinite scroll.

## Supabase Helpers (lib/supabase/admin.ts)
- `getAdminSupabase()` using `SUPABASE_SERVICE_ROLE_KEY` for server-only operations.
- `adminAuth(req)` validates JWT and role=`admin`.
- `listBuckets()` and `listFolders(bucket, prefix)` utilities; wrap `storage.list`.

## API Endpoints (app/api/admin/**)
- `admin/stats/route.ts` – compute counts, trends; optionally use view `admin_contact_daily`.
- `admin/contact-latest/route.ts` – latest contact messages.
- `admin/images/list/route.ts` – list images with pagination.
- `admin/images/upload/route.ts` – validate admin, accept single/bulk, upload with concurrency limit; return `{ files: [...] }` incl. `thumbUrl`.
- `admin/images/delete/route.ts` – delete image by `{ bucket, path }`.
- `admin/images/create-category/route.ts` – create folder and DB row in `gallery_categories`.
- `admin/images/scan-buckets/route.ts` – scan `NEXT_PUBLIC_GALLERY_BUCKET`, `NEXT_PUBLIC_HERO_BUCKET`, map folders → categories and hero pages; return `{ mapped, unmapped }`.
- `admin/content/stories/*` – `list`, `get`, `create`, `update` (PATCH), `delete`.
- `admin/content/events/*` – `list`, `get`, `create`, `update`, `delete`.
- All endpoints: validate Supabase JWT and verify `role=admin`; minimize service-role usage.

## DB Migrations
- `gallery_categories` table per spec; add indexes.
- Extend `stories` table: `excerpt`, `slug` (unique), `tags jsonb`, `featured_image_path`, `media_paths jsonb`, `publish_date timestamptz`, widen `content` to `text`, add indexes on `slug`, `publish_date`.
- Extend `events` table: `event_time`, `event_date`, `capacity`, `media_paths jsonb`, `location`.
- Optional view: `admin_contact_daily` for dashboard sparkline.

## Storybook & Tests
- Storybook stories under `storybook/stories/components/admin/**` for: `ImageUploader`, `ImageGrid`, `StoryEditor`, `Sparkline`, `MobileDrawer`.
- Use `msw` to stub API responses.
- Unit tests: slug generation, API input validation, pagination range calculations.
- Integration tests (Playwright): bulk upload flow, drawer accessibility, infinite scroll, publish toggle.

## Accessibility, Performance, Security
- Accessibility: keyboard focus states, ARIA labels, `role="dialog"` and `aria-modal` for dialogs, focus trap.
- Performance: lazy-load TipTap and heavy upload/compression libs; concurrency limits; use `next/image` or transformed URLs where applicable.
- Security: never log secrets; validate JWT role server-side; limit use of `SUPABASE_SERVICE_ROLE_KEY` to storage listing and necessary ops; continue RLS policies.

## Env Vars
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` – client.
- `SUPABASE_SERVICE_ROLE_KEY` – server.
- `NEXT_PUBLIC_GALLERY_BUCKET`, `NEXT_PUBLIC_HERO_BUCKET` – names for bucket scanning.

## Verification & Rollout
- Local run with updated deps; confirm dashboard stats and trends.
- Test hero and gallery upload flows; confirm category creation.
- Validate content CRUD and TipTap image embed.
- Accessibility audit: keyboard nav, ARIA, contrast.
- Performance checks: bulk upload of 100 images with concurrency; ensure no rate limit failures.

## Implementation Checklist
- Remove old admin routes and components.
- Scaffold new admin routes and components.
- Implement admin APIs for images, content, stats.
- Add `lib/supabase/admin.ts` helpers.
- Apply DB migrations.
- Implement TipTap editor wrapper and image embed integration.
- Implement bulk upload with progress and concurrency.
- Implement bucket scanning and mapping to DB.
- Add Storybook stories and tests.
- QA: mobile drawer, infinite scroll, search & filters, publish scheduling, slug uniqueness.

## Notes on Current Repo
- Next.js 14 and Tailwind v4 are present; React currently 18 → plan includes upgrade to 19.
- Existing storage APIs (`/api/storage/folders`, `/api/upload-image`) will be superseded by `app/api/admin/**` endpoints but can be leveraged during refactor.

Confirm to proceed and I will execute the full rebuild with zero deviations from the specification.