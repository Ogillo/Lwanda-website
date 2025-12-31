# KE 258 Lwanda CYDC — UI Implementation Guide (v1.0)

Last updated: 2025-12-01

## 1. Overview
- Purpose: Document the current website UI architecture and implementation to enable consistent, informed modifications.
- Scope: Public site pages, admin UI, design system tokens/components, interactions, responsiveness, accessibility, performance, and third‑party libraries.

## 2. Component Hierarchy
- Global Layout
  - `app/layout.tsx:26–44` sets fonts (`Inter`, `Manrope`), metadata and imports `app/globals.css`.
  - `app/globals.css:6–41,43–77,127–134` defines semantic color tokens, radii, base styles, and `.btn-*` utilities.
- Public Pages
  - `app/page.tsx:1–250` Home
    - `components/site-header.tsx:8–139` sticky header (desktop/mobile, programs dropdown, donate).
    - `components/sections/hero-section.tsx:19–64` hero with background image and CTAs.
    - `components/ui/stat-card.tsx:9–22` impact stats grid.
    - `components/ui/program-card.tsx:13–36` programs grid.
  - `components/ui/story-card.tsx:14–53` latest stories.
  - Stories data source unified across Home and Stories pages:
    - Home: `app/page.tsx` selects `id, title, content, publish_date, tags, featured_image_path, media_paths, is_published, created_at` with `is_published = true`, ordered by `publish_date` then `created_at`.
    - Stories: `app/stories/page.tsx` uses the same fields and filters, with pagination.
    - Fallbacks: if no stories, the Stories page shows "No stories found"; loading and error states are shown appropriately.
    - `components/sections/cta-banner.tsx:18–46` CTA banner.
    - `components/forms/newsletter-signup.tsx:9–60` newsletter signup.
    - Contact form scaffold (semantic labels/inputs).
    - `components/site-footer.tsx:5–132` footer with partner badges, links.
  - Other public pages follow similar composition with `SiteHeader`, `HeroSection`, content sections, `SiteFooter` (e.g., `app/about/page.tsx:1–176`).
- Admin Pages
  - `app/admin/layout.tsx:11–69` admin shell (header + sidebar navigation).
  - `app/admin/page.tsx:1–140` dashboard UI (cards, activity, quick actions).
  - `app/admin/images/page.tsx:27–304` image management (folder tabs, uploader, gallery, selection dialog).
    - `components/admin/image-uploader.tsx:11–148` file select/preview/upload to protected API.
    - `components/admin/image-gallery.tsx:17–151` list assets, copy URL, protected delete.

## 3. Design Patterns & Style Guidelines
- Semantic Design Tokens
  - Colors (`--background`, `--foreground`, `--primary`, `--secondary`, etc.) at `app/globals.css:6–41` with dark mode overrides `:root/.dark` (`app/globals.css:43–77`).
  - Radii (`--radius-*`), `@theme inline` token mapping for Tailwind v4 (`app/globals.css:79–116`).
- Utility‑first Styling with Tailwind v4
  - Consistent usage of `container`, responsive `grid md:grid-cols-*`, spacing, borders and tokens.
- Reusable UI Primitives
  - Button, Card, Input, Label, Dialog components under `components/ui/*` for consistent styling/behavior.
- CTA utilities
  - `.btn-primary` and `.btn-secondary` compose common CTA styles (`app/globals.css:127–134`).

## 4. Interactive Elements & Behaviors
- Header
  - Mobile menu toggle (`useState`) and desktop programs dropdown with expand/collapse (`components/site-header.tsx:8–11,45–73,98–105,108–135`).
- Hero & CTA
  - Primary/secondary CTA buttons as links; optional `backgroundImage` overlay in hero (`components/sections/hero-section.tsx:28–35,47–57`).
- Newsletter Signup
  - Client form with submission feedback and auto‑reset (`components/forms/newsletter-signup.tsx:10–18,33–51`).
- Admin Image Uploader
  - File type/size validation, preview, upload progress, bucket/folder select (`components/admin/image-uploader.tsx:49–66,67–91,94–147`).
  - Drag‑and‑drop area with visual highlight (`components/admin/image-uploader.tsx:130–133`).
- Admin Image Gallery
  - Folder/bucket filtering, image grid, copy URL to clipboard, protected delete (`components/admin/image-gallery.tsx:53–65,116–148`).
  - Selection dialog for storage files (`app/admin/images/page.tsx:274–300`).

## 5. Responsive Design
- Grids and Layouts
  - `md:grid-cols-*` used across sections for responsive columns (e.g., stats/programs/stories grids).
  - Containers: `container mx-auto px-4` with content max widths in sections.
- Header
  - Desktop nav vs mobile menu button with conditional rendering (`components/site-header.tsx:34–87,108–135`).
- Imagery
- Hero image covers with overlay; story cards set fixed height for thumbnails (`components/ui/story-card.tsx:19–21`).
- Admin pages
  - Grids for controls and previews adapt across breakpoints.

## 6. Navigation Structure & Flow Diagrams
- Primary Navigation (Header)
  - `Home`, `About`, `Programs` (dropdown: `Child Survival`, `Sponsorship`, `Youth Development`), `Get Involved`, `Stories`, `Gallery`, `Contact`, plus `Donate` CTA.

```
User → SiteHeader
  ↳ Click Programs → Dropdown
    ↳ Navigate to program detail pages
User → Donate CTA → `/donate`
User → Content pages → Footer links for legal/policy
```

- Admin Image Management Flow

```
Admin → /admin/images
  ↳ Select bucket/folder (fetched via APIs)
  ↳ Choose file (type/size validated) → Preview → Upload
    → POST /api/upload-image (Bearer token, role: admin)
    → Supabase Storage upload → Public URL → Copy/Use in site
  ↳ List items → Copy URL / Delete (DELETE /api/delete-image)
```

## 7. Color, Typography, and Spacing
- Color Palette (Brand)
  - Primary Amber `#d97706`, Secondary Purple `#8b5cf6`, Neutrals whites/grays/beige.
  - Implemented via OKLCH tokens (`app/globals.css:6–41`).
- Typography
  - Headings: `Inter` (via `next/font`) → `--font-sans`.
  - Body: `Manrope` → `--font-serif`. Applied in `app/layout.tsx:32–39`.
- Spacing & Radii
  - Spacing scale from Brand Starter Kit.
  - Border radius default `0.5rem` (`app/globals.css:32`).

## 8. UI State Management
- Public UI uses local React state only where interactive (e.g., header toggles, newsletter form).
- Pages are server components by default (e.g., `app/page.tsx`) with optional client‑side Supabase reads when configured.
- Admin uses local component state (`useState`) for uploads, lists, dialogs; Supabase client session retrieved via `lib/supabase/client.ts:5–13`.
- Theme provider available via `components/theme-provider.tsx:9–11` (optional dark theme support via `next-themes`).

## 9. Accessibility
- Semantic HTML:
  - Labels and input associations in forms (`app/page.tsx:227–243`).
  - Alt text for images in content cards (`components/ui/story-card.tsx:19–20`).
- Focus & Contrast:
  - Focus ring and color contrast via tokens (`app/globals.css:118–125,127–134`).
- Improvements to consider:
  - ARIA attributes on dropdowns/dialog states.
  - Decorative hero background `alt` handling.

## 10. Performance (Rendering)
- SSR via Next.js App Router; automatic code splitting.
- Static tokens minimize reflow; images often use fixed container heights.
- Reported targets: Lighthouse 95+, FCP < 1.5s, TTI < 3.5s (README).
- Optimization opportunities:
  - Adopt `next/image` where feasible on public pages.
  - Reduce client JS in public pages; prefer server components/data.

## 11. Third‑Party UI Libraries
- `Tailwind CSS v4` — utility styling and tokens.
- `next-themes` — theme provider for dark/light.
- `lucide-react` — icons on some pages (`app/about/page.tsx:5`).
- `@supabase/supabase-js` — storage/auth interactions.
- `next/font` — web fonts (`Inter`, `Manrope`).

## 12. Visual References
- Diagrams in sections 6 and 10 provide structure and flow.
- Screenshot guidance:
  - Header (desktop and mobile menu open).
  - Hero with background image overlay.
  - Stats/programs/stories grids at `md` breakpoint.
  - Admin Images: uploader form, preview, gallery grid.

### Screenshots
- Header: `docs/screenshots/header.png`
- Hero: `docs/screenshots/hero.png`
- Home Stats Grid: `docs/screenshots/home-stats-grid.png`
- Home Programs Grid: `docs/screenshots/home-programs-grid.png`
- Home Stories Grid: `docs/screenshots/home-stories-grid.png`
- Admin Dashboard: `docs/screenshots/admin-dashboard.png`
- Admin Images: `docs/screenshots/admin-images.png`

To regenerate, run `pnpm capture:screens` with the dev server running.

## 13. Versioning & Change Management
- Document version: `v1.0` (date stamped).
- Suggested commit style: Conventional Commits (e.g., `docs(ui): add UI implementation guide v1.0`).
- Place future updates under `docs/` with clear version increments and change logs.

## 14. Quick File Map
- Layout & Tokens: `app/layout.tsx`, `app/globals.css`
- Public Components: `components/site-header.tsx`, `components/site-footer.tsx`, `components/sections/*`, `components/ui/*`, `components/forms/newsletter-signup.tsx`
- Admin Components: `app/admin/*`, `components/admin/*`
- Utilities: `lib/supabase/*`
