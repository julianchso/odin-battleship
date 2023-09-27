import { Ship } from './ship';

// let carrier = document.querySelector('');

class Gameboard {
  constructor(row, column) {
    this.grid = [];
    this.missedAttacks = [];
    this.shipPlacement = [];
    this.row = row;
    this.column = column;
  }

  createGrid() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        this.grid.push([i, j]);
      }
    }
    return this.grid;
  }

  // set row(val) {
  //   this.row = val;
  // }

  // set column(val) {
  //   this.column = val;
  // }

  // place ship at grid coordinates
  placeShip(shipName, shipLength, start, alignment) {
    // initialize ship class object
    let ship = new Ship(shipName, shipLength);
    // record start of ship (i.e. ship's bow)
    const [x, y] = start;

    // if alignment is horizontal, add ship coordinates to shipPlacement array along the X axis
    if (alignment == 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        this.shipPlacement.push([x, y + i]);
        console.log('horizontal');
      }
      // if alignment is vertical, add ship coordinates to shipPlacement array along the Y axis
    } else if (alignment == 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        this.shipPlacement.push([x + i, y]);
        console.log('vertical');
      }
    }
    console.log(this.shipPlacement);
    return this.shipPlacement;
  }

  placeVertical() {}

  // Gameboards should have a receiveAttack function that takes a pair of coordinates
  // determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
  // or records the coordinates of the missed shot.
  receiveAttack(coords) {
    const [x, y] = coords;
  }

  // Gameboards should keep track of missed attacks so they can display them properly

  // Gameboards should be able to report whether or not all of their ships have been sunk.
}

export default Gameboard;
