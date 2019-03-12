const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.send("<h1>Hello, I'm Backend</h1>");
});

io.on('connection', client => {
  let interval = null;

  client.emit('connection', 'Socket.io connected');

  client.on('disconnect', () => {
    console.log('disconnect');
    clearInterval(interval);
  });

  /**
   *  Events
   */
  client.on('something', data => {
    console.log('message: ' + data);
    interval = setInterval(() => {
      io.emit('something', data);
    }, 5000);
  });
});

server.listen(4444, function() {
  console.log('listening on http://localhost:4444/');
});
