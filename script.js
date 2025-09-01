// ===== Theme Toggle with localStorage =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(mode) {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  themeToggle.innerHTML = mode === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
const saved = localStorage.getItem('theme') || 'light';
setTheme(saved);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(next);
});

// ===== Typing Effect (pure JS) =====
const typingEl = document.querySelector('.typing-text');
const cursorEl = document.querySelector('.cursor');
try {
  const phrases = JSON.parse(typingEl.getAttribute('data-phrases'));
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi % phrases.length];
    if (!deleting) {
      typingEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      typingEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi++;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 600);
} catch (e) {
  // fallback: deja el texto original si algo falla
}

// ===== Reveal on Scroll (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== Card tilt + shine (sin librerías) =====
document.querySelectorAll('.tilt').forEach(card => {
  const shine = card.querySelector('.shine');
  const bounds = () => card.getBoundingClientRect();
  const damp = 20; // menor = más giro

  function onMove(e) {
    const b = bounds();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    card.style.transform = `rotateY(${x * damp}deg) rotateX(${-y * damp}deg) translateY(-4px)`;
    shine.style.left = `${(x + 0.5) * 100 - 50}%`;
    shine.style.top  = `${(y + 0.5) * 100 - 50}%`;
  }
  function onLeave() {
    card.style.transform = '';
  }
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
