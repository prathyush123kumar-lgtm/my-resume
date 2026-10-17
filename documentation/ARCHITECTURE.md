# Architecture & Design System

The application uses a pure static architecture designed for global delivery on modern edge CDNs (such as Vercel Edge Network or Cloudflare Pages) with zero runtime server dependencies.

---

## 1. System Architecture

```text
Visitor (Browser)
   │
   ├── [1. Initial Page Load] ─────> Vercel Edge CDN (Global Cache)
   │                                   ├── index.html (Semantic HTML5)
   │                                   └── styles/global.css (Paper Design System)
   │
   ├── [2. Client Controller] ─────> scripts/main.js
   │                                   ├── Local Theme Management (localStorage)
   │                                   ├── Command Palette (Ctrl+K Modal)
   │                                   └── Pure-CSS Vector Illustration Engine
   │
   ├── [3. Content Population] ────> resume/resume-data.json
   │                                   ├── Bio, Education & Contact Details
   │                                   ├── Skill Categories (Languages, Web, Tools)
   │                                   └── Featured Project Cards & Case Studies
   │
   └── [4. Contact Interaction] ───> Gmail Web Compose & Clipboard Copy
                                       └── No backend server, DB, or webhook dependencies
```

---

## 2. Directory Structure

```text
resume-site/
├── .github/workflows/ci.yml     # Automated static validation & deployment
├── documentation/               # Concise project documentation
│   ├── ARCHITECTURE.md          # System design & frontend architecture
│   ├── DEPLOYMENT.md            # Vercel CDN & CI/CD deployment guide
│   └── DEVELOPMENT.md           # Local setup, data schema & testing
├── resume/
│   └── resume-data.json         # Canonical resume content (single source of truth)
├── scripts/
│   └── main.js                  # Client controller (themes, palette, dynamic data)
├── styles/
│   └── global.css               # Editorial paper styles, tokens & print CSS
├── 404.html                     # Custom 404 error page (CDN direct delivery)
├── favicon.svg                  # Vector monogram favicon (EPK branding)
├── index.html                   # Main portfolio landing page
├── package.json                 # Project scripts (dev preview & build verification)
├── package-lock.json            # Dependency lockfile
├── README.md                    # Project overview & quick start
└── vercel.json                  # Edge routing, clean URLs & security headers
```

---

## 3. Core Architectural Principles

### A. Zero-Framework Vanilla Stack
- **Native Web Standards:** Built exclusively with semantic HTML5, modern CSS3 (Custom Properties), and vanilla ES6 JavaScript.
- **Performance:** Instant first-paint, 0ms JavaScript hydration delay, 100/100 Lighthouse performance, and zero client-side bundle overhead.

### B. Single-Source Resume Data Model
- All portfolio content (personal summary, degree, technical skills, spoken languages, and project metadata) is stored in [`resume/resume-data.json`](../resume/resume-data.json).
- [`scripts/main.js`](../scripts/main.js) fetches this file on page load and dynamically renders the summary text, education details, skill pills, and project cards.
- Content updates require editing a single JSON file without touching HTML markup or stylesheets.

### C. Pure-CSS Vector Illustrations
- Rather than loading external raster or SVG images, project cards feature mock browser windows and workspace illustrations rendered entirely with CSS.
- Eliminates external image requests, prevents broken image links, avoids hotlinking issues, and guarantees fast rendering.

### D. Direct Accessible Contact
- Replaced traditional backend database forms with direct, client-side contact actions:
  - **Static Email Display:** Displays `prathyush123kumar@gmail.com` as ordinary static text without aggressive mailto hijacking.
  - **Gmail Web Compose:** Opens a prefilled compose tab in Gmail with destination and subject.
  - **Clipboard Copy:** Instant, accessible one-click copy with live screen-reader confirmation (`aria-live="polite"`).
- Eliminates server maintenance, spam filtering burdens, and security vulnerabilities associated with storing user messages in databases.

---

## 4. Design System & Theme Engine

- **Editorial Paper Aesthetic:** Dark navy canvas (`#0c131e`) default with crisp slate borders (`#22344c`), ink typography, and restrained blue accents (`#4a8ee0`), with a switchable light paper mode (`#f8fafc`).
- **Dark Mode:** Supports both system-level `prefers-color-scheme: dark` and explicit manual toggle (`☀️`/`🌙`). Saved preferences persist across sessions in `localStorage`.
- **Print Styles:** Dedicated `@media print` rules format the site as a clean, multi-page paper CV when visitors print or open the official PDF.
- **Command Palette (`Ctrl + K` / `⌘ K`):** Built using the native HTML `<dialog>` element for fast keyboard navigation across sections and quick actions, with platform-adaptive shortcut hints (`⌘ K` on macOS, `Ctrl K` on Windows/Linux) and a neutral mobile search button.
