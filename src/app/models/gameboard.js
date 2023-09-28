import { Ship } from './ship';

// record where ships are by writing their name on coordinates when placing them.
// if receiveAttack() is on a coordinate with shipName, increase ship hit() by 1.

class Gameboard {
  constructor(row, column) {
    this.grid = [];
    this.missedAttacks = [];
    this.row = row;
    this.column = column;
  }

  createGrid() {
    for (let i = 0; i < this.row; i++) {
      this.grid[i] = [''];
      for (let j = 0; j < this.column; j++) {
        this.grid[i][j] = '';
      }
    }
    return this.grid;
  }

  // place ship at grid coordinates
  placeShip(shipName, shipLength, start, alignment) {
    // initialize ship class object
    let ship = new Ship(shipName, shipLength);
    // record start of ship (i.e. ship's bow)
    const [x, y] = start;

    // if alignment is horizontal, add ship coordinates to shipPlacement array along the X axis
    if (alignment == 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        // this.grid.push([x, y + i]);
        this.grid[x][y + i] = shipName;
      }
      // if alignment is vertical, add ship coordinates to shipPlacement array along the Y axis
    } else if (alignment == 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        // this.grid.push([x + i, y]);
        this.grid[x + i][y] = shipName;
      }
    }
    return this.grid;
  }

  // keep track of ship alignment
  rotateShip() {}

  // Gameboards should have a receiveAttack function that takes a pair of coordinates
  // determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
  // or records the coordinates of the missed shot.
  receiveAttack(coords) {
    const [x, y] = coords;

    if (this.shipPlacement.includes([x, y])) {
    } else {
      this.missedAttacks.push([x, y]);
    }
  }

  // Gameboards should keep track of missed attacks so they can display them properly

  // Gameboards should be able to report whether or not all of their ships have been sunk.
}

export default Gameboard;
