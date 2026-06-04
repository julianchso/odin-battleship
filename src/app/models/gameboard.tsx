import { Ship } from './ship';

// record where ships are by writing their name on coordinates when placing them.
// if receiveAttack() is on a coordinate with shipName, increase ship hit() by 1.

class Gameboard {
  constructor() {
    this.grid = [];
    this.missedAttacks = [];
    this.fleet = [];
  }

  createGrid() {
    for (let i = 0; i < 10; i++) {
      this.grid[i] = [''];
      for (let j = 0; j < 10; j++) {
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
      if (this.outOfBounds(shipLength, y, this.column)) return;
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x][y + i] !== '') return; // prevents placing a ship on top of another ship
        this.grid[x][y + i] = shipName;
      }
      // if alignment is vertical, add ship coordinates to shipPlacement array along the Y axis
    } else if (alignment == 'vertical') {
      // TODO: test this
      if (this.outOfBounds(shipLength, x, this.row)) return;
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x + i][y] !== '') return;
        this.grid[x + i][y] = shipName;
      }
    }
    this.addToFleet(ship);
    console.log(this.grid);
    return this.grid;
  }

  addToFleet(ship) {
    this.fleet.push(ship);
  }

  outOfBounds(shipLength, start, boardLength) {
    return shipLength + start[0] > boardLength;
  }

  // keep track of ship alignment
  // TODO
  rotateShip(alignment) {
    return alignment == 'vertical' ? 'horizontal' : 'vertical';
  }

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
        // TODO: record misses with grid or with array.
        // With array, no need to iterate over grid multiple times.
        this.grid[x][y] = 'miss';
        this.missedAttacks.push([x, y]);
    }
  }

  getship(shipName) {
    let ship = this.fleet.find((ship) => ship.shipName == shipName);
    return ship;
  }

  // TODO: check if function is necessary
  allSunk() {
    const isSunk = function () {
      this.getSunk() == true;
    };
    // const isSunk = this.getSunk() == true;

    return this.fleet.every(isSunk);
  }

  // Gameboards should keep track of missed attacks so they can display them properly

  // Gameboards should be able to report whether or not all of their ships have been sunk.
}

export default Gameboard;
