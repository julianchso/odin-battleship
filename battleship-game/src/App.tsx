import React, { useEffect } from 'react';
import { useState } from 'react';

import { Gameboard } from './components/Gameboard';
import createGameBoard from './game/createGameboard';
import { attack, getComputerMoves } from './game/playerActions';

import './App.css';

function App() {
  const [playerBoard] = useState(createPlayerBoard);
  const [computerBoard] = useState(createComputerBoard);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);

  function createPlayerBoard() {
    const board = createGameBoard(10);

    board.placeShip(0, 0, 5, 'vertical');
    board.placeShip(0, 2, 4, 'vertical');
    board.placeShip(0, 4, 3, 'vertical');
    board.placeShip(0, 6, 3, 'vertical');
    board.placeShip(0, 8, 2, 'vertical');

    return board;
  }

  function createComputerBoard() {
    const board = createGameBoard(10);

    board.placeShip(0, 0, 5, 'horizontal');
    board.placeShip(2, 0, 4, 'horizontal');
    board.placeShip(4, 0, 3, 'horizontal');
    board.placeShip(6, 0, 3, 'horizontal');
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
    }

    setTurn('computer');
  }

  function handleComputerAttack() {
    const { row, col } = getComputerMoves(playerBoard);
    const gameOver = attack(row, col, playerBoard);

    if (gameOver) {
      setWinner('computer');
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

  return (
    <>
      <h1>{winner === null ? '' : winner === 'player' ? 'Player Wins!' : 'Computer Wins!'}</h1>
      <div className='gameboard_playarea'>
        <div>
          <Gameboard gameboard={playerBoard} handleAttack={handleComputerAttack} />
        </div>
        <div>
          <Gameboard gameboard={computerBoard} handleAttack={handlePlayerAttack} />
        </div>
      </div>
    </>
  );
}

export default App;
