// Menu hamburguesa
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('hidden'));

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
  const counter = document.getElementById('usuariosCounter');
  if(counter) counter.textContent = usuarios;
}, 3000);
