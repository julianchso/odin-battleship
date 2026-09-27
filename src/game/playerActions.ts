import type { Gameboard } from '../components/Gameboard';
import type { AiState, Direction } from '../types/ship';
import { isInBounds } from './isInBounds';

type ComputerMove = {
  row: number;
  col: number;
  direction?: Direction | null;
  triedDirection?: Direction[] | null;
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
  let triedDirection = ai.triedDirection;

  console.log('START:', {
    targetRow: ai.targetRow,
    targetCol: ai.targetCol,
    direction: ai.direction,
  });

  const randomDir = Math.random();

  if (direction === 'up') {
    while (newRow >= 0 && board.isHit(newRow, newCol)) {
      newRow -= 1;
      console.log('while up');
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      console.log('up is exhausted');
      direction = 'down';
    }
  } else if (direction === 'down') {
    while (newRow <= board.grid.length - 1 && board.isHit(newRow, newCol)) {
      newRow += 1;
      console.log('while down');
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      console.log('down is exhausted');
      direction = 'up';
    }
  } else if (direction === 'right') {
    while (newCol <= board.grid.length - 1 && board.isHit(newRow, newCol)) {
      newCol += 1;
      console.log('while right');
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      console.log('right is exhausted');
      direction = 'left';
    }
  } else if (direction === 'left') {
    while (newCol >= 0 && board.isHit(newRow, newCol)) {
      newCol -= 1;
      console.log('while left');
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      console.log('left is exhausted');
      direction = 'right';
    }
  }

  if (direction === null) {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    const availableDirections = directions.filter(
      (direction) => !ai.triedDirection.includes(direction),
    );

    const attemptedDirection =
      availableDirections[Math.floor(Math.random() * availableDirections.length)];

    if (attemptedDirection === 'up') {
      newRow -= 1;
      if (board.isHit(newRow, newCol)) {
        direction = 'up';
      }
    } else if (attemptedDirection === 'down') {
      // down
      newRow += 1;
      if (board.isHit(newRow, newCol)) {
        direction = 'down';
      }
    } else if (attemptedDirection === 'right') {
      // right
      newCol += 1;
      if (board.isHit(newRow, newCol)) {
        direction = 'right';
      }
    } else if (attemptedDirection === 'left') {
      // left
      newCol -= 1;
      if (board.isHit(newRow, newCol)) {
        direction = 'left';
      }
    }
  }

  console.log('RETURN:', {
    row: newRow,
    col: newCol,
    direction,
    triedDirection,
  });

  return {
    row: newRow,
    col: newCol,
    direction: direction,
    triedDirection: triedDirection,
  };
}

function getComputerMoves(board: Gameboard, ai: AiState) {
  if (ai.mode === 'hunting') {
    return getComputerRandAtk(board);
  }

  return getComputerAdjAtk(board, ai);
}

export { getComputerRandAtk, getComputerMoves };
