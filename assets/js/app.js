/* ===========================================================================
   VÉLONG · APP.JS v2
   Modules: i18n · nav · GSAP hero · reveals · carousel · stats · newsletter
   Pure vanilla JS — zero dependencies (GSAP loaded via CDN)
   =========================================================================== */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════════
     i18n — Bilingual IT / EN
  ═══════════════════════════════════════════════════════════════════════════ */
  var DICT = {
    it: {
      topbar: { promo: 'Spedizione gratuita per ordini superiori a 99€' },
      nav: {
        collections: 'Collezioni', lookbook: 'Lookbook',
        story: 'La Storia', contact: 'Contatti', search: 'Cerca'
      },
      hero: {
        eyebrowTag: 'Hair Couture',
        line1: 'The Art', line2: 'of Hair',
        sub: 'Extension premium dalla fibra impeccabile. Effetto naturale, comfort assoluto, risultato editorial.',
        cta1: 'Scopri le Collezioni', shopNow: 'Shop Now',
        cue: 'Scorri', meta: 'Edizione 2026 — Volume 01',
        imgAlt: 'Modella con capelli lunghi illuminati da luce dorata calda'
      },
      benefits: {
        title1: 'Effetto naturale', desc1: 'Indistinguibile dai tuoi capelli.',
        title2: 'Setosa morbidezza', desc2: 'Fibra che mantiene brillantezza nel tempo.',
        title3: 'Qualità Couture', desc3: 'Selezione manuale, controllo a tre livelli.',
        title4: 'Applicazione facile', desc4: 'In pochi minuti, da sola, ovunque.',
        title5: 'Spedizione express', desc5: '24–48h in tutta Italia.'
      },
      collections: {
        eyebrow: 'Le nostre collezioni',
        title1: 'Trova il tuo', titleAccent: 'stile.',
        cta: 'Scopri →',
        items: {
          clipin: { name: 'Clip-In' }, tapein: { name: 'Tape-In' },
          ponytail: { name: 'Ponytail' }, volume: { name: 'Volume' },
          accessories: { name: 'Accessories' }
        }
      },
      cf: {
        badge: 'Esclusiva Vélong',
        title1: 'Trova il tuo', titleAccent: 'colore perfetto.',
        sub: 'Scatta o carica una foto dei tuoi capelli. Vélong analizza il colore e consiglia le 3 extension più affini.',
        startCam: 'Scatta foto', upload: 'Carica una foto',
        capture: 'Scatta',
        resultsTitle: 'I tuoi 3', resultsTitleAccent: 'colori Vélong.',
        detectedLabel: 'Colore rilevato', retry: 'Riprova con una nuova foto'
      },
      ba: {
        eyebrow: 'Trasformazioni', title1: 'La trasformazione',
        titleAccent: 'parla di te.',
        sub: 'Trascina lo slider. Vedi cosa significa Vélong sui veri capelli.',
        labelBefore: 'Prima', labelAfter: 'Dopo'
      },
      why: {
        eyebrow: 'La nostra promessa',
        title1: 'Qualità. Comfort.', titleAccent: 'Sicurezza.',
        lead: 'Non vendiamo capelli. Costruiamo fiducia. Ogni Vélong è frutto di selezione manuale e controllo qualità a tre livelli.',
        item1Title: 'Fibra 100% premium', item1Desc: 'Remy human hair o fibra termo-resistente couture.',
        item2Title: 'Pre-trattata', item2Desc: 'Cuticola sigillata, anti-crespo. Pronta da indossare.',
        item3Title: 'Comfort tutto il giorno', item3Desc: 'Peso bilanciato, zero tensione sul cuoio capelluto.',
        item4Title: 'Garanzia 60 giorni', item4Desc: 'Resi facili. Cambio senza domande.',
        item5Title: 'Sostenibile', item5Desc: 'Packaging riciclato, supply chain trasparente.',
        cta: 'Scopri la nostra storia'
      },
      social: {
        eyebrow: 'Loving Vélong',
        titleLine1: 'Amato da migliaia',
        titleLine2: 'di donne.',
        scoreInline: '4.8/5 su oltre 2000 recensioni',
        press: 'As seen on'
      },
      igfeed: {
        eyebrow: 'Seguici su Instagram',
        title: 'Ispirazioni quotidiane',
        handle: '@velong.hair'
      },
      newsletter: {
        eyebrow: 'Resta in contatto',
        title1: 'Anteprime esclusive,', titleAccent: 'solo per te.',
        sub: 'Iscriviti per accedere a drop esclusivi, nuove collezioni e contenuti riservati alla community Vélong.',
        placeholder: 'La tua email',
        submit: 'Iscriviti',
        success: 'Benvenuta nella famiglia Vélong ✦',
        privacy: 'Inviando accetti la nostra <a href="#">privacy policy</a>.'
      },
      sub: {
        shipTitle: 'Spedizione gratuita', shipSub: 'oltre 99€',
        returnTitle: 'Reso facile', returnSub: '14 giorni',
        payTitle: 'Pagamenti sicuri', paySub: 'e protetti'
      },
      footer: {
        tag: 'Hair couture. Made for the unhurried. Spedito nel mondo da Milano.',
        col1Title: 'Shop', col2Title: 'Supporto', col3Title: 'Resta in contatto',
        link_clipin: 'Clip-In', link_tapein: 'Tape-In', link_ponytail: 'Ponytail',
        link_volume: 'Volume', link_acc: 'Accessori', link_giftcard: 'Gift Card',
        link_shipping: 'Spedizioni', link_returns: 'Resi & Cambi', link_faq: 'FAQ',
        link_care: 'Cura del prodotto', link_contact: 'Contattaci',
        nlLead: 'Iscriviti alla newsletter. Anteprime, drop esclusivi, accesso prioritario.',
        nlPlaceholder: 'La tua email', nlSubmit: 'Iscriviti',
        nlPrivacy: 'Inviando accetti la nostra <a href="#">privacy policy</a>.',
        copy: '© 2026 Vélong Hair Couture · P.IVA 00000000000',
        pay: 'Pagamenti sicuri',
        social_ig: 'Instagram', social_tt: 'TikTok', social_pin: 'Pinterest'
      }
    },
    en: {
      topbar: { promo: 'Free shipping on orders over €99' },
      nav: {
        collections: 'Collections', lookbook: 'Lookbook',
        story: 'Our Story', contact: 'Contact', search: 'Search'
      },
      hero: {
        eyebrowTag: 'Hair Couture',
        line1: 'The Art', line2: 'of Hair',
        sub: 'Premium extensions with flawless fibre. Natural effect, absolute comfort, editorial finish.',
        cta1: 'Explore Collections', shopNow: 'Shop Now',
        cue: 'Scroll', meta: 'Edition 2026 — Volume 01',
        imgAlt: 'Model with long flowing hair illuminated by warm golden light'
      },
      benefits: {
        title1: 'Natural effect', desc1: 'Indistinguishable from your own hair.',
        title2: 'Silky softness', desc2: 'Fibre that keeps its lustre over time.',
        title3: 'Couture quality', desc3: 'Hand-selected, three-level quality check.',
        title4: 'Easy application', desc4: 'In minutes, by yourself, anywhere.',
        title5: 'Express shipping', desc5: '24–48h across Italy.'
      },
      collections: {
        eyebrow: 'Our collections',
        title1: 'Find your', titleAccent: 'style.',
        cta: 'Discover →',
        items: {
          clipin: { name: 'Clip-In' }, tapein: { name: 'Tape-In' },
          ponytail: { name: 'Ponytail' }, volume: { name: 'Volume' },
          accessories: { name: 'Accessories' }
        }
      },
      cf: {
        badge: 'Vélong Exclusive',
        title1: 'Find your', titleAccent: 'perfect colour.',
        sub: 'Take or upload a photo of your hair. Vélong analyses the colour and recommends your 3 best matches.',
        startCam: 'Take photo', upload: 'Upload photo',
        capture: 'Capture',
        resultsTitle: 'Your 3', resultsTitleAccent: 'Vélong colours.',
        detectedLabel: 'Detected colour', retry: 'Try with a new photo'
      },
      ba: {
        eyebrow: 'Transformations', title1: 'The transformation',
        titleAccent: 'speaks for itself.',
        sub: 'Drag the slider. See what Vélong means on real hair.',
        labelBefore: 'Before', labelAfter: 'After'
      },
      why: {
        eyebrow: 'Our promise',
        title1: 'Quality. Comfort.', titleAccent: 'Trust.',
        lead: 'We don\'t sell hair. We build confidence. Every Vélong is hand-selected with triple quality control.',
        item1Title: '100% premium fibre', item1Desc: 'Remy human hair or couture heat-resistant fibre.',
        item2Title: 'Pre-treated', item2Desc: 'Sealed cuticle, anti-frizz. Ready to wear.',
        item3Title: 'All-day comfort', item3Desc: 'Balanced weight, zero scalp tension.',
        item4Title: '60-day guarantee', item4Desc: 'Easy returns. Exchange without questions.',
        item5Title: 'Sustainable', item5Desc: 'Recycled packaging, transparent supply chain.',
        cta: 'Discover our story'
      },
      social: {
        eyebrow: 'Loving Vélong',
        titleLine1: 'Loved by thousands',
        titleLine2: 'of women.',
        scoreInline: '4.8/5 from 2000+ reviews',
        press: 'As seen on'
      },
      igfeed: {
        eyebrow: 'Follow us on Instagram',
        title: 'Daily inspiration',
        handle: '@velong.hair'
      },
      newsletter: {
        eyebrow: 'Stay connected',
        title1: 'Exclusive previews,', titleAccent: 'just for you.',
        sub: 'Subscribe for exclusive drops, new collections and content reserved for the Vélong community.',
        placeholder: 'Your email',
        submit: 'Subscribe',
        success: 'Welcome to the Vélong family ✦',
        privacy: 'By submitting you agree to our <a href="#">privacy policy</a>.'
      },
      sub: {
        shipTitle: 'Free shipping', shipSub: 'over €99',
        returnTitle: 'Easy returns', returnSub: '14 days',
        payTitle: 'Secure payments', paySub: 'and protected'
      },
      footer: {
        tag: 'Hair couture. Made for the unhurried. Shipped worldwide from Milan.',
        col1Title: 'Shop', col2Title: 'Support', col3Title: 'Stay connected',
        link_clipin: 'Clip-In', link_tapein: 'Tape-In', link_ponytail: 'Ponytail',
        link_volume: 'Volume', link_acc: 'Accessories', link_giftcard: 'Gift Card',
        link_shipping: 'Shipping', link_returns: 'Returns & Exchanges', link_faq: 'FAQ',
        link_care: 'Product Care', link_contact: 'Contact Us',
        nlLead: 'Subscribe to the newsletter. Exclusive drops and priority access.',
        nlPlaceholder: 'Your email', nlSubmit: 'Subscribe',
        nlPrivacy: 'By submitting you agree to our <a href="#">privacy policy</a>.',
        copy: '© 2026 Vélong Hair Couture · VAT 00000000000',
        pay: 'Secure payments',
        social_ig: 'Instagram', social_tt: 'TikTok', social_pin: 'Pinterest'
      }
    }
  };

  function getNestedKey(obj, path) {
    return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj);
  }

  function applyLang(lang) {
    var dict = DICT[lang] || DICT.it;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = getNestedKey(dict, key);
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html') || el.getAttribute('data-i18n');
      var val = getNestedKey(dict, key);
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach(function (part) {
        var seg = part.trim().split(':');
        if (seg.length < 2) return;
        var attr = seg[0], key2 = seg.slice(1).join(':');
        var val = getNestedKey(dict, key2);
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });
    document.querySelectorAll('[data-velong-lang-btn]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-velong-lang-btn') === lang);
      b.setAttribute('aria-pressed', String(b.getAttribute('data-velong-lang-btn') === lang));
    });
    document.documentElement.lang = lang;
    localStorage.setItem('velong_lang', lang);
    document.dispatchEvent(new CustomEvent('velong:langchange', { detail: { lang: lang } }));
  }

  function initI18n() {
    var saved = localStorage.getItem('velong_lang');
    var preferred = saved || (navigator.language || '').substring(0, 2) || 'it';
    var lang = DICT[preferred] ? preferred : 'it';
    applyLang(lang);
    document.querySelectorAll('[data-velong-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-velong-lang-btn'));
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     NAV — scroll awareness + mobile drawer
  ═══════════════════════════════════════════════════════════════════════════ */
  function initNav() {
    var nav       = document.querySelector('.velong-nav');
    var burger    = document.querySelector('[data-velong-burger]');
    var drawer    = document.querySelector('[data-velong-drawer]');
    var drawerLinks = document.querySelectorAll('.velong-drawer__link');
    if (!nav) return;

    // Topbar offset
    var topbar = document.querySelector('.velong-topbar');
    var hero   = document.querySelector('.velong-hero');
    var heroTitle = document.querySelector('.velong-hero__title');

    var rafId = null;
    var leavingLightTimer = null;
    var prevOnLight = false;

    // Easing: smoothstep (più morbido di lineare, niente curve aggressive)
    function smoothstep(t) {
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      return t * t * (3 - 2 * t);
    }

    function applyState() {
      rafId = null;
      var scrollY = window.scrollY;
      var topbarH = topbar ? topbar.offsetHeight : 0;

      // Slide navbar down to sit below topbar; tracks it as user scrolls
      nav.style.top = Math.max(0, topbarH - scrollY) + 'px';

      var navRect = nav.getBoundingClientRect();

      // Light once the hero has scrolled past the nav
      var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      var wantsOnLight = heroBottom <= navRect.top;

      // ── Scroll-driven progress (trasparente → scuro) ───────────────────────
      // La sfumatura inizia dalla cima e completa "poco prima" che il titolo
      // hero scorra sotto la nav. Il calcolo è basato sulla distanza
      // verticale tra il bordo inferiore della nav e il titolo nel viewport.
      var progress = 0;
      if (heroTitle && !wantsOnLight) {
        var titleRect = heroTitle.getBoundingClientRect();
        var navBottom = navRect.bottom;
        // Distanza dalla nav al titolo (clamped a 0)
        var distance = Math.max(0, titleRect.top - navBottom);
        // Distanza iniziale al caricamento (cached at first run)
        if (applyState._maxDistance === undefined || applyState._maxDistance <= 0) {
          // Calcola la distanza assoluta dal top: la prima volta a scrollY≈0
          applyState._maxDistance = Math.max(1, titleRect.top + scrollY - navBottom);
        }
        // progress = 1 quando distance = 0 (titolo arriva al bordo della nav)
        progress = smoothstep(1 - distance / applyState._maxDistance);
      }
      nav.style.setProperty('--velong-nav-progress', progress.toFixed(4));

      // ── Transizione tra modalità scroll-driven ↔ is-on-light ───────────────
      if (wantsOnLight !== prevOnLight) {
        if (!wantsOnLight) {
          // Stiamo uscendo da is-on-light: attiva transition CSS temporanea
          nav.classList.add('is-leaving-light');
          if (leavingLightTimer) clearTimeout(leavingLightTimer);
          leavingLightTimer = setTimeout(function () {
            nav.classList.remove('is-leaving-light');
            leavingLightTimer = null;
          }, 1100);
        }
        prevOnLight = wantsOnLight;
      }
      nav.classList.toggle('is-on-light', wantsOnLight);
    }

    function onScroll() {
      if (rafId === null) rafId = window.requestAnimationFrame(applyState);
    }

    function onResize() {
      applyState._maxDistance = undefined; // ricalcola la distanza al resize
      applyState();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', applyState);
    window.addEventListener('resize', onResize, { passive: true });
    applyState();

    // Drawer
    if (burger && drawer) {
      function openDrawer() {
        drawer.classList.add('is-open');
        burger.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        var first = drawer.querySelector('a, button');
        if (first) first.focus();
      }
      function closeDrawer() {
        drawer.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }
      burger.addEventListener('click', function () {
        drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
      });
      drawerLinks.forEach(function (l) { l.addEventListener('click', closeDrawer); });
      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) closeDrawer();
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     GSAP HERO — entrance + scroll parallax
  ═══════════════════════════════════════════════════════════════════════════ */
  function initHero() {
    if (typeof gsap === 'undefined') {
      // Fallback: just make elements visible
      document.querySelectorAll(
        '.velong-hero__eyebrow-row, .velong-hero__title .line, .velong-hero__title em, ' +
        '.velong-hero__sub, .velong-hero__cta, .velong-hero__scroll-cue, .velong-hero__meta'
      ).forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll(
        '.velong-hero__eyebrow-row, .velong-hero__title .line, .velong-hero__title em, ' +
        '.velong-hero__sub, .velong-hero__cta, .velong-hero__scroll-cue, .velong-hero__meta'
      ).forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      document.querySelector('.velong-hero__title em') &&
        document.querySelector('.velong-hero__title em').classList.add('is-visible');
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    var heroImg = document.querySelector('.velong-hero__media img');
    var eyebrow = document.querySelector('.velong-hero__eyebrow-row');
    var lines   = document.querySelectorAll('.velong-hero__title .line');
    var em      = document.querySelector('.velong-hero__title em');
    var sub     = document.querySelector('.velong-hero__sub');
    var cta     = document.querySelector('.velong-hero__cta');
    var cue     = document.querySelector('.velong-hero__scroll-cue');
    var meta    = document.querySelector('.velong-hero__meta');

    // ── Entrance animation ──
    var tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: function () {
        if (em) em.classList.add('is-visible');
      }
    });

    if (heroImg) {
      tl.from(heroImg, { scale: 1.08, duration: 2.4, ease: 'expo.out' }, 0);
    }
    if (eyebrow) {
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.5);
    }
    lines.forEach(function (line, i) {
      tl.to(line, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65 + i * 0.14);
    });
    if (em) {
      tl.to(em, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.4)' }, 0.82);
    }
    if (sub) {
      tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.1);
    }
    if (cta) {
      tl.to(cta, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.3);
    }
    if (meta) {
      tl.to(meta, { opacity: 0.45, duration: 0.6 }, 1.5);
    }
    if (cue) {
      tl.to(cue, { opacity: 1, duration: 0.6 }, 1.6);
    }

    // ── Scroll parallax (only if ScrollTrigger available) ──
    if (typeof ScrollTrigger !== 'undefined') {
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.velong-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      }

      var heroContent = document.querySelector('.velong-hero__content');
      if (heroContent) {
        gsap.to(heroContent, {
          opacity: 0,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.velong-hero',
            start: 'top top',
            end: '42% top',
            scrub: 0.8
          }
        });
      }

      if (cue) {
        gsap.to(cue, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.velong-hero',
            start: 'top top',
            end: '18% top',
            scrub: true
          }
        });
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SCROLL REVEALS — IntersectionObserver
  ═══════════════════════════════════════════════════════════════════════════ */
  function initReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.velong-reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.velong-reveal').forEach(function (el) {
      if (prefersReduced) { el.classList.add('is-visible'); return; }
      obs.observe(el);
    });

    // Stagger children
    document.querySelectorAll('[data-velong-stagger]').forEach(function (parent) {
      var children = parent.children;
      Array.from(children).forEach(function (child, i) {
        child.classList.add('velong-reveal');
        child.style.transitionDelay = (i * 0.08) + 's';
        if (prefersReduced) { child.classList.add('is-visible'); return; }
        obs.observe(child);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     STATS — Animated counters
  ═══════════════════════════════════════════════════════════════════════════ */
  function initStats() {
    if (!('IntersectionObserver' in window)) return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var numEl = entry.target.querySelector('.velong-stat__num');
        if (!numEl) return;
        var target = parseFloat(numEl.getAttribute('data-count')) || 0;
        var isFloat = String(target).includes('.');
        if (prefersReduced) {
          numEl.textContent = isFloat ? target.toFixed(1) : target.toLocaleString('it-IT');
          return;
        }
        var duration = 1800;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          var current = target * ease;
          numEl.textContent = isFloat
            ? current.toFixed(1)
            : Math.round(current).toLocaleString('it-IT');
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.velong-stat').forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     TESTIMONIALS CAROUSEL — arrow navigation
  ═══════════════════════════════════════════════════════════════════════════ */
  function initTestimonialsCarousel() {
    var carousel = document.querySelector('[data-testimonials-carousel]');
    if (!carousel) return;
    var prevBtn = carousel.querySelector('.velong-testimonials__btn--prev');
    var nextBtn = carousel.querySelector('.velong-testimonials__btn--next');
    var win     = carousel.querySelector('.velong-testimonials__window');
    var track   = carousel.querySelector('.velong-testimonials__track');
    if (!win || !track || !prevBtn || !nextBtn) return;

    var VISIBLE = 6;
    var GAP     = 16;
    var origCards = Array.from(track.children);
    var N = origCards.length;

    // Clone last VISIBLE cards → prepend; first VISIBLE → append
    for (var i = N - VISIBLE; i < N; i++) {
      track.insertBefore(origCards[i].cloneNode(true), track.firstChild);
    }
    for (var j = 0; j < VISIBLE; j++) {
      track.appendChild(origCards[j].cloneNode(true));
    }
    var all = Array.from(track.children);

    var idx = VISIBLE;
    var busy = false;

    function cardW() {
      return (win.clientWidth - (VISIBLE - 1) * GAP) / VISIBLE;
    }

    function applyWidths() {
      var w = cardW();
      all.forEach(function(c) { c.style.flex = '0 0 ' + w + 'px'; });
    }

    function setPos(animate) {
      track.style.transition = animate
        ? 'transform .55s cubic-bezier(.22,1,.36,1)'
        : 'none';
      track.style.transform = 'translateX(' + (-(idx * (cardW() + GAP))) + 'px)';
    }

    track.addEventListener('transitionend', function() {
      if (idx >= N + VISIBLE) idx -= N;
      else if (idx < VISIBLE) idx += N;
      setPos(false);
      track.getBoundingClientRect(); // flush
      busy = false;
    });

    nextBtn.addEventListener('click', function() {
      if (busy) return; busy = true; idx++; setPos(true);
    });
    prevBtn.addEventListener('click', function() {
      if (busy) return; busy = true; idx--; setPos(true);
    });

    applyWidths();
    setPos(false);
    window.addEventListener('resize', function() { applyWidths(); setPos(false); });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHOP PER COLORE — swatch filter
  ═══════════════════════════════════════════════════════════════════════════ */
  function initColorShop() {
    var swatches = document.querySelectorAll('[data-color-tabs] .velong-color-swatch');
    var products = document.querySelectorAll('[data-color-grid] .velong-product');
    if (!swatches.length) return;

    function filter(color) {
      products.forEach(function (p) { p.hidden = p.dataset.color !== color; });
    }

    swatches.forEach(function (sw) {
      sw.addEventListener('click', function () {
        swatches.forEach(function (s) {
          s.classList.remove('is-active');
          s.setAttribute('aria-selected', 'false');
        });
        sw.classList.add('is-active');
        sw.setAttribute('aria-selected', 'true');
        filter(sw.dataset.color);
      });
    });

    var active = document.querySelector('[data-color-tabs] .velong-color-swatch.is-active');
    if (active) filter(active.dataset.color);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     CAROUSEL — Why Vélong section
  ═══════════════════════════════════════════════════════════════════════════ */
  function initCarousel() {
    document.querySelectorAll('[data-velong-carousel]').forEach(function (root) {
      var slides = root.querySelectorAll('.velong-why__slide');
      var dots   = root.querySelectorAll('[data-velong-car-dot]');
      var prev   = root.querySelector('[data-velong-car-prev]');
      var next   = root.querySelector('[data-velong-car-next]');
      if (!slides.length) return;

      var idx = 0;
      var timer = null;
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function goTo(n) {
        slides[idx].classList.remove('is-active');
        if (dots[idx]) dots[idx].classList.remove('is-active');
        idx = ((n % slides.length) + slides.length) % slides.length;
        slides[idx].classList.add('is-active');
        if (dots[idx]) dots[idx].classList.add('is-active');
      }

      function startAuto() {
        if (prefersReduced) return;
        clearInterval(timer);
        timer = setInterval(function () { goTo(idx + 1); }, 5000);
      }

      if (prev) prev.addEventListener('click', function () { goTo(idx - 1); startAuto(); });
      if (next) next.addEventListener('click', function () { goTo(idx + 1); startAuto(); });
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goTo(parseInt(dot.getAttribute('data-velong-car-dot'), 10));
          startAuto();
        });
      });

      startAuto();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHOP — category tab switching
  ═══════════════════════════════════════════════════════════════════════════ */
  function initShopTabs() {
    document.querySelectorAll('.velong-shop__tabs').forEach(function (bar) {
      var tabs = bar.querySelectorAll('.velong-shop__tab');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          tab.classList.add('is-active');
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     NEWSLETTER — form submit feedback
  ═══════════════════════════════════════════════════════════════════════════ */
  function initNewsletter() {
    document.querySelectorAll('[data-velong-newsletter]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var success = form.parentNode.querySelector('.velong-newsletter__success');
        var input   = form.querySelector('.velong-newsletter__input');
        if (success) {
          form.style.opacity = '0';
          form.style.pointerEvents = 'none';
          success.classList.add('is-visible');
        }
        if (input) input.value = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SCROLL CUE — smooth scroll to next section
  ═══════════════════════════════════════════════════════════════════════════ */
  function initScrollCue() {
    var cue = document.querySelector('[data-velong-scroll-cue]');
    if (!cue) return;
    cue.addEventListener('click', function () {
      var hero = document.querySelector('.velong-hero');
      if (!hero) return;
      var next = hero.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SEARCH OVERLAY
  ═══════════════════════════════════════════════════════════════════════════ */
  function initSearch() {
    var overlay  = document.querySelector('[data-velong-search]');
    var openBtn  = document.querySelector('[data-velong-search-btn]');
    var closeBtn = document.querySelector('[data-velong-search-close]');
    var input    = document.querySelector('[data-velong-search-input]');
    var hints    = document.querySelectorAll('.velong-search-hint');
    if (!overlay || !openBtn) return;

    function open() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (input) setTimeout(function() { input.focus(); }, 80);
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    hints.forEach(function(hint) {
      hint.addEventListener('click', function() {
        if (input) { input.value = hint.textContent; input.focus(); }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════════════════════ */
  function init() {
    initI18n();
    initNav();
    initSearch();
    initReveals();
    initStats();
    initTestimonialsCarousel();
    initColorShop();
    initCarousel();
    initShopTabs();
    initNewsletter();
    initScrollCue();

    // GSAP deferred until it loads
    if (typeof gsap !== 'undefined') {
      initHero();
    } else {
      window.addEventListener('gsap-ready', initHero);
      // Retry after short delay (CDN might load async)
      setTimeout(function () {
        if (typeof gsap !== 'undefined') initHero();
      }, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
