export function createShip(length: number) {
  let hits = 0;

  return {
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
