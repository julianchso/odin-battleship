import React from 'react';

import createGameBoard from '../game/createGameboard';

type Gameboard = ReturnType<typeof createGameBoard>;
type GameboardProps = {
  gameboard: Gameboard;
  handleAttack?: (row: number, col: number) => void;
  play: boolean;
};

function Gameboard({ gameboard, handleAttack, play }: GameboardProps) {
  const isClickable = play && handleAttack;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className='gameboard_wrapper'>
      <div />
      {letters.map((letter) => (
        <div className='gameboard_col-label' key={letter}>
          {letter}
        </div>
      ))}
      {gameboard.grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className='gameboard_row-label'>{rowIndex + 1}</div>
          {row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleAttack?.(rowIndex, colIndex)}
              disabled={!isClickable}
              className={`gameboard_cell ${handleAttack ? 'gameboard_cell-computer' : ''} ${cell === null ? 'gameboard_cell-water' : 'gameboard_cell-ship'}
                ${gameboard.isMiss(rowIndex, colIndex) ? 'gameboard_cell-miss' : ''}
                ${gameboard.isHit(rowIndex, colIndex) ? 'gameboard_cell-hit' : ''}
              `}
            >
              {cell === null ? '' : ''}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Gameboard };
