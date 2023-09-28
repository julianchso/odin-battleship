import { Ship } from '../models/ship';
import { Gameboard } from '../models/gameboard';
import { playerBoard, playerGrid } from '../controller/main';

test('place a ship horizontally', () => {
  const expected = [
    ['carrier', 'carrier', 'carrier', 'carrier', 'carrier', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  expect(playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal')).toEqual(expected);
});

test('create grid', () => {
  const expected = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  // expect(playerBoard.createGrid(10, 10)).toEqual(expected);
  expect(playerBoard.createGrid(10, 10)).toEqual(expected);
});
