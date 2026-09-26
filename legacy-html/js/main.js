/* ==========================================================================
   THE CREATIVE ARCHIVE — main.js
   Shared behavior: cursor, mobile menu, page transitions, scroll reveals,
   RAW/FINAL toggle, video hover-scrub + in-view autoplay.
   ========================================================================== */

(function(){
  "use strict";

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */
  function initMobileMenu(){
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;
    var closeBtn = menu.querySelector('.mobile-menu-close');

    function open(){ menu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function close(){ menu.classList.remove('is-open'); document.body.style.overflow = ''; }

    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  function initReveal(){
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------------------------------------------------------------------
     RAW / FINAL toggle
     Markup:
     <div class="rf-toggle" data-state="final">
       <span class="side raw">Raw</span>
       <button class="rf-switch" aria-label="Toggle raw and final"></button>
       <span class="side final">Final</span>
     </div>
     <div class="rf-stage" data-rf-stage>
       <div class="rf-asset raw ..." data-rf="raw">...</div>
       <div class="rf-asset final is-visible" data-rf="final">...</div>
     </div>
     The toggle and stage are linked via a shared closest [data-rf-group],
     or simple DOM adjacency (stage follows toggle's container).
     --------------------------------------------------------------------- */
  function initRawFinal(){
    document.querySelectorAll('.rf-toggle').forEach(function(toggle){
      var group = toggle.closest('[data-rf-group]') || toggle.parentElement;
      var stage = group ? group.querySelector('[data-rf-stage]') : null;
      var switchEl = toggle.querySelector('.rf-switch');
      if (!stage || !switchEl) return;

      function setState(state){
        toggle.setAttribute('data-state', state);
        stage.querySelectorAll('.rf-asset').forEach(function(asset){
          asset.classList.toggle('is-visible', asset.getAttribute('data-rf') === state);
        });
      }

      switchEl.addEventListener('click', function(){
        var current = toggle.getAttribute('data-state') === 'final' ? 'raw' : 'final';
        setState(current);
      });
      toggle.querySelectorAll('.side').forEach(function(sideEl){
        sideEl.style.cursor = 'pointer';
        sideEl.addEventListener('click', function(){
          setState(sideEl.classList.contains('raw') ? 'raw' : 'final');
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Video: autoplay-muted only when in view, never more than one at once;
     hover scrubs through preview frames (uses currentTime scrub on a
     data-scrub video, falls back gracefully with no video present).
     --------------------------------------------------------------------- */
  function initVideoBehavior(){
    var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-autoplay-inview]'));
    if (videos.length && 'IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var v = entry.target;
          if (entry.isIntersecting){
            videos.forEach(function(other){ if (other !== v) other.pause(); });
            v.play().catch(function(){});
          } else {
            v.pause();
          }
        });
      }, { threshold: 0.6 });
      videos.forEach(function(v){ io.observe(v); });
    }

    document.querySelectorAll('[data-scrub]').forEach(function(wrap){
      var video = wrap.querySelector('video');
      if (!video) return;
      wrap.addEventListener('mousemove', function(e){
        if (isNaN(video.duration)) return;
        var rect = wrap.getBoundingClientRect();
        var pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        video.currentTime = pct * video.duration;
      });
    });
  }

  /* ---------------------------------------------------------------------
     Nav blend-mode fix: our nav uses mix-blend-mode:difference which
     already inverts automatically over purple/white — no per-page JS
     needed. Kept as a hook for future per-page nav state.
     --------------------------------------------------------------------- */

  // Reveal the page: this script runs at the end of <body>, after markup
  // has parsed, so the page is ready — drop `.is-loading` right away and
  // let the CSS transition fade it in smoothly instead of popping in.
  document.documentElement.classList.remove('is-loading');

  document.addEventListener('DOMContentLoaded', function(){
    initMobileMenu();
    initReveal();
    initRawFinal();
    initVideoBehavior();
  });

})();
