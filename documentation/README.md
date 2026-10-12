# Resume Site Documentation

Central documentation for the **E Prathyush Kumar Personal Portfolio & Resume** project.

## Overview

A fast, accessible, full-stack personal portfolio and resume website. Built with vanilla web standards (HTML5, CSS3, ES6 JavaScript) for optimal performance and an Express.js / SQLite backend for contact form message handling.

## Key Features

- **Editorial Paper Aesthetic:** Clean light paper theme (`#f5f9fe`) with deep slate typography and built-in dark mode toggle.
- **Dynamic Content:** Projects, education, and skills load dynamically from [`resume/resume-data.json`](../resume/resume-data.json).
- **CSS Vector Previews:** Pure CSS illustrative project windows without external binary image dependencies.
- **Interactive Project Filtering:** Filter cards dynamically by tech stack tags (*Python*, *Flask*, *HTML*, *CSS*, *JavaScript*).
- **Command Palette:** Keyboard-driven navigation and search modal via `Ctrl + K`.
- **Printable CV:** Dedicated print stylesheet for clean 1-page/2-page CV printing via `window.print()`.
- **Secure Contact Form:** Express API with rate limiting, input validation, XSS sanitization, and SQLite persistence.

## Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Install Dependencies
```bash
# In the project root
npm install

# In the backend directory
cd backend
npm install
cd ..
```

### 3. Initialize Database
```bash
npx prisma db push --schema=./database/prisma/schema.prisma
```

### 4. Run the Application
```bash
npm run dev
```
The site runs locally at **`http://localhost:3000`** (or the port defined in `backend/.env`).

---

## Documentation Index

| Guide | Description |
|---|---|
| [Setup Guide](setup.md) | Step-by-step local development setup and workflow |
| [Architecture](architecture.md) | System architecture, directory structure, and tech stack |
| [Features](features.md) | UI features, theme engine, command palette, and resume schema |
| [Pages](pages.md) | HTML entry points (`index.html`, `404.html`) and structure |
| [Backend & Database](backend.md) | Express REST API endpoints, middleware, and Prisma SQLite models |
| [Configuration](configuration.md) | Environment variables reference (`.env`) |
| [Security](security.md) | HTTP headers, CORS, rate limiting, and XSS sanitization |
| [Accessibility & SEO](accessibility.md) | Semantic HTML, keyboard controls, ARIA states, and metadata |
| [Deployment](deployment.md) | Hosting static frontend and stateful Node.js backend |
| [Testing](testing.md) | Manual verification procedures and future automated test plans |
| [Troubleshooting](troubleshooting.md) | Solutions for common setup and runtime issues |
| [Decisions](decisions.md) | Architectural and design rationale |
| [Future Plans](future-plans.md) | Prioritized enhancement roadmap |
| [Changelog](changelog.md) | Release history and notable changes |
