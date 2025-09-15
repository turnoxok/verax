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

// --- Partículas Hero ---
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#fff','#3ACFD5','#6D5BFF','#FFD700'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3+1;
    this.speedX = (Math.random()-0.5)*0.5;
    this.speedY = (Math.random()-0.5)*0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 100) {
      this.x -= dx*0.03;
      this.y -= dy*0.03;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0) this.x = canvas.width;
    if(this.x > canvas.width) this.x = 0;
    if(this.y < 0) this.y = canvas.height;
    if(this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for(let i=0;i<150;i++){ particles.push(new Particle()); }

let mouse = {x:0,y:0};
window.addEventListener('mousemove', (e)=>{ mouse.x=e.clientX; mouse.y=e.clientY; });

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update(mouse);
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
