import DraggableShip from './draggableShip';

export default function ShipPanel() {
  const ships = [
    { id: 'carrier', length: 5 },
    { id: 'battleship', length: 4 },
    { id: 'submarine', length: 3 },
    { id: 'destroyer', length: 3 },
    { id: 'patrol-boat', length: 2 },
  ];

  return (
    <div className='ship_panel'>
      {ships.map((ship) => (
        <DraggableShip key={ship.id} id={ship.id} length={ship.length} />
      ))}
    </div>
  );
}
