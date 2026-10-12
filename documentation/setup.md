# Setup Guide

Local development setup instructions for the Resume Website project.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git** (optional, for version control)

## 1. Install Dependencies

Install dependencies in the root project directory and the `backend/` folder:

```bash
# Root directory dependencies (Prisma CLI)
npm install

# Backend dependencies (Express, Helmet, CORS, Prisma Client, etc.)
cd backend
npm install
cd ..
```

## 2. Configure Environment

Copy the example environment configuration into `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Default configuration in `backend/.env`:
```env
PORT=3000
NODE_ENV=development
```

## 3. Initialize the SQLite Database

Generate the Prisma Client and synchronize the schema to create `database/dev.db`:

```bash
npx prisma db push --schema=./database/prisma/schema.prisma
```

## 4. Run the Dev Server

From the root project directory, start the development server:

```bash
npm run dev
```

The Express server serves both the static frontend and the API at:
- **Frontend:** [http://localhost:3000/](http://localhost:3000/) (or `/pages/index.html`)
- **API Health:** [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Resume Data:** [http://localhost:3000/api/resume/raw](http://localhost:3000/api/resume/raw)

## 5. Development Workflows

- **Update Resume Content:** Edit [`resume/resume-data.json`](../resume/resume-data.json) and refresh the browser. The frontend updates dynamically.
- **Modify Styles:** Edit [`styles/global.css`](../styles/global.css). CSS custom properties control both Light and Dark themes.
- **Update Database Schema:** Edit [`database/prisma/schema.prisma`](../database/prisma/schema.prisma), then re-run `npx prisma db push --schema=./database/prisma/schema.prisma`.
