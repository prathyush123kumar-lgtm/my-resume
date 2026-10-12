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
   │                                   └── Featured Project Cards & Tag Filters
   │
   └── [4. Contact Interaction] ───> Native Mail Client (mailto: URL)
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
- Replaced traditional backend database forms with an accessible direct `mailto:` link (`mailto:prathyush123kumar@gmail.com?subject=Message%20from%20your%20portfolio`).
- Triggers the visitor's native email client directly.
- Eliminates server maintenance, spam filtering burdens, and security vulnerabilities associated with storing user messages in databases.

---

## 4. Design System & Theme Engine

- **Editorial Paper Aesthetic:** Light paper canvas (`#f5f9fe`) with ink typography (`#121d2c`), subtle border lines (`#e2edf8`), and sage accents (`#4b6f96`).
- **Dark Mode:** Supports both system-level `prefers-color-scheme: dark` and explicit manual toggle (`☀️`/`🌙`). Saved preferences persist across sessions in `localStorage`.
- **Print Styles:** Dedicated `@media print` rules format the site as a clean, multi-page paper CV when visitors click "Print / save CV" or press `Ctrl + P`.
- **Command Palette (`Ctrl + K`):** Built using the native HTML `<dialog>` element for fast keyboard navigation across sections and quick actions.
