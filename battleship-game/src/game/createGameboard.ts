import { createShip } from './createShip';

export default function createGameBoard(GBLength: number) {
  const grid = Array.from({ length: GBLength }, () => Array(GBLength).fill(''));
  const shipList: Ship[] = [];

  function placeShip(row: number, col: number, shipLength: number) {
    const changeAlignment = 'vertical' ? 'horizontal' : 'vertical';
    const alignment = 'vertical';

    const shipsLength = [2, 3, 3, 4, 5];

    for (let i = 0; i < shipsLength.length; i++) {
      shipList.push(createShip(shipsLength[i]));
    }

    if (alignment == 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        if (grid[row][col + i] === '1') {
          return false;
        }

        if (col + shipLength > GBLength) {
          return false;
        }

        grid[row][col + i] = '1';
      }

      shipList.push(createShip(shipLength));
    }

    if (alignment == 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        if (grid[row][col + i] === '1') {
          return false;
        }

        if (row + shipLength > GBLength) {
          return false;
        }

        grid[row + i][col] = '1';
      }

      shipList.push(createShip(shipLength));
    }
  }

  return { grid, placeShip };
}
