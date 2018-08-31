const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', (client) => {
  let counter = 0;
  let counter2 = 0;

  client.on('move:member', (details) => {
    console.log("move:member server", details);
    io.sockets.emit('move:member', details);
  });

  client.on('move:driver', (details) => {
    console.log("move:driver server", details);
    io.sockets.emit('move:driver', details);
  });
});

app.get('/', (req, res, next) => {  
  res.sendFile(__dirname + './index.html');
});

const port = process.env.PORT || 8000;
server.listen(port);
console.log(`Listening on port ${port}`)
