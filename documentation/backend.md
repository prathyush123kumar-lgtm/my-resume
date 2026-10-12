# Backend & Database

The backend is an Express.js microservice handling contact form submissions, input validation, and SQLite database storage via Prisma.

## Server Overview

- **Runtime:** Node.js
- **Framework:** Express.js
- **Entry Point:** [`backend/server.js`](../backend/server.js)
- **Default Port:** `3000` (or `PORT` defined in `backend/.env`)

## Middleware Stack

- **`helmet()`:** Sets secure HTTP response headers against clickjacking, sniffing, and XSS.
- **`cors()`:** Restricts cross-origin requests based on `FRONTEND_ORIGIN` (or localhost in dev).
- **`express.json({ limit: '10kb' })`:** Enforces strict payload limits to prevent memory exhaustion attacks.
- **`apiLimiter`:** Global rate limiter restricting general API requests (100 req / 15 min).
- **`contactLimiter`:** Strict rate limiter restricting contact submissions (5 req / 15 min).

## API Endpoints

### 1. Health Check
- **Route:** `GET /api/health`
- **Response:**
  ```json
  { "status": "OK" }
  ```

### 2. Contact Message Submission
- **Route:** `POST /api/contact`
- **Rate Limit:** 5 requests per 15 minutes per IP
- **Request Body:**
  ```json
  {
    "name": "Alex Smith",
    "email": "alex@example.com",
    "message": "Hello!",
    "cfTurnstileResponse": "optional-token"
  }
  ```
- **Validation & Sanitization:**
  - Requires `name`, `email`, and `message`.
  - Validates email format using regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - Enforces length limits (`name` ≤ 100, `email` ≤ 150, `message` ≤ 2000 chars).
  - Escapes `<` and `>` into HTML entities (`&lt;`, `&gt;`) to protect against stored XSS.
- **Responses:**
  - `201 Created`: `{ "success": true, "id": 1 }`
  - `400 Bad Request`: `{ "error": "Missing fields" | "Invalid email format" | "Input too long" }`
  - `429 Too Many Requests`: `{ "error": "Too many contact requests. Please try again later." }`

### 3. Raw Resume Data
- **Route:** `GET /api/resume/raw`
- **Response:** Returns the contents of [`resume/resume-data.json`](../resume/resume-data.json).

---

## Database (SQLite & Prisma)

- **Database Engine:** SQLite
- **File Location:** `database/dev.db`
- **ORM:** Prisma Client (`@prisma/client`)
- **Schema File:** [`database/prisma/schema.prisma`](../database/prisma/schema.prisma)

### Prisma Schema Models

```prisma
model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model Project {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  techStack   String
  githubUrl   String?
  liveUrl     String?
}
```

### Schema Sync Command

To update the database when modifying `schema.prisma`:
```bash
npx prisma db push --schema=./database/prisma/schema.prisma
```
