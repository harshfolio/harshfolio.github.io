/* Global site scripts: theme, header, menu, enhancements */
(function () {
  'use strict';

  // THEME
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark');
    } else if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }

  function toggleTheme() {
    // Toggle directly between light and dark for predictable behavior
    const isDark = document.body.classList.contains('dark') ||
      ((!localStorage.getItem('pref-theme') || localStorage.getItem('pref-theme') === 'auto') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    localStorage.setItem('pref-theme', next);
    applyTheme(next);
  }

  // expose for onclick handlers
  window.toggleTheme = toggleTheme;
  window.applyTheme = applyTheme;

  // Apply theme on load
  document.addEventListener('DOMContentLoaded', function () {
    const pref = localStorage.getItem('pref-theme') || 'auto';
    applyTheme(pref);
    // If in auto mode, respond to system changes
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if ((localStorage.getItem('pref-theme') || 'auto') === 'auto') applyTheme('auto');
    };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);
  });

  // HEADER: hide/show on scroll
  (function headerScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    let lastY = window.scrollY;
    let scrollEndTimer = null;
    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const sideMenu = document.getElementById('side-menu');
      const menuOpen = sideMenu && sideMenu.classList.contains('open');
      if (!menuOpen) {
        if (delta > 6 && y > 24) header.classList.add('header--hidden');
        else if (delta < -6 || y < 24) header.classList.remove('header--hidden');
      }
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => header.classList.remove('header--hidden'), 150);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // MENU: off-canvas open/close + focus trap
  (function menu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('menu-close');
    if (!menuToggle || !sideMenu) return;
    let lastFocused = null;
    const getFocusable = () => sideMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    function openMenu() {
      lastFocused = document.activeElement;
      sideMenu.classList.add('open');
      sideMenu.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.classList.add('open');
      document.body.classList.add('no-scroll');
      const header = document.querySelector('.header');
      if (header) header.classList.remove('header--hidden');
      const items = getFocusable();
      if (items.length) items[0].focus();
    }
    function closeMenu() {
      sideMenu.classList.remove('open');
      sideMenu.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (lastFocused) lastFocused.focus();
    }
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu(); else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    sideMenu.addEventListener('click', (e) => {
      if (e.target && e.target.getAttribute('data-close') === 'true') closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    sideMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(getFocusable());
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  // READING PROGRESS (posts)
  document.addEventListener('DOMContentLoaded', function () {
    const progress = document.querySelector('.reading-progress');
    const progressBar = document.querySelector('.reading-progress-bar');
    const postContent = document.querySelector('.post-content');
    if (progress && progressBar && postContent) {
      let scrollTimeout; let isScrolling = false;
      const update = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = postContent.scrollHeight;
        const scrollTop = window.scrollY;
        const trackLength = documentHeight - windowHeight;
        const scrollPercent = (scrollTop / trackLength) * 100;
        progressBar.style.width = `${Math.min(Math.max(scrollPercent, 0), 100)}%`;
        if (!isScrolling) { progress.classList.add('visible'); isScrolling = true; }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => { progress.classList.remove('visible'); isScrolling = false; }, 1000);
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  });

  // CODE BLOCK LANGUAGE LABELS
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.highlight').forEach(block => {
      const code = block.querySelector('code[data-lang]');
      if (code) {
        const lang = code.getAttribute('data-lang');
        if (lang) block.setAttribute('data-lang', lang);
      }
    });
  });

  // YEAR PROGRESS
  document.addEventListener('DOMContentLoaded', function () {
    const fillElement = document.getElementById('year-progress-fill');
    const percentageElement = document.getElementById('year-percentage');
    if (!fillElement || !percentageElement) return;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress = ((now - start) / (end - start)) * 100;
    const progressValue = progress.toFixed(2);
    fillElement.style.width = progressValue + '%';
    percentageElement.textContent = progress.toFixed(1);
    const progressBar = document.querySelector('.year-progress-bar');
    if (progressBar) progressBar.setAttribute('aria-valuenow', progressValue);
  });
})();
