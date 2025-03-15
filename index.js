const express = require('express');  
const app = express(); 
const http = require('http'); 
const server = http.createServer(app);  // Crea il server HTTP
const { Server } = require("socket.io");  // Importa Socket.IO
const io = new Server(server);  // Inizializza Socket.IO
const port = 3000;  


app.use(express.static('public'));  

// Gestisce le connessioni socket
io.on('connection', (socket) => {
    console.log('Un utente si è connesso');
    
    // Gestisce l'entrata di un utente con username
    socket.on('join', (username) => {
        socket.username = username;  // Memorizza l'username nel socket
        io.emit('message', {  // Invia un messaggio a tutti
            user: 'System',
            text: `${username} si è unito alla chat.`,
            time: new Date().toLocaleTimeString()
        });
    });

    // Gestisce i messaggi in chat
    socket.on('chat message', (msg) => {
        io.emit('message', {  // Trasmette il messaggio a tutti i client
            user: socket.username || 'Anonymous',  // Usa username o 'Anonymous'
            text: msg,
            time: new Date().toLocaleTimeString()  // Aggiunge timestamp
        });
    });

    // Gestisce la disconnessione
    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso');
        if (socket.username) {
            io.emit('message', {  // Notifica tutti dell'uscita
                user: 'System',
                text: `${socket.username} ha lasciato la chat.`,
                time: new Date().toLocaleTimeString()
            });
        }
    });
});

// Avvia il server su tutti gli indirizzi di rete
server.listen(port, '0.0.0.0', () => {
        // Ottiene l'indirizzo IP locale
        const { networkInterfaces } = require('os');
        const nets = networkInterfaces();
        let localIPs = [];
        
        // Trova tutti gli indirizzi IPv4 non-interni
        for (const name of Object.keys(nets)) {
                for (const net of nets[name]) {
                        // Salta indirizzi non-IPv4 e interni
                        if (net.family === 'IPv4' && !net.internal) {
                                // Include solo IP LAN standard
                                if (net.address.startsWith('192.168.') || 
                                        net.address.startsWith('10.')) {
                                        localIPs.push(net.address);
                                }
                        }
                }
        }
        
        console.log(`Server is running on http://localhost:${port}`);
        
        if (localIPs.length > 0) {
                console.log(`\nNetwork addresses to connect from other devices:`);
                localIPs.forEach(ip => {
                        console.log(`http://${ip}:${port}`);
                });
        } else {
                console.log(`\nNo standard network interfaces detected. Make sure you're connected to a valid network not a virtual env.`);
        }
});
