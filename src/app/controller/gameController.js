import Gameboard from '../models/gameboard';

let playerBoard = new Gameboard(10, 10);
let playerGrid = playerBoard.createGrid();
console.log(playerGrid);

playerBoard.placeShip('carrier', 5, [0, 0], 'horizontal');
// playerBoard.placeShip('battleship', 4, [5, 0], 'horizontal');
playerBoard.placeShip('battleship', 4, [0, 5], 'horizontal');
playerBoard.placeShip('submarine', 3, [1, 5], 'vertical');
playerBoard.placeShip('destroyer', 3, [1, 6], 'vertical');
console.log(playerGrid);

playerBoard.receiveAttack([0, 0]);
playerBoard.receiveAttack([6, 0]);

console.log(playerBoard.fleet);

console.log(playerBoard);

// module.exports = { playerBoard, playerGrid };
