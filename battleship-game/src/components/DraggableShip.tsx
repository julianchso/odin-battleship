import { useDraggable } from '@dnd-kit/react';

type DraggableShipProps = {
  id: string;
  length: number;
  row: number | null;
  col: number | null;
};

export default function DraggableShip({ id, length, row, col }: DraggableShipProps) {
  const { ref } = useDraggable({
    id: id,
  });

  return (
    <>
      <div
        ref={ref}
        className='draggable_ships'
        style={{
          gridColumn: (col ?? 0) + 2,
          gridRow: (row ?? 0) + 1,
        }}
      >
        {[...Array(length).keys()].map((key) => (
          <div key={key} className='dnd_draggable_ship'>
            S
          </div>
        ))}
      </div>
    </>
  );
}
