import { useState } from "react";
import { Game, applyMove, createDefaultGame, getStateText } from "../tictactoe/game";
import { TicTacToeTile } from "../tictactoe/board";
import { AiDifficulty } from "../App";

interface TicTacToeComponentProps {
  aiDifficulty: AiDifficulty
}

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

export default function TicTacToeComponent(props: TicTacToeComponentProps) {
  const [game, setGame] = useState<Game>(createDefaultGame());
  const [aiPlayer, setAiPlayer] = useState<TicTacToeTile>('o');

  function getAiMove(game: Game): number {
    const possiblePositions = Array.from(Array(9).keys()).filter(i => game.board.cells[i] === '');
    const result = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    return result;
  }

  return (
    <div className='flex flex-col gap-2 place-items-center'>
      <div className='flex flex-wrap h-96 w-96 flex-0'>
        {game.board.cells.map((cell, i) =>
          <div key={i}
          className='flex h-1/3 flex-none place-items-center place-content-center basis-1/3'
          style={{ borderWidth: getBorderStyle(i) }}
          onClick={() => {
            if (props.aiDifficulty !== AiDifficulty.NONE && game.turnPlayer === aiPlayer) return;
            const newGame = applyMove(game, i, game.turnPlayer);
            setGame(newGame);
            if (newGame === game) return;
            console.log('YoO');
            setGame(applyMove(newGame, getAiMove(newGame), aiPlayer));
          }}>
            <p className='text-6xl select-none'>{cell}</p>
          </div>
        )}
      </div>
      <div className='flex-1'>
        <p className='text-4xl select-none text-center'>{getStateText(game)}</p>
        {game.boardState.isEnded && <p className='text-2xl select-none cursor-pointer animate-restartGame text-center'
          onClick={() => {
            setGame(createDefaultGame());
          }}>click to restart.</p>}
      </div>
    </div>
  );
}