import { useDraggable } from '@dnd-kit/react';

type DraggableShipProps = {
  id: string;
  length: number;
};

export default function DraggableShip({ id, length }: DraggableShipProps) {
  const { ref } = useDraggable({
    id: id,
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
