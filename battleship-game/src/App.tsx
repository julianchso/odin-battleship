import { useEffect } from 'react';
import { useState } from 'react';

import { Gameboard } from './components/Gameboard';
import createGameBoard from './game/createGameboard';
import { attack, getComputerMoves } from './game/playerActions';

import DraggableShip from './components/draggableShip';
import DroppableCell from './components/ShipPlacement';

import './App.css';
import { DragDropProvider } from '@dnd-kit/react';

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
    { id: 'ship-2', length: 2, isDropped: false },
    { id: 'ship-3-1', length: 3, isDropped: false },
    { id: 'ship-3-2', length: 3, isDropped: false },
    { id: 'ship-4', length: 4, isDropped: false },
    { id: 'ship-5', length: 5, isDropped: false },
  ]);
  // const [isDropped, setIsDropped] = useState(false);
  const [target, setTarget] = useState();

  function createPlayerBoard() {
    const board = createGameBoard(10);
    // board.placeShip(0, 0, 5, 'vertical');
    // board.placeShip(0, 2, 4, 'vertical');
    // board.placeShip(0, 4, 3, 'vertical');
    // board.placeShip(0, 6, 3, 'vertical');
    board.placeShip(0, 8, 2, 'vertical');

    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);

    // board.placeShip(0, 0, 5, 'horizontal');
    // board.placeShip(2, 0, 4, 'horizontal');
    // board.placeShip(4, 0, 3, 'horizontal');
    // board.placeShip(6, 0, 3, 'horizontal');
    board.placeShip(8, 0, 2, 'horizontal');

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

  return (
    <>
      <h1>{winner === null ? '' : winner === 'player' ? 'Player Wins!' : 'Computer Wins!'}</h1>
      {/* <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { target } = event.operation;
          setIsDropped(target?.id === 'droppable');
        }}
      >
        {!isDropped && <DraggableShip length={5} />}
        {!isDropped && <DraggableShip length={4} />}
        {!isDropped && <DraggableShip length={3} />}
        {!isDropped && <DraggableShip length={3} />}
        {!isDropped && <DraggableShip length={2} />}

        <DroppableCell row={1} col={1} id='droppable'>
          {isDropped && <DraggableShip length={5} />}
          {isDropped && <DraggableShip length={4} />}
          {isDropped && <DraggableShip length={4} />}
          {isDropped && <DraggableShip length={3} />}
          {isDropped && <DraggableShip length={2} />}
        </DroppableCell>
      </DragDropProvider> */}

      <div className='gameboard_playarea'>
        <div className='gameboard_player'>
          <Gameboard gameboard={playerBoard} play={play} />
        </div>
        <div className={`gameboard_computer ${!play ? 'opacity-50' : ''}`}>
          <Gameboard gameboard={computerBoard} handleAttack={handlePlayerAttack} play={play} />
        </div>
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
