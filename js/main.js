// Shared header/footer for inner pages (index.html keeps its own)
const NAV = [['home','index.html','Home'],['about','about.html','About'],['services','services.html','Services'],
  ['numerology','numerology-complete.html','Numerology'],['vastu','vastu.html','Vastu'],
  ['testimonials','testimonials.html','Testimonials'],['contact','contact.html','Contact']];
const hdr = document.getElementById('site-header');
if (hdr) {
  const page = document.body.dataset.page;
  hdr.outerHTML = `<header><div class="container nav">
    <a href="index.html" class="logo">Vastu<span>byaloka</span></a>
    <button class="burger" aria-label="Menu">☰</button>
    <nav><ul>${NAV.map(n => `<li><a href="${n[1]}" class="${n[0]===page?'active':''}">${n[2]}</a></li>`).join('')}</ul></nav>
  </div></header>`;
}
const ftr = document.getElementById('site-footer');
if (ftr) {
  ftr.outerHTML = `<footer>
    <div class="socials">
      <a href="https://www.instagram.com/vastubyaloka" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://www.facebook.com/vastubyaloka" target="_blank" rel="noopener" aria-label="Facebook">
        <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
    </div>
    <p>© 2026 Vastubyaloka · Begumpet, Hyderabad · Website by Siddharth Web World</p>
  </footer>
  <a class="wa" href="https://wa.me/918488072694" target="_blank" rel="noopener">💬 WhatsApp</a>`;
}

// Splash: show once per browser session
const splash = document.getElementById('splash');
if (splash) {
  if (sessionStorage.getItem('splashSeen')) splash.remove();
  else setTimeout(() => {
    splash.classList.add('hide');
    sessionStorage.setItem('splashSeen', '1');
    setTimeout(() => splash.remove(), 800);
  }, 2400);
}
// Mobile menu
const burger = document.querySelector('.burger'), nav = document.querySelector('nav');
burger?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')), {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Enquiry form -> opens WhatsApp with the details filled in
document.getElementById('enquiryForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hello Vastubyaloka, I'm ${f.get('name')} (${f.get('phone')}). Service: ${f.get('service')}. ${f.get('message')}`;
  window.open('https://wa.me/919951522575?text=' + encodeURIComponent(msg), '_blank');
});