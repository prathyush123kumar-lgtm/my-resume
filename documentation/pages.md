# Pages

Documentation for the HTML entry points located in `pages/`.

## 1. Portfolio Landing Page (`pages/index.html`)

- **Path:** [`pages/index.html`](../pages/index.html) (routed to `/` in production)
- **Purpose:** Primary single-page portfolio and digital resume.
- **Sections:**
  - **Site Header:** Sticky navigation with `epk.` brand mark, section anchor links, Command Palette trigger (`Ctrl + K`), and Theme toggle.
  - **Hero (`#home`):** Eyebrow kicker, title (*"I build projects as I learn."*), summary bio, action buttons (*Explore projects*, *Print CV*, *Download JSON CV*), live status note, and quick profile card with `EPK` monogram.
  - **About (`#about`):** Focus note card with ongoing skills list and narrative background text.
  - **Projects (`#projects`):** Interactive filter bar and grid of project cards with CSS vector window illustrations.
  - **Background (`#resume`):** Education timeline card and categorized technical skill badge lists.
  - **Contact (`#contact`):** Action banner (email, GitHub, LinkedIn) and integrated interactive message form.
  - **Footer:** Copyright, dynamic year, and back-to-top anchor.
- **Modals:** Native `<dialog id="command-palette">` triggered by `Ctrl + K`.

## 2. 404 Error Page (`pages/404.html`)

- **Path:** [`pages/404.html`](../pages/404.html)
- **Purpose:** Branded error page displayed when users navigate to non-existent routes.
- **Layout:**
  - Unified header with `epk.` branding.
  - Centered error container featuring large 404 indicator, descriptive message, and *Return to Portfolio* navigation button.
  - Shared design tokens from [`styles/global.css`](../styles/global.css) for consistent typography and styling.
