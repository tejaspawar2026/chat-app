import path from 'path'
import http from 'http'
import express from 'express'
import { Server } from "socket.io";

const app = express()

const server = http.createServer(app)

app.use(express.static(path.resolve('./public')))

const io = new Server(server)

// socket
io.on("connection", (socket) => {
  console.log("User Connected", socket.id)
  socket.on('usr-msg', (message) => {
    io.emit('message', message)
  })
})

app.get('/', (req, res) => {
  return res.sendFile('/public/index.html')
})

server.listen(8080, () => console.log('Server started at PORT:8080'))