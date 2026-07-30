(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- page ready (hero entrance) ---------------------------- */
  document.documentElement.classList.add('is-ready');

  /* ---- nav: solid on scroll ---------------------------------- */
  var nav = document.querySelector('.nav');

  /* ---- nav: mobile menu -------------------------------------- */
  var burger = document.querySelector('.nav__burger');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__link, .nav__cta').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- reveal on scroll -------------------------------------- */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- signature: 伴走の縦罫 --------------------------------- */
  var track = document.querySelector('.rail-track');
  var dot   = document.querySelector('.rail-dot');
  var ticking = false;

  function onScroll() {
    var y      = window.scrollY || window.pageYOffset;
    var vh     = window.innerHeight;
    var height = document.documentElement.scrollHeight - vh;
    var pct    = height > 0 ? Math.min(1, Math.max(0, y / height)) : 0;

    if (nav) nav.classList.toggle('is-solid', y > 24);
    if (track) track.style.setProperty('--progress', (pct * 100) + '%');
    if (dot) dot.style.top = (pct * vh) + 'px';

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
