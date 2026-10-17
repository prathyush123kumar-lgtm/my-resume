# E Prathyush Kumar — Personal Portfolio & Resume

A fast, accessible, lightweight personal portfolio and developer resume website built with vanilla web standards and hosted on modern edge CDN infrastructure.

---

## Key Features

- **Authentic Student Developer Aesthetic:** Dark navy canvas (`#0c131e`) with restrained blue accents, refined typography, and switchable light paper mode (`#f8fafc`).
- **Featured Case Study Architecture:** Prominent featured layout for *File Universal* (Python/Flask utility in active development), paired with a supporting project card (*Personal Portfolio*) and clearly distinguished future scope (*Lectures Website*).
- **Single-Source Data Model:** Canonical resume data loaded from [`resume/resume-data.json`](resume/resume-data.json).
- **Realistic UI Previews:** Faithful CSS-rendered application workspace previews without image bloat.
- **Academic Timeline & Categorized Skills:** Clean timeline for B.Tech ISE at St. Aloysius and grouped text skill categories.
- **Command Palette (`Ctrl + K` / `⌘ K`):** Quick keyboard search and section navigation modal built on native `<dialog>` with platform-adaptive shortcut hints and mobile search button.
- **Printable CV & Official PDF:** Dedicated print stylesheet (`@media print`) and direct access to the official resume PDF (`resume/E_Prathyush_Kumar_Resume.pdf`).
- **Accessible Direct Contact:** Static direct email display with Gmail Web Compose action and accessible clipboard copy functionality.

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

