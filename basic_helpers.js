// Os verbos mais usados no socket.io.
io.on('connection', function(socket){
  socket.emit('request', /* */); // emit an event to the socket
  io.emit('broadcast', /* */); // emit an event to all connected sockets
  socket.on('reply', function(){ /* */ }); // listen to the event
});

// Server initialization
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Client CDN initialization
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>

// Server receiving message
// note, io(<port>) will create a http server for you
var io = require('socket.io')(80);

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

// Multiplaxing connection SERVER
var io = require('socket.io')(80);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });
  
  var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
  
  // Multiplaxing connection client
  <script>
  var chat = io.connect('http://localhost/chat')
    , news = io.connect('http://localhost/news');
    
  chat.on('connect', function () {
    chat.emit('hi!');
  });
  
  news.on('news', function () {
    news.emit('woot');
  });
</script>

// Two way send/hear message
  // SERVER
  var io = require('socket.io')(80);

  io.on('connection', function (socket) {
    socket.on('ferret', function (name, word, fn) {
      fn(name + ' says ' + word);
    });
  });
  
  // CLIENT
  <script>
    var socket = io(); // TIP: io() with no args does auto-discovery
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
      socket.emit('ferret', 'tobi', 'woot', function (data) { // args are sent in order to acknowledgement function
        console.log(data); // data will be 'tobi says woot'
      });
    });
  </script>
  
// Send message to everyone except to user that send
var io = require('socket.io')(80);

io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});




  
