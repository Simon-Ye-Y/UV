# UV Project – Codex Execution Brief (Project Goals & Rules)

This document defines **what to build**, **what not to build**, and **how to execute safely**.  
It is written for Codex operating in a **local Ubuntu VM** within this repository.

---

## 1) Mission

Modernize the stalled Webflow-derived “Smart Campus / Community / Template” project into a maintainable **Next.js** codebase with a small, reusable UI foundation, so work can progress primarily via Codex with minimal human supervision.

---

## 2) Target Architecture (Chosen Option)

### Frontend
- **Next.js (Pages Router)** + React
- UI foundation: **Tailwind CSS + shadcn/ui (Radix UI)**
- Animations: Framer Motion (already present)

### Data strategy
- **Mock-first**: use **Next API Routes** and/or local fixtures to drive pages.
- No real database/auth/payment in the first milestones.

### Legacy Webflow export (location in this repo)
- Webflow export lives at: `frontend/uv-project.webflow/`
- Treat it as:
    - **Reference** (content/structure)
    - **Asset source** (images/icons/fonts)
- Do **not** use Webflow runtime (`webflow.js`) as a core dependency.
- Only copy required runtime assets into `frontend/public/`.

---

## 3) Non-goals (Explicitly out of scope for now)

Do **not** implement these unless explicitly requested:
- Real authentication (sessions, JWT, OAuth, password reset emails)
- Real payment processing / checkout integration (PayPal/Stripe)
- Database persistence
- Admin/backoffice
- Re-creating all Webflow interactions via `webflow.js`

---

## 4) Execution Rules (Strict)

1) **Incremental work only**  
   No “big bang” rewrites. Each change-set must be scoped to one phase/task.

2) **Single source of truth**  
   - CSS must be loaded in a single consistent way; no duplicate includes across `_app.js`, `_document.js`, and page-level `<Head>`.

3) **No heavy UI frameworks**  
   Do not introduce Ant Design / MUI / Chakra / Mantine unless asked.

4) **Route conventions**  
   - Use **lowercase** routes (e.g., `/ai`, not `/AI`).
   - Fix all internal links accordingly.

5) **Evidence-driven completion**  
   Every task must end with passing “gates” and a short report.

---

## 5) Definition of Done: Mandatory Gates

Codex must run these after every task and ensure they pass:

- `pnpm lint`
- `pnpm build`
- `pnpm check:assets`  (must be added)
- `pnpm check:links`   (must be added)
- `pnpm test:smoke`    (add later; can start minimal)

Codex must add a convenience command:
- `pnpm gate` → runs all gates sequentially

---

## 6) Required Repo Additions (Conventions)

Codex should create/standardize these directories in `frontend/`:

- `components/layout/`  
  - `SiteLayout` providing consistent Navbar/Footer
- `components/ui/`  
  - shadcn/ui components and local wrappers
- `lib/`  
  - `api.ts` (fetch wrapper), route helpers, constants
- `data/`  
  - fixtures (JSON or TS) used by mock endpoints and pages
- `scripts/`  
  - `check-assets.mjs`, `check-links.mjs`

Runtime assets:
- `frontend/public/` (only what the app actually serves)

## Legacy Webflow export handling

- Source (read-only): `frontend/uv-project.webflow/`
- Runtime assets destination: `frontend/public/`

Rules:
- Do not import/execute any Webflow runtime scripts under frontend/uv-project.webflow/js/ (e.g. webflow.js / *.webflow.js) as a dependency.
- When assets are missing in `frontend/public/`, copy the exact files from `frontend/uv-project.webflow/` (images/fonts) into `frontend/public/` and update references to local paths.
- The app must not depend on `.webflow.io` links for internal navigation.

---

## 7) Work Phases (Codex must execute in order)

### P0 — Stabilize
**Goal:** make the repo safe for aggressive Codex iteration.

Tasks:
- Remove duplicated CSS loading; keep a single consistent approach.
- Eliminate missing static assets referenced by code:
  - copy from `frontend/uv-project.webflow/` when available
  - otherwise generate placeholders (temporary)
- Eliminate internal broken links (missing routes or stale `*.webflow.io` links).
- Confirm `lint` + `build` pass.

Asset policy: 
- Do not rename assets in P0. 
- Copy as-is from frontend/uv-project.webflow/ to frontend/public/ to satisfy references. 
- Optional: generate ASSETS_MANIFEST.md mapping asset → references.
Acceptance:
- `pnpm lint` and `pnpm build` pass
- `check:assets` and `check:links` pass
Note: if a referenced asset is missing under `frontend/public/`, Codex should first search and copy it from `frontend/uv-project.webflow/` before generating placeholders.

---

### P1 — UI Foundation
**Goal:** establish the reusable UI “wheel” (similar to a StandardPage base layer).

Tasks:
- Add Tailwind
- Initialize shadcn/ui and introduce key primitives:
  - Button, Input, Card, Tabs, Dialog, DropdownMenu, Badge
- Introduce `SiteLayout` and apply across pages (avoid repeated Navbar/Footer imports).
- Normalize route casing (e.g., `/AI` → `/ai`).

Acceptance:
- Existing pages render without major regression
- At least 2 pages use new UI primitives
- Gates pass

---

### P2 — Mock-first Contracts
**Goal:** pages must render from deterministic data sources, not hardcoded DOM.

Tasks:
- Add `lib/api.ts` fetch wrapper
- Create fixtures in `data/`
- Align Next API Routes to fixtures
- Refactor pages to use API/fixtures consistently

Acceptance:
- `/courses` and `/projects` show deterministic items (no empty placeholders)
- Forum list/detail/create works end-to-end via mock API
- Gates pass

---

### P3 — Interactive UX Hardening
**Goal:** improve forum + auth UI behavior without real backend.

Tasks:
- Forum: loading/error states, validation, basic editor UX
- Auth pages: validation + consistent UI components (still mock)

Acceptance:
- Forum flows stable
- Auth forms have predictable validation UX
- Gates pass

---

## 8) Reporting Requirement

After each phase/task, create or update `REPORT.md` with:
- Objective and scope
- Files changed (high level)
- Gate outputs (success/fail)
- Follow-ups / next recommended task

---

## 9) Codex Task Prompt Template

Use this template for each task:

> You are operating in a local Ubuntu VM inside this repo.  
> Follow the **UV Project – Codex Execution Brief** strictly.  
> Work only on **Phase {P0|P1|P2|P3}** and do not mix unrelated refactors.  
> After changes, run: `pnpm gate`. Fix issues until all gates pass.  
> Update `REPORT.md` with gate outputs and a concise summary.

