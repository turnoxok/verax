// Menu hamburguesa
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

// Scroll smooth
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Fade-in animation
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

// FAQs
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const p = item.querySelector('p');
    p.classList.toggle('hidden');
  });
});

// Contador usuarios
let usuarios = 0;
const userCounter = document.getElementById('usuariosCounter');
setInterval(() => {
  if(usuarios < 1245) usuarios += Math.floor(Math.random()*3);
  userCounter.textContent = usuarios;
}, 3000);

// Barra Score Crediticio
const scoreBar = document.getElementById('scoreBar');
const scoreText = document.getElementById('scoreText');
window.addEventListener('scroll', () => {
  const section = document.getElementById('informes');
  const rect = section.getBoundingClientRect();
  if(rect.top < window.innerHeight && rect.bottom > 0) {
    let progress = Math.min(100, Math.floor((window.innerHeight - rect.top)/rect.height*100));
    scoreBar.style.width = progress + '%';
    scoreText.textContent = progress + '/100';
  }
});

// Hero canvas particles
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let lines = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Crear partículas
for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    vx: Math.random()*0.5-0.25,
    vy: Math.random()*0.5-0.25
  });
}

// Animación
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(159,122,234,0.7)';
    ctx.fill();
  });
  // Conectar líneas
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx=particles[i].x-particles[j].x;
      let dy=particles[i].y-particles[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<100){
        ctx.beginPath();
        ctx.strokeStyle='rgba(159,122,234,'+(0.3-(dist/300))+')';
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

// Testimonios carrusel
const container = document.getElementById('testimoniosContainer');
let isDown = false, startX, scrollLeft;
container.addEventListener('mousedown', (e)=>{
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});
container.addEventListener('mouseleave', ()=>{isDown=false;});
container.addEventListener('mouseup', ()=>{isDown=false;});
container.addEventListener('mousemove', e=>{
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;
});
container.addEventListener('touchstart', e=>{
  startX = e.touches[0].pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});
container.addEventListener('touchmove', e=>{
  const x = e.touches[0].pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;
});
