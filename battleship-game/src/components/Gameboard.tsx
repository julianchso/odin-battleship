import React from 'react';

import { Gameboard as GameboardType } from '../types/Gameboard';
import { createShip } from '../game/createShip';
import createGameBoard from '../game/createGameboard';

import type { Ship } from '../game/createShip';

function Gameboard() {
  const [grid, setGrid] = React.useState(createGameBoard(10));

  const [missedAttacks, setMissedAttacks] = [];
  const fleet = [];

  return <></>;
}

export { Gameboard };
