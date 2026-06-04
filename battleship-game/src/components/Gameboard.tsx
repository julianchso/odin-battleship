import React from 'react';

import { Gameboard as GameboardType } from '../types/Gameboard';

function Gameboard() {
  const [grid, setGrid] = React.useState<string[][]>(
    Array.from({ length: 10 }, () => Array(10).fill('')),
  );

  const const [missedAttacks, setMissedAttacks] = [];
  const fleet = [];

  return <></>;
}

export { Gameboard };
