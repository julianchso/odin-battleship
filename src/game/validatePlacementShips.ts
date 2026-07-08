import type { ShipState } from '../types/ship';
// import type { GridCell } from './createGameboard';

export type ValidatePlacementShipsProps = {
  // grid: GridCell[][];
  row: number;
  col: number;
  orientation: 'horizontal' | 'vertical';
  shipLength: number;
  existingShips: ShipState[];
  GBLength: number;
};

export function validatePlacementShips({
  // grid,
  row,
  col,
  orientation,
  shipLength,
  existingShips,
  GBLength,
}: ValidatePlacementShipsProps) {
  // check grid boundaries
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

  // Check new ship against existing ship
  for (const existingShip of existingShips) {
    if (existingShip.row === null || existingShip.col === null) {
      continue;
    }

    for (let i = 0; i < existingShip.length; i++) {
      let existingRow = existingShip.row;
      let existingCol = existingShip.col;

      if (existingShip.orientation === 'horizontal') {
        existingCol += i;
      } else if (existingShip.orientation === 'vertical') {
        existingRow += i;
      }

      for (let j = 0; j < shipLength; j++) {
        let newRow = row;
        let newCol = col;

        if (orientation === 'horizontal') {
          newCol += j;
        } else {
          newRow += j;
        }

        if (newRow === existingRow && newCol === existingCol) {
          return false;
        }
      }
    }
  }

  return true;
}
