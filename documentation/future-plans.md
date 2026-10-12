# Future Plans

Planned improvements and enhancements for future releases.

## High Priority
- **Production API URL Configuration:** Configure dynamic backend URL resolution in [`scripts/main.js`](../scripts/main.js) so the contact form automatically detects whether it is running on localhost or a production domain.
- **Cloudflare Turnstile Enforcement:** Procure production Turnstile site keys to enforce bot prevention on live contact form submissions.

## Medium Priority
- **Text Search in Command Palette:** Add fuzzy text search across projects and skills within the `Ctrl + K` Command Palette.
- **Automated Testing Suite:**
  - Backend unit tests using Jest/Vitest for email regex validation and rate limit thresholds.
  - End-to-end tests using Playwright for theme switching, filter interactions, and form submissions.
- **Open Graph & Social Cards:** Add `og:image`, `og:title`, and `twitter:card` meta tags for rich link previews when sharing on social media.

## Low Priority
- **GitHub API Synchronization:** Optional script to automatically fetch pinned repository stars and descriptions from GitHub to update `resume-data.json`.
- **CI/CD Pipeline:** GitHub Actions workflow to run linting and automated checks upon pushing to the `main` branch.
