/**
 * assets/js/i18n.js
 * Bilingual system: Arabic (default) ↔ English
 * - Reads localStorage / ?lang=en param
 * - Applies I18N strings to [data-i18n] and [data-i18n-attr] elements
 * - Updates <html lang/dir>, <title>, meta description, WhatsApp links
 * - No layout jump — font families set via [dir] CSS attribute selector
 */

(function () {
  'use strict';

  // ── WhatsApp URL builder ──────────────────────────────────────
  function buildWaUrl(msg) {
    return 'https://wa.me/' + window.SITE.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  // ── Resolve nested key path in an object ─────────────────────
  // e.g. 'nav.services' → I18N.nav.services
  function resolvePath(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return o && o[k] !== undefined ? o[k] : null;
    }, obj);
  }

  // ── Apply all translations to the DOM ────────────────────────
  function applyTranslations(lang) {
    var I = window.I18N;

    // Elements with data-i18n="key.path"
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var node = resolvePath(I, key);
      if (node && typeof node === 'object' && node[lang] !== undefined) {
        el.textContent = node[lang];
      } else if (typeof node === 'string') {
        el.textContent = node;
      }
    });

    // Elements with data-i18n-attr="attr1:key1 attr2:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var pairs = el.getAttribute('data-i18n-attr').split(' ');
      pairs.forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key  = parts[1].trim();
        var node = resolvePath(I, key);
        if (node && typeof node === 'object' && node[lang] !== undefined) {
          el.setAttribute(attr, node[lang]);
        } else if (typeof node === 'string') {
          el.setAttribute(attr, node);
        }
      });
    });

    // <title>
    var metaTitle = resolvePath(I, 'meta.title');
    if (metaTitle && metaTitle[lang]) document.title = metaTitle[lang];

    // meta description
    var metaEl = document.querySelector('meta[name="description"]');
    var metaDesc = resolvePath(I, 'meta.description');
    if (metaEl && metaDesc && metaDesc[lang]) metaEl.setAttribute('content', metaDesc[lang]);

    // All WhatsApp links (by id — avoids accidental matches)
    var waMsg  = window.SITE.whatsappMsg[lang];
    var waUrl  = buildWaUrl(waMsg);
    ['header-wa','menu-wa','hero-wa','contact-wa','wa-float'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = waUrl;
    });

    // Language toggle buttons
    var toggleText = resolvePath(I, 'nav.langToggle');
    if (toggleText && toggleText[lang]) {
      ['lang-toggle','lang-toggle-mob'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = toggleText[lang];
      });
    }

    // Footer year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ── Switch language ───────────────────────────────────────────
  window.switchLanguage = function (lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    window._currentLang = lang;

    applyTranslations(lang);

    // Notify other modules
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));

    // Persist
    try { localStorage.setItem('7x-lang', lang); } catch (e) {}
  };

  // ── Detect initial language ───────────────────────────────────
  function detectLang() {
    // 1. URL param
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'en') return 'en';
      if (params.get('lang') === 'ar') return 'ar';
    } catch (e) {}

    // 2. localStorage
    try {
      var saved = localStorage.getItem('7x-lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch (e) {}

    // 3. Default: Arabic
    return 'ar';
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    var lang = detectLang();
    window._currentLang = lang;

    // Apply immediately (AR is already in HTML, so only switch if EN)
    if (lang === 'en') {
      window.switchLanguage('en');
    } else {
      // Still set the meta, WA links etc even for AR
      applyTranslations('ar');
      window._currentLang = 'ar';
    }

    // Toggle buttons click handler
    ['lang-toggle','lang-toggle-mob'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', function () {
        var next = window._currentLang === 'ar' ? 'en' : 'ar';
        window.switchLanguage(next);
      });
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
