import { useState, useEffect } from 'react';

import { DragDropProvider } from '@dnd-kit/react';

import createGameBoard from './game/createGameboard';
import { Gameboard } from './components/Gameboard';
import { attack, getComputerMoves } from './game/playerActions';
import { placeRandomShips } from './game/placeRandomShips';
import { validatePlacement } from './game/validatePlacement';
import { generateRandomShips } from './game/generateRandomShips';
import ShipPanel from './components/ShipPanel';

import './App.css';
import type { ShipId, ShipState } from './types/ship';

function App() {
  const [play, setPlay] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(createPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(createComputerBoard);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);
  const [target, setTarget] = useState();

  const initialShips: ShipState[] = [
    { id: 'carrier', length: 5, row: null, col: null, orientation: 'horizontal' },
    { id: 'battleship', length: 4, row: null, col: null, orientation: 'horizontal' },
    { id: 'destroyer', length: 3, row: null, col: null, orientation: 'horizontal' },
    { id: 'submarine', length: 3, row: null, col: null, orientation: 'horizontal' },
    { id: 'patrol-boat', length: 2, row: null, col: null, orientation: 'horizontal' },
  ];
  const [ships, setShips] = useState<ShipState[]>(initialShips);

  function createPlayerBoard() {
    const board = createGameBoard(10);
    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.map((length) => {
      placeRandomShips(board, length);
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

  function handleRotateShip(id: ShipId) {
    setShips((prev) =>
      prev.map((ship) => {
        if (ship.id !== id) {
          return ship;
        }

        const newOrientation = ship.orientation === 'horizontal' ? 'vertical' : 'horizontal';

        // Validate before rotating
        const valid = validatePlacement({
          grid: playerBoard.grid,
          row: ship.row!,
          col: ship.col!,
          orientation: newOrientation,
          shipLength: ship.length,
          GBLength: 10,
        });

        if (!valid) {
          return ship;
        }

        return {
          ...ship,
          orientation: newOrientation,
        };
      }),
    );
  }

  function startNewGame() {
    const newPlayerBoard = createPlayerBoard();
    const newComputerBoard = createComputerBoard();

    setWinner(null);
    setTurn('player');
    setShips(initialShips);
    setPlayerBoard(newPlayerBoard);
    setComputerBoard(newComputerBoard);
  }

  function handlePlay() {
    const newPlayerBoard = createPlayerBoard();
    const newComputerBoard = createComputerBoard();
    ships.forEach((ship) => {
      if (ship.row === null || ship.col === null) {
        return;
      }

      newPlayerBoard.placeShip(ship.row, ship.col, ship.length, ship.orientation);
    });
    setPlayerBoard(newPlayerBoard);
    setComputerBoard(newComputerBoard);

    setPlay(true);
    // test
    setShips(initialShips);
  }

  function handleRandomizeShips() {
    setShips(generateRandomShips());
    setPlayerBoard(createPlayerBoard());
    handleRandomizeComputer();
  }

  function handleRandomizeComputer() {
    setComputerBoard(createComputerBoard());
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

  useEffect(() => {
    // console.log(playerBoard.shipList);
    console.log(ships);
    // console.log(`computer: ${computerBoard.shipList}`);
    // console.log(playerBoard.shipList.length);
    // console.log(ships.length);
  });

  return (
    <>
      <h1>{winner === null ? '' : winner === 'player' ? 'Player Wins!' : 'Computer Wins!'}</h1>
      <div className='gameboard_playarea'>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='gameboard_player_wrapper'>
            <div className='gameboard_player'>
              <Gameboard
                gameboard={playerBoard}
                boardType='player'
                play={play}
                ships={ships}
                onRotateShip={handleRotateShip}
              />
              {/* <div className='gameboard_ships-layer'></div> */}
            </div>
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
          {!play ? <ShipPanel ships={ships} /> : ''}
        </DragDropProvider>
        <div className='gameboard_playBtn_wrapper'>
          {!play && !winner ? (
            <>
              <button className='gameboard_randomBtn' onClick={handleRandomizeShips}>
                Randomize
              </button>
              <button className='gameboard_playBtn' onClick={handlePlay}>
                Play
              </button>
            </>
          ) : (
            ''
          )}

          {winner ? <button onClick={startNewGame}>New Game</button> : ''}
        </div>
      </div>
    </>
  );
}

export default App;
