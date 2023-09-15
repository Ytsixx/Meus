document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const board = document.getElementById('board');
  const cells = Array.from({ length: 9 }, (_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    return cell;
  });

  cells.forEach(cell => {
    board.appendChild(cell);
    cell.addEventListener('click', () => makeMove(cell));
  });

  let currentPlayer = 'x';

  socket.emit('join-game');

  socket.on('move', data => {
    const { index, player } = data;
    cells[index].textContent = player;
    cells[index].classList.add(player);
    currentPlayer = player === 'x' ? 'o' : 'x';
  });

  function makeMove(cell) {
    const index = cell.dataset.index;
    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      socket.emit('move', { index, player: currentPlayer });
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  }
});