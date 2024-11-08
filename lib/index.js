const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

console.log('Server IP:', '192.168.1.75');

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

const port = 4000;

// Add a test route
app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

io.on("connection", (socket) => {
  console.log("A user connected! ID:", socket.id);
  
  // Send a welcome message to the connected client
  socket.emit('welcome', { message: 'Successfully connected to server!' });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Listen on all network interfaces
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http:// :${port}`);
});
