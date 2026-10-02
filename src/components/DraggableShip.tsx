import { useDraggable } from '@dnd-kit/react';

import type { ShipId } from '../types/ship';

type DraggableShipProps = {
  id: ShipId;
  length: number;
  row: number | null;
  col: number | null;
  orientation: 'horizontal' | 'vertical';
  play: boolean;
  onRotate: (id: ShipId) => void;
};

export default function DraggableShip({
  id,
  length,
  row,
  col,
  orientation,
  play,
  onRotate,
}: DraggableShipProps) {
  const { ref } = useDraggable({
    id,
    disabled: play,
  });

  const cellSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--cell-size'),
  );

  const isPlaced = typeof row === 'number' && typeof col === 'number';

  return (
    <div
      ref={ref}
      className={`draggable_ships  ${isPlaced ? 'placed' : 'unplaced'} ${orientation === 'horizontal' ? 'horizontal' : 'vertical'}`}
      onClick={() => isPlaced && onRotate(id)}
      style={
        isPlaced
          ? {
              left: col * cellSize,
              top: row * cellSize,
              width: orientation === 'horizontal' ? length * cellSize : cellSize,
              height: orientation === 'vertical' ? length * cellSize : cellSize,
            }
          : {}
      }
    >
      {[...Array(length)].map((_, i) => (
        <div key={i} className={`dnd_draggable_ship ${id}`}></div>
      ))}
    </div>
  );
}
