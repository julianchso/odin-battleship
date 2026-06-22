import type { GridCell } from './createGameboard';

type ValidatePlacementProps = {
  grid: GridCell[][];
  row: number;
  col: number;
  orientation: 'horizontal' | 'vertical';
  shipLength: number;
  GBLength: number;
};

export function validatePlacement({
  grid,
  row,
  col,
  orientation,
  shipLength,
  GBLength,
}: ValidatePlacementProps) {
  if (orientation == 'horizontal') {
    if (col + shipLength > GBLength) {
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (grid[row][col + i] !== null) {
        return false;
      }
    }
  }

  if (orientation == 'vertical') {
    if (row + shipLength > GBLength) {
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (grid[row + i][col] !== null) {
        return false;
      }
    }
  }

  return true;
}
