import React from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import createGameBoard from '../game/createGameboard';
import Cell from './Cell';
import DroppableCell from './ShipPlacement';
import DraggableShip from './draggableShip';

type Gameboard = ReturnType<typeof createGameBoard>;

type GameboardProps = {
  gameboard: Gameboard;
  handleAttack?: (row: number, col: number) => void;
  play: boolean;
};

function Gameboard({ gameboard, handleAttack, play }: GameboardProps) {
  const isClickable = play && handleAttack;
  const mode = play && handleAttack ? 'battle' : 'prepare';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className='gameboard_wrapper'>
      {letters.map((letter) => (
        <div className='gameboard_col-label' key={letter}>
          {letter}
        </div>
      ))}
      {gameboard.grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className='gameboard_row-label'>{rowIndex + 1}</div>

          {row.map((cell, colIndex) => (
            <>
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                id={`${rowIndex}-${colIndex}`}
                mode={mode}
                onAttack={handleAttack}
                hasShip={gameboard.hasShip(rowIndex, colIndex)}
              >
                {gameboard.isHit(rowIndex, colIndex) && <div className='gameboard_cell-hit' />}
                {gameboard.isMiss(rowIndex, colIndex) && (
                  <div className='gameboard_cell-miss-dot' />
                )}
              </Cell>
            </>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Gameboard };
