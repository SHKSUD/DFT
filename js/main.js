// ── VIDEO PLAYER — swap featured on click ──
function selectVideo(el) {
  const id = el.dataset.id;
  const tag = el.dataset.tag;
  const title = el.dataset.title;
  const guest = el.dataset.guest;
  document.getElementById('featured-iframe').src =
    'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
  document.getElementById('featured-tag').textContent = tag;
  document.getElementById('featured-title').textContent = title;
  document.getElementById('featured-guest').textContent = guest;
  document.querySelectorAll('#watch .video-card-small').forEach(c => c.style.background = '');
  el.style.background = 'var(--surface2)';
}
function selectVideoAndScroll(el) {
  selectVideo(el);
  document.getElementById('watch').scrollIntoView({ behavior: 'smooth' });
}
// Hover overlays on bottom row
document.querySelectorAll('.thumb-overlay').forEach(ov => {
  ov.parentElement.addEventListener('mouseenter', () => ov.style.opacity = '1');
  ov.parentElement.addEventListener('mouseleave', () => ov.style.opacity = '0');
});

// ── NAVIGATION active state on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
  // Nav background
  document.getElementById('main-nav').style.background =
    window.scrollY > 60 ? 'rgba(8,10,14,0.98)' : 'rgba(8,10,14,0.85)';
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── VIDEO CATEGORY BUTTONS ──
document.querySelectorAll('.video-cat-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.video-cat-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── COUNTDOWN TIMER ──
const eventDate = new Date('2026-06-28T09:00:00+05:30').getTime();
function updateCountdown() {
  const now = Date.now();
  let diff = Math.max(0, eventDate - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ── MODAL ──
function openModal(tab='join') {
  document.getElementById('auth-modal').classList.add('open');
  switchTab(tab, document.querySelector('.modal-tab'));
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('auth-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBg(e) {
  if (e.target === document.getElementById('auth-modal')) closeModal();
}
function switchTab(tab, btn) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelectorAll('.modal-tab')[tab === 'join' ? 0 : 1].classList.add('active');
  document.getElementById('modal-join-form').style.display = tab === 'join' ? 'block' : 'none';
  document.getElementById('modal-login-form').style.display = tab === 'login' ? 'block' : 'none';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── HAMBURGER ──
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');
  if (menuOpen) {
    links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(8,10,14,0.98);padding:20px;gap:0;border-bottom:1px solid var(--border);z-index:99;';
    links.querySelectorAll('a').forEach(a => { a.style.borderBottom = '1px solid var(--border)'; a.style.padding = '16px'; });
  } else {
    links.style.cssText = '';
    links.querySelectorAll('a').forEach(a => { a.style.cssText = ''; });
  }
}