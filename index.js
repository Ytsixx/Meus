const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
  console.log('Um jogador se conectou');

  socket.on('join-game', () => {
    socket.join('game-room');
  });

  socket.on('move', data => {
    io.to('game-room').emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('Um jogador se desconectou');
  });
});

http.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});