// Menu hamburguesa smooth
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

// Scroll smooth para botones
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('btnAutogestion').addEventListener('click', () => scrollToSection('autogestion'));

// Fade-in
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

// FAQs interactivo
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.querySelector('p').classList.toggle('hidden');
  });
});

// Score Crediticio 0-100 animado
const scoreBar = document.getElementById('scoreBar');
const scoreText = document.getElementById('scoreText');
const scoreSection = document.getElementById('informes');
let scoreAnimated = false;

const scoreObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting && !scoreAnimated){
    scoreAnimated = true;
    let score = 0;
    const interval = setInterval(() => {
      if(score >= 85){ clearInterval(interval); } // ejemplo: 85%
      else{
        score++;
        scoreBar.style.width = score + '%';
        scoreText.textContent = score + '/100';
      }
    }, 15);
  }
}, { threshold: 0.5 });
scoreObserver.observe(scoreSection);

// Usuarios que generaron cartas
const usuariosCounter = document.getElementById('usuariosCounter');
let usuarios = 0;
const userObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting){
    const interval = setInterval(()=>{
      if(usuarios >= 1245){ clearInterval(interval); }
      else { usuarios++; usuariosCounter.textContent = usuarios; }
    }, 10);
  }
}, { threshold: 0.5 });
userObserver.observe(usuariosCounter.parentElement);

// Hero canvas partículas con líneas
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let width, height;
function resize(){ width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

const particles = [];
const particleCount = 60;
for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
    radius: 2 + Math.random()*2
  });
}

function animate(){
  ctx.fillStyle = '#0b0033';
  ctx.fillRect(0,0,width,height);
  // partículas
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x <0 || p.x>width) p.vx*=-1;
    if(p.y<0 || p.y>height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = '#9f7aea';
    ctx.fill();
  });
  // líneas
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle = 'rgba(159,122,234,'+(1-dist/120)+')';
        ctx.lineWidth=1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

// Mover partículas con mouse
canvas.addEventListener('mousemove', e=>{
  particles.forEach(p=>{
    const dx = p.x - e.clientX;
    const dy = p.y - e.clientY;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if(dist<100){
      p.vx += dx*0.0005;
      p.vy += dy*0.0005;
    }
  });
});
