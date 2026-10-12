# Security

Security safeguards implemented across the frontend and backend.

## 1. HTTP Security Headers
- **Implementation:** `helmet()` middleware in [`backend/server.js`](../backend/server.js).
- **Protections:** Automatically enables secure headers including `X-Content-Type-Options`, `X-Frame-Options` (clickjacking prevention), and strict transport policies.

## 2. Cross-Origin Resource Sharing (CORS)
- **Implementation:** `cors()` middleware in [`backend/server.js`](../backend/server.js).
- **Configuration:** Constrained via the `FRONTEND_ORIGIN` environment variable. In development, defaults to localhost (`http://localhost:3000`, `http://localhost:4000`).

## 3. Rate Limiting
- **Implementation:** `express-rate-limit`.
- **General API Limiter:** 100 requests per 15-minute window for standard API endpoints.
- **Contact Form Limiter:** 5 requests per 15-minute window per IP to prevent spam submissions and abuse.

## 4. Payload Size Limits
- **Implementation:** `express.json({ limit: '10kb' })`.
- **Protections:** Prevents oversized payloads and memory exhaustion attacks.

## 5. Input Validation & Bounds
- **Email Validation:** Checked against an RFC-compliant email regex pattern.
- **Field Length Limits:**
  - `name`: maximum 100 characters
  - `email`: maximum 150 characters
  - `message`: maximum 2,000 characters

## 6. XSS Mitigation (Stored XSS)
- **Implementation:** Input sanitization function converts `<` and `>` into HTML entities (`&lt;` and `&gt;`) before database persistence.

## 7. Bot Protection (Cloudflare Turnstile)
- **Status:** Integrated backend check (`TURNSTILE_SECRET_KEY`).
- **Behavior:** When `TURNSTILE_SECRET_KEY` is present in `.env`, the backend strictly requires and verifies the `cfTurnstileResponse` token. When omitted, development bypass is active.
