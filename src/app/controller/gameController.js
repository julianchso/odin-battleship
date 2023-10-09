import Gameboard from '../models/gameboard';
import Player from '../models/player';

let player = new Player();

// player.playerMoves.placeShip('carrier', 5, [0, 0], 'horizontal');
player.playerMoves.placeShip('carrier', 5, [0, 0], 'vertical');
player.playerMoves.placeShip('battleship', 4, [5, 0], 'vertical');

export default player;
