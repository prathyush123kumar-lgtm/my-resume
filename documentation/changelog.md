# Changelog

All notable changes to the Resume Site project are documented in this file.

## [1.1.0] - Modern Editorial Paper Redesign

### Added
- **Editorial Paper Aesthetic:** Implemented clean light paper palette (`#f5f9fe`) with dark slate typography and midnight dark mode in [`styles/global.css`](../styles/global.css).
- **CSS Vector Window Illustrations:** Custom pure-CSS illustrations for project cards (*File tools*, *Learning hub*, *Personal site*), removing raster placeholder dependencies.
- **Dynamic Category Filtering:** Dynamic tech-stack filter buttons (*Python*, *Flask*, *HTML*, *CSS*, *JavaScript*) with smooth client-side filtering.
- **Print Optimization:** Print stylesheet configured for the *Print / save CV* action.
- **Consolidated Documentation:** Reorganized and streamlined documentation files into concise, accurate guides.

## [1.0.0] - Initial Full-Stack Release

### Added
- **Frontend Core:** Semantic HTML structure, responsive navigation, and Dark/Light theme toggle.
- **Dynamic Content Loading:** Loaded projects, bio, and skills from [`resume/resume-data.json`](../resume/resume-data.json).
- **Command Palette:** Keyboard-accessible modal menu via `Ctrl + K`.
- **Backend API:** Express.js REST API with `/api/health`, `/api/contact`, and `/api/resume/raw`.
- **Database:** SQLite database integrated with Prisma ORM for contact message persistence.
- **Security:** Rate limiting, Helmet headers, CORS policies, and input sanitization.
- **Custom 404 Page:** Branded error page for broken links.
