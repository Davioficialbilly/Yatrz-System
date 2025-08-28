// === Config ===
const WALLPAPERS = [
  // imagens livres do Unsplash (pode trocar pelas suas)
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517817748493-49ec54a32463?q=80&w=1920&auto=format&fit=crop"
];
const MESSAGES = [
  "Carregando núcleo gráfico...",
  "Inicializando serviços de janela...",
  "Montando sistema de arquivos virtual...",
  "Conectando apps internos...",
  "Aplicando temas e personalizações...",
  "Aquecendo partículas...",
  "Sincronizando preferências do usuário...",
  "Otimizando memória...",
  "Quase lá..."
];

// === Boot overlay control ===
const bootEl = document.getElementById("yatrz-boot");
const msgEl  = document.getElementById("boot-msg");
const barEl  = document.getElementById("boot-progress");
const canvas = document.getElementById("boot-canvas");
const ctx    = canvas.getContext("2d", { alpha: true });

// Ajusta canvas
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", resize); resize();

// Partículas (muitas, mas leves)
const PCOUNT = Math.min(260, Math.floor((innerWidth*innerHeight)/9000));
const particles = Array.from({length: PCOUNT}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*1.8+0.4,
  vx: (Math.random()-.5)*0.25,
  vy: (Math.random()-.5)*0.25,
  a: Math.random()*0.7+0.3
}));

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // brilho sutil de fundo
  const g = ctx.createRadialGradient(canvas.width*0.5, canvas.height*0.6, 0, canvas.width*0.5, canvas.height*0.6, Math.max(canvas.width, canvas.height)*0.9);
  g.addColorStop(0, "rgba(9,211,224,0.02)");
  g.addColorStop(1, "rgba(9,211,224,0.00)");
  ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.globalCompositeOperation = "lighter";
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(9,211,224,${p.a})`;
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(draw);
}
draw();

// Mensagens e progresso simulados
let progress = 0;
let msgIndex = 0;

function setMessage(text){ msgEl.textContent = text; }
function setProgress(p){ progress = Math.max(progress, p); barEl.style.width = progress + "%"; }

function tick(){
  // incrementos aleatórios para parecer orgânico
  const inc = Math.random()*9 + 3; // 3–12
  setProgress(Math.min(100, progress + inc));
  if(progress > (msgIndex+1)*(100/MESSAGES.length) && msgIndex < MESSAGES.length){
    setMessage(MESSAGES[msgIndex++]);
  }
  if(progress >= 100){
    completeBoot();
  }else{
    setTimeout(tick, 320);
  }
}
setTimeout(tick, 600);

// Ao terminar, troca papel de parede do body e esconde o overlay
function completeBoot(){
  // escolhe um wallpaper aleatório (e já agenda slideshow)
  let i = Math.floor(Math.random()*WALLPAPERS.length);
  applyWallpaper(WALLPAPERS[i]);
  setInterval(()=>{ i=(i+1)%WALLPAPERS.length; applyWallpaper(WALLPAPERS[i]); }, 15000);

  // remove overlay
  bootEl.classList.remove("visible");
  setTimeout(()=> bootEl.remove(), 600); // dá tempo da transição
}

// aplica fundo no body, mantendo gradiente base
function applyWallpaper(url){
  document.body.style.backgroundImage =
    `linear-gradient(120deg, rgba(11,16,32,.9), rgba(13,27,42,.9)), url("${url}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

// Dica: se quiser som de boot, descomente:
// const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-technology-gear-fast-rotate-3175.mp3");
// audio.volume = 0.25; audio.play().catch(()=>{/* autoplay bloqueado */});
