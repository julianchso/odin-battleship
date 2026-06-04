export function ship({ length }: { length: number }) {
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
