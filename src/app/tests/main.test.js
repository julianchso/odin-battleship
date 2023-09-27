import { Ship } from '../models/ship';
import { Gameboard } from '../models/gameboard';
import { playerBoard } from '../controller/main';

test('place a ship horizontally', () => {
  const expected = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];
  expect(playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal')).toContain(expected);
});
