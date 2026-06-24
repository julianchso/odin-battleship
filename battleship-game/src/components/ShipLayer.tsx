import { useDroppable } from '@dnd-kit/react';

type ShipLayerProps = {
  row: number;
  col: number;
};

export default function ShipLayer() {
  const { ref } = useDroppable({
    id: `ship-layer`,
  });

  const cellSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--cell-size'),
  );

  return (
    <div className={`ship_layer`} ref={ref} data-id={`ship-layer`}>
      <span></span>
    </div>
  );
}
