import type { Gameboard } from '../components/Gameboard';

function attack(row: number, col: number, boardAttacked: Gameboard) {
  boardAttacked.receiveAttack(row, col);

  // console.log(boardAttacked);

  return boardAttacked.allShipsSunk();
}

function getComputerMoves() {
  // TODO;
  const row = 0;
  const col = 0;
  return { row, col };
}

export { attack, getComputerMoves };
