import Gameboard from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.playerMoves = new Gameboard();
    this.map = this.playerMoves.createGrid();
  }

  // shoots during their turn
  // if opponent gameboard's grid location is empty, record shot

  shoot() {
    if (cpu.map == '') {
      cpu.map;
    }
  }

  // CPU methods

  recordPreviousShot(shot) {
    let previousShot = shot;
  }

  // randomly place ships

  // record shot
  // Is it necessary to use an array to record shot or just use the player grid?
  // if previous shot was a miss, random place valid shot within a 10x10 grid

  // If shot was a hit, create new empty search array
  // Push shot onto (currently) empty search array

  // If previous shot was a hit, search the 4 points around the origin
  // Create 4 random scenarios of top, bottom, left, and right of origin
  // Next shot will be a shot using the above random switch case statement
}

export default Player;
