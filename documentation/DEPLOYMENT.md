# Deployment & CI/CD Guide

The portfolio is hosted as a pure static site on **Vercel's Global Edge Network** with continuous integration via **GitHub Actions**.

---

## 1. Vercel Configuration (`vercel.json`)

Edge configuration is managed via [`vercel.json`](../vercel.json):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "buildCommand": null,
  "outputDirectory": ".",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Key Settings Explained
- **`"framework": null`:** Explicitly instructs Vercel to select **Other** as the Framework Preset. This prevents Vercel's automated scanner from misidentifying the project as Next.js, eliminating serverless function generation and `500 FUNCTION_INVOCATION_FAILED` errors.
- **`"buildCommand": null`:** Tells Vercel that no compilation step is needed; skips `npm run build` during deployment.
- **`"outputDirectory": "."`:** Directs Vercel to publish the repository root directly, resolving and preventing the "Missing public directory" error.
- **`"cleanUrls": true`:** Automatically routes requests without `.html` extensions (e.g. `/404` loads `404.html`).
- **`"headers"`:** Enforces HTTP security headers natively at the edge:
  - `X-Content-Type-Options: nosniff` prevents MIME-type sniffing.
  - `X-Frame-Options: DENY` protects against clickjacking.
  - `Referrer-Policy: strict-origin-when-cross-origin` protects referrer privacy.

---

## 2. Continuous Integration & Deployment (`.github/workflows/ci.yml`)

The repository runs automated quality checks on every push and pull request to `main`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  validate:
    name: Validate Static Portfolio
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Validate JSON Data
        run: node -e "JSON.parse(require('fs').readFileSync('resume/resume-data.json', 'utf8')); console.log('resume-data.json is valid');"
      - name: Validate Static Build
        run: npm run build

  deploy-frontend:
    name: Deploy to Vercel
    needs: validate
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          if [ -z "$VERCEL_TOKEN" ]; then
            echo "::notice ::VERCEL_TOKEN secret is not configured in GitHub repository secrets. Skipping automated Vercel deployment."
            exit 0
          fi
          npx vercel --prod --token="$VERCEL_TOKEN" --yes
```

---

## 3. Deployment Checklist

1. **Vercel Project Settings:**
   - In your Vercel Dashboard, verify under **Settings > General > Build & Development Settings** that **Framework Preset** is set to **Other**.
   - Build Command: Left empty or `npm run build`.
   - Output Directory: `./` (Root directory).
2. **Custom Domain (Optional):**
   - Add your custom domain under **Settings > Domains**.
3. **Automated Deploys:**
   - Pushes to branch `main` automatically deploy to production when connected to the Vercel GitHub App or via GitHub Actions with configured `VERCEL_TOKEN`.
