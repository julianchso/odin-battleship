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
      <div />
      {letters.map((letter) => (
        <div className='gameboard_col-label' key={letter}>
          {letter}
        </div>
      ))}
      {gameboard.grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className='gameboard_row-label'>{rowIndex + 1}</div>
          {/* <DragDropProvider
            onDragEnd={(event) => {
              if (event.canceled) return;
            }}
          >
            {<DraggableShip length={5} />} */}

          {row.map((cell, colIndex) => (
            <>
              <Cell row={rowIndex} col={colIndex} mode={mode}>
                {gameboard.isMiss(rowIndex, colIndex) && <div className='gameboard_cell-miss' />}
                {gameboard.isHit(rowIndex, colIndex) && <div className='gameboard_cell-hit' />}
              </Cell>
              {/* <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleAttack?.(rowIndex, colIndex)}
                disabled={!isClickable}
                className={`gameboard_cell ${handleAttack ? 'gameboard_cell-computer' : ''} ${cell === null ? 'gameboard_cell-water' : 'gameboard_cell-ship'}
                ${gameboard.isMiss(rowIndex, colIndex) ? 'gameboard_cell-miss' : ''}
                ${gameboard.isHit(rowIndex, colIndex) ? 'gameboard_cell-hit' : ''}
              `}
              >
                {cell === null ? '' : ''}
              </button> */}
            </>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Gameboard };
