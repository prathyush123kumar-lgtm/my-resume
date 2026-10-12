# Accessibility & SEO

Accessibility (a11y) and SEO standards implemented across the application.

## Accessibility (a11y)

### 1. Semantic Structure
- Uses native semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<article>`, `<dialog>`, and `<footer>`.
- Logical heading hierarchy from `<h1>` (hero title) down to `<h2>` (section titles) and `<h3>` (cards and groups).

### 2. Keyboard Navigation
- All interactive elements (links, buttons, filter tags, dialogs) are natively focusable.
- Visible focus rings styled with CSS variable `--line-focus` (`#4b8fe2`).
- Global keyboard shortcut `Ctrl + K` (or `Cmd + K`) opens the Command Palette.
- Esc key or backdrop clicks close the `<dialog>` modal.

### 3. Forms & Live Regions
- All form controls utilize explicit `<label for="...">` associations.
- The submission status message uses `role="status"` for assistive technology announcements.
- Form inputs include standard HTML5 validation attributes (`required`, `type="email"`).

### 4. Motion & Contrast
- **Reduced Motion:** Respects user system preferences via `@media (prefers-reduced-motion: reduce)`, disabling animations and smooth scrolling.
- **Contrast:** Slate ink (`#17202c`) on paper surface (`#f5f9fe`) provides high contrast conforming to WCAG AA guidelines.

---

## SEO Standards

- **Metadata:** Each page includes `<title>`, descriptive `<meta name="description">`, responsive `<meta name="viewport">`, and `<meta name="theme-color">`.
- **Pre-rendered HTML:** The core structure and project cards are defined directly in HTML, ensuring crawlers can parse content without waiting for JavaScript execution.
- **Security on External Links:** All external links include `target="_blank"` and `rel="noopener noreferrer"`.
- **Clean URLs:** Standard page anchor routes (`#home`, `#about`, `#projects`, `#resume`, `#contact`).
