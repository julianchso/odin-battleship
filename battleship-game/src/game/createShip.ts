export function createShip(length: number) {
  let hits = 0;

  return {
    length,

    hit() {
      hits++;
    },

    isSunk() {
      console.log(`Ship length ${length}: ${hits}/${length}`);
      return hits >= length;
    },
  };
}

export type Ship = ReturnType<typeof createShip>;
