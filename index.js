require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SocketServer = require('./socket');

// middleware
const app = express();
app.use(cors());

//Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL
  }
});

io.on('connection', socket => {
  SocketServer(socket);
});

// Port
const PORT = process.env.PORT;

http.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
