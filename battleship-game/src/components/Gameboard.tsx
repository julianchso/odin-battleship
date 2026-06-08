import createGameBoard from '../game/createGameboard';

type Gameboard = ReturnType<typeof createGameBoard>;
type GameboardProps = {
  gameboard: Gameboard;
  handleAttack?: (row: number, col: number) => void;
  play: boolean;
};

function Gameboard({ gameboard, handleAttack, play }: GameboardProps) {
  const isClickable = play && handleAttack;

  return (
    <>
      <div className={'gameboard_grid'}>
        {gameboard.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleAttack?.(rowIndex, colIndex)}
              disabled={!isClickable}
              className={`gameboard_cell ${cell === null ? 'gameboard_cell-water' : 'gameboard_cell-ship'}
                ${gameboard.isMiss(rowIndex, colIndex) ? 'gameboard_cell-miss' : ''}
                ${gameboard.isHit(rowIndex, colIndex) ? 'gameboard_cell-hit' : ''}
              `}
            >
              {cell === null ? '' : ''}
            </button>
          )),
        )}
      </div>
    </>
  );
}

export { Gameboard };
