/* ===========================================================================
   VÉLONG · BEFORE / AFTER DRAG SLIDER
   PointerEvents (mouse + touch + pen unified). Keyboard accessible (←/→).
   =========================================================================== */

(function () {
  'use strict';

  function init() {
    document.querySelectorAll('[data-velong-ba]').forEach(setup);
  }

  function setup(root) {
    var viewer   = root.querySelector('.velong-ba__viewer');
    var imgBefore= root.querySelector('.velong-ba__layer--before img');
    var imgAfter = root.querySelector('.velong-ba__layer--after img');
    var counter  = root.querySelector('[data-velong-ba-counter]');
    var prevBtn  = root.querySelector('[data-velong-ba-prev]');
    var nextBtn  = root.querySelector('[data-velong-ba-next]');
    var quote    = root.querySelector('[data-velong-ba-quote]');
    var author   = root.querySelector('[data-velong-ba-author]');

    if (!viewer || !imgBefore || !imgAfter) return;

    var slides;
    try { slides = JSON.parse(root.getAttribute('data-velong-ba')); }
    catch (e) { slides = []; }
    if (!Array.isArray(slides) || slides.length === 0) return;

    var idx = 0;
    var progress = 50;

    function render() {
      var s = slides[idx];
      imgBefore.src = s.before; imgBefore.alt = s.altBefore || '';
      imgAfter.src  = s.after;  imgAfter.alt  = s.altAfter  || '';
      if (quote)   quote.textContent  = s.quote  || '';
      if (author)  author.textContent = s.author || '';
      if (counter) counter.textContent = (idx + 1) + ' / ' + slides.length;
      if (prevBtn) prevBtn.disabled = (idx === 0);
      if (nextBtn) nextBtn.disabled = (idx === slides.length - 1);
      setProgress(50);
    }

    function setProgress(p) {
      progress = Math.min(Math.max(p, 0), 100);
      viewer.style.setProperty('--velong-ba-progress', progress + '%');
      viewer.setAttribute('aria-valuenow', String(Math.round(progress)));
    }

    function pointerToProgress(clientX) {
      var rect = viewer.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    var dragging = false;

    viewer.addEventListener('pointerdown', function (e) {
      dragging = true;
      viewer.setPointerCapture(e.pointerId);
      viewer.classList.add('is-dragging');
      setProgress(pointerToProgress(e.clientX));
    });
    viewer.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      setProgress(pointerToProgress(e.clientX));
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      viewer.classList.remove('is-dragging');
      try { viewer.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    viewer.addEventListener('pointerup', endDrag);
    viewer.addEventListener('pointercancel', endDrag);
    viewer.addEventListener('pointerleave', function (e) {
      if (e.buttons === 0) endDrag(e);
    });

    viewer.setAttribute('role', 'slider');
    viewer.setAttribute('tabindex', '0');
    viewer.setAttribute('aria-valuemin', '0');
    viewer.setAttribute('aria-valuemax', '100');
    viewer.setAttribute('aria-label', 'Slider confronto Prima/Dopo');
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { setProgress(progress - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setProgress(progress + 5); e.preventDefault(); }
      if (e.key === 'Home')       { setProgress(0);   e.preventDefault(); }
      if (e.key === 'End')        { setProgress(100); e.preventDefault(); }
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { if (idx > 0)                  { idx--; render(); } });
    if (nextBtn) nextBtn.addEventListener('click', function () { if (idx < slides.length - 1) { idx++; render(); } });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
