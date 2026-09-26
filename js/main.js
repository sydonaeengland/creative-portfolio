/* ==========================================================================
   THE CREATIVE ARCHIVE — main.js
   Shared behavior: cursor, mobile menu, page transitions, scroll reveals,
   RAW/FINAL toggle, video hover-scrub + in-view autoplay.
   ========================================================================== */

(function(){
  "use strict";

  /* ---------------------------------------------------------------------
     Custom cursor
     --------------------------------------------------------------------- */
  function initCursor(){
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var label = document.createElement('div');
    label.className = 'cursor-label';
    document.body.appendChild(dot);
    document.body.appendChild(label);

    var x = 0, y = 0;
    window.addEventListener('mousemove', function(e){
      x = e.clientX; y = e.clientY;
      dot.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      label.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
    }, { passive: true });

    document.addEventListener('mouseover', function(e){
      var target = e.target.closest('[data-cursor]');
      if (!target){
        document.body.classList.remove('cursor-active');
        return;
      }
      label.textContent = target.getAttribute('data-cursor');
      document.body.classList.add('cursor-active');
    });
    document.addEventListener('mouseout', function(e){
      if (e.target.closest('[data-cursor]')) {
        document.body.classList.remove('cursor-active');
      }
    });
  }

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
     Page transitions
     Any link with data-transition="LABEL" triggers a full-panel wipe
     before navigating. On load, if sessionStorage flags an incoming
     transition, play it in reverse (panel already covering, wipes away).
     --------------------------------------------------------------------- */
  function initTransitions(){
    var panel = document.createElement('div');
    panel.className = 'transition-panel';
    panel.innerHTML = '<div class="label"></div>';
    document.body.appendChild(panel);
    var labelEl = panel.querySelector('.label');

    var incoming = sessionStorage.getItem('archiveTransitionLabel');
    if (incoming){
      labelEl.textContent = incoming;
      panel.classList.add('is-active');
      requestAnimationFrame(function(){
        setTimeout(function(){
          panel.classList.add('is-leaving');
          panel.classList.remove('is-active');
        }, 350);
      });
      sessionStorage.removeItem('archiveTransitionLabel');
    }

    document.querySelectorAll('a[data-transition]').forEach(function(link){
      link.addEventListener('click', function(e){
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        e.preventDefault();
        var lbl = link.getAttribute('data-transition');
        labelEl.textContent = lbl;
        panel.classList.add('is-active');
        sessionStorage.setItem('archiveTransitionLabel', lbl);
        setTimeout(function(){ window.location.href = href; }, 620);
      });
    });
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

  document.addEventListener('DOMContentLoaded', function(){
    initCursor();
    initMobileMenu();
    initTransitions();
    initReveal();
    initRawFinal();
    initVideoBehavior();
  });

})();
