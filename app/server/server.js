const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../public')));

wss.on('connection', (ws) => {
    console.log('A client connected');
    const welcome = {
        type : "log",
        user : "server",
        content : "Welcome"
    };


    ws.on('message', (message) => {
        const receivedData = JSON.parse(message);
        console.log('Received: ' + receivedData);

        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(receivedData));
            }
        });
    });
});

const PORT = process.env.PORT || 10000;
const ip = '44.226.145.213'; // Replace with your computer's IP address
server.listen(PORT, ip, () => {
    console.log(`Server running at http://${ip}:${PORT}/`);
});
