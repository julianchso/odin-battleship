import type { Gameboard } from '../components/Gameboard';

export function randomShipPlacement(board: Gameboard, length: number) {
  let placed = false;

  while (!placed) {
    const randomRowIndex = Math.floor(Math.random() * 10);
    const randomColIndex = Math.floor(Math.random() * 10);

    const isHorizontal = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    console.log(`${randomRowIndex}, ${randomColIndex}`);

    placed = board.placeShip(randomRowIndex, randomColIndex, length, isHorizontal);
  }
}
