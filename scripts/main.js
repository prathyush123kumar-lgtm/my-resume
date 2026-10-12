document.addEventListener('DOMContentLoaded', () => {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // Theme Toggle Logic
  // =========================================================================
  const themeBtn = document.getElementById('themeBtn');
  
  const updateThemeUI = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector('.theme-icon');
      const label = themeBtn.querySelector('.theme-label');
      if (icon) {
        // Show moon in light mode (to indicate clicking will switch to dark)
        // Show sun in dark mode (to indicate clicking will switch to light)
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
      if (label) {
        label.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
    }
  };

  // Default to light (as designed in user's mockup), unless previously set
  const savedTheme = localStorage.getItem('theme') || 'light';
  updateThemeUI(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
    });
  }

  // =========================================================================
  // Command Palette Logic (Ctrl + K)
  // =========================================================================
  const palette = document.getElementById('command-palette');
  const search = document.getElementById('palette-search');
  const results = document.getElementById('palette-results');
  const paletteOpenBtn = document.getElementById('paletteOpenBtn');
  
  const openPalette = () => {
    if (palette && !palette.open) {
      palette.showModal();
      if (search) {
        search.value = '';
        search.focus();
        renderPaletteCommands('');
      }
    }
  };

  if (paletteOpenBtn) {
    paletteOpenBtn.addEventListener('click', openPalette);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openPalette();
    }
  });

  if (palette) {
    palette.addEventListener('click', (e) => {
      if (e.target === palette) palette.close();
    });
  }

  const commands = [
    { name: 'Go to About section', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Featured Projects', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Education & Background', action: () => { document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Contact / Send Message', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Toggle Dark / Light Theme', action: () => { themeBtn && themeBtn.click(); palette?.close(); } },
    { name: 'Print / Save Resume as CV', action: () => { palette?.close(); window.print(); } },
    { name: 'Download Resume JSON Data', action: () => { window.open('/resume/resume-data.json', '_blank'); palette?.close(); } },
    { name: 'View GitHub Profile', action: () => { window.open('https://github.com/prathyush123kumar-lgtm', '_blank'); palette?.close(); } },
  ];

  const renderPaletteCommands = (query) => {
    if (!results) return;
    results.innerHTML = '';
    const q = query.toLowerCase().trim();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(q));
    
    if (filtered.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.style.color = 'var(--muted)';
      emptyLi.textContent = 'No matching commands found';
      results.appendChild(emptyLi);
      return;
    }

    filtered.forEach(cmd => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${cmd.name}</span><span style="font-size:0.75rem; color:var(--muted)">↵</span>`;
      li.addEventListener('click', cmd.action);
      results.appendChild(li);
    });
  };

  if (search) {
    search.addEventListener('input', (e) => {
      renderPaletteCommands(e.target.value);
    });
  }

  // =========================================================================
  // Project Illustrative Visual Helpers
  // =========================================================================
  const getProjectVisualHtml = (title, techStack) => {
    const t = title.toLowerCase();
    
    // 1. Document Conversion Web App Illustration
    if (t.includes('document') || t.includes('convert') || t.includes('word') || t.includes('pdf') || t.includes('universal')) {
      return `
        <div class="project-visual">
          <div class="mini-window" aria-hidden="true">
            <div class="window-bar"><i></i><i></i><i></i></div>
            <div class="mock-doc-row">
              <span class="mock-file"></span>
              <div style="flex:1">
                <div class="mock-line"></div>
                <div class="mock-line short" style="margin-top:6px"></div>
              </div>
            </div>
            <div class="mock-doc-row">
              <span class="mock-file"></span>
              <div style="flex:1">
                <div class="mock-line" style="width:48%"></div>
                <div class="mock-line short" style="margin-top:6px"></div>
              </div>
            </div>
          </div>
          <span class="visual-label">File tools</span>
        </div>
      `;
    }

    // 2. Lectures Website Illustration
    if (t.includes('lecture') || t.includes('learn') || t.includes('student') || t.includes('resource')) {
      return `
        <div class="project-visual visual-blue">
          <div class="lecture-layout" aria-hidden="true">
            <div class="lecture-side"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="lecture-main">
              <div class="lecture-banner"></div>
              <div class="lecture-cards"><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <span class="visual-label">Learning hub</span>
        </div>
      `;
    }

    // 3. Personal Resume Website Illustration
    if (t.includes('resume') || t.includes('portfolio') || t.includes('personal')) {
      return `
        <div class="project-visual visual-sand">
          <div class="portfolio-layout" aria-hidden="true">
            <div class="portfolio-top">
              <span class="portfolio-mark">epk.</span>
              <span class="portfolio-nav"></span>
            </div>
            <div class="portfolio-hero">
              <i></i><i></i>
            </div>
            <div class="portfolio-bottom">
              <i></i><i></i><i></i>
            </div>
          </div>
          <span class="visual-label">Personal site</span>
        </div>
      `;
    }

    // Fallback Code Workspace Visual
    return `
      <div class="project-visual">
        <div class="mini-window" aria-hidden="true">
          <div class="window-bar"><i></i><i></i><i></i></div>
          <div class="mock-line" style="width:75%; margin-bottom:8px"></div>
          <div class="mock-line" style="width:50%; margin-bottom:8px"></div>
          <div class="mock-line" style="width:85%"></div>
        </div>
        <span class="visual-label">Software</span>
      </div>
    `;
  };

  const getProjectKicker = (title, techStack) => {
    const t = title.toLowerCase();
    if (t.includes('document') || t.includes('universal')) return 'Python · Flask';
    if (t.includes('lecture')) return 'Student resource';
    if (t.includes('resume')) return 'Personal website';
    return techStack ? techStack.slice(0, 2).join(' · ') : 'Web Project';
  };

  // =========================================================================
  // Load Resume & Projects Data Dynamically
  // =========================================================================
  const resumeJsonUrl = 'resume/resume-data.json';
  fetch(resumeJsonUrl)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch resume-data.json');
      return res.json();
    })
    .then(data => {
      // 1. Populate Summary Text if present
      const summaryEl = document.getElementById('summary-text');
      if (summaryEl && data.summary) {
        summaryEl.innerHTML = `Hi, I’m <strong>${data.name}</strong>, a B.Tech Information Science student at St. Aloysius. ${data.summary}`;
      }

      // 2. Populate Education Card
      if (data.education) {
        const eduDegree = document.getElementById('edu-degree');
        const eduInst = document.getElementById('edu-institution');
        const eduYear = document.getElementById('edu-year');
        if (eduDegree && data.education.degree) eduDegree.textContent = data.education.degree;
        if (eduInst && data.education.institution) eduInst.textContent = data.education.institution;
        if (eduYear && data.education.year) eduYear.textContent = data.education.year;
      }

      // 3. Populate Skills Lists
      if (data.skills) {
        const populateSkillPills = (containerId, items) => {
          const el = document.getElementById(containerId);
          if (el && Array.isArray(items)) {
            el.innerHTML = items.map(item => `<span class="skill">${item}</span>`).join('');
          }
        };

        populateSkillPills('skills-lang-list', data.skills.languages);
        populateSkillPills('skills-web-list', data.skills.web);
        populateSkillPills('skills-tools-list', data.skills.tools);
        populateSkillPills('skills-spoken-list', data.spoken_languages);
      }

      // 4. Render Projects & Filter Bar
      const projectsContainer = document.getElementById('projects-container');
      const filtersContainer = document.getElementById('project-filters');

      if (projectsContainer && data.projects && Array.isArray(data.projects)) {
        const allTechTags = new Set();
        data.projects.forEach(p => {
          if (Array.isArray(p.techStack)) {
            p.techStack.forEach(t => allTechTags.add(t));
          }
        });

        const renderProjects = (activeFilter) => {
          projectsContainer.innerHTML = '';
          const filteredProjects = activeFilter === 'All'
            ? data.projects
            : data.projects.filter(p => p.techStack && p.techStack.includes(activeFilter));

          filteredProjects.forEach(project => {
            const article = document.createElement('article');
            article.className = 'project';
            article.setAttribute('data-tech', (project.techStack || []).join(' '));

            const visualHtml = getProjectVisualHtml(project.title, project.techStack);
            const kicker = getProjectKicker(project.title, project.techStack);
            const tagsHtml = (project.techStack || [])
              .map(t => `<span class="tag">${t}</span>`)
              .join('');
            
            const linkHref = project.link && project.link !== '#' ? project.link : '#contact';
            const linkTarget = linkHref.startsWith('http') ? 'target="_blank" rel="noopener"' : '';
            const linkText = linkHref.startsWith('http') ? 'View project repo ↗' : 'Ask me about this project ↗';

            article.innerHTML = `
              ${visualHtml}
              <div class="project-body">
                <div class="project-index">${kicker}</div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                  ${tagsHtml}
                </div>
                <a class="project-link" href="${linkHref}" ${linkTarget}>
                  ${linkText}
                </a>
              </div>
            `;

            projectsContainer.appendChild(article);
          });
        };

        // Render Filter Buttons
        if (filtersContainer) {
          filtersContainer.innerHTML = '';
          const tagsList = ['All', ...Array.from(allTechTags).sort()];

          tagsList.forEach(tag => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            if (tag === 'All') btn.classList.add('active');
            btn.textContent = tag;

            btn.addEventListener('click', () => {
              filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              renderProjects(tag);
            });

            filtersContainer.appendChild(btn);
          });
        }

        // Initial render with All
        renderProjects('All');
      }
    })
    .catch(err => {
      console.warn('Notice: Loaded static DOM fallback; remote JSON fetch notice:', err.message);
    });

  // Contact section now uses accessible direct mailto: link (no form submit handler needed)
});

