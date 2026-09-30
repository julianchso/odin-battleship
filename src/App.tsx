import { useState, useEffect } from 'react';

import { DragDropProvider } from '@dnd-kit/react';

import createGameBoard from './game/createGameboard';
import { Gameboard } from './components/Gameboard';
import { getComputerMoves } from './game/playerActions';
import { placeRandomShips } from './game/placeRandomShips';
import { validatePlacementShips } from './game/validatePlacementShips';
import { generateRandomShips } from './game/generateRandomShips';
import ShipPanel from './components/ShipPanel';
import ShipLayer from './components/ShipLayer';

import { type AiState, type ShipId, type ShipState } from './types/ship';

import './App.css';

const shipDefinitions: ShipState[] = [
  { id: 'carrier', length: 5, row: null, col: null, orientation: 'horizontal' },
  { id: 'battleship', length: 4, row: null, col: null, orientation: 'horizontal' },
  { id: 'destroyer', length: 3, row: null, col: null, orientation: 'horizontal' },
  { id: 'submarine', length: 3, row: null, col: null, orientation: 'horizontal' },
  { id: 'patrol-boat', length: 2, row: null, col: null, orientation: 'horizontal' },
];

function App() {
  const [play, setPlay] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(createPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(createComputerBoard);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);
  const [target, setTarget] = useState();
  const [computerAI, setComputerAI] = useState<AiState>({
    mode: 'hunting',
    targetRow: null,
    targetCol: null,
    targetDirection: null,
    triedDirection: [],
  });

  const [ships, setShips] = useState<ShipState[]>(shipDefinitions);

  function createPlayerBoard() {
    const board = createGameBoard(10);
    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);

    shipDefinitions.forEach((ship) => {
      placeRandomShips(board, ship);
    });

    return board;
  }

  function handlePlayerAttack(row: number, col: number) {
    if (turn !== 'player') {
      return;
    }

    const result = computerBoard.receiveAttack(row, col);

    if (result === undefined) {
      return;
    }

    const gameOver = computerBoard.allShipsSunk();
    if (gameOver) {
      setWinner('player');
      setPlay(false);
      return;
    }

    setTurn('computer');
  }

  function handleComputerAttack() {
    const { row, col, attemptedDirection } = getComputerMoves(playerBoard, computerAI);

    if (row === undefined || col === undefined) return;

    const attack = playerBoard.receiveAttack(row, col);

    if (attack === undefined) {
      return;
    }

    const { result, sunk } = attack;

    setComputerAI((prev) => ({
      ...prev,
      mode: sunk ? 'hunting' : result === 'hit' ? 'target' : prev.mode,
      targetRow: sunk ? null : prev.mode === 'hunting' && result === 'hit' ? row : prev.targetRow,
      targetCol: sunk ? null : prev.mode === 'hunting' && result === 'hit' ? col : prev.targetCol,
      targetDirection: sunk
        ? null
        : prev.mode === 'target' && prev.targetDirection === null && result === 'hit'
          ? attemptedDirection
          : prev.targetDirection,

      triedDirection: sunk
        ? []
        : prev.mode === 'target' &&
            prev.targetDirection === null &&
            result === 'miss' &&
            attemptedDirection &&
            !prev.triedDirection.includes(attemptedDirection)
          ? [...prev.triedDirection, attemptedDirection]
          : prev.triedDirection,
    }));

    const gameOver = playerBoard.allShipsSunk();

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

        if (ship.row == null || ship.col == null) {
          return ship;
        }

        const valid = validatePlacementShips({
          row: ship.row,
          col: ship.col,
          orientation: newOrientation,
          shipLength: ship.length,
          existingShips: ships.filter((s) => s.id !== ship.id),
          GBLength: playerBoard.grid.length,
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

  function allShipPlaced() {
    return ships.every((ship) => {
      return ship.row !== null && ship.col !== null;
    });
  }

  function startNewGame() {
    const newPlayerBoard = createPlayerBoard();
    const newComputerBoard = createComputerBoard();

    setWinner(null);
    setTurn('player');
    setShips(shipDefinitions);
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

      newPlayerBoard.placeShip(ship.row, ship.col, ship.length, ship.orientation, ship.id);
    });
    setPlayerBoard(newPlayerBoard);
    setComputerBoard(newComputerBoard);

    setPlay(true);
    setShips(shipDefinitions);
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

    const ship = ships.find((s) => s.id === source.id);

    if (!ship) return;

    const valid = validatePlacementShips({
      row,
      col,
      orientation: ship.orientation,
      shipLength: ship.length,
      existingShips: ships.filter((s) => s.id !== ship.id),
      GBLength: playerBoard.grid.length,
    });

    if (!valid) {
      return;
    }

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
              <ShipLayer />
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
              <button
                className='gameboard_playBtn'
                onClick={handlePlay}
                disabled={!allShipPlaced()}
              >
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
