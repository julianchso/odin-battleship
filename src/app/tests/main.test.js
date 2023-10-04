import { Ship } from '../models/ship';
import { Gameboard } from '../models/gameboard';
import { playerBoard, playerGrid } from '../controller/gameController';

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

test('trying to place a ship out of bounds', () => {
  expect(playerBoard.outOfBounds(5, 5, 10)).toBeFalsy();
});

test('trying to place a ship out of bounds', () => {
  expect(playerBoard.outOfBounds(5, 8, 10)).toBeTruthy();
});

test('trying to place a ship over another ship', () => {
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
  expect(playerBoard.placeShip('battleship', 4, [0, 0], 'horizontal')).toEqual(expected);
});
