import { Gameboard } from './components/Gameboard';
import createGameBoard from './game/createGameboard';
import './App.css';

function App() {
  const playerBoard = createGameBoard(10);
  const computerBoard = createGameBoard(10);

  return (
    <>
      <div className='gameboard_playarea'>
        <div>
          <Gameboard gameboard={playerBoard} />
        </div>
        <div>
          <Gameboard gameboard={computerBoard} />
        </div>
      </div>
    </>
  );
}

export default App;
