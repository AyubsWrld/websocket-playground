import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: ['http://localhost:8081']
  }
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  // Listen for messages from the client
  socket.on('clientMessage', (flag) => {
    if(flag === 1){
      console.log("User is Participating within the lock")
    }else{
      console.log("User is not Participating within the lock")
      socket.to(socket.id).emit("serverMessage" , "Server message")
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

io.listen(3000);
