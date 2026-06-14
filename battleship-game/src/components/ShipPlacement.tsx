import { useDroppable } from '@dnd-kit/react';

export default function DroppableCell({ id, children, row, col }) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <>
      <div ref={ref} className='dnd_droppable_cell'>
        {children}
      </div>
      ;
    </>
  );
}
