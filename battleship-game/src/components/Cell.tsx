type CellProps = {
  row: number;
  col: number;
  mode: 'prepare' | 'battle';
  onAttack?: (row: number, col: number) => void;
  children?: React.ReactNode;
};

export default function Cell({ row, col, mode, onAttack, children }: CellProps) {
  const handleClick = () => {
    if (mode === 'battle' && onAttack) {
      onAttack(row, col);
    }
  };

  return (
    <div
      className={`gameboard_cell gameboard_cell-${mode} gameboard_cell-water`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
