// Menu hamburguesa
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => { navMenu.classList.toggle('hidden'); });

// Scroll smooth para botones
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Animación fade-in
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

// FAQs interactivo
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const p = item.querySelector('p');
    p.classList.toggle('hidden');
  });
});

// Simulación contador dinámico
let usuarios = 1245;
setInterval(() => {
  usuarios += Math.floor(Math.random()*3);
  document.getElementById('usuariosCounter').textContent = usuarios;
}, 3000);

// Hero: movimiento por mouse
const heroTextEls = document.querySelectorAll('.hero-text');
const heroAvatar = document.querySelector('.hero-avatar');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  heroTextEls.forEach(el => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  heroAvatar.style.transform = `translate(${x/2}px, ${y/2}px)`;
});
