/**
 * assets/js/main.js
 * Global behaviors: header, mobile menu, services panel,
 * tech strip, smooth scroll, floating WA button, footer year.
 */

(function () {
  'use strict';

  // ── Service icons (inline SVG paths, brand-colored) ───────────
  var SERVICE_ICONS = {
    code: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    layers: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    store: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
    wifi: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>',
    chart: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    map: '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  };

  var TECH_LIST = [
    { name: 'HTML5',      icon: null },
    { name: 'CSS3',       icon: null },
    { name: 'JavaScript', icon: null },
    { name: 'Tailwind CSS', icon: null },
    { name: 'PHP',        icon: null },
    { name: 'MySQL',      icon: null },
    { name: 'Git',        icon: null },
    { name: 'GitHub',     icon: null },
    { name: 'VS Code',    icon: null },
    { name: 'Canva',      icon: null },
    { name: 'SEO',        icon: null },
  ];

  // ── Header scroll shadow ──────────────────────────────────────
  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('bg-white', 'shadow-sm');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-white', 'shadow-sm');
        header.classList.add('bg-transparent');
      }
    }

    // Initial state: hero is light so header needs bg from start
    header.classList.add('bg-white');
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Mobile menu ───────────────────────────────────────────────
  function initMobileMenu() {
    var menuBtn     = document.getElementById('menu-btn');
    var closeBtn    = document.getElementById('menu-close-btn');
    var menu        = document.getElementById('mobile-menu');
    var iconOpen    = document.getElementById('icon-open');
    var iconClose   = document.getElementById('icon-close');
    var waFloat     = document.getElementById('wa-float');
    var menuLinks   = menu ? menu.querySelectorAll('.menu-link') : [];

    if (!menuBtn || !menu) return;

    var isOpen = false;
    var openerEl = null;

    function openMenu() {
      isOpen = true;
      openerEl = document.activeElement;
      menu.classList.remove('opacity-0', 'pointer-events-none');
      menu.classList.add('opacity-100');
      menu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (iconOpen)  iconOpen.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (waFloat) waFloat.classList.add('hidden');
      // Focus close button
      if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
    }

    function closeMenu() {
      isOpen = false;
      menu.classList.add('opacity-0', 'pointer-events-none');
      menu.classList.remove('opacity-100');
      menu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (iconOpen)  iconOpen.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
      document.body.style.overflow = '';
      if (waFloat) waFloat.classList.remove('hidden');
      if (openerEl && typeof openerEl.focus === 'function') openerEl.focus();
    }

    menuBtn.addEventListener('click', function () { isOpen ? closeMenu() : openMenu(); });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    // Focus trap in mobile menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = Array.from(menu.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )).filter(function (el) { return !el.disabled && !el.closest('[aria-hidden="true"]'); });
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });

    // Close on nav link click
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ── Services panel (desktop) ──────────────────────────────────
  function initServices() {
    var items = document.querySelectorAll('.service-item');
    var panelIcon  = document.getElementById('panel-icon');
    var panelTitle = document.getElementById('panel-title');
    var panelDesc  = document.getElementById('panel-desc');
    var I = window.I18N ? window.I18N.services.items : [];

    function activateService(idx) {
      items.forEach(function (item, i) {
        item.classList.toggle('active', i === idx);
        item.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });

      var svc = I[idx];
      if (!svc) return;
      var L = window._currentLang || 'ar';

      if (panelTitle) panelTitle.textContent = svc.title[L];
      if (panelDesc)  panelDesc.textContent  = svc.desc[L];

      if (panelIcon) {
        var iconKey = window.I18N.services.items[idx].icon;
        panelIcon.innerHTML = '<span style="color:#0A6CFF">' + (SERVICE_ICONS[iconKey] || '') + '</span>';
      }
    }

    items.forEach(function (item, idx) {
      item.addEventListener('click', function () { activateService(idx); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateService(idx); }
        if (e.key === 'ArrowDown') { var n = items[idx + 1]; if (n) n.focus(); }
        if (e.key === 'ArrowUp')   { var p = items[idx - 1]; if (p) p.focus(); }
      });
    });

    // Init first
    activateService(0);

    // Re-apply text on lang change
    document.addEventListener('langchange', function () {
      var active = 0;
      items.forEach(function (item, i) { if (item.classList.contains('active')) active = i; });
      activateService(active);
    });
  }

  // ── Tech strip ────────────────────────────────────────────────
  function initTechStrip() {
    var strip = document.getElementById('tech-strip');
    if (!strip) return;
    strip.innerHTML = '';
    TECH_LIST.forEach(function (tech) {
      var chip = document.createElement('span');
      chip.className = 'tech-chip text-sm font-medium';
      chip.textContent = tech.name;
      strip.appendChild(chip);
    });
  }

  // ── Footer year ───────────────────────────────────────────────
  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ── Hero animation (CSS-based via class, respects reduced-motion) ──
  function initHeroAnimation() {
    // Add CSS animation classes via style tag if not reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.animate-fade-in').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    var style = document.createElement('style');
    style.textContent = [
      '@keyframes fadeInUp {',
      '  from { opacity:0; transform: translateY(20px); }',
      '  to   { opacity:1; transform: translateY(0); }',
      '}',
      '.animate-fade-in {',
      '  animation: fadeInUp 0.65s ease both;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  // ── Init all ─────────────────────────────────────────────────
  function init() {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initServices();
    initTechStrip();
    initFooterYear();
    initHeroAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
