import { useEffect } from 'react';
import { useState } from 'react';

import { Gameboard } from './components/Gameboard';
import createGameBoard from './game/createGameboard';
import { attack, getComputerMoves } from './game/playerActions';
import { randomShipPlacement } from './game/randomShipPlacement';

import { DragDropProvider } from '@dnd-kit/react';
import ShipPanel from './components/ShipPanel';

import './App.css';

export type ShipState = {
  id: string;
  length: number;
  row: number | null;
  col: number | null;
};

function App() {
  const [play, setPlay] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(createPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(createComputerBoard);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);
  const [target, setTarget] = useState();

  const [ships, setShips] = useState<ShipState[]>([
    { id: 'carrier', length: 5, row: null, col: null },
    { id: 'battleship', length: 4, row: null, col: null },
    { id: 'destroyer', length: 3, row: null, col: null },
    { id: 'submarine', length: 3, row: null, col: null },
    { id: 'patrol-boat', length: 2, row: null, col: null },
  ]);

  function createPlayerBoard() {
    const board = createGameBoard(10);

    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.map((length) => {
      randomShipPlacement(board, length);
    });

    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.map((length) => {
      randomShipPlacement(board, length);
    });

    return board;
  }

  function handlePlayerAttack(row: number, col: number) {
    if (turn !== 'player') {
      return;
    }

    const gameOver = attack(row, col, computerBoard);

    if (gameOver) {
      setWinner('player');
      setPlay(false);
      return;
    }

    setTurn('computer');
  }

  function handleComputerAttack() {
    const { row, col } = getComputerMoves(playerBoard);
    const gameOver = attack(row, col, playerBoard);

    if (gameOver) {
      setWinner('computer');
      setPlay(false);
      return;
    }

    setTurn('player');
  }

  useEffect(() => {
    if (turn === 'computer') {
      const timer = setTimeout(() => {
        handleComputerAttack();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [turn]);

  function startNewGame() {
    const newPlayerBoard = createPlayerBoard();
    const newComputerBoard = createComputerBoard();

    setWinner(null);
    setPlay(true);
    setTurn('player');
    setPlayerBoard(newPlayerBoard);
    setComputerBoard(newComputerBoard);
  }

  function handlePlay() {
    if (winner) {
      startNewGame();
    } else if (!play) {
      setPlay(true);
    }
  }

  function handleDragEnd(event) {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!target) return;

    const [, row, col] = target.id.split('-').map(Number);

    setShips((prev) => {
      return prev.map((ship) => {
        if (ship.id === source.id) {
          return {
            ...ship,
            row,
            col,
          };
        }

        return ship;
      });
    });

    setTarget(event.operation.target?.id);
  }

  // useEffect(() => {
  //   console.log(ships);
  // });

  return (
    <>
      <h1>{winner === null ? '' : winner === 'player' ? 'Player Wins!' : 'Computer Wins!'}</h1>
      <div className='gameboard_playarea'>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='gameboard_player'>
            <Gameboard gameboard={playerBoard} boardType='player' play={play} ships={ships} />
          </div>
          <div className={`gameboard_computer ${!play ? 'opacity-50' : ''}`}>
            <Gameboard
              gameboard={computerBoard}
              boardType='computer'
              handleAttack={handlePlayerAttack}
              play={play}
              ships={[]}
            />
          </div>
          <ShipPanel ships={ships} />
        </DragDropProvider>
        <div className='gameboard_playBtn_wrapper'>
          {!play ? (
            <button className='gameboard_playBtn' onClick={handlePlay}>
              {winner ? 'Play Again' : 'play'}
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

export default App;
