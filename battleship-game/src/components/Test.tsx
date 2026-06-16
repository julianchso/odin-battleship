import { useDroppable } from '@dnd-kit/react';

export default function TestDrop() {
  const { ref } = useDroppable({ id: 'test' });

  console.log('rendering test');

  return (
    <div
      ref={ref}
      style={{
        width: 120,
        height: 120,
        background: 'blue',
        margin: 20,
      }}
    >
      DROP HERE
    </div>
  );
}
