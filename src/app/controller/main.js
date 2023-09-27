import Gameboard from '../models/gameboard';

let playerBoard = new Gameboard(10, 10);
let playerGrid = playerBoard.createGrid();

let carrier = playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal');
console.log(carrier);

module.exports = { playerBoard };
