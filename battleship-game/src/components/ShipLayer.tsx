import { useDroppable } from '@dnd-kit/react';

type ShipLayerProps = {
  valid: boolean;
};

export default function ShipLayer() {
  const { ref } = useDroppable({
    id: `ship-layer`,
  });

  return <div className={`ship_layer`} ref={ref} data-id={`ship-layer`}></div>;
}
