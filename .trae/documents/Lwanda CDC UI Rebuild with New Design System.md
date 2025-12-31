## Global Foundation

* Update Tailwind v4 theme tokens in `app/globals.css` to the new palette:

  * `--primary: #DA8A16`, `--secondary: #6D4BEF`, `--foreground: #1C1C21`, `--background: #F7F3ED`

  * Map neutrals for borders, inputs, muted, and overlays using the same neutral dark/light.

* Typography: switch headings to Inter Tight and body to Manrope in `app/layout.tsx`.

  * Import `Inter_Tight` from `next/font/google`; expose variables `--font-heading` (Inter Tight) and `--font-body` (Manrope).

  * Apply: headings use `font-[var(--font-heading)]` via utility, body and paragraphs use `font-[var(--font-body)]`.

* Border radius tokens: set small `10px`, card `16px`, large `20px` as Tailwind CSS variables in `@theme inline`.

* Text width: introduce a utility class `max-w-[680px]` and apply to body text blocks; exclude hero.

* Grid: standardize desktop to 12-column layout; define section wrappers using `grid grid-cols-12 gap-x-6` and compose content with `col-span-*`.

* Vertical rhythm: set section paddings/margins to `py-24`/`my-24` (96px).

## Core Components Redesign

* Header (`components/site-header.tsx`)

  * White background, sticky.

  * Active nav link shows gold underline; use `usePathname()` to detect active route.

  * Programs dropdown: white, shadow, rounded `12px`, consistent spacing.

  * Donate button becomes primary gold (`bg-primary text-primary-foreground`).

  * Mobile: slide-in from right full-height panel with dark overlay; animate using `tw-animate-css` or Tailwind `data-state` classes.

* Hero (`components/sections/hero-section.tsx`)

  * Full-width background image with 40% dark overlay.

  * Centered content; title in Display 64px, subtitle 20px.

  * Two CTAs: primary gold and secondary white-purple outline; fade-in animation.

* Stat Card (`components/ui/stat-card.tsx`)

  * Soft gold-tint background, large number in gold, label in charcoal.

  * Responsive: 3–4 per row depending on width with 12-col grid.

* Program Card (`components/ui/program-card.tsx`)

  * Supports icon/cover image, title, short description, and CTA “Learn more →”.

  * Card radius `16px`, clear hover.

* Story Card (`components/ui/story-card.tsx`)

  * Larger thumbnails, tag above title, 3-column desktop.

* CTA Banner (`components/sections/cta-banner.tsx`)

  * Purple gradient background card, one CTA primary.

* Newsletter (`components/forms/newsletter-signup.tsx`)

  * Upgraded inputs and button; success state shows green check icon + message.

## Public Pages Rebuild

* Site Header integration across pages via `app/layout.tsx`.

* Home (`app/page.tsx`)

  * Hero: implement overlay and typographic scale; center vertically; fade-in.

  * Stats Section: replace with new StatCard layout and gold tint.

  * Programs: switch to redesigned Program Card grid; add icons/cover images.

  * Stories: redesigned Story Cards in 3-col desktop.

  * CTA Banner: purple gradient card.

  * Newsletter: upgraded component and success state.

* About (`app/about/page.tsx`)

  * Static hero image; generous section spacing; leadership uses card components; values in 3-col grid with icons.

* Programs Overview (`app/programs/page.tsx`)

  * New hero; each program uses large Program Card; include impact stats in gold.

* Program Details (`app/programs/*/page.tsx`)

  * Hero with program-specific photo; large title + description; structured sections (About, Activities, Impact, Related Stories); purple call-to-action at bottom.

* Stories (`app/stories/page.tsx` and story detail if present)

  * Use Story Cards; add pagination controls; optional filters; detail page gets large hero image, title + metadata, body text `max-w-[680px]`.

* Events (`app/events/page.tsx`)

  * Redesigned event cards; date badge in gold; modal details with gallery and map.

* Gallery (`app/gallery/page.tsx`)

  * Masonry grid; modal viewer with next/prev; filtering controls.

* Contact (`app/contact/page.tsx`)

  * Clean 2-col layout: left info/map, right form using upgraded inputs; submit success message styled.

* Policies (`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/safeguarding/page.tsx`)

  * Clean typography; 680px content width; left-aligned; section headers with 48px top padding.

* Donate (`app/donate/page.tsx`)

  * Gold hero with strong messaging; two-column layout for donation steps; CTA primary gold.

## Admin UI Replacement

* Admin Layout (`app/admin/layout.tsx`)

  * Header dark charcoal (`bg-[#1C1C21]`), white text.

  * Sidebar with gold active highlights; icons and labels styled; content area white, padded; same typography system.

* Admin Images (`app/admin/images/page.tsx` + `components/admin/*`)

  * Bucket/Folder tabs: rounded tabs with gold active, grey inactive.

  * Uploader: drag-and-drop box, large dashed border, gold hover highlight.

  * Preview card radius `16px`.

  * Gallery: square thumbnails grid; delete button small red; copy URL button purple outline; add toasts for actions (using `sonner`).

* Admin Settings + Content (`app/admin/settings/page.tsx`, `app/admin/content/page.tsx`

