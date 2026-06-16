import { useEffect } from 'react';
import { useState } from 'react';

import { Gameboard } from './components/Gameboard';
import createGameBoard from './game/createGameboard';
import { attack, getComputerMoves } from './game/playerActions';

import { DragDropProvider } from '@dnd-kit/react';
import { useDroppable } from '@dnd-kit/react';
import TestDrop from './components/Test';
import ShipPanel from './components/ShipPanel';

import './App.css';

type ShipState = {
  id: string;
  length: number;
  isDropped: boolean;
};

function App() {
  const [play, setPlay] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(createPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(createComputerBoard);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);

  const [ships, setShips] = useState<ShipState[]>([
    { id: 'patrol-boat', length: 2, isDropped: false },
    { id: 'destroyer', length: 3, isDropped: false },
    { id: 'submarine', length: 3, isDropped: false },
    { id: 'battleship', length: 4, isDropped: false },
    { id: 'carrier', length: 5, isDropped: false },
  ]);

  const [target, setTarget] = useState();

  function createPlayerBoard() {
    const board = createGameBoard(10);

    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);

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

    console.log('source:', source);
    console.log('target:', target);

    setShips((prev) => {
      return prev.map((ship) => {
        if (ship.id === source.id) {
          return {
            ...ship,
            isDropped: !!target,
            row,
            col,
          };
        }

        return ship;
      });
    });
  }

  return (
    <>
      <h1>{winner === null ? '' : winner === 'player' ? 'Player Wins!' : 'Computer Wins!'}</h1>
      <div className='gameboard_playarea'>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='gameboard_player'>
            <Gameboard gameboard={playerBoard} play={play} />
          </div>
          <div className={`gameboard_computer ${!play ? 'opacity-50' : ''}`}>
            <Gameboard gameboard={computerBoard} handleAttack={handlePlayerAttack} play={play} />
          </div>
          <ShipPanel />
          <TestDrop />
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
