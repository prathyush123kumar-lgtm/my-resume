document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 2. Theme Toggle (Dark Navy Default with Refined Light Canvas)
  // =========================================================================
  const themeBtn = document.getElementById('themeBtn');

  const updateThemeUI = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector('.theme-icon');
      const label = themeBtn.querySelector('.theme-label');
      if (icon) {
        // In dark mode: show sun to switch to light
        // In light mode: show moon to switch to dark
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
      if (label) {
        label.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
      themeBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    // Update theme-color meta tag for browser address bar
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0c131e' : '#f8fafc');
    }
  };

  // Default to dark navy theme per user design requirement
  const savedTheme = localStorage.getItem('theme') || 'dark';
  updateThemeUI(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
    });
  }

  // =========================================================================
  // 3. Command Palette Logic (Ctrl + K / Cmd + K)
  // =========================================================================
  const palette = document.getElementById('command-palette');
  const search = document.getElementById('palette-search');
  const results = document.getElementById('palette-results');
  const paletteOpenBtn = document.getElementById('paletteOpenBtn');

  // Platform-adaptive shortcut hint (macOS: ⌘ K, Windows/Linux: Ctrl K)
  const isMac = typeof navigator !== 'undefined' && /Mac|iP(hone|od|ad)/i.test(navigator.platform || navigator.userAgent);
  if (paletteOpenBtn) {
    const shortcutKbd = paletteOpenBtn.querySelector('.palette-shortcut');
    if (shortcutKbd) {
      shortcutKbd.textContent = isMac ? '⌘ K' : 'Ctrl K';
    }
    paletteOpenBtn.title = isMac ? 'Command Search (⌘K)' : 'Command Search (Ctrl+K)';
  }

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
    { name: 'View Project: File Universal (In Progress)', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'View Project: Personal Resume Website', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'View Concept: Lectures Website (Future Scope)', action: () => { document.getElementById('future-scope')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Academic Education', action: () => { document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Technical Skills', action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Go to Contact / Direct Email', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); palette?.close(); } },
    { name: 'Compose Email via Gmail (new tab)', action: () => { window.open('https://mail.google.com/mail/?view=cm&fs=1&to=prathyush123kumar@gmail.com&su=Contact%20from%20Portfolio', '_blank'); palette?.close(); } },
    { name: 'Copy Email Address (prathyush123kumar@gmail.com)', action: () => { document.getElementById('copyEmailBtn')?.click(); palette?.close(); } },
    { name: 'Toggle Dark / Light Theme', action: () => { themeBtn && themeBtn.click(); palette?.close(); } },
    { name: 'Print / Open CV (PDF in new tab)', action: () => { window.open('resume/E_Prathyush_Kumar_Resume.pdf', '_blank'); palette?.close(); } },
    { name: 'Download CV (PDF)', action: () => { const a = document.createElement('a'); a.href = 'resume/E_Prathyush_Kumar_Resume.pdf'; a.download = 'E_Prathyush_Kumar_Resume.pdf'; a.click(); palette?.close(); } },
    { name: 'Download Resume JSON Data', action: () => { window.open('resume/resume-data.json', '_blank'); palette?.close(); } },
    { name: 'View GitHub Profile', action: () => { window.open('https://github.com/prathyush123kumar-lgtm', '_blank'); palette?.close(); } },
    { name: 'View LinkedIn Profile', action: () => { window.open('https://www.linkedin.com/in/e-prathyush-kumar', '_blank'); palette?.close(); } },
  ];

  let activeCommandIndex = 0;
  let currentFilteredCommands = [];

  const updateActiveCommand = (index) => {
    if (!results) return;
    const items = results.querySelectorAll('li:not(.palette-empty)');
    if (items.length === 0) return;
    activeCommandIndex = (index + items.length) % items.length;
    items.forEach((item, i) => {
      const isSelected = i === activeCommandIndex;
      item.classList.toggle('active', isSelected);
      item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      if (isSelected) item.scrollIntoView({ block: 'nearest' });
    });
  };

  const renderPaletteCommands = (query) => {
    if (!results) return;
    results.innerHTML = '';
    const q = query.toLowerCase().trim();
    currentFilteredCommands = commands.filter(c => c.name.toLowerCase().includes(q));
    activeCommandIndex = 0;

    if (currentFilteredCommands.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'palette-empty';
      emptyLi.setAttribute('role', 'status');
      emptyLi.textContent = 'No matching commands found';
      results.appendChild(emptyLi);
      return;
    }

    currentFilteredCommands.forEach((cmd, idx) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '-1');
      li.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      if (idx === 0) li.classList.add('active');
      li.innerHTML = `<span>${cmd.name}</span><kbd aria-hidden="true">↵</kbd>`;
      li.addEventListener('click', cmd.action);
      li.addEventListener('mouseenter', () => updateActiveCommand(idx));
      results.appendChild(li);
    });
  };

  if (search) {
    search.addEventListener('input', (e) => {
      renderPaletteCommands(e.target.value);
    });

    search.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateActiveCommand(activeCommandIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateActiveCommand(activeCommandIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFilteredCommands[activeCommandIndex]) {
          currentFilteredCommands[activeCommandIndex].action();
        }
      } else if (e.key === 'Escape') {
        palette?.close();
      }
    });
  }

  // =========================================================================
  // 4. Project Filtering Functionality
  // =========================================================================
  const filtersContainer = document.getElementById('project-filters');
  const featuredCard = document.querySelector('.featured-project-card');
  const supportingCards = document.querySelectorAll('.supporting-project-card');
  const supportingGrid = document.querySelector('.supporting-projects-grid');
  let currentActiveTag = 'All';

  const filterProjects = (activeFilter) => {
    currentActiveTag = activeFilter;
    let visibleCount = 0;

    // Filter featured card
    if (featuredCard) {
      const tech = featuredCard.getAttribute('data-tech') || '';
      const matches = activeFilter === 'All' || tech.split(' ').includes(activeFilter);
      featuredCard.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    }

    // Filter supporting cards
    let supportingVisible = 0;
    supportingCards.forEach(card => {
      const tech = card.getAttribute('data-tech') || '';
      const matches = activeFilter === 'All' || tech.split(' ').includes(activeFilter);
      card.style.display = matches ? 'flex' : 'none';
      if (matches) {
        supportingVisible++;
        visibleCount++;
      }
    });

    if (supportingGrid) {
      supportingGrid.style.display = supportingVisible > 0 ? 'grid' : 'none';
    }

    // Toggle future scope section visibility (visible on All)
    const futureScopeSection = document.getElementById('future-scope');
    if (futureScopeSection) {
      futureScopeSection.style.display = activeFilter === 'All' ? 'block' : 'none';
    }

    // Handle empty state
    let emptyNotice = document.getElementById('project-empty-notice');
    if (visibleCount === 0) {
      if (!emptyNotice) {
        emptyNotice = document.createElement('div');
        emptyNotice.id = 'project-empty-notice';
        emptyNotice.className = 'project-empty-state';
        emptyNotice.innerHTML = `No projects currently tagged with "<strong>${activeFilter}</strong>".`;
        const container = document.getElementById('projects-container');
        if (container) container.appendChild(emptyNotice);
      } else {
        emptyNotice.innerHTML = `No projects currently tagged with "<strong>${activeFilter}</strong>".`;
        emptyNotice.style.display = 'block';
      }
    } else if (emptyNotice) {
      emptyNotice.style.display = 'none';
    }
  };

  // Initialize filter buttons while preserving active filter state
  const initFilterButtons = (techList) => {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = '';
    const uniqueTags = ['All', ...techList];

    // If current tag is no longer in list, default to All
    if (!uniqueTags.includes(currentActiveTag)) {
      currentActiveTag = 'All';
    }

    uniqueTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn';
      if (tag === currentActiveTag) btn.classList.add('active');
      btn.textContent = tag;

      btn.addEventListener('click', () => {
        filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(tag);
      });

      filtersContainer.appendChild(btn);
    });
  };

  // Default filters based on project tags
  const initialTechTags = ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Node.js'];
  initFilterButtons(initialTechTags);

  // =========================================================================
  // 5. Dynamic Data Verification with resume-data.json
  // =========================================================================
  fetch('resume/resume-data.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response not ok');
      return res.json();
    })
    .then(data => {
      // Collect all verified tags from json without clobbering active selection
      if (data.projects && Array.isArray(data.projects)) {
        const set = new Set();
        data.projects.forEach(p => {
          if (Array.isArray(p.techStack)) {
            p.techStack.forEach(t => set.add(t));
          }
        });
        initFilterButtons(Array.from(set).sort());
      }
    })
    .catch(err => {
      console.info('Static content loaded; json background check:', err.message);
    });

  // =========================================================================
  // 6. Continuous Scroll-Driven Active Navigation Underline
  // =========================================================================
  const navContainer = document.querySelector('.nav-links');
  let navIndicator = document.querySelector('.nav-indicator');

  if (navContainer && !navIndicator) {
    navIndicator = document.createElement('span');
    navIndicator.className = 'nav-indicator';
    navIndicator.setAttribute('aria-hidden', 'true');
    navContainer.appendChild(navIndicator);
  }

  const sectionIds = ['about', 'projects', 'education', 'skills', 'contact'];
  let sectionData = [];
  let currentNearestId = null;

  const measureSectionsAndLinks = () => {
    if (!navContainer) return;
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 68;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    sectionData = sectionIds.map((id, index) => {
      const el = document.getElementById(id);
      const link = navContainer.querySelector(`a[href="#${id}"]`);
      if (!el || !link) return null;

      let targetScroll;
      if (index === sectionIds.length - 1) {
        // Last section (Contact): use bottom of page so underline arrives smoothly as you reach bottom
        targetScroll = maxScroll;
      } else {
        const rect = el.getBoundingClientRect();
        targetScroll = Math.max(0, rect.top + window.scrollY - headerHeight);
      }

      return {
        id,
        el,
        link,
        targetScroll,
        left: link.offsetLeft,
        width: link.offsetWidth
      };
    }).filter(Boolean);
  };

  const updateUnderlineContinuous = () => {
    if (!navIndicator || !navContainer || sectionData.length === 0) return;

    const scrollY = window.scrollY;
    const firstSection = sectionData[0];
    const lastSection = sectionData[sectionData.length - 1];

    let targetLeft = 0;
    let targetWidth = 0;
    let targetOpacity = 0;
    let nearestSection = null;

    if (scrollY < firstSection.targetScroll) {
      // In hero section before About
      targetLeft = firstSection.left;
      targetWidth = firstSection.width;
      const fadeStart = Math.max(0, firstSection.targetScroll - 180);
      if (scrollY >= fadeStart && firstSection.targetScroll > fadeStart) {
        targetOpacity = (scrollY - fadeStart) / (firstSection.targetScroll - fadeStart);
      } else {
        targetOpacity = 0;
      }
      nearestSection = scrollY >= firstSection.targetScroll / 2 ? firstSection : null;
    } else if (scrollY >= lastSection.targetScroll) {
      // Scrolled to or past bottom
      targetLeft = lastSection.left;
      targetWidth = lastSection.width;
      targetOpacity = 1;
      nearestSection = lastSection;
    } else {
      // Between neighbouring sections: interpolate linearly
      targetOpacity = 1;
      for (let i = 0; i < sectionData.length - 1; i++) {
        const a = sectionData[i];
        const b = sectionData[i + 1];

        if (scrollY >= a.targetScroll && scrollY <= b.targetScroll) {
          const span = b.targetScroll - a.targetScroll;
          const t = span > 0 ? (scrollY - a.targetScroll) / span : 0;

          // Continuous linear interpolation for position and width
          targetLeft = a.left + (b.left - a.left) * t;
          targetWidth = a.width + (b.width - a.width) * t;

          // Nearest link
          nearestSection = t >= 0.5 ? b : a;
          break;
        }
      }
    }

    // Apply directly on every animation frame with no CSS transition lag
    navIndicator.style.transform = `translateX(${targetLeft}px)`;
    navIndicator.style.width = `${targetWidth}px`;
    navIndicator.style.opacity = `${targetOpacity}`;

    // Brighten text of nearer link
    const newNearestId = nearestSection ? nearestSection.id : null;
    if (newNearestId !== currentNearestId) {
      currentNearestId = newNearestId;

      sectionData.forEach(item => {
        if (item.id === newNearestId) {
          item.link.classList.add('active');
          item.link.setAttribute('aria-current', 'true');
        } else {
          item.link.classList.remove('active');
          item.link.removeAttribute('aria-current');
        }
      });

      // Synchronize URL hash via replaceState only when nearest section changes
      if (window.history && window.history.replaceState) {
        if (newNearestId) {
          if (window.location.hash !== `#${newNearestId}`) {
            window.history.replaceState(null, '', `#${newNearestId}`);
          }
        } else if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }

      // Auto-scroll horizontal nav container on narrow mobile screens if needed
      if (nearestSection && navContainer.scrollWidth > navContainer.clientWidth) {
        const linkLeft = nearestSection.link.offsetLeft;
        const linkRight = linkLeft + nearestSection.link.offsetWidth;
        if (linkLeft < navContainer.scrollLeft) {
          navContainer.scrollTo({ left: Math.max(0, linkLeft - 16), behavior: 'smooth' });
        } else if (linkRight > navContainer.scrollLeft + navContainer.clientWidth) {
          navContainer.scrollTo({ left: linkRight - navContainer.clientWidth + 16, behavior: 'smooth' });
        }
      }
    }
  };

  let scrollRafId = null;
  const onScroll = () => {
    if (scrollRafId === null) {
      scrollRafId = window.requestAnimationFrame(() => {
        updateUnderlineContinuous();
        scrollRafId = null;
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  const onLayoutOrResize = () => {
    measureSectionsAndLinks();
    updateUnderlineContinuous();
  };

  window.addEventListener('resize', onLayoutOrResize);
  window.addEventListener('load', onLayoutOrResize);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(onLayoutOrResize);
  }

  // Clicking navigation link: trigger native smooth scroll; underline naturally follows continuously
  sectionIds.forEach(id => {
    const link = navContainer?.querySelector(`a[href="#${id}"]`);
    if (link) {
      link.addEventListener('click', (e) => {
        const targetEl = document.getElementById(id);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      document.getElementById(hash).scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Direct links on initial load / refresh
  measureSectionsAndLinks();
  updateUnderlineContinuous();
  if (window.location.hash) {
    const initialHash = window.location.hash.replace('#', '');
    if (document.getElementById(initialHash)) {
      setTimeout(() => {
        onLayoutOrResize();
      }, 100);
    }
  }

  // =========================================================================
  // 7. Copy Email Address Action
  // =========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  if (copyEmailBtn) {
    const emailToCopy = 'prathyush123kumar@gmail.com';
    let copyTimeout = null;

    const showCopiedState = () => {
      copyEmailBtn.classList.add('copied');
      const textSpan = copyEmailBtn.querySelector('.copy-text');
      const iconSpan = copyEmailBtn.querySelector('.copy-icon');
      if (textSpan) textSpan.textContent = 'Copied!';
      if (iconSpan) iconSpan.textContent = '✓';
      if (copyFeedback) copyFeedback.textContent = 'Email address copied to clipboard: ' + emailToCopy;

      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copyEmailBtn.classList.remove('copied');
        if (textSpan) textSpan.textContent = 'Copy email address';
        if (iconSpan) iconSpan.textContent = '📋';
        if (copyFeedback) copyFeedback.textContent = '';
      }, 2200);
    };

    const copyText = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy)
          .then(showCopiedState)
          .catch(() => {
            fallbackCopy(emailToCopy, showCopiedState);
          });
      } else {
        fallbackCopy(emailToCopy, showCopiedState);
      }
    };

    copyEmailBtn.addEventListener('click', copyText);
  }

  function fallbackCopy(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (err) {
      console.warn('Clipboard copy failed', err);
    }
    document.body.removeChild(textarea);
  }
});
