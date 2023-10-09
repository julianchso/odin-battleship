import { Ship } from '../models/ship';
import { Gameboard } from '../models/gameboard';
import { playerBoard, playerGrid } from '../controller/gameController';
import Player from '../models/player';
import player from '../controller/gameController';

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
  expect(player.playerMoves.placeShip('carrier', 5, [0, 0], 'horizontal')).toEqual(expected);
});

test.skip('place a ship horizontally', () => {
  const expected = [
    ['carrier', '', '', '', '', '', '', '', '', ''],
    ['carrier', '', '', '', '', '', '', '', '', ''],
    ['carrier', '', '', '', '', '', '', '', '', ''],
    ['carrier', '', '', '', '', '', '', '', '', ''],
    ['carrier', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  expect(playerBoard.placeShip('carrier', 5, [0, 0], 'vertical')).toEqual(expected);
});

test.skip('create grid', () => {
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

test.skip('trying to place a ship out of bounds', () => {
  expect(playerBoard.outOfBounds(5, 5, 10)).toBeFalsy();
});

test.skip('trying to place a ship out of bounds', () => {
  expect(playerBoard.outOfBounds(5, 8, 10)).toBeTruthy();
});

test.skip('trying to place a ship over another ship', () => {
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

describe('all ships sunk', () => {
  test.skip('all ships placed', () => {
    const expected = [
      ['carrier', 'carrier', 'carrier', 'carrier', 'carrier', '', '', '', '', ''],
      ['battleship', 'battleship', 'battleship', 'battleship', '', '', '', '', '', ''],
      ['submarine', 'submarine', 'submarine', '', '', '', '', '', '', ''],
      ['destroyer', 'destroyer', 'destroyer', '', '', '', '', '', '', ''],
      ['patrol boat', 'patrol boat', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];
    expect(playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal')).toEqual(expected);
    expect(playerBoard.placeShip('battleship', 4, [1, 0], 'horizontal')).toEqual(expected);
    expect(playerBoard.placeShip('submarine', 4, [2, 0], 'horizontal')).toEqual(expected);
    expect(playerBoard.placeShip('destroyer', 4, [3, 0], 'horizontal')).toEqual(expected);
    expect(playerBoard.placeShip('patrol boat', 4, [4, 0], 'horizontal')).toEqual(expected);
  });
});
