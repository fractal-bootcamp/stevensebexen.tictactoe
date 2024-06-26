import { Game } from '../tictactoe/game'

function getBorderStyle(index: number): string {
  const borderWidth = '1px';

  const isLeft = index % 3 === 0;
  const isRight = index % 3 === 2;
  const isTop = index <= 2;
  const isBottom = index >= 6;

  const top = isTop ? '0px' : borderWidth;
  const right = isRight ? '0px' : borderWidth;
  const bottom = isBottom ? '0px' : borderWidth;
  const left = isLeft ? '0px' : borderWidth;

  const borderStyle = [top, right, bottom, left].join(' ');
  return borderStyle;
}

interface GameBoardProps{
  game: Game
  onCellClicked: (pos: number) => void;
}
export default function GameBoard(props: GameBoardProps) {
  return (
    <div className='flex flex-wrap h-96 w-96 flex-0 p-4'>
      {props.game.board.cells.map((cell, i) =>
        <div key={i}
        className='flex h-1/3 flex-none place-items-center place-content-center basis-1/3'
        style={{ borderWidth: getBorderStyle(i) }}
        onClick={() => props.onCellClicked(i)}>
          <p className='text-6xl select-none'>{cell}</p>
        </div>
      )}
    </div>
  );
}