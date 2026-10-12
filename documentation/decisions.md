# Architectural Decisions

Key design choices and architectural rationale for the project.

## 1. Vanilla Web Stack over Frontend Frameworks
- **Decision:** Build the frontend using native HTML5, modern CSS3, and ES6 JavaScript.
- **Rationale:** A portfolio website is primarily content-driven. Frameworks like React or Next.js introduce build complexity, hydrations overhead, and bundle bloat. Vanilla web standards deliver instant rendering, 100/100 Lighthouse performance, and zero dependency maintenance for the frontend.

## 2. SQLite Database with Prisma ORM
- **Decision:** Use an embedded SQLite file (`database/dev.db`) managed via Prisma Client.
- **Rationale:** The application only requires persistent storage for contact form submissions. A full PostgreSQL or MySQL instance adds unnecessary infrastructure costs and configuration complexity. SQLite is zero-configuration and file-based.

## 3. Decoupled Monorepo Architecture
- **Decision:** Host static frontend assets and the Express microservice in the same repository while keeping them decoupled.
- **Rationale:** Enables flexible deployment. In development, Express serves both static files and the API. In production, the frontend can be hosted on a global static edge network (Vercel, Cloudflare Pages), while the backend runs on a stateful Node.js container.

## 4. Single-Source Resume Data File
- **Decision:** Load bio, projects, and skills dynamically from [`resume/resume-data.json`](../resume/resume-data.json).
- **Rationale:** Separates content from UI presentation. Content updates can be made by editing a single JSON file without altering HTML or styling code.

## 5. Pure-CSS Project Vector Illustrations
- **Decision:** Render mock browser and app window previews using pure CSS rather than external placeholder images.
- **Rationale:** Eliminates external network requests, avoids hotlinking privacy concerns, prevents broken image links, and aligns with the editorial paper aesthetic.
