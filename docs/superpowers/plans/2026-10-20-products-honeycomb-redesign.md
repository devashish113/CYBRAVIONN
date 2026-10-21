# Products Section Honeycomb Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage Products section (`src/components/ProductsShowcase.tsx`) into an interlocking 3-3 Honeycomb hexagonal cluster matching the Services section (`PolygonHexCard`), featuring interactive water wave ripple dynamics, layout toggles (Honeycomb / Matrix), category filter pills, and neutral gray dark mode harmony.

**Architecture:** Refactor `ProductsShowcase.tsx` to utilize `PolygonHexCard` with domain tags, subtitles, background scrim imagery, and apex chevron action buttons. Provide stateful category filtering and a responsive dual layout switcher (Honeycomb / Matrix).

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide React icons, Web Audio API (`cyberAudio`).

## Global Constraints
- Pure neutral gray in dark mode (`#07080c`, `#111113`, `border-white/15`) with zero blueish tint.
- Smooth navigation to product views via `setCurrentView` and smooth scrolling to top.
- Responsive design: neatly stacks or falls back to matrix grid on mobile/small screens.

---

### Task 1: Redesign `ProductsShowcase.tsx` with Interlocking Honeycomb Cluster

**Files:**
- Modify: `src/components/ProductsShowcase.tsx`

**Interfaces:**
- Consumes: `PolygonHexCard` from `src/components/PolygonHexCard.tsx`, `cyberAudio` from `src/utils/cyberAudio.ts`.
- Produces: Redesigned Products section with category filtering, layout switcher, and 3-3 nestled honeycomb grid.

- [ ] **Step 1: Update product dataset and component state in `ProductsShowcase.tsx`**
  - Add `selectedFilter` (`'ALL' | 'THREAT' | 'SOAR' | 'GOVERNANCE' | 'SANDBOX' | 'AI'`).
  - Add `layoutMode` (`'honeycomb' | 'grid'`).
  - Enhance product objects with `image`, `tag`, `subtitle`, and route mapping.

- [ ] **Step 2: Add Category Filters and Honeycomb/Matrix layout switcher**
  - Implement tactile pill filters matching the design system.
  - Implement Honeycomb and Matrix layout mode buttons with active neumorphic pill highlights.

- [ ] **Step 3: Implement 3-3 Honeycomb Cluster and Matrix Grid layouts**
  - Row 1: 3 `PolygonHexCard` components for ThreatForge, SOC AI Triage, AI Exception Manager.
  - Row 2: 3 `PolygonHexCard` components for CyberRange Arena, Threat Intel Collector, Cybravions AI with `lg:-mt-16` nestled spacing.
  - Matrix view: 3x2 responsive grid for mobile and matrix layout mode.

- [ ] **Step 4: Run build to verify compilation**
  Run: `npm run build`
  Expected: Exit code 0, 0 TypeScript errors.

- [ ] **Step 5: Commit changes**
  Run: `git add src/components/ProductsShowcase.tsx; git commit -m "feat(products): redesign showcase into interlocking honeycomb cluster"`

---

### Task 2: Verification, Commit & Push

**Files:**
- Test & verify: Entire application build and git tree

- [ ] **Step 1: Run production build verification**
  Run: `npm run build`
  Expected: Exit code 0.

- [ ] **Step 2: Push changes to remote repository**
  Run: `git push origin main`
  Expected: Successfully pushed to `origin/main`.
