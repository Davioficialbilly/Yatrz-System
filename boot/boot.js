const messages = [
  "Inicializando kernel...",
  "Carregando interface gráfica...",
  "Conectando usuários...",
  "Iniciando serviços...",
  "Pronto para começar!"
];

let i = 0;
const msgDiv = document.getElementById("messages");

function showMessages() {
  if (i < messages.length) {
    msgDiv.textContent = messages[i];
    i++;
    setTimeout(showMessages, 800);
  }
}

showMessages();

// Função para redirecionar ao React
function goToReact() {
  // Se o React estiver na raiz:
  window.location.href = "/"; 

  // Se estiver em uma pasta específica:
  // window.location.href = "/app"; 
}

// --- CONFIGURAÇÃO ---
// true = boot aparece sempre
// false = boot só aparece na 1ª vez
const ALWAYS_SHOW_BOOT = false;  

if (ALWAYS_SHOW_BOOT) {
  // Sempre mostra o boot
  setTimeout(goToReact, 5000);
} else {
  // Mostra apenas na primeira vez
  const alreadyVisited = localStorage.getItem("bootDone");
  if (alreadyVisited) {
    // Já visitou → pula o boot e vai pro React direto
    goToReact();
  } else {
    // Primeira vez → roda boot e salva no navegador
    localStorage.setItem("bootDone", "true");
    setTimeout(goToReact, 5000);
  }
}
