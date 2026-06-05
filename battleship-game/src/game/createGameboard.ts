import { createShip } from './createShip';
import type { Ship } from './createShip';

export default function createGameBoard(GBLength: number) {
  const grid = Array.from({ length: GBLength }, () => Array(GBLength).fill(''));
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
      for (let i = 0; i < shipLength; i++) {
        if (grid[row][col + i] === 1) {
          return false;
        }

        if (col + shipLength > GBLength) {
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
      for (let i = 0; i < shipLength; i++) {
        if (grid[row + i][col] === 1) {
          return false;
        }

        if (row + shipLength > GBLength) {
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

    attacksGrid.add(key);

    if (cell !== null) {
      cell.hit();
    } else {
      missedAttacks.push([row, col]);
    }
  }

  return { grid, placeShip, receiveAttack };
}
