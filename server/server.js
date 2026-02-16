import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()
// cors: {
//         origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
//     }
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
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        console.log('I want to broadcast');
    })
})

httpServer.listen(3500, () => console.log("Listening on port 3500"))