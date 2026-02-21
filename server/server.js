import express from "express"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

const PORT = process.env.PORT || 3500

// we are running frontend and backend on the same server
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(
    express.static(
        path.join(__dirname, "public")
    )
)
const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// We are hosting the frontend of the application with express
// along with the server
const io = new Server(expressServer, {
    // cors: {
    //     origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    //     // Add this line to explicitly set the CORS header
    //     headers: {
    //         "Access-Control-Allow-Origin": "http://localhost:5500",
    //         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    //         "Access-Control-Allow-Headers": "Content-Type, Authorization"
    //     }
    // }
})


io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    // Upon connection, only to user
    socket.emit('message', 'Welcome to chat app!')

    // Upcon connection to all others
    socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} connected`)

    // Listening for message event
    socket.on('message', data => {
        console.log(`Got a message ${data}`);
        // I would use broadcast if I want to send data
        // to all other clients except source client
        // To send message to all the connected clients,
        // I will use io.emit()
        // socket.broadcast.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        // To send data to only the source client,
        // I will use socket.emit()
        // socket.broadcast.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        // io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
        console.log('I want to broadcast');
    })

    // Listening for disconnection
    // Message to all others
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} disconnected`)
    })

    // Listen for activity
    // name is username
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })
})

// io.emit - send message to everone connected to the server
// socket.emit - send message to only the current user/client