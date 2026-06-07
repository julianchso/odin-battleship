import type { Gameboard } from '../components/Gameboard';

function attack(row: number, col: number, boardAttacked: Gameboard) {
  boardAttacked.receiveAttack(row, col);

  return boardAttacked.allShipsSunk();
}

function getComputerMoves(board: Gameboard) {
  let row: number = Math.floor(Math.random() * 10);
  let col: number = Math.floor(Math.random() * 10);

  while (board.hasBeenAttacked(row, col)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }

  return { row, col };
}

export { attack, getComputerMoves };
