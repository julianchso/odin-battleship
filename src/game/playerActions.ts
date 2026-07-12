import type { Gameboard } from '../components/Gameboard';
import type { AiState, Direction } from '../types/ship';

type ComputerMove = {
  row: number;
  col: number;
  direction?: Direction | null;
};

function getComputerRandAtk(board: Gameboard): ComputerMove {
  let row: number = Math.floor(Math.random() * 10);
  let col: number = Math.floor(Math.random() * 10);

  while (board.hasBeenAttacked(row, col)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }

  return { row, col, direction: null };
}

function getComputerAdjAtk(board: Gameboard, ai: AiState): ComputerMove {
  if (ai.targetRow === null || ai.targetCol === null) {
    throw new Error('No target available');
  }

  let newRow = ai.targetRow;
  let newCol = ai.targetCol;
  let direction = ai.direction;

  const randomDir = Math.random();

  if (ai.direction === 'up') {
    while (newRow > 0 && board.isHit(newRow - 1, newCol)) {
      newRow -= 1;
    }
    console.log('direction up');
    newRow -= 1;
  } else if (ai.direction === 'down') {
    while (newRow < board.grid.length && board.isHit(newRow + 1, newCol)) {
      newRow += 1;
    }
    console.log('direction down');
    newRow += 1;
  } else if (ai.direction === 'right') {
    while (newCol < board.grid.length && board.isHit(newRow, newCol + 1)) {
      newCol += 1;
    }
    console.log('direction right');
    newCol += 1;
  } else if (ai.direction === 'left') {
    while (newCol > 0 && board.isHit(newRow, newCol - 1)) {
      newCol -= 1;
    }
    console.log('direction left');
    newCol -= 1;
  }

  if (ai.direction === null) {
    if (randomDir < 0.25) {
      // up
      newRow -= 1;
      direction = 'up';
      console.log('direction null up');
    } else if (randomDir < 0.5) {
      // down
      newRow += 1;
      direction = 'down';
      console.log('direction null down');
    } else if (randomDir < 0.75) {
      // right
      newCol += 1;
      direction = 'right';
      console.log('direction null right');
    } else {
      // left
      newCol -= 1;
      direction = 'left';
      console.log('direction null left');
    }
  }

  return {
    row: newRow,
    col: newCol,
    direction: direction,
  };
}

function getComputerMoves(board: Gameboard, ai: AiState) {
  if (ai.mode === 'hunting') {
    return getComputerRandAtk(board);
  }

  return getComputerAdjAtk(board, ai);
}

export { getComputerRandAtk, getComputerMoves };
