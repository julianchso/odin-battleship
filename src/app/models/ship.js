class Ship {
  constructor(shipName, length, damage = 0) {
    this._shipName = shipName;
    this.length = length;
    this._damage = damage;
    this.isSunk = false;
  }

  // look at getters and setters
  get shipName() {
    return this._shipName;
  }

  receiveHit() {
    this._damage += 1;
    if (this._damage == this.length) this.sunk();
  }

  sunk() {
    this.isSunk = true;
  }
  getSunk() {
    return this.isSunk;
  }
}

module.exports = { Ship };
