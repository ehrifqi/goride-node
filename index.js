const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const cors = require('cors');
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());


io.on('connection', (socket) => {
  socket.on('newbooking:customer', (activeBook) => {
    console.log(`A new booking! ${Math.random(5)}`, JSON.stringify(activeBook, undefined, 2));
    io.sockets.emit('newbooking:customer', activeBook);
  });

  socket.on('newbooking:membercancellation', (activeBook) => {
    console.log("canceled");
    io.sockets.emit('newbooking:membercancellation', activeBook);
  });

  socket.on('newbooking:drivercancellation', (activeBook) => {
    io.sockets.emit('newbooking:drivercancellation', activeBook)
  })

  socket.on('newbooking:accepted', (activeBook) => {
    io.sockets.emit('newbooking:accepted', activeBook)
  })

  socket.on('newbooking:pickedup', (activeBook) => {
    console.log("From driver: pickedup");
    io.sockets.emit('newbooking:pickedup', activeBook)
  })

  socket.on('newbooking:arrived', (activeBook) => {
    console.log("From driver: Customer arrived safely!");
    io.sockets.emit('newbooking:arrived', activeBook);
  })
});

app.get('/', (req, res, next) => {  
  res.sendFile(__dirname + './index.html');
});

const port = process.env.PORT || 8000;
server.listen(port);
console.log(`Listening on port ${port}`)
