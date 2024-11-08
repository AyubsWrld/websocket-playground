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
      console.log("is connected")
    }else{
      console.log("is disconnected")
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

io.listen(3000);
