# Local Development & Testing Guide

Instructions for running, modifying, and testing the resume portfolio locally.

---

## 1. Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Local Preview
```bash
# Clone the repository
git clone https://github.com/prathyush123kumar-lgtm/my-resume.git
cd resume-site

# Run the local static dev server
npm run dev
```

The site will be live locally at **`http://localhost:3000`**.

---

## 2. Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts a zero-configuration local static web server on port 3000 (`npx serve . -l 3000`). |
| `npm start` | Alias for `npm run dev`. |
| `npm run build` | Validates static assets and returns exit code 0. |

---

## 3. Updating Content (`resume/resume-data.json`)

To update any text, education, skills, or projects, edit [`resume/resume-data.json`](../resume/resume-data.json):

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
  "summary": "...",
  "projects": [
    {
      "title": "File Universal — Document Utility",
      "description": "...",
      "techStack": ["Python", "Flask", "HTML", "CSS"],
      "link": "https://github.com/prathyush123kumar-lgtm"
    }
  ],
  "skills": {
    "languages": ["Python", "C", "Java"],
    "web": ["HTML", "CSS", "Flask", "Node.js", "Express"],
    "tools": ["Git", "GitHub"]
  },
  "spoken_languages": ["English", "Hindi", "Kannada", "Malayalam"],
  "hackathon_interest": "..."
}
```

The UI will automatically update on the next page refresh.

---

## 4. Verification & Testing Checklist

- [ ] **Homepage & Layout:** Load `http://localhost:3000` and verify that all sections (`#home`, `#about`, `#projects`, `#education`, `#skills`, `#contact`) render properly.
- [ ] **Theme Toggle:** Click the theme button (`☀️`/`🌙`) to toggle dark mode; refresh the page and confirm preference persists.
- [ ] **Command Palette:** Press `Ctrl + K` (or `⌘ K` on macOS) or click the search icon; verify dialog opens, filters commands, and navigates correctly.
- [ ] **Official PDF & Print Styles:** Click "Print / Open CV" or "Download CV" to verify delivery of `resume/E_Prathyush_Kumar_Resume.pdf`, and test `@media print` CV preview.
- [ ] **Contact Actions:** Verify "Compose Email" opens Gmail with prefilled recipient and subject; test "Copy email address" and verify accessible confirmation.
- [ ] **404 Page:** Navigate to `http://localhost:3000/non-existent-page` and verify the custom branded 404 page loads.
- [ ] **Resume Data JSON:** Access `http://localhost:3000/resume/resume-data.json` and verify valid JSON data loads cleanly.
