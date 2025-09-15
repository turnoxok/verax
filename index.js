// Menú hamburguesa animado
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const menuLines = menuBtn.querySelectorAll('span');

let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navMenu.classList.toggle('open', menuOpen);
  if(menuOpen){
    menuLines[0].classList.add('rotate-45','translate-y-2');
    menuLines[1].classList.add('opacity-0');
    menuLines[2].classList.add('-rotate-45','-translate-y-2');
  } else {
    menuLines[0].classList.remove('rotate-45','translate-y-2');
    menuLines[1].classList.remove('opacity-0');
    menuLines[2].classList.remove('-rotate-45','-translate-y-2');
  }
});

// Cerrar menú al seleccionar link con scroll suave
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(menuOpen){
      navMenu.classList.remove('open');
      menuLines[0].classList.remove('rotate-45','translate-y-2');
      menuLines[1].classList.remove('opacity-0');
      menuLines[2].classList.remove('-rotate-45','-translate-y-2');
      menuOpen = false;
    }
  });
});

// Fade-in al hacer scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

// FAQs toggle
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('open'));
});

// Score animado
const scoreBar = document.getElementById('scoreBar');
const scoreValue = document.getElementById('scoreValue');
let score = 0, maxScore = 100;
const animateScore = () => {
  if(score < maxScore){
    score++;
    scoreBar.style.width = score + "%";
    scoreValue.textContent = score;
    requestAnimationFrame(animateScore);
  }
};
const scoreObs = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) animateScore();
}, { threshold: 0.5 });
scoreObs.observe(scoreBar);

// Contador usuarios
let usuarios = 0;
const usuariosCounter = document.getElementById('usuariosCounter');
const animateUsuarios = () => {
  if(usuarios < 5000){
    usuarios += Math.floor(Math.random()*20);
    usuariosCounter.textContent = usuarios;
    requestAnimationFrame(animateUsuarios);
  }
};
usuariosCounter.addEventListener('mouseenter', animateUsuarios);

// Carrusel auto-scroll
const carousel = document.getElementById('carousel');
setInterval(() => { carousel.scrollBy({ left: 300, behavior: 'smooth' }); }, 4000);

// Partículas Hero
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
class Particle {
  constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.r=2; this.vx=(Math.random()-0.5); this.vy=(Math.random()-0.5); }
  move(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width) this.vx*=-1; if(this.y<0||this.y>canvas.height) this.vy*=-1; }
  draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle="#a855f7"; ctx.fill(); }
}
for(let i=0;i<80;i++) particles.push(new Particle());
function connect(){ 
  for(let i=0;i<particles.length;i++){ 
    for(let j=i+1;j<particles.length;j++){ 
      let dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, dist=Math.sqrt(dx*dx+dy*dy); 
      if(dist<120){ ctx.strokeStyle="rgba(168,85,247,0.3)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); } 
    } 
  } 
}
function animate(){ 
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  particles.forEach(p=>{p.move();p.draw();}); 
  connect(); 
  requestAnimationFrame(animate); 
}
animate();
