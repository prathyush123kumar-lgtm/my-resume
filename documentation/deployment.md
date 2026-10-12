# Deployment

Deployment options for the Resume Site.

## Deployment Options

### Option 1: Unified Full-Stack (Recommended)
Deploy the entire project as a Node.js web service on **Render**, **Railway**, or a VPS.

1. **Build Command:** `npm install && cd backend && npm install && npx prisma db push --schema=../database/prisma/schema.prisma`
2. **Start Command:** `node backend/server.js`
3. **Persistent Disk:** Attach a persistent volume to mount `database/` so `dev.db` persists across restarts.
4. **Environment Variables:**
   - `PORT=3000` (or host-assigned port)
   - `NODE_ENV=production`

### Option 2: Split Hosting
Deploy the frontend to a static edge CDN and the backend to a Node.js server.

#### A. Frontend (Vercel, Netlify, or Cloudflare Pages)
- **Root Directory:** `./`
- **Build Command:** None (pre-built vanilla web assets)
- **Output Directory:** `./`
- Configuration file [`vercel.json`](../vercel.json) routes `/` to `pages/index.html`.

#### B. Backend (Render, Railway, or Fly.io)
- **Directory:** `backend/`
- **Start Command:** `node server.js`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `FRONTEND_ORIGIN=https://your-portfolio-domain.com` (critical for CORS)

#### C. Post-Deploy Update
If frontend and backend are hosted on separate domains, update the `fetch('/api/contact')` endpoint in [`scripts/main.js`](../scripts/main.js) with your live backend URL.

---

## Deployment Checklist

- [ ] Run `npx prisma db push --schema=./database/prisma/schema.prisma` on the server.
- [ ] Set `NODE_ENV=production`.
- [ ] Set `FRONTEND_ORIGIN` to match your production domain.
- [ ] Verify `GET /api/health` returns `{"status":"OK"}`.
- [ ] Test a contact form submission on the live site.
