const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const { group } = require('console');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../public')));

var groups = [];
var id = 0;
var lookup = {};

wss.on('connection', (ws) => {
    ws.id = id++;
    lookup[ws.id] = ws;
    lookup[1].send(JSON.stringify({ type: "log", content: "hello"}));
    console.log(lookup)
    console.log('A client connected');
    console.log(groups);
    // groups.forEach(element => {
    //     Broadcast(element);
    // });

    ws.on('message', (message) => {
        const receivedData = JSON.parse(message);
        console.log('Received: ' + receivedData.type);
        
        switch (receivedData.type) {
            case "message":
                Broadcast(JSON.stringify(receivedData));
                break;
            case "CreateGroup":
                groups.push(JSON.stringify(receivedData));
                Broadcast(JSON.stringify(receivedData));
            default:
                break;
        }

        // Broadcast message to all clients
    });
});

const PORT = process.env.PORT || 10000;
const ip = '0.0.0.0'; // Replace with your computer's IP address
server.listen(PORT, ip, () => {
    console.log(`Server running at http://${ip}:${PORT}/`);
});

function Broadcast(data){
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}