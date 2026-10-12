# Features & UI Components

A breakdown of implemented features, UI components, and the resume data schema.

## Implemented Features

### 1. Dynamic Resume & Project Rendering
- **Data Source:** [`resume/resume-data.json`](../resume/resume-data.json)
- **Controller:** [`scripts/main.js`](../scripts/main.js)
- **Mechanism:** On page load, client-side JavaScript reads the JSON data and dynamically renders project cards, tech tags, education details, and grouped skills pills.

### 2. Light & Dark Theme Engine
- **Implementation:** Native CSS custom properties in [`styles/global.css`](../styles/global.css) and `localStorage` state in [`scripts/main.js`](../scripts/main.js).
- **Default:** Clean Light Paper palette (`#f5f9fe`).
- **Toggle:** Clicking the sun/moon icon toggles `data-theme="dark"` on `<html>` and updates the icon.

### 3. Pure-CSS Project Vector Illustrations
Instead of heavy external images or placeholder files, each project card renders a stylized pure-CSS window mockup:
- **File Tools:** Mini editor window with document rows and a *File tools* pill (used for Document Conversion app).
- **Learning Hub:** Angled layout with sidebar navigation, banner, and cards (used for Lectures Website).
- **Personal Site:** Mini portfolio mockup with header mark and hero grid (used for Resume Website).

### 4. Interactive Project Filtering
- Generates filter buttons dynamically from the unique `techStack` tags found in [`resume/resume-data.json`](../resume/resume-data.json).
- Clicking a category (*Python*, *Flask*, *HTML*, *CSS*, *JavaScript*) filters cards with instant feedback; clicking *All* resets the view.

### 5. Command Palette (`Ctrl + K`)
- Built using the native HTML `<dialog id="command-palette">` element.
- Triggered by pressing `Ctrl + K` (or `Cmd + K`) or clicking the search button in the navigation header.
- Filters commands in real-time to jump to sections, toggle themes, print the CV, or open GitHub.

### 6. Education & Skills Panels
- **Education:** Structured timeline card highlighting university, degree, and semester.
- **Skills:** Grouped badge lists categorized into *Programming Languages*, *Web & Frameworks*, *Tools & Platforms*, and *Spoken Languages*.

### 7. Interactive Contact Form
- Collects name, email, and message.
- Submits asynchronously to `POST /api/contact` with immediate UI status feedback (sending, success, error) and form reset on completion.

### 8. Print CV Support
- The *Print / save CV* button invokes `window.print()`.
- A dedicated `@media print` stylesheet strips navigation, action buttons, and form inputs for a pristine printed resume.

---

## Resume Data Schema

[`resume/resume-data.json`](../resume/resume-data.json) structure:

```json
{
  "name": "E Prathyush Kumar",
  "email": "prathyush123kumar@gmail.com",
  "github": "https://github.com/prathyush123kumar-lgtm",
  "education": {
    "degree": "B.Tech Information Science and Engineering",
    "institution": "St. Aloysius (Deemed to be University), Mangaluru",
    "year": "2nd Year, 3rd Semester"
  },
  "summary": "Short bio paragraph...",
  "projects": [
    {
      "title": "Document Conversion Web App",
      "description": "App description...",
      "techStack": ["Python", "Flask", "HTML", "CSS"],
      "link": "https://github.com/..."
    }
  ],
  "skills": {
    "languages": ["Python", "C", "Java"],
    "web": ["HTML", "CSS", "Flask", "Node.js", "Express"],
    "tools": ["Git", "GitHub"]
  },
  "spoken_languages": ["English", "Hindi", "Kannada", "Malayalam"],
  "hackathon_interest": "Areas of interest..."
}
```
