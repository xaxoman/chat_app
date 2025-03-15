// Inizializzazione della connessione socket
const socket = io();
let username = null;

// Richiedi username al caricamento della pagina
window.addEventListener('load', () => {
    while (!username || username.trim() === '') {
        username = prompt('Please enter your username:');
        
        // Se l'utente annulla il prompt
        if (username === null) {
            username = 'Anonymous' + Math.floor(Math.random() * 1000);
            break;
        }
    }
    
    // Partecipa alla chat
    socket.emit('join', username);
});

// Gestisci l'invio del form del messaggio
document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        // Invia il messaggio al server
        socket.emit('chat message', message);
        input.value = '';
    }
});

// Gestisci i messaggi in arrivo
socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    
    // Determina il tipo di messaggio (sistema, utente o altro)
    if (msg.user === 'System') {
        messageDiv.className = 'message system-message'; // Messaggio di sistema COLORE GRIGIO CENTRATO
    } else if (msg.user === username) {
        messageDiv.className = 'message user-message'; // Messaggio dell'utente COLORE BLU
    } else { 
        messageDiv.className = 'message other-message'; // Messaggio di altri utenti COLORE GRIGIO
    }
    
    // Crea il contenuto del messaggio
    const header = document.createElement('div');
    header.className = 'message-header';
    
    const userSpan = document.createElement('span');
    userSpan.className = 'username';
    userSpan.textContent = msg.user;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = msg.time;
    
    header.appendChild(userSpan);
    header.appendChild(timeSpan);
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = msg.text;
    
    messageDiv.appendChild(header);
    messageDiv.appendChild(content);
    messages.appendChild(messageDiv);
    
    // Scorri automaticamente al messaggio più recente
    messages.scrollTop = messages.scrollHeight;
});
