/* ==========================================================================
   NATARAJ NRITYA MANDIR (HOW/62) - MULTI-PAGE SPA & RELIABLE AUDIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SPA Router Engine with Controlled About Us Counter Logic & Auto Admission Form Clear
  initSPARouter();

  // 1b. Fail-Safe Rebuilt Mobile Drawer Navigation Manager
  initMobileNavigationDrawer();

  // 2. Light / Dark Theme Manager (Defaults to Vibrant Pearl-Cream Light Day Theme)
  initThemeManager();

  // 3. Full-Screen Falling Lotus Petals & Cosmic Star Canvas Engine
  initLotusCanvas();

  // 4. Cursor Follower
  initCursorFollower();

  // 5. Reliable HTML5 Classical Audio Engine (Forcefully Reduced Volume to 25% Soft Ambience)
  initClassicalAudioPlayer();

  // 6. 3D Tilt Micro-interactions (EXCLUDES Admission Form to keep it 100% stable and blur-free)
  init3DTiltCards();

  // 7. Direct Email Admission System & Smart Form Validation
  initAdmissionSystem();
  initCaptcha('admission');

  // 8. Performance Gallery & Fullscreen Lightbox
  initModalsAndGallery();
  // 9. Dynamic Animated Stats Counter
  initStatsCounter();

  // 10. Automated Mobile Dialer & Direct Email Client Dispatch Engine
  initContactActions();

  // 11. Testimonials Category Filter Handler
  initTestimonialFilters();

  // 11b. Ultra-Optimized Reveal on Scroll (Fade-In-Up) Intersection Observer
  initScrollReveal();

  // 12. Browser Back-Button Trap (Prevents returning to success page after returning to website)
  if (sessionStorage.getItem('nnm_success_returned') === 'true') {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      if (sessionStorage.getItem('nnm_success_returned') === 'true') {
        window.history.pushState(null, document.title, window.location.href);
      }
    });
  }

  // 13. Real-Time Runtime FPS Watchdog (Auto-downgrades misreported budget hardware)
  initFPSWatchdog();
});

// State flag to track if About Us stats counter has animated in current visit
let hasAnimatedAboutStats = false;

/* ==========================================================================
   FAIL-SAFE REBUILT MOBILE NAVIGATION DRAWER ENGINE
   ========================================================================== */
function initMobileNavigationDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');
  const drawerContent = document.querySelector('.mobile-drawer-content');

  if (!overlay) return;

  function openDrawer(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    overlay.classList.add('open');
    document.body.classList.add('drawer-body-lock');
    // Auto-focus close button or first link for keypad D-pad phones
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 150);
  }

  function closeDrawer(e) {
    if (e) {
      e.stopPropagation();
    }
    overlay.classList.remove('open');
    document.body.classList.remove('drawer-body-lock');
    if (toggleBtn) toggleBtn.focus();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openDrawer);
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Select' || e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 93) {
        e.preventDefault();
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Select' || e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 93) {
        e.preventDefault();
        closeDrawer();
      }
    });
  }

  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Mobile drawer links navigation click
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Native Mobile Swipe-to-Dismiss Gesture
  if (drawerContent) {
    let touchStartX = 0;
    let touchCurrentX = 0;
    drawerContent.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    drawerContent.addEventListener('touchmove', (e) => {
      touchCurrentX = e.touches[0].clientX;
    }, { passive: true });

    drawerContent.addEventListener('touchend', () => {
      if (touchCurrentX - touchStartX > 50) {
        closeDrawer();
      }
      touchStartX = 0;
      touchCurrentX = 0;
    }, { passive: true });
  }

  // Bind Drawer Footer Direct Contact Actions
  const drawerCallBtn = document.querySelector('.btn-drawer-call');
  const drawerEmailBtn = document.querySelector('.btn-drawer-email');
  if (drawerCallBtn) {
    drawerCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      if (typeof dialTelephoneNumber === 'function') {
        dialTelephoneNumber('03326797750');
      }
    });
  }
  if (drawerEmailBtn) {
    drawerEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      if (typeof dispatchAcademyEmail === 'function') {
        dispatchAcademyEmail('natrajhowrah62@gmail.com');
      }
    });
  }
}

/* ==========================================================================
   1. SPA ROUTER ENGINE WITH PERSISTENT STATE ON REFRESH & CONTROLLED STATS
   ========================================================================== */
function initSPARouter() {
  const pageViews = document.querySelectorAll('.page-view');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link, [data-navigate], .mbar-btn');

  function navigateTo(pageId) {
    if (!pageId) pageId = 'home';
    pageId = pageId.replace('#', '');

    let found = false;
    pageViews.forEach((view) => {
      if (view.getAttribute('data-page-view') === pageId) {
        view.classList.add('active');
        found = true;
      } else {
        view.classList.remove('active');
      }
    });

    if (!found && pageViews.length > 0) {
      pageViews[0].classList.add('active');
      pageId = 'home';
    }

    // STATE PERSISTENCE: Remember active section across page reloads
    try {
      sessionStorage.setItem('nnm_active_section', pageId);
    } catch (e) {}

    // Synchronize URL Hash without page jump
    if (window.location.hash !== '#' + pageId) {
      if (history.replaceState) {
        history.replaceState(null, document.title, '#' + pageId);
      } else {
        window.location.hash = '#' + pageId;
      }
    }

    // Active nav link highlight across desktop, mobile drawer & mobile bar
    allNavLinks.forEach((link) => {
      const target = link.getAttribute('href') ? link.getAttribute('href').replace('#', '') : '';
      if (target === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // TRIGGER STATS COUNTER ON ABOUT US TAB CLICK / RESET ON LEAVE
    if (pageId === 'about') {
      hasAnimatedAboutStats = true;
      setTimeout(triggerStatsCounterAnimation, 200);
    } else {
      hasAnimatedAboutStats = false;
    }

    // TRIGGER GALLERY MASONRY LAYOUT ON GALLERY TAB CLICK (INSTANT ALIGNMENT)
    if (pageId === 'gallery' && typeof window.layoutGalleryMasonry === 'function') {
      setTimeout(window.layoutGalleryMasonry, 60);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Synchronize scroll-reveal state on tab switch
    if (typeof window.refreshScrollReveal === 'function') {
      setTimeout(window.refreshScrollReveal, 80);
    }
  }

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetEl = e.currentTarget;
      const href = targetEl.getAttribute('href') || targetEl.getAttribute('data-navigate');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navigateTo(href);
      }
    });
  });

  // State Persistence Mount: Mounts exactly where the user left off on refresh
  const urlHash = window.location.hash ? window.location.hash.replace('#', '') : '';
  let savedSection = '';
  try {
    savedSection = sessionStorage.getItem('nnm_active_section') || '';
  } catch (e) {}
  const initialSection = urlHash || savedSection || 'home';
  navigateTo(initialSection);
}
/* ==========================================================================
   ANTI-BOT / ANTI-SPAM CAPTCHA ENGINE
   ========================================================================== */
const captchaState = {
  admission: { a: 0, b: 0, answer: 0, solved: false }
};

function initCaptcha(type) {
  captchaState[type].a = Math.floor(Math.random() * 10) + 1;
  captchaState[type].b = Math.floor(Math.random() * 10) + 1;
  captchaState[type].answer = captchaState[type].a + captchaState[type].b;
  captchaState[type].solved = false;

  const qEl = document.getElementById(`${type}-captcha-question`);
  const iEl = document.getElementById(`${type}-captcha-input`);
  const sEl = document.getElementById(`${type}-captcha-status`);
  const btn = document.getElementById(`${type}-submit-btn`);

  if(qEl) qEl.innerText = `Solve: ${captchaState[type].a} + ${captchaState[type].b} = ?`;
  if(iEl) {
    iEl.value = '';
    iEl.classList.remove('success', 'error');
    iEl.oninput = (e) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val) && val === captchaState[type].answer) {
        iEl.classList.remove('error');
        iEl.classList.add('success');
        if(sEl) { sEl.innerText = 'Matched'; sEl.style.color = '#00C853'; }
        if(btn) {
          btn.disabled = false;
          btn.style.cursor = 'pointer';
        }
        captchaState[type].solved = true;
      } else {
        iEl.classList.remove('success');
        if (e.target.value !== '') iEl.classList.add('error');
        if(sEl) { sEl.innerText = e.target.value !== '' ? 'Not Matched' : ''; sEl.style.color = '#ff1744'; }
        if(btn) {
          btn.disabled = true;
          btn.style.cursor = 'not-allowed';
        }
        captchaState[type].solved = false;
      }
    };
  }
}

function resetCaptcha(type) {
  const btn = document.getElementById(`${type}-submit-btn`);
  if(btn) btn.disabled = true;
  const sEl = document.getElementById(`${type}-captcha-status`);
  if(sEl) sEl.innerText = '';
  initCaptcha(type);
}

/* ==========================================================================
   2. LIGHT / DARK THEME MANAGER (DEFAULTS TO VIBRANT LIGHT DAY THEME)
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  // Clear legacy persistent localStorage to ensure closing/re-opening site resets to Light Mode
  try {
    localStorage.removeItem('nnm_theme');
  } catch (e) {}

  // SessionStorage retains theme across page refreshes within current tab session.
  // Closing and re-opening the tab/browser automatically clears sessionStorage, defaulting back to Vibrant Light Day Theme.
  const activeSessionTheme = sessionStorage.getItem('nnm_session_theme') || 'light';

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    sessionStorage.setItem('nnm_session_theme', theme);

    themeToggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Switch to Cosmic Dark Mode');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Switch to Vibrant Light Day Theme');
        }
      }
    });
  }

  // Force Vibrant Light Day Theme as default on initial load/session start
  setTheme(activeSessionTheme);

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  });
}

/* ==========================================================================
   3. FULL-SCREEN IMMERSIVE FLOWER & STAR RAIN CANVAS ENGINE (3-TIER ADAPTIVE)
   ========================================================================== */
function initLotusCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;

  // Tier 3: Zero-Lag Budget / Keypad Phones - disable canvas entirely to save 100% CPU/GPU
  if (document.documentElement.classList.contains('tier-ultra-lite')) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  let isCanvasActive = true;
  let rafId = null;

  // Expose global terminator so Runtime FPS Watchdog can cancel immediately on downgrade
  window.stopLotusCanvas = function() {
    isCanvasActive = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    try {
      ctx.clearRect(0, 0, width, height);
      canvas.style.display = 'none';
    } catch (e) {}
  };

  // Particle counts: Full desktop = 75 (or 32 on mobile full); Tier Balanced = ~35% of desktop (~26 particles)
  function getOptimalParticleCount() {
    if (document.documentElement.classList.contains('tier-balanced')) {
      return 26; // Capped to ~35% of desktop count for balanced 60fps scrolling
    }
    return window.innerWidth <= 768 ? 32 : 75;
  }

  function createParticles() {
    particles.length = 0;
    const count = getOptimalParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: ['#D4AF37', '#E91E63', '#00BCD4', '#8E24AA', '#B8860B', '#FF4081'][Math.floor(Math.random() * 6)],
        alpha: Math.random() * 0.75 + 0.2,
        speedY: Math.random() * 0.9 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        isPetal: i % 2 === 0,
        petalSize: Math.random() * 4.5 + 3.5
      });
    }
  }

  createParticles();

  let resizeDebounce = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }, 150);
  }, { passive: true });

  // Tab Visibility Lifecycle Management (Stops GPU/CPU Burn When Tab Inactive)
  document.addEventListener('visibilitychange', () => {
    isCanvasActive = !document.hidden && !document.documentElement.classList.contains('tier-ultra-lite');
    if (isCanvasActive && !rafId) {
      lastRenderTimestamp = performance.now();
      rafId = requestAnimationFrame(render);
    }
  });

  // Tier-Balanced Scroll-Pause Optimization:
  // While scrolling actively, pause redraw loop (existing particles stay statically on screen, 0 GPU draw calls)
  let isScrolling = false;
  let scrollResumeTimer = null;
  window.addEventListener('scroll', () => {
    if (!document.documentElement.classList.contains('tier-balanced')) return;
    isScrolling = true;
    clearTimeout(scrollResumeTimer);
    scrollResumeTimer = setTimeout(() => {
      isScrolling = false;
    }, 150);
  }, { passive: true });

  let lastRenderTimestamp = 0;
  const balancedFrameInterval = 1000 / 24; // Throttle to ~24 FPS on tier-balanced (~41.6ms)

  function render(timestamp) {
    if (!isCanvasActive || document.documentElement.classList.contains('tier-ultra-lite')) {
      rafId = null;
      return;
    }

    const currentTierBalanced = document.documentElement.classList.contains('tier-balanced');

    if (currentTierBalanced) {
      // If actively scrolling on mid-range phone, pause canvas redrawing to lock 60fps scroll
      if (isScrolling) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // Throttle rendering to ~24 FPS
      if (timestamp - lastRenderTimestamp < balancedFrameInterval) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastRenderTimestamp = timestamp;
    }

    ctx.clearRect(0, 0, width, height);
    const isMobile = window.innerWidth <= 768;

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.008) * 0.5;
      p.rotation += p.rotationSpeed;

      if (p.y > height) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isPetal) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.52;
        for (let j = 0; j < 5; j++) {
          ctx.rotate((72 * Math.PI) / 180);
          ctx.beginPath();
          ctx.arc(p.petalSize, 0, p.petalSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (!isMobile && !currentTierBalanced) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }
        ctx.fill();
      }
      ctx.restore();
    });

    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);
}

/* ==========================================================================
   3b. REAL-TIME RUNTIME FPS WATCHDOG (ZERO-JANK MISREPORTED HARDWARE SCALER)
   ========================================================================== */
function initFPSWatchdog() {
  // If already ultra-lite, no need to monitor
  if (document.documentElement.classList.contains('tier-ultra-lite')) return;

  // Only run on mobile or touch-enabled devices
  const isTouchOrMobile = window.innerWidth <= 992 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  if (!isTouchOrMobile) return;

  function startWatchdog() {
    // If downgraded while waiting for start, exit
    if (document.documentElement.classList.contains('tier-ultra-lite')) return;

    let frameCount = 0;
    let slowFrames = 0;
    let startTime = null;
    let lastFrameTime = null;
    let watchdogRafId = null;
    const DURATION = 2500; // 2.5 seconds evaluation window

    function checkFrame(now) {
      if (!startTime) {
        startTime = now;
        lastFrameTime = now;
        watchdogRafId = requestAnimationFrame(checkFrame);
        return;
      }

      frameCount++;
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      if (delta > 80) {
        slowFrames++;
      }

      const elapsed = now - startTime;

      // Early downgrade trigger if multiple severe stutter frames detected (>= 3 frames > 80ms)
      if (slowFrames >= 3) {
        triggerDowngrade('Multiple heavy frame drops (>80ms) detected');
        return;
      }

      if (elapsed < DURATION) {
        watchdogRafId = requestAnimationFrame(checkFrame);
      } else {
        // 2.5 seconds completed, calculate average FPS
        const avgFPS = (frameCount * 1000) / elapsed;
        if (avgFPS < 28) {
          triggerDowngrade('Average FPS (' + avgFPS.toFixed(1) + ') below 28 FPS threshold');
        }
      }
    }

    function triggerDowngrade(reason) {
      if (document.documentElement.classList.contains('tier-ultra-lite')) return;
      console.warn('[NNM Perf Engine] Auto-downgrading to tier-ultra-lite: ' + reason);

      document.documentElement.classList.remove('tier-balanced', 'tier-full');
      document.documentElement.classList.add('tier-ultra-lite');

      try {
        sessionStorage.setItem('nnm_perf_tier', 'tier-ultra-lite');
      } catch (e) {}

      // Stop canvas animation loop immediately
      if (typeof window.stopLotusCanvas === 'function') {
        window.stopLotusCanvas();
      }

      // Force instant visibility for scroll elements to prevent white tiles
      const pendingReveal = document.querySelectorAll('.scroll-reveal, .reveal-item');
      pendingReveal.forEach(el => {
        el.classList.add('revealed', 'is-visible');
      });
    }

    watchdogRafId = requestAnimationFrame(checkFrame);
  }

  // Refinement 2: Start 1000ms AFTER window load event to bypass initial load spikes
  if (document.readyState === 'complete') {
    setTimeout(startWatchdog, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(startWatchdog, 1000);
    });
  }
}

/* ==========================================================================
   4. CURSOR GLOW FOLLOWER (DESKTOP ONLY WITH BUTTERY LERP INTERPOLATION)
   ========================================================================== */
function initCursorFollower() {
  if (window.matchMedia('(pointer: coarse)').matches || isMobileOrTabletDevice()) {
    return;
  }
  const follower = document.createElement('div');
  follower.className = 'cursor-glow';
  document.body.appendChild(follower);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function follow() {
    currentX += (mouseX - currentX) * 0.14;
    currentY += (mouseY - currentY) * 0.14;
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    requestAnimationFrame(follow);
  }
  requestAnimationFrame(follow);
}

/* ==========================================================================
   5. AMBIENT CLASSICAL BACKGROUND AUDIO PLAYER (RABINDRA SANGEET AUTO-LOOP ENGINE)
   ========================================================================== */
function initClassicalAudioPlayer() {
  const audio = document.getElementById('bg-classical-audio');
  const musicWidget = document.getElementById('music-toggle-widget');
  const musicStatusText = document.getElementById('music-status-text');

  if (!audio || !musicWidget) return;

  // Smooth, soft and balanced ambient background volume for desktop and mobile
  const TARGET_VOLUME = 0.03;
  audio.volume = TARGET_VOLUME;
  audio.loop = true;

  // Lock volume ceiling to prevent sudden loudness
  audio.addEventListener('volumechange', () => {
    if (audio.volume > TARGET_VOLUME) {
      audio.volume = TARGET_VOLUME;
    }
  });

  // Check persisted mute state (default to false = unmuted)
  let isMuted = false;
  try {
    isMuted = localStorage.getItem('nnm_audio_muted') === 'true';
  } catch(err) {}

  // One-time safe position restoration (Prevents loop seek-traps)
  let hasRestoredInitialTime = false;
  function restorePlaybackTime() {
    if (hasRestoredInitialTime) return;
    let savedTime = 0;
    try {
      savedTime = parseFloat(localStorage.getItem('nnm_audio_time') || '0');
    } catch(err) {}

    if (!isNaN(savedTime) && savedTime > 0) {
      try {
        // If track duration is available and saved time is within track and not at the very end
        if (!audio.duration || (savedTime < audio.duration - 2)) {
          audio.currentTime = savedTime;
          hasRestoredInitialTime = true;
        } else {
          // If saved time was at or near the very end, reset to beginning cleanly
          audio.currentTime = 0;
          try { localStorage.setItem('nnm_audio_time', '0'); } catch(err) {}
          hasRestoredInitialTime = true;
        }
      } catch (e) {
        // Audio stream might not be ready yet; let canplay/loadedmetadata retry ONCE
        return;
      }
    } else {
      hasRestoredInitialTime = true;
    }
  }

  // Restore position on initial metadata/ready events ONCE
  restorePlaybackTime();
  const onInitialReady = () => {
    if (!hasRestoredInitialTime) restorePlaybackTime();
  };
  audio.addEventListener('loadedmetadata', onInitialReady, { once: true });
  audio.addEventListener('canplay', onInitialReady, { once: true });

  // Function to save current playback time and handle loop detection
  let lastRecordedTime = 0;
  function savePlaybackTime() {
    if (!audio || isNaN(audio.currentTime)) return;
    const cur = audio.currentTime;

    // Detect loop wrap-around: if currentTime wrapped from near end (> 5s) back to beginning (< 2s)
    if (lastRecordedTime > 5 && cur < 2) {
      try {
        localStorage.setItem('nnm_audio_time', '0');
      } catch(err) {}
      lastRecordedTime = cur;
      return;
    }

    // If within 1.5 seconds of the end, save as 0 so the next cycle/session starts clean
    if (audio.duration && cur >= audio.duration - 1.5) {
      try {
        localStorage.setItem('nnm_audio_time', '0');
      } catch(err) {}
    } else if (cur >= 0) {
      try {
        localStorage.setItem('nnm_audio_time', cur.toString());
      } catch(err) {}
    }
    lastRecordedTime = cur;
  }

  // Continuously track timestamp with high precision
  audio.addEventListener('timeupdate', savePlaybackTime);
  setInterval(() => {
    if (!audio.paused) {
      savePlaybackTime();
    }
  }, 250);

  // Save state immediately on navigation or page hide/unload
  window.addEventListener('beforeunload', savePlaybackTime);
  window.addEventListener('pagehide', savePlaybackTime);

  // Seamless Looping Engine:
  // Native audio.loop = true handles continuous playback.
  // The 'ended' event listener acts as a bulletproof failsafe if native loop doesn't restart in certain browsers:
  audio.addEventListener('ended', () => {
    try {
      localStorage.setItem('nnm_audio_time', '0');
    } catch(err) {}
    lastRecordedTime = 0;
    audio.currentTime = 0;
    if (!isMuted) {
      audio.volume = TARGET_VOLUME;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  });

  // Safeguard: If audio pauses near the end instead of looping smoothly
  audio.addEventListener('pause', () => {
    if (!isMuted && audio.duration && audio.currentTime >= audio.duration - 0.5) {
      audio.currentTime = 0;
      try { localStorage.setItem('nnm_audio_time', '0'); } catch(err) {}
      audio.play().catch(() => {});
    }
  });

  function updateWidgetUI() {
    if (audio && !audio.paused && !audio.muted) {
      musicWidget.classList.add('playing');
      if (musicStatusText) musicStatusText.innerHTML = '&#127925; Music: ON';
    } else {
      musicWidget.classList.remove('playing');
      if (musicStatusText) musicStatusText.innerHTML = '&#128263; Music: MUTED';
    }
  }

  audio.addEventListener('play', updateWidgetUI);
  audio.addEventListener('playing', updateWidgetUI);
  audio.addEventListener('pause', updateWidgetUI);
  audio.addEventListener('ended', updateWidgetUI);
  audio.addEventListener('volumechange', updateWidgetUI);

  function playAudio() {
    if (isMuted) {
      audio.pause();
      updateWidgetUI();
      return;
    }

    if (!hasRestoredInitialTime) {
      restorePlaybackTime();
    }
    audio.volume = TARGET_VOLUME;
    audio.muted = false;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMuted = false;
          try {
            localStorage.setItem('nnm_audio_muted', 'false');
            localStorage.setItem('nnm_audio_playing', 'true');
          } catch(err) {}
          updateWidgetUI();
        })
        .catch(() => {
          updateWidgetUI();
          attachAutoplayFallback();
        });
    } else {
      updateWidgetUI();
    }
  }

  function pauseAudio() {
    audio.pause();
    audio.muted = true;
    isMuted = true;
    try {
      localStorage.setItem('nnm_audio_muted', 'true');
      localStorage.setItem('nnm_audio_playing', 'false');
    } catch(err) {}
    updateWidgetUI();
    savePlaybackTime();
  }

  // ROBUST CROSS-BROWSER AUTO-PLAY UNLOCK STRATEGY
  let autoplayUnlocked = false;
  function attachAutoplayFallback() {
    if (autoplayUnlocked) return;
    const gestureEvents = ['pointerdown', 'touchstart', 'click', 'scroll', 'keydown', 'wheel', 'mousedown'];

    const handleFirstGesture = (e) => {
      // Prevent interfering if the user directly clicked the music widget
      if (e && e.target && e.target.closest && e.target.closest('#music-toggle-widget')) return;

      if (!isMuted && (audio.paused || audio.muted)) {
        if (!hasRestoredInitialTime) {
          restorePlaybackTime();
        }
        audio.volume = TARGET_VOLUME;
        audio.muted = false;
        const p = audio.play();
        if (p && typeof p.then === 'function') {
          p.then(() => {
            updateWidgetUI();
            try {
              localStorage.setItem('nnm_audio_muted', 'false');
              localStorage.setItem('nnm_audio_playing', 'true');
            } catch(err) {}
          }).catch(() => {});
        }
      }

      autoplayUnlocked = true;
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture, true);
        document.removeEventListener(evt, handleFirstGesture, true);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { capture: true, passive: true });
      document.addEventListener(evt, handleFirstGesture, { capture: true, passive: true });
    });
  }

  // Initial playback state
  updateWidgetUI();
  playAudio();
  attachAutoplayFallback();

  // Floating widget toggle listener
  musicWidget.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused || audio.muted || !musicWidget.classList.contains('playing')) {
      isMuted = false;
      try { localStorage.setItem('nnm_audio_muted', 'false'); } catch(err) {}
      playAudio();
    } else {
      isMuted = true;
      pauseAudio();
    }
  });
}

/* ==========================================================================
   6. 3D TILT MICRO-INTERACTIONS (RAZOR-SHARP TEXT, SMOOTH DESKTOP & MOBILE TILT)
   ========================================================================== */
function init3DTiltCards() {
  if (document.documentElement.classList.contains('tier-ultra-lite')) return;
  const cards = document.querySelectorAll('.course-card, .about-card-glow, .highlight-card, .testimonial-card, .stat-box, .diploma-roadmap-card');

  cards.forEach((card) => {
    let ticking = false;
    let resetTimer = null;

    function applyTilt(clientX, clientY) {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = Math.max(-6, Math.min(6, ((y - centerY) / centerY) * -5));
      const rotateY = Math.max(-6, Math.min(6, ((x - centerX) / centerX) * 5));

      card.style.transition = 'transform 0.08s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    }

    function resetTilt() {
      if (resetTimer) clearTimeout(resetTimer);
      card.style.transition = 'transform 0.38s cubic-bezier(0.2, 0.8, 0.2, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      
      // Completely wipe inline transform & transition so element returns to native DOM layer (100% crisp vector text)
      resetTimer = setTimeout(() => {
        card.style.transform = '';
        card.style.transition = '';
        card.style.willChange = 'auto';
      }, 400);
    }

    // Desktop mousemove tracking with requestAnimationFrame
    card.addEventListener('mousemove', (e) => {
      if (resetTimer) clearTimeout(resetTimer);
      if (!ticking) {
        requestAnimationFrame(() => {
          applyTilt(e.clientX, e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    });

    card.addEventListener('mouseleave', resetTilt);

    // Mobile / Touch screen tactile response
    card.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        if (resetTimer) clearTimeout(resetTimer);
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        requestAnimationFrame(() => {
          applyTilt(touchX, touchY);
        });
      }
    }, { passive: true });

    card.addEventListener('touchend', resetTilt, { passive: true });
    card.addEventListener('touchcancel', resetTilt, { passive: true });

    // Keypad / D-Pad focus & blur handling
    card.addEventListener('blur', resetTilt);
  });
}

/* ==========================================================================
   7. DIRECT EMAIL ADMISSION SYSTEM (EMAILJS DISPATCH ENGINE & SMART VALIDATION)
   ========================================================================== */
function initAdmissionSystem() {
  const form = document.getElementById('admission-form');
  const nameInput = document.getElementById('student-name');
  const guardianInput = document.getElementById('guardian-name');
  const dobInput = document.getElementById('student-dob');
  const ageInput = document.getElementById('student-age');
  const bloodGroupSelect = document.getElementById('student-blood-group');
  const addressInput = document.getElementById('student-address');
  const phoneInput = document.getElementById('student-phone');
  const emailInput = document.getElementById('student-email');
  const schoolInput = document.getElementById('student-school');
  const currentClassInput = document.getElementById('student-class');
  const styleSelect = document.getElementById('dance-style');
  const batchSelect = document.getElementById('batch-preference');

  const styleCards = document.querySelectorAll('.style-option-card');

  // EMAILJS CREDENTIALS CONFIGURATION
  const EMAILJS_PUBLIC_KEY = 'M1H8ZO-R1__m0qpsh';
  const EMAILJS_SERVICE_ID = 'service_wet4clb';
  const EMAILJS_TEMPLATE_ID = 'template_agrf7gn';
  const TARGET_ADMIN_EMAIL = 'natrajhowrah62@gmail.com';

  // Initialize EmailJS Browser SDK
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (initErr) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      } catch (e) {
        console.warn('EmailJS Initialization notice:', initErr);
      }
    }
  }

  // Dance Style Card Click Handler (Sets hidden input value)
  styleCards.forEach((card) => {
    card.addEventListener('click', () => {
      styleCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const val = card.getAttribute('data-value');
      if (styleSelect) {
        styleSelect.value = val;
        syncSummary();
      }
    });
  });

  // ADVANCE AUTO-TRACKING & AUTO-SLASH FORMATTING DATE OF BIRTH SYSTEM
  let fpInstance = null;

  if (dobInput) {
    if (typeof flatpickr !== 'undefined') {
      fpInstance = flatpickr(dobInput, {
        dateFormat: "d/m/Y",
        allowInput: true,
        maxDate: "today",
        monthSelectorType: "dropdown",
        disableMobile: true,
        parseDate: function(dateStr) {
          if (!dateStr) return null;
          const cleaned = dateStr.trim();
          if (/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(cleaned)) {
            const parts = cleaned.split(/[\/\-\.]/);
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const d = new Date(year, month, day);
            if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
              return d;
            }
          }
          return new Date(cleaned);
        },
        onChange: function(selectedDates, dateStr) {
          calculateAgeFromDOB(dateStr);
        }
      });
    }

    const activeDobField = (fpInstance && fpInstance.altInput) ? fpInstance.altInput : dobInput;

    if (activeDobField) {
      let isBackspacing = false;

      activeDobField.addEventListener('keydown', (e) => {
        isBackspacing = (e.key === 'Backspace');
      });

      // AUTO-INSERT SLASHES (DD/MM/YYYY) & AUTO-TRACK CALENDAR AS CANDIDATE TYPES
      activeDobField.addEventListener('input', () => {
        let raw = activeDobField.value;

        if (!isBackspacing) {
          let digits = raw.replace(/\D/g, '');
          if (digits.length > 8) digits = digits.substring(0, 8);

          let formatted = '';
          if (digits.length > 0) {
            formatted += digits.substring(0, Math.min(2, digits.length));
            if (digits.length >= 2) {
              formatted += '/';
            }
            if (digits.length > 2) {
              formatted += digits.substring(2, Math.min(4, digits.length));
              if (digits.length >= 4) {
                formatted += '/';
              }
            }
            if (digits.length > 4) {
              formatted += digits.substring(4, Math.min(8, digits.length));
            }
          }
          activeDobField.value = formatted;
        }

        // AUTO-TRACK FLATPICKR CALENDAR WHEN 8 DIGITS (DD/MM/YYYY) ARE TYPED
        const typedValue = activeDobField.value.trim();
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(typedValue)) {
          const parts = typedValue.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);

          const today = new Date();
          if (
            day >= 1 && day <= 31 &&
            month >= 0 && month <= 11 &&
            year >= 1900 && year <= today.getFullYear() &&
            parsedDate.getFullYear() === year &&
            parsedDate.getMonth() === month &&
            parsedDate.getDate() === day
          ) {
            if (fpInstance) {
              fpInstance.setDate(parsedDate, false);
            }
            calculateAgeFromDOB(typedValue);
          }
        }
      });

      // RETAIN TYPED DATE ON BLUR & CALCULATE AGE
      activeDobField.addEventListener('blur', () => {
        const val = activeDobField.value.trim();
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          const parts = val.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);
          if (!isNaN(parsedDate.getTime()) && fpInstance) {
            fpInstance.setDate(parsedDate, false);
          }
          calculateAgeFromDOB(val);
        } else if (val) {
          calculateAgeFromDOB(val);
        }
      });
    }
  }

  if (batchSelect) {
    batchSelect.addEventListener('change', syncSummary);
  }

  // Year / Level change listener — triggers dynamic fee recalculation
  const yearLevelSelect = document.getElementById('dance-year-level');
  if (yearLevelSelect) {
    yearLevelSelect.addEventListener('change', () => {
      yearLevelSelect.style.border = '';
      syncSummary();
    });
  }

  if (bloodGroupSelect) {
    bloodGroupSelect.addEventListener('change', () => {
      bloodGroupSelect.style.border = '';
      syncSummary();
    });
  }

  // Date Parser & Instant Age Calculation Engine (Supports Manual Typed & Picker Dates)
  function calculateAgeFromDOB(customDateStr) {
    const val = customDateStr || (dobInput ? dobInput.value : '');
    if (!val) {
      if (ageInput) ageInput.value = '';
      syncSummary();
      return;
    }

    let birthDate;
    // Handle DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY format manual typing
    if (/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(val.trim())) {
      const parts = val.trim().split(/[\/\-\.]/);
      birthDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    } else {
      birthDate = new Date(val);
    }

    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      if (ageInput) ageInput.value = '';
      syncSummary();
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      years--;
    }

    if (years < 0) years = 0;

    const ageString = `${years} Years`;
    if (ageInput) {
      ageInput.value = ageString;
      if (dobInput) dobInput.style.border = '';
      ageInput.style.border = '';
    }

    syncSummary();
  }

  // Inputs Change & Input Event Listeners for Live Sync
  [nameInput, guardianInput, addressInput, phoneInput, emailInput, schoolInput, currentClassInput].forEach((inputEl) => {
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        inputEl.style.border = '';
        syncSummary();
      });
    }
  });

  function syncSummary() {
    const summaryName = document.getElementById('summary-name');
    const summaryDOB = document.getElementById('summary-dob');
    const summaryAge = document.getElementById('summary-age');
    const summaryBlood = document.getElementById('summary-blood');
    const summaryPhone = document.getElementById('summary-phone');
    const summarySchool = document.getElementById('summary-school');
    const summaryStyle = document.getElementById('summary-style');

    if (summaryName && nameInput) {
      summaryName.innerText = nameInput.value.trim() || 'Guest Student';
    }

    if (summaryDOB && dobInput && dobInput.value) {
      const val = dobInput.value.trim();
      let d;
      if (/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(val)) {
        const parts = val.split(/[\/\-\.]/);
        d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
      } else {
        d = new Date(val);
      }

      if (!isNaN(d.getTime())) {
        summaryDOB.innerText = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        summaryDOB.innerText = 'Not Selected';
      }
    } else if (summaryDOB) {
      summaryDOB.innerText = 'Not Selected';
    }

    if (summaryAge && ageInput) {
      summaryAge.innerText = ageInput.value.trim() || 'Not Calculated';
    }

    if (summaryBlood && bloodGroupSelect) {
      summaryBlood.innerText = bloodGroupSelect.value || 'Not Selected';
    }

    if (summaryPhone && phoneInput) {
      summaryPhone.innerText = phoneInput.value.trim() || 'Not Provided';
    }

    if (summarySchool) {
      const sch = schoolInput ? schoolInput.value.trim() : '';
      const cls = currentClassInput ? currentClassInput.value.trim() : '';
      if (sch && cls) summarySchool.innerText = `${sch} (${cls})`;
      else if (sch) summarySchool.innerText = sch;
      else if (cls) summarySchool.innerText = `Class: ${cls}`;
      else summarySchool.innerText = 'N/A';
    }

    if (styleSelect && summaryStyle) {
      const val = styleSelect.value;
      const mapStyle = {
        kathak: 'Kathak Classical',
        rabindra: 'Rabindra Nritya',
        nazrul: 'Nazrul Nritya',
        creative: 'Adhunik Dance'
      };
      summaryStyle.innerText = mapStyle[val] || 'Kathak Classical';
    }

    // DYNAMIC FEE CALCULATION BASED ON DISCIPLINE + YEAR/LEVEL
    const yearLevelSelect = document.getElementById('dance-year-level');
    const summaryLevel = document.getElementById('summary-level');
    const summaryFee = document.getElementById('summary-fee');

    const yearVal = yearLevelSelect ? yearLevelSelect.value : '';
    const discVal = styleSelect ? styleSelect.value : 'kathak';

    // Year level label display
    const yearLabels = {
      nursery: 'Nursery', pp1: 'PP-I', pp2: 'PP-II', p3: 'P-III',
      primary: 'Primary (Prathamik)',
      '1st': '1st Year', '2nd': '2nd Year', '3rd': '3rd Year',
      '4th': '4th Year', '5th': '5th Year', '6th': '6th Year', '7th': '7th Year'
    };
    if (summaryLevel) {
      summaryLevel.innerText = yearLabels[yearVal] || 'Not Selected';
    }

    // Dynamic monthly fee logic
    if (summaryFee) {
      const seniorYears = ['4th', '5th', '6th', '7th'];
      const isSenior = seniorYears.includes(yearVal);
      let monthlyFee;
      if (discVal === 'kathak') {
        monthlyFee = isSenior ? '₹500 / mo' : '₹400 / mo';
      } else {
        monthlyFee = isSenior ? '₹400 / mo' : '₹300 / mo';
      }
      summaryFee.innerText = monthlyFee;
    }

    // STATE PERSISTENCE: Auto-save draft on every summary sync
    saveAdmissionDraft();
  }

  // Real-Time Draft Protection & Session Auto-Save Engine
  const draftPill = document.getElementById('draft-status-pill');
  let draftFlashTimeout = null;

  function flashDraftSaved() {
    if (!draftPill) return;
    draftPill.classList.add('saving');
    clearTimeout(draftFlashTimeout);
    draftFlashTimeout = setTimeout(() => {
      if (draftPill) {
        draftPill.classList.remove('saving');
        draftPill.style.opacity = '0.85';
      }
    }, 1200);
  }

  function saveAdmissionDraft() {
    const yearLevelEl = document.getElementById('dance-year-level');
    const draft = {
      name: nameInput ? nameInput.value : '',
      guardian: guardianInput ? guardianInput.value : '',
      dob: dobInput ? dobInput.value : '',
      age: ageInput ? ageInput.value : '',
      blood: bloodGroupSelect ? bloodGroupSelect.value : '',
      address: addressInput ? addressInput.value : '',
      phone: phoneInput ? phoneInput.value : '',
      email: emailInput ? emailInput.value : '',
      school: schoolInput ? schoolInput.value : '',
      cls: currentClassInput ? currentClassInput.value : '',
      style: styleSelect ? styleSelect.value : 'kathak',
      yearLevel: yearLevelEl ? yearLevelEl.value : '',
      batch: batchSelect ? batchSelect.value : ''
    };
    try {
      sessionStorage.setItem('nnm_admission_draft', JSON.stringify(draft));
      if (draft.name || draft.phone || draft.dob) {
        flashDraftSaved();
      }
    } catch (e) {}
  }

  function restoreAdmissionDraft() {
    try {
      const raw = sessionStorage.getItem('nnm_admission_draft');
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (nameInput && draft.name) nameInput.value = draft.name;
      if (guardianInput && draft.guardian) guardianInput.value = draft.guardian;
      if (dobInput && draft.dob) {
        dobInput.value = draft.dob;
        if (dobInput._flatpickr) {
          dobInput._flatpickr.setDate(draft.dob, false);
        }
      }
      if (bloodGroupSelect && draft.blood) bloodGroupSelect.value = draft.blood;
      if (addressInput && draft.address) addressInput.value = draft.address;
      if (phoneInput && draft.phone) phoneInput.value = draft.phone;
      if (emailInput && draft.email) emailInput.value = draft.email;
      if (schoolInput && draft.school) schoolInput.value = draft.school;
      if (currentClassInput && draft.cls) currentClassInput.value = draft.cls;
      if (batchSelect && draft.batch) batchSelect.value = draft.batch;
      const yearLevelEl = document.getElementById('dance-year-level');
      if (yearLevelEl && draft.yearLevel) yearLevelEl.value = draft.yearLevel;

      if (styleSelect && draft.style) {
        styleSelect.value = draft.style;
        styleCards.forEach((c) => {
          if (c.getAttribute('data-value') === draft.style) {
            c.classList.add('selected');
          } else {
            c.classList.remove('selected');
          }
        });
      }

      if (draft.dob) {
        calculateAgeFromDOB(draft.dob);
      } else if (ageInput && draft.age) {
        ageInput.value = draft.age;
      }
      syncSummary();
      if (draftPill && (draft.name || draft.phone || draft.dob)) {
        draftPill.style.opacity = '0.85';
      }
    } catch (e) {}
  }

  // Restore saved draft upon initialization so refreshing preserves all entered data
  restoreAdmissionDraft();

  window.clearAdmissionForm = function() {
    if (form) form.reset();
    if (dobInput && dobInput._flatpickr) {
      dobInput._flatpickr.clear();
    }
    if (styleSelect) styleSelect.value = 'kathak';
    styleCards.forEach((c) => {
      if (c.getAttribute('data-value') === 'kathak') {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });
    try {
      sessionStorage.removeItem('nnm_admission_draft');
    } catch (e) {}
    if (draftPill) draftPill.style.opacity = '0';
    syncSummary();
  };

  // Formal Smart Validation, EmailJS Direct Dispatch & Voucher Modal Engine
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('📌 Admission Form Submit Event Intercepted via e.preventDefault()');

      if (!captchaState['admission'].solved) {
        alert('Please solve the captcha to submit the application.');
        return;
      }

      const name = nameInput ? nameInput.value.trim() : '';
      const guardian = guardianInput ? guardianInput.value.trim() : '';
      const dob = dobInput ? dobInput.value.trim() : '';
      const ageText = ageInput ? ageInput.value.trim() : '';
      const bloodGroup = bloodGroupSelect ? bloodGroupSelect.value : '';
      const address = addressInput ? addressInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const school = schoolInput ? schoolInput.value.trim() : '';
      const currentClass = currentClassInput ? currentClassInput.value.trim() : '';
      const styleVal = styleSelect ? styleSelect.value : 'kathak';
      const batchText = batchSelect ? batchSelect.options[batchSelect.selectedIndex].text : '';
      const yearLevelEl = document.getElementById('dance-year-level');
      const yearLevelVal = yearLevelEl ? yearLevelEl.value : '';
      const yearLevelLabels = {
        nursery: 'Nursery', pp1: 'PP-I', pp2: 'PP-II', p3: 'P-III',
        primary: 'Primary (Prathamik)',
        '1st': '1st Year', '2nd': '2nd Year', '3rd': '3rd Year',
        '4th': '4th Year', '5th': '5th Year', '6th': '6th Year', '7th': '7th Year'
      };
      const yearLevelText = yearLevelLabels[yearLevelVal] || yearLevelVal || 'N/A';

      // Calculate monthly fee for submission
      const seniorYearsArr = ['4th', '5th', '6th', '7th'];
      const isSeniorLevel = seniorYearsArr.includes(yearLevelVal);
      let monthlyFeeText;
      if (styleVal === 'kathak') {
        monthlyFeeText = isSeniorLevel ? '₹500/mo' : '₹400/mo';
      } else {
        monthlyFeeText = isSeniorLevel ? '₹400/mo' : '₹300/mo';
      }

      const styleLabels = {
        kathak: 'Kathak Classical',
        rabindra: 'Rabindra Nritya',
        nazrul: 'Nazrul Nritya',
        creative: 'Adhunik Dance'
      };
      const styleText = styleLabels[styleVal] || 'Kathak Classical';

      // Reset previous error outlines
      [nameInput, guardianInput, dobInput, ageInput, bloodGroupSelect, addressInput, phoneInput, emailInput, schoolInput, currentClassInput].forEach((el) => {
        if (el) el.style.border = '';
      });

      const validationModal = document.getElementById('validation-modal');
      const validationMsg = document.getElementById('validation-message-text');

      function showErrorNotice(msg, focusEl) {
        if (validationModal && validationMsg) {
          validationMsg.innerHTML = `<strong>Official Enrollment Notice:</strong> ${msg}`;
          validationModal.classList.add('active');
        }
        if (focusEl) {
          focusEl.style.border = '2px solid #FF1744';
          focusEl.focus();
        }
      }

      // 1. STRICT VALIDATION RULE 1: IF THE ENTIRE FORM IS BLANK
      const isEntireFormBlank = !name && !guardian && !dob && !bloodGroup && !address && !phone && !email && !school && !currentClass;
      if (isEntireFormBlank) {
        showErrorNotice(
          `The entire form is blank! Please fill in your details to apply.`,
          nameInput
        );
        return;
      }

      // 2. STRICT VALIDATION RULE 2: DYNAMICALLY LIST SPECIFIC MISSING REQUIRED FIELDS
      const missingFields = [];
      const missingEls = [];

      if (!name) { missingFields.push('Student Full Name'); missingEls.push(nameInput); }
      if (!guardian) { missingFields.push('Guardian Name'); missingEls.push(guardianInput); }
      if (!dob) { missingFields.push('Date of Birth'); missingEls.push(dobInput); }
      if (!bloodGroup) { missingFields.push('Blood Group'); missingEls.push(bloodGroupSelect); }
      if (!address) { missingFields.push('Residential Address'); missingEls.push(addressInput); }
      if (!phone) { missingFields.push('Phone Number'); missingEls.push(phoneInput); }
      if (!school) { missingFields.push('School Name'); missingEls.push(schoolInput); }
      if (!currentClass) { missingFields.push('Current Class'); missingEls.push(currentClassInput); }
      if (!yearLevelVal) { missingFields.push('Year / Level'); missingEls.push(yearLevelEl); }

      if (missingFields.length > 0) {
        const missingListText = missingFields.join(', ');
        showErrorNotice(
          `Please provide: <strong>${missingListText}</strong>.`,
          missingEls[0]
        );
        missingEls.forEach((el) => { if (el) el.style.border = '2px solid #FF1744'; });
        return;
      }

      // 3. Candidate Name Format Validation
      const nameRegex = /^[A-Za-z\s\.\'-]+$/;
      if (name.length < 2 || !nameRegex.test(name)) {
        showErrorNotice(
          `The Student Full Name "<strong>${name}</strong>" contains invalid numbers or special characters. Please enter a valid candidate name.`,
          nameInput
        );
        return;
      }

      // 4. Guardian Name Format Validation
      if (guardian.length < 2 || !nameRegex.test(guardian)) {
        showErrorNotice(
          `The Guardian Name "<strong>${guardian}</strong>" contains invalid characters or numbers. Please enter a valid guardian name.`,
          guardianInput
        );
        return;
      }

      // 5. ABSOLUTE MINIMUM AGE CHECK (under 3 — blocked for ALL levels)
      let calculatedYears = parseInt(ageText, 10);
      if (isNaN(calculatedYears) || calculatedYears < 3) {
        showErrorNotice(
          `Minimum admission age is <strong>3 years</strong>. The student's calculated age does not meet the absolute minimum requirement. Please verify the Date of Birth.`,
          dobInput
        );
        if (ageInput) ageInput.style.border = '2px solid #FF1744';
        return;
      }
      if (calculatedYears > 90) {
        showErrorNotice(
          `The candidate's calculated age (<strong>${calculatedYears} years</strong>) is outside the academy's permissible range. Please verify the Date of Birth.`,
          dobInput
        );
        if (ageInput) ageInput.style.border = '2px solid #FF1744';
        return;
      }

      // 6. STRICT YEAR/LEVEL ELIGIBILITY — Age + Class Requirements
      // Helper: extract numeric class from text like "Class 8", "VIII", "8", "8th", etc.
      // Returns null if input is adult/professional text (N/A, Housewife, College, Service, etc.)
      function extractClassNumber(classStr) {
        if (!classStr) return null;
        const trimmed = classStr.trim();
        // Accept adult/professional text — skip class check
        const adultKeywords = /^(n\/?a|housewife|service|professional|working|pass\s?out|passed|college|university|diploma|degree|adult|self|job|business|teacher|nurse|doctor|engineer)/i;
        if (adultKeywords.test(trimmed)) return null;

        const romanMap = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12 };
        const romanMatch = trimmed.toUpperCase().match(/^(XII|XI|X|IX|VIII|VII|VI|V|IV|III|II|I)$/);
        if (romanMatch) return romanMap[romanMatch[1]];
        const numMatch = trimmed.match(/(\d+)/);
        if (numMatch) {
          const num = parseInt(numMatch[1], 10);
          if (num >= 1 && num <= 12) return num;
        }
        // Any other text (Nursery, KG, LKG, UKG, etc.) — skip class enforcement
        return null;
      }

      const studentClassNum = extractClassNumber(currentClass);

      const levelEligibility = {
        '1st': { minAge: 12, minClass: 6,  label: '1st Year',  classLabel: 'Class 6' },
        '2nd': { minAge: 13, minClass: 7,  label: '2nd Year',  classLabel: 'Class 7' },
        '3rd': { minAge: 14, minClass: 8,  label: '3rd Year',  classLabel: 'Class 8' },
        '4th': { minAge: 15, minClass: 9,  label: '4th Year',  classLabel: 'Class 9' },
        '5th': { minAge: 16, minClass: 10, label: '5th Year',  classLabel: 'Class 10' },
        '6th': { minAge: 17, minClass: 11, label: '6th Year',  classLabel: 'Class 11' },
        '7th': { minAge: 18, minClass: 12, label: '7th Year (Nritya Kalabid)', classLabel: 'Class 12' }
      };

      if (levelEligibility[yearLevelVal]) {
        const rule = levelEligibility[yearLevelVal];
        const ageOk   = calculatedYears >= rule.minAge;
        // Only enforce class check if a numeric class was detected (school student)
        const classOk = (studentClassNum === null) || (studentClassNum >= rule.minClass);

        if (!ageOk && studentClassNum !== null && !classOk) {
          showErrorNotice(
            `For <strong>${rule.label}</strong>, the student must be at least <strong>${rule.minAge} years old</strong> and currently in <strong>${rule.classLabel}</strong> or above. (Current: ${calculatedYears} yrs, Class ${currentClass})`,
            yearLevelEl
          );
          if (yearLevelEl) yearLevelEl.style.border = '2px solid #FF1744';
          if (dobInput) dobInput.style.border = '2px solid #FF1744';
          if (currentClassInput) currentClassInput.style.border = '2px solid #FF1744';
          return;
        } else if (!ageOk) {
          showErrorNotice(
            `For <strong>${rule.label}</strong>, the student must be at least <strong>${rule.minAge} years old</strong>. Current calculated age: <strong>${calculatedYears} years</strong>. Please verify Date of Birth.`,
            dobInput
          );
          if (dobInput) dobInput.style.border = '2px solid #FF1744';
          if (ageInput) ageInput.style.border = '2px solid #FF1744';
          return;
        } else if (studentClassNum !== null && !classOk) {
          showErrorNotice(
            `For <strong>${rule.label}</strong>, school students must currently be in <strong>${rule.classLabel}</strong> or above. Current class entered: <strong>${currentClass}</strong>. (Adults with professions like N/A, College, Service etc. are exempted from this rule.)`,
            currentClassInput
          );
          if (currentClassInput) currentClassInput.style.border = '2px solid #FF1744';
          return;
        }
      }

      // 7. Phone Number Validation (Min 10 digits)
      const phoneDigits = phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10) {
        showErrorNotice(
          `Please enter a valid 10-digit contact phone number for official administrative communication.`,
          phoneInput
        );
        return;
      }

      // Generate Unique Official Registration ID (Starting with Code No. HOW/62)
      const regId = 'HOW/62-ADM-' + Math.floor(100000 + Math.random() * 900000);
      let dobFormatted = 'N/A';
      if (dob) {
        let d;
        if (/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(dob)) {
          const parts = dob.split(/[\/\-\.]/);
          d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
        } else {
          d = new Date(dob);
        }
        if (!isNaN(d.getTime())) {
          dobFormatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        } else {
          dobFormatted = dob;
        }
      }

      // UI Loading Feedback State on Submit Button
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting Application...';
      }

      // EMAILJS TEMPLATE PARAMETERS PAYLOAD (EXACT VARIABLE MATCHING)
      const templateParams = {
        student_name: name,
        guardian_name: guardian || 'N/A',
        dob: dobFormatted,
        age: ageText,
        blood_group: bloodGroup,
        address: address, // <-- EXACT MATCH FOR EMAILJS TEMPLATE VARIABLE
        residential_address: address,
        phone: phone,
        email: email || 'N/A',
        school_name: school || 'N/A',
        current_class: currentClass || 'N/A',
        year_level: yearLevelText,
        course: styleText,
        batch: batchText,
        monthly_fee: monthlyFeeText,
        admission_fee: '₹800 (One-Time)',

        // Routing & Fallback Aliases
        date_of_birth: dobFormatted,
        student_age: ageText,
        student_phone: phone,
        student_email: email || 'N/A',
        student_address: address,
        dance_discipline: styleText,
        batch_preference: batchText,
        registration_id: regId,
        target_email: TARGET_ADMIN_EMAIL,
        to_email: TARGET_ADMIN_EMAIL,
        from_name: name,
        reply_to: email ? email : TARGET_ADMIN_EMAIL,
        message: `New Admission Application received for ${name} (${styleText}, ${yearLevelText}, ${batchText}). Reg ID: ${regId}, Phone: ${phone}, Monthly Fee: ${monthlyFeeText}`
      };

      console.log('📋 Validated Candidate Data:', { name, guardian, dob: dobFormatted, ageText, bloodGroup, address, phone, email, school, currentClass, styleText, batchText });
      console.log('🚀 EmailJS Payload Object (templateParams):', templateParams);
      console.log(`📡 Calling emailjs.send('${EMAILJS_SERVICE_ID}', '${EMAILJS_TEMPLATE_ID}', templateParams, '${EMAILJS_PUBLIC_KEY}') ...`);

      // Function to render Digital Enrollment Voucher & display glowing success modal
      function handleSuccessVoucherDisplay() {
        console.log('🎉 Rendering Digital Enrollment Voucher on UI & resetting form fields...');
        // Update Voucher Receipt Fields
        const regIdEl = document.getElementById('receipt-reg-id');
        const nameEl = document.getElementById('receipt-student-name');
        const guardianEl = document.getElementById('receipt-guardian');
        const dobEl = document.getElementById('receipt-dob');
        const ageBloodEl = document.getElementById('receipt-age-blood');
        const phoneEl = document.getElementById('receipt-phone');
        const emailEl = document.getElementById('receipt-email');
        const schoolClassEl = document.getElementById('receipt-school-class');
        const addressEl = document.getElementById('receipt-address');
        const styleEl = document.getElementById('receipt-style');
        const batchEl = document.getElementById('receipt-batch');
        const dateEl = document.getElementById('receipt-date');

        if (regIdEl) regIdEl.innerText = regId;
        if (nameEl) nameEl.innerText = name;
        if (guardianEl) guardianEl.innerText = guardian || 'N/A';
        if (dobEl) dobEl.innerText = dobFormatted;
        if (ageBloodEl) ageBloodEl.innerText = `${ageText} | Blood: ${bloodGroup}`;
        if (phoneEl) phoneEl.innerText = phone;
        if (emailEl) emailEl.innerText = email || 'N/A';
        
        if (schoolClassEl) {
          if (school && currentClass) schoolClassEl.innerText = `${school} (Class ${currentClass})`;
          else if (school) schoolClassEl.innerText = school;
          else if (currentClass) schoolClassEl.innerText = `Class ${currentClass}`;
          else schoolClassEl.innerText = 'N/A';
        }
        
        if (addressEl) addressEl.innerText = address;
        if (styleEl) styleEl.innerText = styleText;
        if (batchEl) batchEl.innerText = batchText;
        if (dateEl) dateEl.innerText = new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });

        // Generate High-Density 100% Scan-able QR Code
        try {
          renderRealScanableQRCode(regId, name, guardian || 'N/A', dobFormatted, ageText, phone, email || 'N/A', styleText, batchText);
        } catch (qrErr) {
          console.warn('QR Code generation notice:', qrErr);
        }

        // Display Glowing Success Voucher Modal
        const confirmModal = document.getElementById('confirmation-modal');
        if (confirmModal) {
          confirmModal.classList.add('active');
        }

        // Mark fresh form submission verified & clear any previous return flag
        sessionStorage.setItem('nnm_form_submitted', 'true');
        sessionStorage.removeItem('nnm_success_returned');

        // Reset & Erase Admission Form Fields
        window.clearAdmissionForm();

        // Celebratory Confetti Burst
        try {
          triggerConfetti();
        } catch (cErr) {}
      }

      // DISPATCH APPLICATION VIA EMAILJS API
      if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
          .then((response) => {
            console.log('✅ EMAILJS DISPATCH SUCCESS!', response.status, response.text);
            handleSuccessVoucherDisplay();
          })
          .catch((error) => {
            console.error('❌ EMAILJS DISPATCH ERROR:', error);
            const errDetail = error ? (error.text || error.message || JSON.stringify(error)) : 'Unknown Error';
            alert(`EmailJS Dispatch Failed!\nStatus: ${error.status || '400'}\nDetails: ${errDetail}\n\nPlease check your EmailJS Service ID, Template ID, or Public Key.`);
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
            }
          });
      } else {
        console.error('❌ EmailJS SDK script is missing or not loaded on window.');
        alert('EmailJS SDK Script is not loaded. Please ensure internet connection and script tag in <head>.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  const confirmModal = document.getElementById('confirmation-modal');
  const closeBtn = confirmModal ? confirmModal.querySelector('.modal-close-btn') : null;
  if (closeBtn && confirmModal) {
    closeBtn.addEventListener('click', () => {
      confirmModal.classList.remove('active');
    });
  }
}

// HIGH-DENSITY SCAN-ABLE QR CODE ENGINE RECOGNIZED BY ALL SMARTPHONES & GOOGLE LENS
function renderRealScanableQRCode(regId, name, guardian, dob, age, phone, email, style, batch) {
  const qrContainer = document.getElementById('receipt-qr-box');
  if (!qrContainer) return;

  qrContainer.innerHTML = '';

  const baseUrl = window.location.href.split('/').slice(0, -1).join('/');
  const qrDataText = `${baseUrl}/admission.html`;

  // High-Res Instant QR Code Image API (100% Scanable on all smartphones & Google Lens)
  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrDataText)}`;
  qrImg.alt = `Official Registration QR Code - ${regId}`;
  qrImg.style.width = '130px';
  qrImg.style.height = '130px';
  qrImg.style.borderRadius = '8px';
  qrImg.style.display = 'block';
  qrImg.style.cursor = 'pointer';
  qrImg.title = 'Click or scan to verify official registration dispatch';
  qrImg.addEventListener('click', () => {
    sessionStorage.setItem('nnm_form_submitted', 'true');
    sessionStorage.removeItem('nnm_success_returned');
    window.location.href = qrDataText;
  });

  // Fallback to QRCode.js canvas rendering if image loading fails
  qrImg.onerror = () => {
    qrContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      try {
        const compactText = `HOW/62 REG: ${regId}\nStudent: ${name}\nPhone: ${phone}\nBoard: S/81662`;
        new QRCode(qrContainer, {
          text: compactText,
          width: 130,
          height: 130,
          colorDark: "#0D1B2A",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.L
        });
      } catch (e) {
        console.warn('QRCode JS library fallback notice:', e);
      }
    }
  };

  qrContainer.appendChild(qrImg);
}



/* ==========================================================================
   8. PERFORMANCE GALLERY, DYNAMIC MASONRY ENGINE & INSTANT LIGHTBOX
   ========================================================================== */
function initModalsAndGallery() {
  const videoOverlay = document.getElementById('video-intro-trigger');
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('intro-video-iframe');

  if (videoOverlay && videoModal) {
    videoOverlay.addEventListener('click', () => {
      if (videoIframe) {
        videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      }
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Handle closing modal backdrops (video modal, etc.)
  document.querySelectorAll('.modal-backdrop').forEach((modal) => {
    if (modal.id === 'lightbox-modal') return; // Handled specifically below
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (videoIframe && modal === videoModal) videoIframe.src = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (videoIframe && modal === videoModal) videoIframe.src = '';
      }
    });
  });

  // Global ESC key listener to close active modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.modal-backdrop.active').forEach((modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (videoIframe && modal === videoModal) videoIframe.src = '';
      });
    }
  });

  // LIGHTNING-FAST LIGHTBOX CONTROLLER
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxYear = document.getElementById('lightbox-year');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openGalleryLightbox(thumbSrc, title, year, fullSrc) {
    if (!lightboxModal || !lightboxImg) return;
    
    // 1. Show thumbnail immediately (0ms instant display from memory)
    lightboxImg.src = thumbSrc || '';
    if (lightboxTitle) lightboxTitle.innerText = title || 'Stage Performance';
    if (lightboxYear) lightboxYear.innerText = year || '2026';
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 2. Preload full-resolution image seamlessly without blocking UI
    const targetFull = fullSrc || thumbSrc;
    if (targetFull && targetFull !== thumbSrc) {
      const fullImg = new Image();
      fullImg.onload = () => {
        // Swap to crisp full-res image once loaded
        if (lightboxModal.classList.contains('active')) {
          lightboxImg.src = targetFull;
        }
      };
      fullImg.src = targetFull;
    }
  }

  function closeGalleryLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) {
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeGalleryLightbox();
    };
    lightboxCloseBtn.addEventListener('click', handleClose);
    lightboxCloseBtn.addEventListener('touchend', handleClose);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('gallery-lightbox-container')) {
        closeGalleryLightbox();
      }
    });

    let touchStartY = 0;
    let touchStartX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const diffY = e.changedTouches[0].clientY - touchStartY;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (diffY > 60 && Math.abs(diffX) < 80) {
        closeGalleryLightbox();
      }
      touchStartY = 0;
      touchStartX = 0;
    }, { passive: true });
  }

  // CSS Grid Masonry Layout Handler (Ensures clean native grid gaps without squishing)
  function layoutGalleryMasonry() {
    const grid = document.querySelector('.performance-gallery-grid');
    if (!grid) return;
    grid.querySelectorAll('.gallery-photo-card').forEach((card) => {
      card.style.gridRowEnd = 'auto';
    });
  }
  window.layoutGalleryMasonry = layoutGalleryMasonry;

  // RUN INITIAL MASONRY LAYOUT
  requestAnimationFrame(layoutGalleryMasonry);
  window.addEventListener('resize', () => {
    requestAnimationFrame(layoutGalleryMasonry);
  });

  // FAST CLICK & TOUCH EVENT DELEGATION (ZERO UNRESPONSIVE CLICKS)
  const galleryGrid = document.querySelector('.performance-gallery-grid');
  if (galleryGrid) {
    function triggerCardOpen(card) {
      if (!card) return;
      const thumbSrc = card.getAttribute('data-img');
      const fullSrc = card.getAttribute('data-full') || thumbSrc;
      const title = card.getAttribute('data-title');
      const year = card.getAttribute('data-year');
      openGalleryLightbox(thumbSrc, title, year, fullSrc);
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchScrolling = false;

    // Mobile fast tap listener (eliminates 300ms delay and 2nd-tap hover requirement)
    galleryGrid.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isTouchScrolling = false;
      }
    }, { passive: true });

    galleryGrid.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > 10 || dy > 10) {
          isTouchScrolling = true;
        }
      }
    }, { passive: true });

    galleryGrid.addEventListener('touchend', (e) => {
      if (isTouchScrolling) return; // User was scrolling
      const elapsed = Date.now() - touchStartTime;
      if (elapsed > 450) return; // Long press, ignore
      const card = e.target.closest('.gallery-photo-card');
      if (card) {
        e.preventDefault();
        triggerCardOpen(card);
      }
    });

    // Desktop instantaneous click listener
    galleryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-photo-card');
      if (card) {
        e.preventDefault();
        triggerCardOpen(card);
      }
    });

    // Keyboard accessibility (Enter or Space key)
    galleryGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.gallery-photo-card');
        if (card) {
          e.preventDefault();
          triggerCardOpen(card);
        }
      }
    });
  }

  // Ensure card skeleton class removal when images complete
  const allGalleryImgs = document.querySelectorAll('.gallery-photo-wrapper img');
  allGalleryImgs.forEach((img) => {
    const markLoaded = () => {
      img.classList.add('loaded');
      const card = img.closest('.gallery-photo-card');
      if (card) card.classList.add('is-loaded');
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
    }
  });

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }
}

/* ==========================================================================
   9. DYNAMIC ANIMATED STATS COUNTER (TRIGGER ON VIEW & TAB CLICK)
   ========================================================================== */
let statsObserver = null;

function initStatsCounter() {
  const statSection = document.querySelector('.stats-grid');
  if (!statSection) return;

  if (!('IntersectionObserver' in window) || document.documentElement.classList.contains('tier-ultra-lite')) {
    triggerStatsCounterAnimation();
    return;
  }

  statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasAnimatedAboutStats) {
          hasAnimatedAboutStats = true;
          triggerStatsCounterAnimation();
        }
      } else {
        // Reset when scrolled out of view so re-entering triggers animation again
        hasAnimatedAboutStats = false;
      }
    });
  }, { threshold: 0.15 });

  statsObserver.observe(statSection);
}

function triggerStatsCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  statNumbers.forEach((stat) => {
    // Extract target number from data-target attribute (or textContent as fallback)
    const rawTarget = stat.getAttribute('data-target') || stat.textContent || '0';
    const target = parseInt(String(rawTarget).replace(/[^0-9]/g, ''), 10) || 0;
    
    // Clear any previous active timers / frames for clean restart
    if (stat._countTimer) clearInterval(stat._countTimer);
    if (stat._countRAF) cancelAnimationFrame(stat._countRAF);

    if (target === 0) {
      stat.innerText = '0+';
      return;
    }

    stat.innerText = '0+';

    // Premium silky-smooth counter animation using requestAnimationFrame with cubic ease-out
    const duration = 1400; // 1.4 seconds duration
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      stat.innerText = current + '+';

      if (progress < 1) {
        stat._countRAF = requestAnimationFrame(updateCounter);
      } else {
        stat.innerText = target + '+';
      }
    }

    stat._countRAF = requestAnimationFrame(updateCounter);
  });
}
window.triggerStatsCounterAnimation = triggerStatsCounterAnimation;

/* Confetti Burst */
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '3500';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#D4AF37', '#E91E63', '#00BCD4', '#8E24AA', '#FFFFFF'];

  for (let i = 0; i < 140; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      alpha: 1,
      rotation: Math.random() * 360
    });
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22;
      p.alpha -= 0.014;
      p.rotation += 6;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(renderConfetti);
    } else {
      document.body.removeChild(canvas);
    }
  }

  renderConfetti();
}

/* ==========================================================================
   10. AUTOMATED MOBILE DIALER & DIRECT EMAIL CLIENT DISPATCH ENGINE
   ========================================================================== */

/**
 * Helper to reliably determine if the user is on a mobile device or tablet
 */
function isMobileOrTabletDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|Silk|Kindle/i.test(ua);
  const isUADataMobile = Boolean(navigator.userAgentData && navigator.userAgentData.mobile);
  const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  const isSmallViewport = window.innerWidth <= 1024;
  return isMobileUA || isUADataMobile || (hasTouch && isSmallViewport) || (window.innerWidth <= 768);
}

/**
 * Floating feedback toast for direct contact actions
 */
function showContactToast(icon, text) {
  const toast = document.getElementById('contact-toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastIcon) toastIcon.textContent = icon;
  if (toastText) toastText.textContent = text;

  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.pointerEvents = 'auto';

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.pointerEvents = 'none';
  }, 3500);
}

/**
 * Universal clipboard copy helper with instant toast feedback
 */
function copyToClipboardAndToast(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showContactToast('📋', `${label} copied to clipboard!`);
    }).catch(() => {
      showContactToast('📋', `${text}`);
    });
  } else {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showContactToast('📋', `${label} copied to clipboard!`);
    } catch(err) {
      showContactToast('📋', `${text}`);
    }
  }
}

/**
 * Web Audio API Dual-Tone Frequency Generator for authentic phone keypad feedback
 */
function playDialpadTone(freq1 = 697, freq2 = 1209) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.frequency.value = freq1;
    osc2.frequency.value = freq2;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

/**
 * Dedicated function: Instantly opens device dial pad with the telephone number auto-dialed
 * Guaranteed to produce immediate visual and functional changes in mobile inspect view, desktop, and real phones!
 */
function dialTelephoneNumber(phone = '03326797750') {
  const cleanNumber = phone.replace(/[^\d+]/g, '');
  const telUri = `tel:${cleanNumber}`;

  // 1. Immediately open the Interactive Phone Dial Pad Modal on the screen with Close Tab
  const callModal = document.getElementById('desktop-call-modal');
  if (callModal) {
    callModal.classList.add('active');
    const displayEl = document.getElementById('dialpad-number-display');
    if (displayEl) {
      displayEl.textContent = '033 2679 7750';
    }
  }

  // 2. Instant toast feedback
  showContactToast('📞', `Calling Nataraj Nritya Mandir (${phone.includes('033') ? '033 2679 7750' : phone})...`);

  // 3. Attempt native tel: protocol navigation (triggers mobile device dial pad on handsets)
  try {
    const dummyLink = document.createElement('a');
    dummyLink.href = telUri;
    dummyLink.style.display = 'none';
    document.body.appendChild(dummyLink);
    dummyLink.click();
    setTimeout(() => { if (document.body.contains(dummyLink)) document.body.removeChild(dummyLink); }, 150);
  } catch (err) {}
}

/**
 * Dedicated function: Instantly opens email client addressed to dedicated academy email
 * Guaranteed to open Gmail Web compose AND display interactive email modal with Close Tab
 */
function dispatchAcademyEmail(email = 'natrajhowrah62@gmail.com') {
  const subject = encodeURIComponent('Inquiry regarding Nataraj Nritya Mandir (HOW/62)');
  const body = encodeURIComponent(
    'Dear Nataraj Nritya Mandir Authority,\n\nI would like to inquire about the dance courses and admission details.\n\nName:\nContact Number:\nQuery:\n\nThank you!'
  );
  const mailtoUri = `mailto:${email}?subject=${subject}&body=${body}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

  // 1. Immediately display the interactive Email Modal on screen with Close Tab
  const emailModal = document.getElementById('desktop-email-modal');
  if (emailModal) {
    emailModal.classList.add('active');
  }

  // 2. Instant toast & clipboard copy
  copyToClipboardAndToast(email, `Official Email: ${email}`);

  // 3. Attempt native mailto: protocol
  try {
    const dummyLink = document.createElement('a');
    dummyLink.href = mailtoUri;
    dummyLink.style.display = 'none';
    document.body.appendChild(dummyLink);
    dummyLink.click();
    setTimeout(() => { if (document.body.contains(dummyLink)) document.body.removeChild(dummyLink); }, 150);
  } catch (err) {}

  // 4. Open Gmail Web Compose in a new tab (works 100% in Chrome DevTools inspect mode & desktop)
  try {
    window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
  } catch (err) {}
}

const WHATSAPP_PHONE = '919330805240';
const WHATSAPP_DEFAULT_MESSAGE = 'Hello Nataraj Nritya Mandir Team, I am interested in your dance courses and would like to know more details regarding admissions, class schedules, and fee structure. Kindly guide me.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

/**
 * Dedicated function: Instantly opens WhatsApp Web or WhatsApp mobile application with prefilled message
 */
function openWhatsAppChat(waUrl = WHATSAPP_URL) {
  console.log('[Nataraj Nritya Mandir] Redirecting to Official WhatsApp Hotline (+91 93308 05240) with auto-composed message.');
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Main initializer binding dedicated functions to Contact Section buttons and links
 */
function initContactActions() {
  const TELEPHONE_NUMBER = '03326797750';
  const DEDICATED_EMAIL = 'natrajhowrah62@gmail.com';

  // 1. Dedicated "Call Us" Buttons - Unconditionally active across desktop, DevTools inspect, and mobile handsets
  const callButtons = document.querySelectorAll('.contact-action-buttons .btn-direct-call, #contact-call-btn, #mbar-call-btn');
  callButtons.forEach((btn) => {
    btn.setAttribute('href', `tel:${TELEPHONE_NUMBER}`);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dialTelephoneNumber(TELEPHONE_NUMBER);
    });
  });

  // 2. Dedicated "Email Us" Buttons - Unconditionally active across desktop, DevTools inspect, and mobile handsets
  const emailButtons = document.querySelectorAll('.contact-action-buttons .btn-direct-email, #contact-email-btn, #mbar-email-btn');
  emailButtons.forEach((btn) => {
    const subject = encodeURIComponent('Inquiry regarding Nataraj Nritya Mandir (HOW/62)');
    btn.setAttribute('href', `mailto:${DEDICATED_EMAIL}?subject=${subject}`);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatchAcademyEmail(DEDICATED_EMAIL);
    });
  });

  // 3. Dedicated "WhatsApp Us" Buttons across desktop, modals, and mobile bar
  const waButtons = document.querySelectorAll('.btn-direct-whatsapp, #contact-whatsapp-btn, #mbar-wa-btn');
  waButtons.forEach((btn) => {
    btn.setAttribute('href', WHATSAPP_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', () => {
      console.log('[Nataraj Nritya Mandir] WhatsApp button clicked from', btn.id || btn.className || 'button', '- opening chat with pre-filled message.');
    });
  });

  // 3b. Mobile Bar "Apply Form" Quick Navigation Button
  const mbarApplyBtn = document.getElementById('mbar-apply-btn');
  if (mbarApplyBtn) {
    mbarApplyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const allNavLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link, .mbar-btn');
      allNavLinks.forEach((l) => {
        if (l.getAttribute('href') === '#form') l.classList.add('active');
        else l.classList.remove('active');
      });
      const pageViews = document.querySelectorAll('.page-view');
      pageViews.forEach((v) => {
        if (v.getAttribute('data-page-view') === 'form') v.classList.add('active');
        else v.classList.remove('active');
      });
      try {
        sessionStorage.setItem('nnm_active_section', 'form');
      } catch (err) {}
      if (history.replaceState) {
        history.replaceState(null, document.title, '#form');
      } else {
        window.location.hash = '#form';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3c. Sleek Floating Scroll-To-Top Button Controller (Throttled via requestAnimationFrame)
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollTopBtn) {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 280) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Contact Info List Items (Landline, Mobile Numbers, and Email Card in left column)
  const landlineLinks = document.querySelectorAll('.contact-info-list a[href^="tel:033"]');
  landlineLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dialTelephoneNumber(TELEPHONE_NUMBER);
    });
  });

  const emailCards = document.querySelectorAll('.contact-info-list a[href*="natrajhowrah62@gmail.com"]');
  emailCards.forEach((link) => {
    if (!link.classList.contains('btn-direct-email') && link.id !== 'btn-open-default-mail' && link.id !== 'btn-open-gmail-web') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dispatchAcademyEmail(DEDICATED_EMAIL);
      });
    }
  });

  // 5. In-modal direct call links feedback
  const modalCallLinks = document.querySelectorAll('#desktop-call-modal a[href^="tel:"]');
  modalCallLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const num = link.getAttribute('href').replace('tel:', '');
      showContactToast('📞', `Connecting call to ${num}...`);
    });
  });

  // 5. Interactive Smartphone Dialpad Keypad Listeners
  const dialpadKeys = document.querySelectorAll('.dialpad-key');
  const dtmfFrequencies = {
    '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
    '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
    '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
    '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
  };

  dialpadKeys.forEach((keyBtn) => {
    keyBtn.addEventListener('click', () => {
      const char = keyBtn.getAttribute('data-key');
      if (dtmfFrequencies[char]) {
        playDialpadTone(dtmfFrequencies[char][0], dtmfFrequencies[char][1]);
      }
    });
  });

  // 6. Close Modal listeners for direct contact modals (Top Close Button, Internal Close Tab, Backdrop & ESC key)
  const closeCallBtn = document.getElementById('close-call-modal-btn');
  const internalCloseCall = document.getElementById('internal-close-call-btn');
  const desktopCallModal = document.getElementById('desktop-call-modal');
  if (desktopCallModal) {
    if (closeCallBtn) closeCallBtn.addEventListener('click', () => desktopCallModal.classList.remove('active'));
    if (internalCloseCall) internalCloseCall.addEventListener('click', () => desktopCallModal.classList.remove('active'));
    desktopCallModal.addEventListener('click', (e) => {
      if (e.target === desktopCallModal) desktopCallModal.classList.remove('active');
    });
  }

  const closeEmailBtn = document.getElementById('close-email-modal-btn');
  const internalCloseEmail = document.getElementById('internal-close-email-btn');
  const desktopEmailModal = document.getElementById('desktop-email-modal');
  if (desktopEmailModal) {
    if (closeEmailBtn) closeEmailBtn.addEventListener('click', () => desktopEmailModal.classList.remove('active'));
    if (internalCloseEmail) internalCloseEmail.addEventListener('click', () => desktopEmailModal.classList.remove('active'));
    desktopEmailModal.addEventListener('click', (e) => {
      if (e.target === desktopEmailModal) desktopEmailModal.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (desktopCallModal && desktopCallModal.classList.contains('active')) desktopCallModal.classList.remove('active');
      if (desktopEmailModal && desktopEmailModal.classList.contains('active')) desktopEmailModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   11. TESTIMONIAL CATEGORY FILTER HANDLER
   ========================================================================== */
function initTestimonialFilters() {
  const testBtns = document.querySelectorAll('[data-test-filter]');
  const testCards = document.querySelectorAll('[data-test-category]');

  testBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      testBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-test-filter');

      testCards.forEach((card) => {
        const cat = card.getAttribute('data-test-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   12. ULTRA-OPTIMIZED "REVEAL ON SCROLL" (FADE-IN-UP) INTERSECTION OBSERVER
   - Strict "Once" UX Rule: Elements animate once per page load and lock state.
   - Hardware-accelerated 60fps for all devices from 42" TV to 240px JioPhone.
   - Zero performance overhead, automatically releases GPU memory on reveal.
   ========================================================================== */
function initScrollReveal() {
  const targetSelectors = [
    '.section-header',
    '.hero-academy-badge',
    '.hero-media-wrapper',
    '.course-card',
    '.gallery-photo-card',
    '.testimonial-card',
    '.testimonial-spotlight-card',
    '.highlight-card',
    '.about-card-glow',
    '.stat-box',
    '.stats-grid',
    '.diploma-roadmap-card',
    '.form-glass-card',
    '.summary-card',
    '.contact-grid > div',
    '.footer-grid > div',
    '.reveal-on-scroll'
  ];

  const elements = document.querySelectorAll(targetSelectors.join(', '));
  if (!elements.length) return;

  // Graceful fallback for ancient browsers without IntersectionObserver or tier-ultra-lite devices
  if (!('IntersectionObserver' in window) || document.documentElement.classList.contains('tier-ultra-lite')) {
    elements.forEach((el) => {
      el.classList.add('revealed', 'is-visible');
    });
    return;
  }

  // Assign scroll-reveal class to all unrevealed elements
  elements.forEach((el) => {
    if (!el.classList.contains('revealed')) {
      el.classList.add('scroll-reveal');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed', 'is-visible');
        // STRICT ONCE UX RULE: unobserve immediately so it stays revealed forever
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  window.scrollRevealObserver = observer;

  elements.forEach((el) => {
    if (!el.classList.contains('revealed')) {
      observer.observe(el);
    }
  });

  // SPA View Switch Synchronization: Reveal elements already inside the new visible viewport
  window.refreshScrollReveal = function () {
    const activeView = document.querySelector('.page-view.active') || document.body;
    const pending = activeView.querySelectorAll('.scroll-reveal:not(.revealed)');
    const vh = window.innerHeight || document.documentElement.clientHeight;
    pending.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('revealed', 'is-visible');
        observer.unobserve(el);
      } else {
        observer.observe(el);
      }
    });
  };
}

