// Custom namespaces
  // Server
  const nsp = io.of('/my-namespace');
  nsp.on('connection', function(socket){
    console.log('someone connected');
  });
  nsp.emit('hi', 'everyone!');
  
  // Client
  const socket = io('/my-namespace');
  
// joining and leaving on a room (para sair, troque o join por leave)
io.on('connection', function(socket){
  socket.join('some room');
});

// Sending a event on a room
io.to('some room').emit('some event');

// Brodcasting a event to a unique socket called socket#id
io.on('connection', function(socket){
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
});

