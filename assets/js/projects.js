/**
 * assets/js/projects.js
 * Projects Showcase: browser frames, slideshow, carousel, dialog
 * Works in both RTL and LTR. Respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  var projects = window.PROJECTS || [];
  var SLIDE_INTERVAL = 3500;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Helpers ───────────────────────────────────────────────────
  function lang() { return window._currentLang || 'ar'; }

  function buildWaUrl(msg) {
    return 'https://wa.me/' + window.SITE.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  function projectWaUrl(project) {
    var L = lang();
    var I = window.I18N.projects;
    var msg = I.inquiryMsgTpl[L].replace('{title}', project.title);
    return buildWaUrl(msg);
  }

  function makeDot(active) {
    var d = document.createElement('span');
    d.className = 'inline-block rounded-full transition-all duration-300 cursor-pointer ' +
      (active
        ? 'w-5 h-2 bg-electric'
        : 'w-2 h-2 bg-white/40 hover:bg-white/70');
    return d;
  }

  function makeTechChip(tech) {
    var c = document.createElement('span');
    c.className = 'tech-chip text-xs';
    c.textContent = tech;
    return c;
  }

  // Build a <figure> slide element
  function makeSlide(screen, idx, total, addressSlug) {
    var L = lang();
    var fig = document.createElement('figure');
    fig.className = 'absolute inset-0 transition-opacity duration-700 ' +
      (idx === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none');
    fig.setAttribute('aria-hidden', idx !== 0 ? 'true' : 'false');

    var img = document.createElement('img');
    img.src = screen.src;
    img.alt = screen.alt[L] || '';
    img.setAttribute('width', screen.w || '');
    img.setAttribute('height', screen.h || '');
    img.setAttribute('loading', idx === 0 ? 'eager' : 'lazy');
    img.setAttribute('decoding', 'async');
    img.className = 'w-full h-full object-cover';

    // Tall images scroll vertically
    if (screen.h && screen.w && screen.h / screen.w > 1.8) {
      img.className = 'w-full object-contain object-top';
      fig.style.overflowY = 'auto';
    }

    fig.appendChild(img);
    return fig;
  }

  // ── Slideshow controller ──────────────────────────────────────
  function Slideshow(container, dotsContainer, screens, pauseOnHover) {
    var self = this;
    self.screens   = screens;
    self.current   = 0;
    self.timer     = null;
    self.slides    = [];
    self.dotEls    = [];
    self.paused    = false;

    // Build slides
    screens.forEach(function (s, i) {
      var sl = makeSlide(s, i, screens.length, '');
      container.appendChild(sl);
      self.slides.push(sl);
    });

    // Build dots
    if (dotsContainer) {
      screens.forEach(function (_, i) {
        var d = makeDot(i === 0);
        d.addEventListener('click', function () { self.goTo(i); });
        dotsContainer.appendChild(d);
        self.dotEls.push(d);
      });
    }

    self.goTo = function (n) {
      self.slides[self.current].className = self.slides[self.current].className
        .replace('opacity-100', 'opacity-0 pointer-events-none');
      self.slides[self.current].setAttribute('aria-hidden', 'true');
      if (self.dotEls[self.current]) {
        self.dotEls[self.current].className = self.dotEls[self.current].className
          .replace('w-5 h-2 bg-electric', 'w-2 h-2 bg-white/40 hover:bg-white/70');
      }

      self.current = (n + self.slides.length) % self.slides.length;

      var cur = self.slides[self.current];
      cur.className = cur.className.replace('opacity-0 pointer-events-none', 'opacity-100');
      cur.setAttribute('aria-hidden', 'false');
      if (self.dotEls[self.current]) {
        self.dotEls[self.current].className = self.dotEls[self.current].className
          .replace('w-2 h-2 bg-white/40 hover:bg-white/70', 'w-5 h-2 bg-electric');
      }
    };

    self.next = function () { self.goTo(self.current + 1); };
    self.prev = function () { self.goTo(self.current - 1); };

    self.start = function () {
      if (reducedMotion || screens.length <= 1) return;
      self.stop();
      self.timer = setInterval(function () {
        if (!self.paused) self.next();
      }, SLIDE_INTERVAL);
    };

    self.stop = function () {
      if (self.timer) { clearInterval(self.timer); self.timer = null; }
    };

    // Pause on hover/focus if requested
    if (pauseOnHover && container.parentElement) {
      container.parentElement.addEventListener('mouseenter', function () { self.paused = true; });
      container.parentElement.addEventListener('mouseleave', function () { self.paused = false; });
      container.parentElement.addEventListener('focusin',   function () { self.paused = true; });
      container.parentElement.addEventListener('focusout',  function () { self.paused = false; });
    }

    self.start();
  }

  // ── Desktop: project index + sticky browser frame ─────────────
  var desktopSlideshow = null;
  var currentDesktopProject = 0;

  function buildDesktopIndex() {
    var indexEl = document.getElementById('proj-index');
    if (!indexEl) return;
    indexEl.innerHTML = '';

    projects.forEach(function (proj, idx) {
      var L = lang();
      var item = document.createElement('article');
      item.className = 'project-index-item' + (idx === 0 ? ' active' : '');
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');

      // Title
      var title = document.createElement('h3');
      title.className = 'font-bold text-navy mb-1';
      title.style.fontSize = 'clamp(1rem, 1.5vw, 1.125rem)';
      title.textContent = proj.title;
      item.appendChild(title);

      // Type
      var type = document.createElement('p');
      type.className = 'text-xs text-steel mb-3';
      type.textContent = proj.type[L];
      item.appendChild(type);

      // Tech chips
      var chips = document.createElement('div');
      chips.className = 'flex flex-wrap gap-1.5';
      proj.tech.slice(0, 4).forEach(function (t) {
        chips.appendChild(makeTechChip(t));
      });
      item.appendChild(chips);

      // Click / keyboard
      function activate() {
        // Deactivate all
        indexEl.querySelectorAll('.project-index-item').forEach(function (el) {
          el.classList.remove('active');
          el.setAttribute('aria-pressed', 'false');
        });
        item.classList.add('active');
        item.setAttribute('aria-pressed', 'true');
        currentDesktopProject = idx;
        updateDesktopPreview(idx);
      }

      item.addEventListener('click', activate);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          var next = indexEl.querySelectorAll('.project-index-item')[idx + 1];
          if (next) next.focus();
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          var prev = indexEl.querySelectorAll('.project-index-item')[idx - 1];
          if (prev) prev.focus();
        }
      });

      // Open dialog on Enter/click
      item.addEventListener('dblclick', function () { openDialog(idx); });

      indexEl.appendChild(item);
    });
  }

  function updateDesktopPreview(idx) {
    var proj = projects[idx];
    if (!proj) return;
    var L = lang();

    // Address bar
    var addr = document.getElementById('desktop-address');
    if (addr) addr.textContent = '7x-' + proj.slug;

    // Slides
    var slidesEl = document.getElementById('desktop-slides');
    var dotsEl   = document.getElementById('desktop-dots');
    if (!slidesEl) return;

    // Destroy previous slideshow
    if (desktopSlideshow) desktopSlideshow.stop();
    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';

    desktopSlideshow = new Slideshow(slidesEl, dotsEl, proj.screens, true);

    // Info below frame
    buildDesktopProjInfo(proj);
  }

  function buildDesktopProjInfo(proj) {
    var el = document.getElementById('desktop-proj-info');
    if (!el) return;
    var L = lang();
    el.innerHTML = '';

    // Summary
    var sum = document.createElement('p');
    sum.className = 'text-steel text-sm leading-relaxed';
    sum.textContent = proj.summary[L];
    el.appendChild(sum);

    // Action buttons
    var btns = document.createElement('div');
    btns.className = 'flex flex-wrap gap-3';

    if (proj.live) {
      var liveBtn = document.createElement('a');
      liveBtn.href = proj.live;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'btn-primary text-sm px-4 py-2.5';
      liveBtn.textContent = proj.liveLabel[L];
      btns.appendChild(liveBtn);
    }

    if (proj.repo) {
      var repoBtn = document.createElement('a');
      repoBtn.href = proj.repo;
      repoBtn.target = '_blank';
      repoBtn.rel = 'noopener noreferrer';
      repoBtn.className = 'btn-secondary text-sm px-4 py-2.5';
      repoBtn.textContent = window.I18N.projects.sourceCode[L];
      btns.appendChild(repoBtn);
    }

    // Always show WhatsApp inquiry
    var waBtn = document.createElement('a');
    waBtn.href = projectWaUrl(proj);
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.className = 'btn-secondary text-sm px-4 py-2.5';
    waBtn.textContent = window.I18N.projects.inquireWa[L];
    btns.appendChild(waBtn);

    el.appendChild(btns);

    // Open dialog button
    var detailBtn = document.createElement('button');
    detailBtn.className = 'text-sm text-electric underline underline-offset-2 hover:no-underline self-start';
    detailBtn.textContent = window.I18N.projects.viewProject[L];
    var projIdx = projects.indexOf(proj);
    detailBtn.addEventListener('click', function () { openDialog(projIdx); });
    el.appendChild(detailBtn);
  }

  // ── Mobile carousel ───────────────────────────────────────────
  var mobSlideshows = [];
  var currentMobProject = 0;

  function buildMobileCarousel() {
    var track = document.getElementById('mob-carousel');
    var dotsEl = document.getElementById('mob-proj-dots');
    if (!track) return;
    track.innerHTML = '';
    if (dotsEl) dotsEl.innerHTML = '';
    mobSlideshows = [];

    projects.forEach(function (proj, idx) {
      var L = lang();

      // Card wrapper (snap item)
      var card = document.createElement('div');
      card.className = 'snap-center shrink-0 flex flex-col gap-4';
      card.style.width = 'min(85vw, 420px)';
      card.setAttribute('data-proj-idx', idx);

      // Browser frame
      var frame = document.createElement('div');
      frame.className = 'browser-frame';

      var chrome = document.createElement('div');
      chrome.className = 'browser-chrome';
      ['browser-dot browser-dot-1','browser-dot browser-dot-2','browser-dot browser-dot-3'].forEach(function (cls) {
        var d = document.createElement('span'); d.className = cls; chrome.appendChild(d);
      });
      var addr = document.createElement('span');
      addr.className = 'browser-address';
      addr.textContent = '7x-' + proj.slug;
      chrome.appendChild(addr);
      frame.appendChild(chrome);

      // Slides container
      var viewport = document.createElement('div');
      viewport.className = 'relative overflow-hidden';
      viewport.style.aspectRatio = '16/9';

      var slidesEl = document.createElement('div');
      slidesEl.className = 'relative w-full h-full';

      var mobDotsContainer = document.createElement('div');
      mobDotsContainer.className = 'absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none';

      viewport.appendChild(slidesEl);
      viewport.appendChild(mobDotsContainer);
      frame.appendChild(viewport);
      card.appendChild(frame);

      // Tap to advance (mobile: no nested horizontal swipe)
      viewport.addEventListener('click', function () {
        if (mobSlideshows[idx]) mobSlideshows[idx].next();
      });

      // Build slideshow
      var ss = new Slideshow(slidesEl, mobDotsContainer, proj.screens, false);
      mobSlideshows.push(ss);

      // Project info below frame
      var info = document.createElement('div');
      info.className = 'flex flex-col gap-2';

      var title = document.createElement('h3');
      title.className = 'font-bold text-navy';
      title.style.fontSize = 'clamp(1rem, 3vw, 1.125rem)';
      title.textContent = proj.title;
      info.appendChild(title);

      var type = document.createElement('p');
      type.className = 'text-xs text-steel';
      type.textContent = proj.type[L];
      info.appendChild(type);

      var chips = document.createElement('div');
      chips.className = 'flex flex-wrap gap-1.5';
      proj.tech.slice(0, 4).forEach(function (t) { chips.appendChild(makeTechChip(t)); });
      info.appendChild(chips);

      // Open dialog
      var detBtn = document.createElement('button');
      detBtn.className = 'text-sm text-electric underline underline-offset-2 hover:no-underline self-start mt-1';
      detBtn.textContent = window.I18N.projects.viewProject[L];
      detBtn.addEventListener('click', function () { openDialog(idx); });
      info.appendChild(detBtn);

      card.appendChild(info);
      track.appendChild(card);

      // Carousel dots
      if (dotsEl) {
        var dot = document.createElement('button');
        dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ' +
          (idx === 0 ? 'bg-electric w-5' : 'bg-silver hover:bg-electric/50');
        dot.setAttribute('aria-label', proj.title);
        dot.addEventListener('click', function () { scrollMobToProject(idx); });
        dotsEl.appendChild(dot);
      }
    });

    // Prev/Next buttons
    var prevBtn = document.getElementById('mob-prev');
    var nextBtn = document.getElementById('mob-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { scrollMobToProject(currentMobProject - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollMobToProject(currentMobProject + 1); });

    // Track scroll to update active dot
    if (track) {
      track.addEventListener('scroll', debounce(function () {
        var items = track.querySelectorAll('[data-proj-idx]');
        var center = track.scrollLeft + track.offsetWidth / 2;
        var closest = 0, minDist = Infinity;
        items.forEach(function (el, i) {
          var dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setMobActiveDot(closest);
      }, 100));
    }
  }

  function scrollMobToProject(idx) {
    var track = document.getElementById('mob-carousel');
    if (!track) return;
    idx = Math.max(0, Math.min(idx, projects.length - 1));
    var items = track.querySelectorAll('[data-proj-idx]');
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    setMobActiveDot(idx);
  }

  function setMobActiveDot(idx) {
    currentMobProject = idx;
    var dotsEl = document.getElementById('mob-proj-dots');
    if (!dotsEl) return;
    var dots = dotsEl.querySelectorAll('button');
    dots.forEach(function (d, i) {
      d.className = 'rounded-full transition-all duration-300 ' +
        (i === idx ? 'w-5 h-2.5 bg-electric' : 'w-2.5 h-2.5 bg-silver hover:bg-electric/50');
    });
  }

  // ── Dialog (case study) ───────────────────────────────────────
  var dialogSlideshow = null;
  var dialogOpener = null;

  function openDialog(idx) {
    var proj = projects[idx];
    if (!proj) return;
    var L = lang();
    var dialog = document.getElementById('proj-dialog');
    if (!dialog) return;

    dialogOpener = document.activeElement;

    // Title
    document.getElementById('dialog-title').textContent = proj.title;

    // Address
    var addr = document.getElementById('dialog-address');
    if (addr) addr.textContent = '7x-' + proj.slug;

    // Main image slideshow
    var mainImg = document.getElementById('dialog-main-img');
    if (mainImg) {
      mainImg.innerHTML = '';
      var slidesEl = document.createElement('div');
      slidesEl.className = 'relative w-full h-full';
      mainImg.appendChild(slidesEl);
      if (dialogSlideshow) dialogSlideshow.stop();
      dialogSlideshow = new Slideshow(slidesEl, null, proj.screens, false);
    }

    // Thumbnails
    var thumbsEl = document.getElementById('dialog-thumbs');
    if (thumbsEl) {
      thumbsEl.innerHTML = '';
      proj.screens.forEach(function (s, i) {
        var thumb = document.createElement('button');
        thumb.className = 'shrink-0 rounded-lg overflow-hidden border-2 transition-all ' +
          (i === 0 ? 'border-electric' : 'border-transparent opacity-60 hover:opacity-100');
        thumb.style.width = '80px';
        thumb.setAttribute('aria-label', (i + 1).toString());
        var img = document.createElement('img');
        img.src = s.src;
        img.alt = '';
        img.setAttribute('width', '80');
        img.setAttribute('height', '50');
        img.className = 'w-full object-cover';
        img.style.height = '50px';
        thumb.appendChild(img);
        thumb.addEventListener('click', function () {
          if (dialogSlideshow) dialogSlideshow.goTo(i);
          thumbsEl.querySelectorAll('button').forEach(function (b, bi) {
            b.className = b.className.replace(
              bi === i ? 'border-transparent opacity-60 hover:opacity-100' : 'border-electric',
              bi === i ? 'border-electric' : 'border-transparent opacity-60 hover:opacity-100'
            );
          });
        });
        thumbsEl.appendChild(thumb);
      });
    }

    // Highlights
    var hlEl = document.getElementById('dialog-highlights');
    if (hlEl) {
      hlEl.innerHTML = '';
      var items = proj.highlights[L] || [];
      items.forEach(function (h) {
        var li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-sm text-navy';
        li.innerHTML = '<span class="text-electric mt-0.5 shrink-0">✓</span><span>' + h + '</span>';
        hlEl.appendChild(li);
      });
    }

    // Tech
    var techEl = document.getElementById('dialog-tech');
    if (techEl) {
      techEl.innerHTML = '';
      proj.tech.forEach(function (t) { techEl.appendChild(makeTechChip(t)); });
    }

    // Summary
    var sumEl = document.getElementById('dialog-summary');
    if (sumEl) sumEl.textContent = proj.summary[L];

    // Action buttons
    var actEl = document.getElementById('dialog-actions');
    if (actEl) {
      actEl.innerHTML = '';

      if (proj.live) {
        var liveA = document.createElement('a');
        liveA.href = proj.live; liveA.target = '_blank'; liveA.rel = 'noopener noreferrer';
        liveA.className = 'btn-primary text-sm px-4 py-2.5';
        liveA.textContent = proj.liveLabel[L];
        actEl.appendChild(liveA);
      }

      if (proj.repo) {
        var repoA = document.createElement('a');
        repoA.href = proj.repo; repoA.target = '_blank'; repoA.rel = 'noopener noreferrer';
        repoA.className = 'btn-secondary text-sm px-4 py-2.5';
        repoA.textContent = window.I18N.projects.sourceCode[L];
        actEl.appendChild(repoA);
      }

      var waA = document.createElement('a');
      waA.href = projectWaUrl(proj); waA.target = '_blank'; waA.rel = 'noopener noreferrer';
      waA.className = 'btn-secondary text-sm px-4 py-2.5';
      waA.textContent = window.I18N.projects.inquireWa[L];
      actEl.appendChild(waA);
    }

    // Open dialog
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    // Focus close button
    var closeBtn = document.getElementById('dialog-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDialog() {
    var dialog = document.getElementById('proj-dialog');
    if (!dialog) return;
    if (dialogSlideshow) { dialogSlideshow.stop(); dialogSlideshow = null; }
    dialog.close();
    document.body.style.overflow = '';
    if (dialogOpener && typeof dialogOpener.focus === 'function') dialogOpener.focus();
  }

  // ── Render on language change ─────────────────────────────────
  document.addEventListener('langchange', function () {
    buildDesktopIndex();
    updateDesktopPreview(currentDesktopProject);
    buildMobileCarousel();
  });

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    buildDesktopIndex();
    updateDesktopPreview(0);
    buildMobileCarousel();

    // Dialog close events
    var dialog  = document.getElementById('proj-dialog');
    var closeBtn = document.getElementById('dialog-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDialog);
    if (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) closeDialog();
      });
      dialog.addEventListener('cancel', function (e) {
        e.preventDefault(); closeDialog();
      });
      dialog.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); closeDialog(); }

        // Trap focus inside dialog
        if (e.key === 'Tab') {
          var focusable = Array.from(dialog.querySelectorAll(
            'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )).filter(function (el) { return !el.disabled; });
          if (focusable.length === 0) return;
          var first = focusable[0];
          var last  = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
          } else {
            if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
          }
        }
      });
    }
  }

  // ── Utility ───────────────────────────────────────────────────
  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
