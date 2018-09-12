import * as express from 'express';
import { renderToString } from 'react-dom/server';
import * as React from 'react';
import { App } from './components/app';
import * as io from 'socket.io';


const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(renderToString(React.createElement(App))));
    res.send();

})

const server = app.listen(8080, function () {
    console.log('Started server under `http://localhost:8080`');
});

const websocketServer = io(server);
websocketServer.on('connection', socket => {
    const clientId = socket.id;
    socket.on("disconnect", () => {
        console.log('a user left', clientId);
        websocketServer.emit('reciveMessage', `Client ${clientId} left`);
    });

    socket.on('sendMessage', (message) => {
        console.log('Got message from client', message);
        websocketServer.emit('reciveMessage', `Client ${clientId}: ${message}`);
    })

    console.log('a user connected', clientId);
    websocketServer.emit('reciveMessage', `Client ${clientId} joined`);
});

function htmlTemplate(reactMarkup: string) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React Example</title>
            </head>
            <body>
               <div id="app">${reactMarkup}</div>
               <script src="/js/client.bundle.js" defer></script>
            </bod>
        </html>
    `
}