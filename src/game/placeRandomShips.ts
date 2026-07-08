import type { Gameboard } from '../components/Gameboard';
import validatePlacementBoard from './validatePlacementBoard';

export function placeRandomShips(board: Gameboard, length: number) {
  let placed: boolean | undefined = false;

  while (!placed) {
    const randomRowIndex = Math.floor(Math.random() * 10);
    const randomColIndex = Math.floor(Math.random() * 10);

    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    const valid = validatePlacementBoard({
      row: randomRowIndex,
      col: randomColIndex,
      orientation,
      shipLength: length,
      grid: board.grid,
      GBLength: board.grid.length,
    });

    if (valid) {
      placed = board.placeShip(randomRowIndex, randomColIndex, length, orientation);
    }
  }
}
