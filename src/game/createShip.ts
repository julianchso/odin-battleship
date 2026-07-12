import type { ShipId } from '../types/ship';

export function createShip(length: number, id: ShipId) {
  let hits = 0;

  return {
    id,

    length,

    hit() {
      hits++;
    },

    isSunk() {
      return hits >= length;
    },
  };
}

export type Ship = ReturnType<typeof createShip>;
