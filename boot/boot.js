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

// Depois de 5s, redireciona para o React
setTimeout(() => {
  window.location.href = "index.html"; 
}, 5000);
