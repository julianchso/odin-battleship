import { useDraggable } from '@dnd-kit/react';

type DraggableShipProps = {
  length: number;
};

export default function DraggableShip({ length }: DraggableShipProps) {
  const { ref } = useDraggable({
    id: `ship-${length}`,
  });

  return (
    <>
      <button ref={ref}>
        {[...Array(length).keys()].map((key) => (
          <div key={key} className='dnd_draggable_ship'>
            S
          </div>
        ))}
      </button>
    </>
  );
}
