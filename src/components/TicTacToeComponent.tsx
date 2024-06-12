import { useState } from "react";
import { Game, applyMove, createDefaultGame, getStateText } from "../tictactoe/game";

// Hacky
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

export default function TicTacToeComponent() {
  const [game, setGame] = useState<Game>(createDefaultGame());
  return (
    <div className='flex flex-col gap-2 place-items-center h-screen'>
      <div className='flex-none pt-4 pl-8 self-start'>
        <p className='text-4xl select-none'>tic tac toe.</p>
      </div>
      <div className='flex flex-wrap h-96 w-96 flex-0'>
        {game.board.cells.map((cell, i) =>
          <div key={i}
          className='flex h-1/3 flex-none place-items-center place-content-center basis-1/3'
          style={{ borderWidth: getBorderStyle(i) }}
          onClick={() => setGame(applyMove(game, i, game.turnPlayer))}>
            <p className='text-6xl select-none'>{cell}</p>
          </div>
        )}
      </div>
      <div className='flex-1'>
        <p className='text-4xl select-none text-center'>{getStateText(game)}</p>
        {game.boardState.isEnded && <p className='text-2xl select-none cursor-pointer animate-restartGame text-center' onClick={() => setGame(createDefaultGame())}>click to restart.</p>}
      </div>
    </div>
  );
}