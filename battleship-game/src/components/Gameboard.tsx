import createGameBoard from '../game/createGameboard';
import Cell from './Cell';
import DraggableShip from './DraggableShip';
import type { ShipId, ShipState } from '../types/ship';

type Gameboard = ReturnType<typeof createGameBoard>;

type GameboardProps = {
  gameboard: Gameboard;
  handleAttack?: (row: number, col: number) => void;
  play: boolean;
  boardType: 'player' | 'computer';
  ships?: ShipState[];
  mode: 'prepare' | 'battle';
  onRotateShip: (id: ShipId) => void;
};

function Gameboard({
  gameboard,
  handleAttack,
  play,
  boardType,
  ships,
  onRotateShip,
}: GameboardProps) {
  const mode = play && handleAttack ? 'battle' : 'prepare';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className='gameboard_wrapper'>
      <div className='gameboard_col'>
        <div>{/* empty cell for corner*/}</div>
        {letters.map((letter) => (
          <div className='gameboard_col-label' key={letter}>
            {letter}
          </div>
        ))}
      </div>
      <div className='gameboard_grid'>
        {gameboard.grid.map((row, rowIndex) => (
          <>
            <div className='gameboard_row-label' key={`row-${rowIndex}`}>
              {rowIndex + 1}
            </div>

            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                id={`${boardType}-${rowIndex}-${colIndex}`}
                mode={mode}
                onAttack={handleAttack}
                hasShip={gameboard.hasShip(rowIndex, colIndex)}
                boardType={boardType}
                play={play}
              >
                {gameboard.isHit(rowIndex, colIndex) && <div className='gameboard_cell-hit' />}

                {gameboard.isMiss(rowIndex, colIndex) && (
                  <div className='gameboard_cell-miss-dot' />
                )}
              </Cell>
            ))}
          </>
        ))}
        {ships
          .filter((ship) => ship.row !== null && boardType === 'player')
          .map((ship) => (
            <DraggableShip
              key={ship.id}
              id={ship.id}
              row={ship.row}
              col={ship.col}
              length={ship.length}
              orientation={ship.orientation}
              play={play}
              onRotate={onRotateShip}
            />
          ))}
      </div>
    </div>
  );
}

export { Gameboard };
