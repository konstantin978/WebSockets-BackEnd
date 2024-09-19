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
        try {
            let parsedMessage = JSON.parse(message.toString());

            if ('login' in parsedMessage) {
                allClients[parsedMessage.login] = client;
                return client.send(`Welcome ${parsedMessage.login}`);
            }

            if ('target' in parsedMessage) {
                let targetClient = allClients[parsedMessage.target];
                if (!targetClient) {
                    return client.send('Not Found!');
                }
                targetClient.send(parsedMessage.namak);
            }
        } catch (err) {
            throw new Error(err);
        }
    });

    client.on('close', () => {
        console.log('Client Disconnected');
        for (let key in allClients) {
            if (allClients[key] === client) {
                delete allClients[key];
                console.log(`${key} Deleted :)`);
                break;
            }
        }
    });

    client.on('error', (error) => {
        throw new Error(error);
    });
});

