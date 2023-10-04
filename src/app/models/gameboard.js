import { Ship } from './ship';

// record where ships are by writing their name on coordinates when placing them.
// if receiveAttack() is on a coordinate with shipName, increase ship hit() by 1.

class Gameboard {
  constructor(row, column) {
    this.grid = [];
    this.missedAttacks = [];
    this.row = row;
    this.column = column;
    this.fleet = [];
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
      // TODO: test this
      if (this.outOfBounds(shipLength, y, this.column)) return;
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x][y + i] !== '') return;
        this.grid[x][y + i] = shipName;
        console.log(`i: ${i}`);
      }
      // if alignment is vertical, add ship coordinates to shipPlacement array along the Y axis
    } else if (alignment == 'vertical') {
      // TODO: test this
      if (this.outOfBounds(shipLength, x, this.row)) return;
      for (let i = 0; i < shipLength; i++) {
        // this.grid.push([x + i, y]);
        if (this.grid[x + i][y] !== '') return;
        this.grid[x + i][y] = shipName;
      }
    }
    this.addToFleet(ship);
    return this.grid;
  }

  addToFleet(ship) {
    this.fleet.push(ship);
  }

  outOfBounds(shipLength, start, boardLength) {
    console.log(shipLength + start[0] > boardLength);
    return shipLength + start[0] > boardLength;
  }

  // keep track of ship alignment
  rotateShip() {}

  // Gameboards should have a receiveAttack function that takes a pair of coordinates
  // determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
  // or records the coordinates of the missed shot.
  receiveAttack(coords) {
    const [x, y] = coords;
    switch (this.grid[x][y]) {
      case 'carrier':
        this.getship('carrier').receiveHit();
        break;
      case 'battleship':
        this.getship('battleship').receiveHit();
        break;
      case 'destroyer':
        this.getship('destroyer').receiveHit();
        break;
      case 'submarine':
        this.getship('submarine').receiveHit();
        break;
      case 'patrol boat':
        this.getship('patrol boat').receiveHit();
        break;
      default:
        this.grid[x][y] = 'miss';
    }
  }

  getship(shipName) {
    let ship = this.fleet.find((ship) => ship.shipName == shipName);
    return ship;
  }

  // Gameboards should keep track of missed attacks so they can display them properly

  // Gameboards should be able to report whether or not all of their ships have been sunk.
}

export default Gameboard;
