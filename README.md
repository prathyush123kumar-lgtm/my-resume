# E Prathyush Kumar — Personal Portfolio & Resume

A fast, accessible, full-stack personal portfolio and resume website built with vanilla web standards and an Express.js / SQLite backend.

## Key Features

- **Editorial Paper Aesthetic:** Soft light paper palette (`#f5f9fe`) with deep slate typography and dark mode toggle.
- **Dynamic Content:** Projects, skills, and bio load dynamically from [`resume/resume-data.json`](resume/resume-data.json).
- **CSS Vector Window Illustrations:** Pure CSS mockups for project cards without external image assets.
- **Project Filtering:** Dynamic category filter pills (*Python*, *Flask*, *HTML*, *CSS*, *JavaScript*).
- **Command Palette:** Keyboard navigation and command menu via `Ctrl + K`.
- **Printable CV:** Dedicated print stylesheet for clean CV exports via `window.print()`.
- **Contact Form API:** Express backend with rate limiting, input validation, and SQLite persistence.

## Quick Start

### 1. Install Dependencies
```bash
# Root Prisma CLI dependencies
npm install

# Backend Express dependencies
cd backend
npm install
cd ..
```

### 2. Initialize Database
```bash
npx prisma db push --schema=./database/prisma/schema.prisma
```

### 3. Run Development Server
```bash
npm run dev
```

The site will be available at [http://localhost:3000/](http://localhost:3000/).

## Documentation

Full documentation is available in the [`documentation/`](documentation/README.md) directory:

- [Setup Guide](documentation/setup.md)
- [Architecture & Tech Stack](documentation/architecture.md)
- [Features & Components](documentation/features.md)
- [Pages Overview](documentation/pages.md)
- [Backend API & Database](documentation/backend.md)
- [Configuration (.env)](documentation/configuration.md)
- [Security](documentation/security.md)
- [Accessibility & SEO](documentation/accessibility.md)
- [Deployment](documentation/deployment.md)
- [Testing Guide](documentation/testing.md)
- [Troubleshooting](documentation/troubleshooting.md)
- [Design Decisions](documentation/decisions.md)
- [Future Plans](documentation/future-plans.md)
- [Changelog](documentation/changelog.md)
