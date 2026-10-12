# Configuration

The application is configured using environment variables stored in `backend/.env`.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | Optional | `3000` | The port the Express server listens on. |
| `NODE_ENV` | Optional | `development` | Set to `production` in live environments. |
| `FRONTEND_ORIGIN` | Optional | `localhost` | Comma-separated list of allowed CORS origins (e.g., `https://myportfolio.com`). |
| `TURNSTILE_SECRET_KEY` | Optional | *(None)* | Cloudflare Turnstile secret key. When unset, CAPTCHA validation is bypassed for local development. |

## Example Configuration

Located in `backend/.env.example`:

```env
PORT=3000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000
TURNSTILE_SECRET_KEY=
```

## Database Connection

Prisma's SQLite database connection is defined in `database/.env`:

```env
DATABASE_URL="file:../dev.db"
```

> [!WARNING]
> Never commit `.env` files containing production secrets to version control. Both `backend/.env` and `database/dev.db` are excluded in `.gitignore`.
