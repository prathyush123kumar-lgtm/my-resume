# E Prathyush Kumar — Personal Portfolio & Resume

A fast, accessible, lightweight personal portfolio and developer resume website built with vanilla web standards and hosted on modern edge CDN infrastructure.

---

## Key Features

- **Editorial Paper Aesthetic:** Soft light paper canvas (`#f5f9fe`) with deep slate typography and built-in dark mode toggle.
- **Single-Source Data Model:** Projects, skills, education, and bio load dynamically from [`resume/resume-data.json`](resume/resume-data.json).
- **Pure-CSS Window Illustrations:** Interactive, illustrative project mockups rendered entirely in CSS without external image bloat.
- **Interactive Project Filtering:** Instant category filter pills (*Python*, *Flask*, *HTML*, *CSS*, *JavaScript*).
- **Command Palette (`Ctrl + K`):** Fast keyboard-driven section search and navigation modal via native `<dialog>`.
- **Printable CV:** Dedicated print stylesheet (`@media print`) formatting the site as a clean, multi-page paper CV.
- **Accessible Direct Contact:** Clean `mailto:` direct contact link opening the visitor's native email client without database overhead.

---

## Quick Start

### 1. Run Local Development Server
```bash
# Clone the repository
git clone https://github.com/prathyush123kumar-lgtm/my-resume.git
cd resume-site

# Start the local static preview
npm run dev
```

The site will be live at [http://localhost:3000/](http://localhost:3000/).

---

## Documentation

Comprehensive project documentation is organized in the [`documentation/`](documentation/) directory:

- [**Architecture & Design System**](documentation/ARCHITECTURE.md) — System design, frontend structure, CSS tokens, and data flow.
- [**Deployment & CI/CD**](documentation/DEPLOYMENT.md) — Vercel edge configuration, HTTP security headers, and GitHub Actions workflow.
- [**Development & Testing**](documentation/DEVELOPMENT.md) — Local scripts, updating resume content, and verification procedures.

