# Applicazione di Chat per Rete Locale

Un'applicazione di chat in tempo reale che consente agli utenti sulla stessa rete locale (WiFi) di scambiare messaggi.

## 📌 Concetti Utilizzati

- **Express**: Framework per applicazioni web Node.js
- **WebSockets**: Tecnologia per comunicazione bidirezionale in tempo reale
- **Socket.IO**: Libreria per implementare WebSockets

## 🔹 Caratteristiche

- Messaggistica in tempo reale tramite WebSockets
- Funziona in qualsiasi browser web
- Non richiede database (i messaggi non vengono salvati)
- Interfaccia utente semplice e intuitiva
- Notifiche di accesso e uscita degli utenti

## 🔹 Come Funziona

1. Gli utenti si connettono all'applicazione accedendo all'indirizzo del server dalla stessa rete WiFi
2. Ogni utente inserisce un nome utente
3. I messaggi inviati vengono mostrati immediatamente a tutti gli utenti connessi
4. Il sistema notifica quando un utente si unisce o lascia la chat

## 📋 Requisiti

- [Node.js](https://nodejs.org/) (versione 12 o superiore)
- Connessione alla stessa rete WiFi per tutti i partecipanti

## 🚀 Installazione e Avvio

1. Clona o scarica questo repository
2. Apri un terminale nella cartella del progetto
3. Installa le dipendenze:
   ```
   npm install
   ```
4. Avvia il server:
   ```
   node index.js
   ```
5. Il terminale mostrerà gli indirizzi IP disponibili, ad esempio:
   ```
   Server is running on http://localhost:3000
   
   Network addresses to connect from other devices:
   http://192.168.1.5:3000
   ```
6. Per accedere dalla stessa macchina, usa `http://localhost:3000`
7. Per accedere da altri dispositivi sulla stessa rete, usa l'indirizzo IP mostrato (es. `http://192.168.1.5:3000`)

## 💻 Struttura del Progetto

- `index.js` - Server principale (Express e Socket.IO)
- `public/` - Directory per i file statici
  - `index.html` - Interfaccia utente HTML
  - `style.css` - Stili CSS
  - `client.js` - Logica client-side JavaScript

## 🔄 Come Utilizzare

1. Apri l'applicazione nel tuo browser
2. Inserisci un nome utente quando richiesto
3. Scrivi messaggi nella casella di testo in basso e premi "Send"
4. I tuoi messaggi appariranno allineati a destra con sfondo verde
5. I messaggi degli altri utenti appariranno allineati a sinistra con sfondo grigio
6. I messaggi di sistema (entrate e uscite) appariranno centrati con sfondo grigio chiaro

## ⚠️ Note Importanti

- L'applicazione funziona solo quando gli utenti sono connessi alla stessa rete WiFi
- Non c'è autenticazione o crittografia - non usare per informazioni sensibili
- I messaggi non persistono dopo il riavvio del server o la disconnessione

## 🤝 Contribuire

Sentiti libero di contribuire a questo progetto con suggerimenti, miglioramenti o correzioni di bug!

## 📜 Licenza

Questo progetto è fornito con licenza MIT. Vedi il file LICENSE per maggiori dettagli.
