const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`server on port ${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

//using this we are able to emit events to the browser or the client side
//using sets because we want unique socket id hence we are storing the id in sets 
let socketsConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    socketsConnected.add(socket.id)

    // Creating an event and giving it name : clients-total , it will be handeled in main.js
    io.emit('clients-total', socketsConnected.size)

    socket.on('disconnect', () => {
        console.log("socket disconnected", socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clients-total', socketsConnected.size)
    })

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })

}

