const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    // methods:['GET', 'POST'],
  }
})

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`)
  socket.on('send_msg', async(data) => {
    console.log(`get from client:`, socket.id, '  ', data);
    // socket.broadcast.emit('send_msg', data);
    // await new Promise(resolve => setTimeout(resolve, 5000))
    io.to(socket.id).emit('send_msg', data);
  })
});

server.listen(3001,() => {
  console.log('server running');
})