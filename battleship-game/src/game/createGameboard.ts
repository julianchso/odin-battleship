import { createShip } from './createShip';
import type { Ship } from './createShip';

type GridCell = Ship | null;

export default function createGameBoard(GBLength: number) {
  const grid: GridCell[][] = Array.from({ length: GBLength }, () => Array(GBLength).fill(null));
  const shipList: Ship[] = [];
  const missedAttacks: [number, number][] = [];
  const attacksGrid = new Set<string>();

  function placeShip(
    row: number,
    col: number,
    shipLength: number,
    alignment: 'horizontal' | 'vertical',
  ) {
    const shipsLength = [2, 3, 3, 4, 5];

    for (let i = 0; i < shipsLength.length; i++) {
      shipList.push(createShip(shipsLength[i]));
    }

    if (alignment == 'horizontal') {
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

    if (alignment == 'vertical') {
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

    if (attacksGrid.has(key)) {
      return;
    }

    if (row < 0 || row >= GBLength || col < 0 || col >= GBLength) {
      return;
    }

    attacksGrid.add(key);

    if (cell !== null) {
      cell.hit();
      return 'hit';
    } else {
      missedAttacks.push([row, col]);
      return 'miss';
    }
  }

  function allShipsSunk() {
    return shipList.every((ship) => ship.isSunk());
  }

  return { grid, placeShip, receiveAttack, allShipsSunk };
}
