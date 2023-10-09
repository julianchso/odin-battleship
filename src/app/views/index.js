// import Player from '../models/player';

const gameboard = document.querySelector('.gameboard');

let boardLength = 10;

function screenController() {
  for (let i = 0; i < boardLength * boardLength; i++) {
    const square = document.createElement('div');
    square.classList.add('field');
    gameboard.appendChild(square);
  }
}

screenController();
