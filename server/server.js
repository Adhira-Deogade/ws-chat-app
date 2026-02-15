const ws = require('ws');
const server = new ws.Server(
    {
        port: '3000'
    }
);

server.on('connection', socket => {
    console.log('Someone connected')
    socket.on('message', message => {
        console.log('Got a message');
        const b = Buffer.from(message);
        console.log(b.toString());
        socket.send("You entered " + `${message}`);
        console.log('I want to broadcast');
    })
})
