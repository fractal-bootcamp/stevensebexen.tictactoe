import { Board, BoardState, TicTacToeTile, getBoardState } from "./board";

export interface Game {
  board: Board
  boardState: BoardState
  turnPlayer: TicTacToeTile
}

export function applyMove(game: Game, index: number, value: TicTacToeTile): Game {
  if (game.turnPlayer !== value
    || game.board.cells[index] !== ''
    || game.boardState.isEnded) return game;

  const board: Board = { cells: [...game.board.cells.map((cell, i) => index === i ? value : cell)] };
  const boardState = getBoardState(board);
  const turnPlayer: TicTacToeTile = game.turnPlayer === 'x' ? 'o' : 'x';

  const result = { board, boardState, turnPlayer };

  return result;
}

export function getStateText(game: Game): string {
  if (game.boardState.isEnded) {
    switch (game.boardState.winner) {
      case 'o':
        return 'o wins.';
      case 'x':
        return 'x wins.';
      case '':
        return 'tie.';
    }
  }
  else {
    return game.turnPlayer === 'x' ? 'x move.' : 'o move.';
  }
}

export function createDefaultGame(): Game {
  const cells = Array(9).fill('');
  
  const board: Board = { cells };
  const boardState: BoardState = { isEnded: false, winner: ''};
  const turnPlayer = 'x';

  const game: Game = { board, boardState, turnPlayer };

  return game;
}