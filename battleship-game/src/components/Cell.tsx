import { useDroppable } from '@dnd-kit/react';

type CellProps = {
  key: string;
  row: number;
  col: number;
  id: string;
  mode: 'prepare' | 'battle';
  onAttack?: (row: number, col: number) => void;
  hasShip: boolean;
  children?: React.ReactNode;
  boardType: 'player' | 'computer';
};

export default function Cell({
  row,
  col,
  mode,
  onAttack,
  hasShip,
  children,
  boardType,
}: CellProps) {
  const { ref } = useDroppable({
    id: `${boardType}-${row}-${col}`,
    disabled: boardType === 'computer',
  });

  const handleAttack = () => {
    if (mode === 'battle' && onAttack) {
      onAttack(row, col);
    }
  };

  return (
    <div
      className={`gameboard_cell gameboard_cell-${mode} ${hasShip ? 'gameboard_cell-ship' : 'gameboard_cell-water'}`}
      onClick={handleAttack}
      ref={ref}
      data-id={`${boardType}-${row}-${col}`}
    >
      {row},{col}
      {children}
    </div>
  );
}
