const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../public')));

wss.on('connection', (ws) => {
    console.log('A client connected');

    ws.on('message', (message) => {
        console.log('Received: ' + message);
        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
const ip = '192.168.1.6'; // Replace with your computer's IP address
server.listen(PORT, ip, () => {
    console.log(`Server running at http://${ip}:${PORT}/`);
});
