const WebSocket = require('ws');

//create Server Socket
const server = new WebSocket.Server({
    port: 4000
});

const allClients = {};

server.on('connection', (client) => {
    console.log('Client connected');
    client.send('Welcom to Server!');

    client.on('message', (message) => {
        let parsedMessage = JSON.parse(message.toString());
        if ('login' in parsedMessage) {
            allClients[parsedMessage.login] = client;
            client.send(`Welcome ${parsedMessage.login}`);
        }
        if ('target' in parsedMessage) {
            let targetClient = allClients[parsedMessage.target];
            targetClient.send(parsedMessage.namak);
        }
    });
});

