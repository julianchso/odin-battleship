class Ship {
  constructor(shipName, length, hit) {
    this.shipName = shipName;
    this.length = length;
    this.hit = hit;
    this.isSunk = false;
  }

  // look at getters and setters

  hit() {
    this.hit += 1;
  }

  isSunk() {
    if (this.hit == this.length) {
      this.isSunk = true;
    }
  }
}

export { Ship };
