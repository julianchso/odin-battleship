import type { Gameboard } from '../components/Gameboard';
import type { AiState } from '../types/ship';

type ComputerMove = {
  row: number;
  col: number;
};

function getComputerRandAtk(board: Gameboard): ComputerMove {
  let row: number = Math.floor(Math.random() * 10);
  let col: number = Math.floor(Math.random() * 10);

  while (board.hasBeenAttacked(row, col)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }

  return { row, col };
}

function getComputerAdjAtk(board: Gameboard, ai: AiState): ComputerMove {
  if (ai.targetRow === null || ai.targetCol === null) {
    throw new Error('No target available');
  }

  let newRow = ai.targetRow;
  let newCol = ai.targetCol;

  const randomDir = Math.random();

  if (ai.direction === null) {
    if (randomDir < 0.25) {
      // up
      newRow -= 1;
    } else if (randomDir < 0.5) {
      // down
      newRow += 1;
    } else if (randomDir < 0.75) {
      // right
      newCol += 1;
    } else {
      // left
      newCol -= 1;
    }
  }

  if (ai.direction === 'up') {
    newRow -= 1;
  } else if (ai.direction === 'down') {
    newRow += 1;
  } else if (ai.direction === 'right') {
    newCol += 1;
  } else if (ai.direction === 'left') {
    newCol -= 1;
  }

  return {
    row: newRow,
    col: newCol,
  };
}

function getComputerMoves(board: Gameboard, ai: AiState) {
  if (!ai.hit) {
    return getComputerRandAtk(board);
  }

  return getComputerAdjAtk(board, ai);
}

export { getComputerRandAtk, getComputerMoves };
