## Overview

* Use `pnpm` with the existing `pnpm-lock.yaml` to install exact versions.

* Configure required env vars (`.env.local`) for image APIs using `@vercel/blob`.

* Verify by running the dev server and opening the site.

## Prerequisites (Windows)

* Install Node.js 18+ from nodejs.org or `winget install OpenJS.NodeJS`.

* Install `pnpm` globally: `npm i -g pnpm`.

* Confirm versions: `node -v`, `pnpm -v`.

## Install Dependencies (Frozen Lock)

* Navigate to the project root: `cd "c:\Users\ADMIN\OneDrive\Desktop\Lwanda Website\Lwanda-website"`.

* Install exactly as pinned: `pnpm install --frozen-lockfile`.

  * Uses `pnpm-lock.yaml` to ensure consistent versions across environments.

## Environment Configuration

* Create `./.env.local` in the project root with:

  * `BLOB_READ_WRITE_TOKEN=your_vercel_blob_token`

  * Optional: `NEXT_PUBLIC_ANALYTICS_ID=your_id`

* Purpose: required for `app/api/upload`, `app/api/images/list`, `app/api/images/delete` that rely on `@vercel/blob`.

* Note: There is no `package-lock.json` or `yarn.lock`; the project standard is `pnpm-lock.yaml`.

## Verify Installation

* Start dev server: `pnpm dev`.

* Open `http://localhost:3000/` and confirm pages load (e.g., Home, About, Programs).

* Optional API check: visit `/admin/images` and test image list/upload/delete; if token is missing or invalid, the page will show errors from blob routes—fix by setting a valid `BLOB_READ_WRITE_TOKEN`.

## Backend Dependencies Clarification

* No Express/NestJS in use. Backend is implemented via Next.js API routes and `@vercel/blob`.

* All runtime and dev dependencies are listed in `package.json`; installing with pnpm covers both.

## Next Steps (upon approval)

* I will run the above commands, set `.env.local`, launch the dev server, and report any missing dependency errors with fixes (if any).

