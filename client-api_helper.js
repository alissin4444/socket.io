// Forms of importing the library
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io('http://localhost');
  </script>

  const io = require('socket.io-client');
  // or with import syntax
  import io from 'socket.io-client';

// Query parameters
  const socket = io('http://localhost?token=abc');

  // server-side
  const io = require('socket.io')();

  // middleware
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (isValid(token)) {
      return next();
    }
    return next(new Error('authentication error'));
  });

  // then
  io.on('connection', (socket) => {
    let token = socket.handshake.query.token;
    // ...
  });
  
  ---
  const socket = io({
    query: {
      token: 'cde'
    }
  });
  
  ---
  socket.on('reconnect_attempt', () => {
    socket.io.opts.query = {
      token: 'fgh'
    }
  });











