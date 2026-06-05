import createGameBoard from '../game/createGameboard';

type Gameboard = ReturnType<typeof createGameBoard>;
type GameboardProps = {
  gameboard: Gameboard;
};

function Gameboard({ gameboard }: GameboardProps) {
  return (
    <>
      <div className='gameboard_grid'>
        {gameboard.grid.flat().map((cell, index) => (
          <button
            key={index}
            className={`gameboard_cell ${cell === null ? 'gameboard_cell-water' : 'gameboard_cell-ship'}`}
          >
            {cell === null ? '' : ''}
          </button>
        ))}
      </div>
    </>
  );
}

export { Gameboard };
