import { Gameboard } from '../components/Gameboard';

export function isInBounds(board: Gameboard, row: number, col: number) {
  return row >= 0 && row < board.grid.length && col >= 0 && col < board.grid.length;
}
