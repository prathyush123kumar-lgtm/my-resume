# Testing

Testing procedures and future automation roadmap.

## Current Testing Status

There are currently no automated unit or end-to-end test suites (e.g. Jest, Playwright) configured. Verification is conducted manually.

## Manual Testing Checklist

| Test Area | Procedure | Expected Result |
|---|---|---|
| **Theme Toggle** | Click the sun/moon button in the header | Toggles `data-theme` between `light` and `dark`; state persists after reload |
| **Command Palette** | Press `Ctrl + K` or click the search button | Opens modal dialog; typing filters list; clicking an action navigates and closes |
| **Project Filtering** | Click a technology pill (*Python*, *Flask*, etc.) | Filters project cards to matching items; clicking *All* restores all cards |
| **Contact Submission** | Fill out and submit the contact form | Displays green success message; inserts record into `database/dev.db` |
| **Input Validation** | Submit with an invalid email or missing fields | Displays red error message without submitting to database |
| **Rate Limiter** | Submit the contact form 6 times consecutively | Returns `429 Too Many Requests` error message |
| **Print Layout** | Click *Print / save CV* or press `Ctrl + P` | Displays clean print view hiding nav, buttons, and form inputs |
| **404 Page** | Open `pages/404.html` | Renders branded 404 page with *Return to Portfolio* action |

## Automated Testing Roadmap (Future)

- **Backend Unit Tests:** Use `Jest` or `Vitest` with `supertest` to validate `/api/contact` email regex, character bounds, and rate limits against an in-memory SQLite database.
- **Frontend E2E Tests:** Use `Playwright` to test theme persistence, keyboard navigation (`Ctrl + K`), dynamic card rendering, and form submission flows.
