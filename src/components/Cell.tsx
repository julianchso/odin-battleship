import { useDroppable } from '@dnd-kit/react';
import type { ShipId } from '../types/ship';

type CellProps = {
  key: string;
  row: number;
  col: number;
  mode: 'prepare' | 'battle';
  onAttack?: (row: number, col: number) => void;
  hasShip: boolean;
  boardType: 'player' | 'computer';
  isHead: boolean;
  isTail: boolean;
  orientation?: 'horizontal' | 'vertical';
  shipId?: ShipId;
  children?: React.ReactNode;
};

export default function Cell({
  row,
  col,
  mode,
  onAttack,
  hasShip,
  boardType,
  isHead,
  isTail,
  orientation,
  shipId,
  children,
}: CellProps) {
  const { ref } = useDroppable({
    id: `${boardType}-${row}-${col}`,
  });

  const handleAttack = () => {
    if (mode === 'battle' && onAttack) {
      onAttack(row, col);
    }
  };

  const rippleDurations = {
    carrier: 3.7,
    battleship: 3.2,
    destroyer: 2.5,
    submarine: 5,
    'patrol-boat': 2.0,
  };

  const rippleDuration = shipId ? rippleDurations[shipId] : 3;

  return (
    <div
      className={`gameboard_cell gameboard_cell-${mode} ${boardType == 'player' && shipId ? shipId : ''} ${hasShip ? 'gameboard_cell-ship' : ''} ${isHead ? `ship-head-${orientation}` : ''} ${isTail ? `ship-tail-${orientation}` : ''} ${hasShip ? (orientation == 'horizontal' ? 'ship-horizontal' : 'ship-vertical') : ''}`}
      onClick={handleAttack}
      ref={ref}
      data-id={`${boardType}-${row}-${col}`}
      style={
        {
          '--ripple-duration': `${rippleDuration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
