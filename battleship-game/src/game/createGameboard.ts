import { createShip } from './createShip';
import type { Ship } from './createShip';

type GridCell = Ship | null;

export default function createGameBoard(GBLength: number) {
  const grid: GridCell[][] = Array.from({ length: GBLength }, () => Array(GBLength).fill(null));
  const shipList: Ship[] = [];
  const attacksMissed = new Set<string>();
  const attacksHit = new Set<string>();
  const attacksSquare = new Set<string>();

  function placeShip(
    row: number,
    col: number,
    shipLength: number,
    orientation: 'horizontal' | 'vertical',
  ) {
    createShip(shipLength);

    if (orientation == 'horizontal') {
      if (col + shipLength > GBLength) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (grid[row][col + i] !== null) {
          return false;
        }
      }

      const ship = createShip(shipLength);

      for (let i = 0; i < shipLength; i++) {
        grid[row][col + i] = ship;
      }

      shipList.push(ship);
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

      const ship = createShip(shipLength);

      for (let i = 0; i < shipLength; i++) {
        grid[row + i][col] = ship;
      }

      shipList.push(ship);
    }
  }

  function receiveAttack(row: number, col: number) {
    const cell = grid[row][col];
    const key = `${row},${col}`;

    if (attacksSquare.has(key)) {
      return;
    }

    if (row < 0 || row >= GBLength || col < 0 || col >= GBLength) {
      return;
    }

    attacksSquare.add(key);

    if (cell !== null) {
      cell.hit();
      attacksHit.add(`${row},${col}`);
      return 'hit';
    } else {
      attacksMissed.add(`${row},${col}`);
      return 'miss';
    }
  }

  function allShipsSunk() {
    return shipList.every((ship) => ship.isSunk());
  }

  function hasBeenAttacked(row: number, col: number) {
    const key = `${row}, ${col}`;

    return attacksSquare.has(key);
  }

  function isMiss(row: number, col: number) {
    return attacksMissed.has(`${row},${col}`);
  }

  function isHit(row: number, col: number) {
    return attacksHit.has(`${row},${col}`);
  }

  return { grid, placeShip, receiveAttack, allShipsSunk, hasBeenAttacked, isMiss, isHit };
}
