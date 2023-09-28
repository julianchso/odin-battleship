class Ship {
  constructor(shipName, length, hit = 0) {
    this.shipName = shipName;
    this.length = length;
    this.hit = hit;
    this.isSunk = false;
  }

  // look at getters and setters
  // get shipName() {
  //   return this.shipName;
  // }

  hit() {
    this.hit += 1;
  }

  isSunk() {
    if (this.hit == this.length) {
      this.isSunk = true;
    }
  }
}

module.exports = { Ship };
