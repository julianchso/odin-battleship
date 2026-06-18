import DraggableShip from './DraggableShip';
import type { ShipState } from '../App';

type ShipPanelProps = {
  ships: ShipState[];
};

export default function ShipPanel({ ships }: ShipPanelProps) {
  return (
    <div className='ship_panel'>
      {ships
        .filter((ship) => ship.row === null)
        .map((ship) => (
          <DraggableShip key={ship.id} id={ship.id} length={ship.length} />
        ))}
    </div>
  );
}
