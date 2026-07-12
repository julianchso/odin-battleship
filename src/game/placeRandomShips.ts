import type { Gameboard } from '../components/Gameboard';
import type { ShipState } from '../types/ship';
import validatePlacementBoard from './validatePlacementBoard';

export function placeRandomShips(board: Gameboard, ship: ShipState) {
  let placed: boolean | undefined = false;

  while (!placed) {
    const randomRowIndex = Math.floor(Math.random() * 10);
    const randomColIndex = Math.floor(Math.random() * 10);

    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    const valid = validatePlacementBoard({
      row: randomRowIndex,
      col: randomColIndex,
      orientation,
      shipLength: ship.length,
      grid: board.grid,
      GBLength: board.grid.length,
    });

    if (valid) {
      placed = board.placeShip(randomRowIndex, randomColIndex, ship.length, orientation, ship.id);
    }
  }
}
