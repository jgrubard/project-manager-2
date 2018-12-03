require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
// let userSocket = {};

// console.log(userSocket);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`** PORT ${port} **`));

let io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('made socket connection', socket.id);
  // socket.on('user-online', userId => {
  //   userSocket[userId] = socket;
  // })
  socket.on('task-created', task => {
    socket.broadcast.emit('task-created', task);
  });

  socket.on('task-updated', task => {
    socket.broadcast.emit('task-updated', task);
  });

  socket.on('task-deleted', task => {
    socket.broadcast.emit('task-deleted', task);
  })

  socket.on('disconnect', () => console.log('client disconnected'))
});

app.use(require('body-parser').json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/api', require('./routes'));

db.conn.sync();

// module.exports = { userSocket }; 








// require('dotenv').config();
// const { app, express, io } = require('./socket');
// const db = require('./db');
// const path = require('path');

// app.use(require('body-parser').json());

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

// app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
// app.use('/public', express.static(path.join(__dirname, '../client/public')));
// app.use('/dist', express.static(path.join(__dirname, '../dist')));
// app.use('/api', require('./routes'));

// db.conn.sync();