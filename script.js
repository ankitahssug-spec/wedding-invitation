/* ════════════════════════════════════════
   WEDDING INVITATION — SCRIPT.JS
   All interactivity, animations, utils
════════════════════════════════════════ */

'use strict';

/* ── DOM ready ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAOS();
  initHeroSlideshow();
  initPetals();
  initSparkles();
  initCountdown();
  initScrollProgress();
  initBackToTop();
  initMusic();
  initWishes();
  initParallax();
});

/* ════════════════════════════════════════
   LOADER (Section 1)
════════════════════════════════════════ */
function initLoader() {
  const loader    = document.getElementById('loader');
  const bar       = document.getElementById('loaderBar');
  const pct       = document.getElementById('loaderPercent');

  let progress = 0;
  const step = () => {
    // Increase speed near end to feel snappy
    const inc = progress < 70 ? Math.random() * 10 + 5 : Math.random() * 4 + 1;
    progress = Math.min(progress + inc, 100);

    bar.style.width = progress + '%';
    pct.textContent  = Math.round(progress) + '%';

    if (progress < 100) {
      setTimeout(step, 80 + Math.random() * 60);
    } else {
      // Finish & fade out
      setTimeout(() => {
        loader.classList.add('hidden');
        // Trigger hero entrance animations
        document.querySelectorAll('.hero-content [data-aos]').forEach(el => {
          el.style.transitionDelay = '0s';
        });
        // Fire confetti on first open
        launchConfetti();
      }, 600);
    }
  };

  // Sprinkle some petals on the loader too
  spawnLoaderPetals();
  setTimeout(step, 300);
}

function spawnLoaderPetals() {
  const container = document.getElementById('petalRain');
  if (!container) return;
  const emojis = ['🌸','🌺','✿','❀','🌷'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:-5%;
      font-size:${0.8 + Math.random()*0.8}rem;
      animation:floatDown ${5+Math.random()*5}s ${Math.random()*4}s linear infinite;
      opacity:0.5;
    `;
    container.appendChild(p);
  }
}

/* ════════════════════════════════════════
   AOS INIT
════════════════════════════════════════ */
function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
}

/* ════════════════════════════════════════
   HERO SLIDESHOW (Section 2)
════════════════════════════════════════ */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;
  const next = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  };
  setInterval(next, 5000);
}

/* ════════════════════════════════════════
   FLOATING PETALS & SPARKLES (Section 2)
════════════════════════════════════════ */
function initPetals() {
  const container = document.getElementById('floatingPetals');
  if (!container) return;
  const emojis = ['🌸','🌺','🌼','✿','❀','🌷'];

  const spawn = () => {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${0.8+Math.random()*1}rem;
      animation-duration:${8+Math.random()*8}s;
      animation-delay:${Math.random()*2}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  };

  for (let i = 0; i < 14; i++) setTimeout(spawn, i * 400);
  setInterval(spawn, 1200);
}

function initSparkles() {
  const container = document.getElementById('sparkles');
  if (!container) return;

  const spawn = () => {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-duration:${2+Math.random()*2}s;
      animation-delay:${Math.random()*2}s;
      width:${3+Math.random()*3}px;
      height:${3+Math.random()*3}px;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  };

  for (let i = 0; i < 20; i++) setTimeout(spawn, i * 200);
  setInterval(spawn, 400);
}

/* ════════════════════════════════════════
   COUNTDOWN (Section 5)
════════════════════════════════════════ */
function initCountdown() {
  // Wedding date: 14 Feb 2026 19:00 IST
  const target = new Date('2026-02-14T19:00:00+05:30').getTime();

  const pad = n => String(n).padStart(2, '0');
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs')
  };

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(e => { if (e) e.textContent = '00'; });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (els.days)  els.days.textContent  = pad(d);
    if (els.hours) els.hours.textContent = pad(h);
    if (els.mins)  els.mins.textContent  = pad(m);
    if (els.secs)  els.secs.textContent  = pad(s);
  };

  tick();
  setInterval(tick, 1000);
}

/* ════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
}

/* ════════════════════════════════════════
   BACK TO TOP
════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ════════════════════════════════════════
   MUSIC CONTROL
════════════════════════════════════════ */
function initMusic() {
  const audio = document.getElementById('bgMusic');
  const btn   = document.getElementById('musicBtn');
  const icon  = document.getElementById('musicIcon');

  if (!audio || !btn) return;

  let playing = false;

  // Try autoplay (will be blocked by most browsers; user will click)
  const tryAutoplay = () => {
    audio.volume = 0.35;
    audio.play().then(() => {
      playing = true;
      icon.className = 'fa-solid fa-pause';
      btn.classList.add('playing');
    }).catch(() => {
      // Autoplay blocked — silently wait for user interaction
    });
  };

  // Attempt after loader completes
  setTimeout(tryAutoplay, 2500);

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      icon.className = 'fa-solid fa-music';
      btn.classList.remove('playing');
      playing = false;
    } else {
      audio.play();
      icon.className = 'fa-solid fa-pause';
      btn.classList.add('playing');
      playing = true;
    }
  });
}

/* ════════════════════════════════════════
   PARALLAX
════════════════════════════════════════ */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxBg = document.querySelector('.countdown-bg');
  if (!parallaxBg) return;

  window.addEventListener('scroll', () => {
    const section = document.getElementById('countdown');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = (rect.top / window.innerHeight) * 30;
    parallaxBg.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

/* ════════════════════════════════════════
   LIGHTBOX (Section 9)
════════════════════════════════════════ */
function openLightbox(item) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const src = item.querySelector('img').src;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ════════════════════════════════════════
   RSVP FORM (Section 11)
════════════════════════════════════════ */
function submitRSVP() {
  const name   = document.getElementById('rsvpName');
  const phone  = document.getElementById('rsvpPhone');
  const attend = document.getElementById('rsvpAttend');
  const err    = document.getElementById('formError');

  // Validation
  if (!name.value.trim()) {
    err.textContent = 'Please enter your name.'; name.focus(); return;
  }
  if (!phone.value.trim() || !/^[+\d\s\-()]{7,}$/.test(phone.value)) {
    err.textContent = 'Please enter a valid phone number.'; phone.focus(); return;
  }
  if (!attend.value) {
    err.textContent = 'Please indicate your attendance.'; attend.focus(); return;
  }
  err.textContent = '';

  // Success
  document.getElementById('rsvpForm').style.display = 'none';
  document.getElementById('rsvpSuccess').classList.remove('hidden');
  launchConfetti(3000);
}

/* ════════════════════════════════════════
   COPY HELPERS
════════════════════════════════════════ */
function copyAddress() {
  const addr = 'The Grand Palace, Juhu Scheme, Near Juhu Beach, Mumbai, Maharashtra 400049';
  copyToClipboard(addr, 'copyBtnText', 'Copied!');
}

function copyUPI() {
  copyToClipboard('arjun.priya@okicici', 'upiCopyText', 'Copied!');
}

function copyToClipboard(text, btnId, successLabel) {
  navigator.clipboard.writeText(text).then(() => {
    const el = document.getElementById(btnId);
    if (!el) return;
    const orig = el.textContent;
    el.textContent = successLabel;
    setTimeout(() => el.textContent = orig, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  });
}

/* ════════════════════════════════════════
   SHARE INVITATION
════════════════════════════════════════ */
function shareInvitation() {
  const data = {
    title: 'Arjun & Priya Wedding Invitation',
    text: '💍 You are cordially invited to the wedding of Arjun & Priya on 14 Feb 2026!',
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(data);
  } else {
    copyToClipboard(window.location.href, null, null);
    alert('Invitation link copied to clipboard!');
  }
}

/* ════════════════════════════════════════
   WISHES (Section 14)
════════════════════════════════════════ */
function initWishes() {
  // Duplicate marquee content for seamless loop
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const clone = track.innerHTML;
  track.innerHTML += clone; // Duplicate for seamless infinite scroll
}

function addWish() {
  const input = document.getElementById('wishInput');
  if (!input || !input.value.trim()) return;

  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  // Add to both halves of the doubled marquee
  const items = track.querySelectorAll('.wish-bubble');
  const mid   = Math.floor(items.length / 2);

  const wish = input.value.trim();
  const bubble = `<div class="wish-bubble">"${wish}" — A Guest</div>`;

  // Insert at mid-point of track for even distribution
  items[mid].insertAdjacentHTML('beforebegin', bubble);
  items[mid + 1]?.insertAdjacentHTML('beforebegin', bubble); // mirror in second half

  input.value = '';
  input.placeholder = 'Thank you for your wish! ❤';
  setTimeout(() => input.placeholder = 'Leave your wish for the couple...', 3000);
}

/* ════════════════════════════════════════
   CONFETTI ANIMATION
════════════════════════════════════════ */
function launchConfetti(duration = 4000) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const colors = ['#c9a86c','#e8d4a2','#fff','#a8843e','#f5edd8','#ffd700','#ffb6c1'];
  const pieces = [];

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 3 + Math.random() * 5,
      r: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      vr: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let start = null;
  const frame = ts => {
    if (!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.r  += p.vr;
      p.vy += 0.05; // gravity
      if (elapsed > duration - 1000) p.alpha = Math.max(0, p.alpha - 0.01);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
  };

  requestAnimationFrame(frame);
}

/* ════════════════════════════════════════
   RESIZE HANDLER
════════════════════════════════════════ */
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confettiCanvas');
  if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}, { passive: true });

/* ════════════════════════════════════════
   GSAP SCROLL ANIMATIONS (if loaded)
════════════════════════════════════════ */
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero names stagger
  gsap.from('.hero-names span', {
    duration: 1.2,
    y: 60,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 2.5
  });

  // Section headings
  gsap.utils.toArray('.script-heading').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    });
  });

  // Event cards parallax
  gsap.utils.toArray('.event-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      duration: 0.7,
      y: 40,
      opacity: 0,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });
});

/* ════════════════════════════════════════
   KEYBOARD NAVIGATION (a11y)
════════════════════════════════════════ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openLightbox(item);
  });
});
// Background Music
const music = document.getElementById("bgMusic");

document.addEventListener("click", () => {
    music.play().catch(err => console.log("Music blocked:", err));
}, { once: true });