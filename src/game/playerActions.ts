import type { Gameboard } from '../components/Gameboard';
import type { AiState, Direction } from '../types/ship';
import { isInBounds } from './isInBounds';

type ComputerMove = {
  row: number;
  col: number;
  attemptedDirection: Direction | null;
};

function getComputerRandAtk(board: Gameboard): ComputerMove {
  let row: number = Math.floor(Math.random() * 10);
  let col: number = Math.floor(Math.random() * 10);

  while (board.hasBeenAttacked(row, col)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }

  return { row, col, attemptedDirection: null };
}

function getComputerAdjAtk(board: Gameboard, ai: AiState): ComputerMove {
  if (ai.targetRow === null || ai.targetCol === null) {
    throw new Error('No target available');
  }

  let newRow = ai.targetRow;
  let newCol = ai.targetCol;
  let targetDirection = ai.targetDirection;
  let attemptedDirection: Direction | null = null;

  console.log('START:', {
    targetRow: ai.targetRow,
    targetCol: ai.targetCol,
    targetDirection: ai.targetDirection,
  });

  if (targetDirection === 'up') {
    while (newRow >= 0 && board.isHit(newRow, newCol)) {
      newRow -= 1;
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      targetDirection = 'down';
      newRow = ai.targetRow + 1;
    }
  } else if (targetDirection === 'down') {
    while (newRow <= board.grid.length - 1 && board.isHit(newRow, newCol)) {
      newRow += 1;
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      targetDirection = 'up';
      newRow = ai.targetRow - 1;
    }
  } else if (targetDirection === 'right') {
    while (newCol <= board.grid.length - 1 && board.isHit(newRow, newCol)) {
      newCol += 1;
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      targetDirection = 'left';
      newCol = ai.targetCol - 1;
    }
  } else if (targetDirection === 'left') {
    while (newCol >= 0 && board.isHit(newRow, newCol)) {
      newCol -= 1;
    }
    if (board.hasBeenAttacked(newRow, newCol)) {
      targetDirection = 'right';
      newCol = ai.targetCol + 1;
    }
  }

  if (targetDirection === null) {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];

    const availableDirections = directions.filter((direction) => {
      if (ai.triedDirection.includes(direction)) return false;

      let row = ai.targetRow;
      let col = ai.targetCol;

      if (row === null || col === null) return;

      if (direction === 'up') {
        row -= 1;
      } else if (direction === 'down') {
        row += 1;
      } else if (direction === 'left') {
        col -= 1;
      } else if (direction === 'right') {
        col += 1;
      }

      if (!isInBounds(board, row, col)) return false;
      if (board.hasBeenAttacked(row, col)) return false;

      return true;
    });

    console.log(availableDirections);

    if (availableDirections.length === 0) {
      console.log('NO AVAILABLE DIRECTIONS', {
        ai,
        targetRow: ai.targetRow,
        targetCol: ai.targetCol,
      });
    }

    attemptedDirection =
      availableDirections[Math.floor(Math.random() * availableDirections.length)];

    if (attemptedDirection === 'up') {
      newRow -= 1;
    } else if (attemptedDirection === 'down') {
      // down
      newRow += 1;
    } else if (attemptedDirection === 'right') {
      // right
      newCol += 1;
    } else if (attemptedDirection === 'left') {
      // left
      newCol -= 1;
    }
  }

  console.log('END:', {
    targetRow: ai.targetRow,
    targetCol: ai.targetCol,
    targetDirection: ai.targetDirection,
  });

  return {
    row: newRow,
    col: newCol,
    attemptedDirection,
  };
}

function getComputerMoves(board: Gameboard, ai: AiState) {
  if (ai.mode === 'hunting') {
    return getComputerRandAtk(board);
  }

  return getComputerAdjAtk(board, ai);
}

export { getComputerRandAtk, getComputerMoves };
