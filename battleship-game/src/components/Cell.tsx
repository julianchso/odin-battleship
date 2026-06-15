type CellProps = {
  key: string;
  row: number;
  col: number;
  id: string;
  mode: 'prepare' | 'battle';
  onAttack?: (row: number, col: number) => void;
  // isHit: boolean;
  // isMiss: boolean;
  hasShip: boolean;
  children?: React.ReactNode;
};

export default function Cell({ row, col, mode, onAttack, hasShip, children }: CellProps) {
  const handleAttack = () => {
    if (mode === 'battle' && onAttack) {
      onAttack(row, col);
    }
  };

  return (
    <div
      className={`gameboard_cell gameboard_cell-${mode} ${hasShip ? 'gameboard_cell-ship' : 'gameboard_cell-water'}`}
      onClick={handleAttack}
    >
      {children}
    </div>
  );
}
