import Gameboard from '../models/gameboard';

let playerBoard = new Gameboard(10, 10);
let playerGrid = playerBoard.createGrid();
console.log(playerGrid);

let shipPlacement = playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal');
console.log(shipPlacement);

module.exports = { playerBoard, playerGrid };
