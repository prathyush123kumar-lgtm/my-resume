# Architecture

The application uses a lightweight, decoupled architecture. The static frontend and backend API reside in a single repository while remaining logically separated.

## Architecture Diagram

```text
Browser (Client)
   │
   ├── [Static Request] ──> Express Server (Port 3000 / 4000)
   │                           ├── pages/index.html (Semantic Markup)
   │                           ├── styles/global.css (Tokens & Layout)
   │                           └── scripts/main.js (Frontend Controller)
   │
   ├── [Client Fetch] ────> Static JSON File
   │                           └── resume/resume-data.json
   │
   └── [POST API] ────────> Express REST API (/api/contact)
                               ├── Security Middleware (Helmet, CORS)
                               ├── Rate Limiter (express-rate-limit)
                               ├── Validation & XSS Sanitization
                               └── Prisma ORM
                                      └── SQLite Database (database/dev.db)
```

## Directory Structure

```text
resume-site/
├── backend/            # Express.js server, middleware, routes, and .env
├── database/           # SQLite database (dev.db) and Prisma schema
├── documentation/      # Project documentation suite
├── pages/              # HTML entry points (index.html, 404.html)
├── resume/             # Central resume data source (resume-data.json)
├── scripts/            # Client-side JavaScript (main.js)
├── styles/             # Stylesheet & design tokens (global.css)
├── package.json        # Root scripts and Prisma CLI dependencies
└── vercel.json         # Static deployment configuration
```

## Technology Stack

- **Frontend:** Vanilla HTML5, CSS3 with Custom Properties, ES6 JavaScript. Zero frontend frameworks for instant rendering and minimal bundle footprint.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite with Prisma ORM (v5).
- **Security:** Helmet, CORS, express-rate-limit.

## System Layers

### 1. Frontend Layer
- **`pages/index.html`:** Accessible HTML structure with semantic sections (`#home`, `#about`, `#projects`, `#resume`, `#contact`).
- **`styles/global.css`:** Editorial paper design system, responsive grid layouts, custom CSS vector illustrations, and dark mode tokens.
- **`scripts/main.js`:** Client-side controller for theme toggling, Command Palette (`Ctrl+K`), dynamic JSON fetching, project category filtering, and contact form submission.

### 2. Backend Layer
- **`backend/server.js`:** Lightweight REST API. Handles contact messages, applies rate limits (5 requests / 15 min for contact form), sanitizes inputs, and serves the static frontend during local development.

### 3. Data Layer
- **`resume/resume-data.json`:** Single source of truth for resume bio, projects, skills, and education.
- **`database/dev.db`:** File-based SQLite database accessed via Prisma ORM for storing submitted contact messages.
