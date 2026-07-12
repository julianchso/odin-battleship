import type { Direction } from '../types/ship';

export default function getOppositeDirection(direction: Direction): Direction {
  if (direction === 'up') return 'down';
  if (direction === 'right') return 'left';
  if (direction === 'down') return 'up';
  return 'right';
}
