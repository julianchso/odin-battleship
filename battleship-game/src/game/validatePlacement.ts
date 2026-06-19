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
      console.log('horizontal out of bounds');
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (grid[row][col + i] !== null) {
        console.log('horizontal overlap');

        return false;
      }
    }
  }

  if (orientation == 'vertical') {
    if (row + shipLength > GBLength) {
      console.log('vertical out of bounds');
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (grid[row + i][col] !== null) {
        console.log('vertical overlap');
        return false;
      }
    }
  }

  return true;
}
