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

  return (
    <div
      ref={ref}
      className='draggable_ships'
      onClick={() => onRotate(id)}
      style={{
        gridColumn:
          orientation === 'horizontal' ? `${(col ?? 0) + 2} / span ${length}` : `${(col ?? 0) + 2}`,

        gridRow:
          orientation === 'vertical' ? `${(row ?? 0) + 2} / span ${length}` : `${(row ?? 0) + 2}`,
      }}
    >
      {[...Array(length)].map((_, i) => (
        <div key={i} className='dnd_draggable_ship'>
          S
        </div>
      ))}
    </div>
  );
}
