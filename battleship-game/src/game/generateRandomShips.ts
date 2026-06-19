import createGameBoard from './createGameboard';
import type { ShipState, ShipId } from '../App';

export function generateRandomShips(): ShipState[] {
  const tempBoard = createGameBoard(10);

  const shipTypes: { id: ShipId; length: number }[] = [
    { id: 'carrier', length: 5 },
    { id: 'battleship', length: 4 },
    { id: 'destroyer', length: 3 },
    { id: 'submarine', length: 3 },
    { id: 'patrol-boat', length: 2 },
  ];

  return shipTypes.map((ship) => {
    let placed = false;

    let row = 0;
    let col = 0;
    let orientation: 'horizontal' | 'vertical' = 'horizontal';

    while (!placed) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);

      orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

      placed = tempBoard.placeShip(row, col, ship.length, orientation);
    }

    return {
      id: ship.id,
      length: ship.length,
      row,
      col,
      orientation,
    };
  });
}
