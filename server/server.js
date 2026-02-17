import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
        // Add this line to explicitly set the CORS header
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:5500",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    }
})


io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    socket.on('message', data => {
        console.log(`Got a message ${data}`);
        // I would use broadcast if I want to send data
        // to all other clients except source client
        // To send message to all the connected clients,
        // I will use io.emit()
        // socket.broadcast.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        console.log('I want to broadcast');
    })
})

httpServer.listen(3500, () => console.log("Listening on port 3500"))