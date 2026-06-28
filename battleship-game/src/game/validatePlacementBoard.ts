import type { GridCell } from './createGameboard';

type ValidatePlacementBoardProps = {
  row: number;
  col: number;
  orientation: 'horizontal' | 'vertical';
  shipLength: number;
  grid: GridCell[][];
  GBLength: number;
};

export default function validatePlacementBoard({
  row,
  col,
  orientation,
  shipLength,
  grid,
  GBLength,
}: ValidatePlacementBoardProps) {
  if (orientation == 'horizontal') {
    if (col + shipLength > GBLength) {
      return false;
    }
  }

  if (orientation == 'vertical') {
    if (row + shipLength > GBLength) {
      return false;
    }
  }

  for (let i = 0; i < shipLength; i++) {
    let newRow = row;
    let newCol = col;
    if (orientation === 'horizontal') {
      newCol += i;
    } else {
      newRow += i;
    }

    if (grid[newRow][newCol] !== null) {
      return false;
    }
  }
  return true;
}
