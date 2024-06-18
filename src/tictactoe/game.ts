import { Board, BoardState as GameState, TicTacToeTile, getBoardState as getGameState } from "./board";

export interface Game {
  board: Board
  gameState: GameState
  turnPlayer: TicTacToeTile
  lastMove: number | undefined
}

export function applyMove(game: Game, index: number, value: TicTacToeTile): Game {
  if (game.turnPlayer !== value
    || game.board.cells[index] !== ''
    || game.gameState.isEnded) return game;

  const board: Board = { cells: [...game.board.cells.map((cell, i) => index === i ? value : cell)] };
  const gameState = getGameState(board);
  const turnPlayer: TicTacToeTile = game.turnPlayer === 'x' ? 'o' : 'x';

  const result = { board, gameState, turnPlayer, lastMove: index };

  return result;
}

export function getStateText(game: Game, aiPlayer: TicTacToeTile): string {
  if (game.gameState.isEnded) {
    switch (game.gameState.winner) {
      case 'o':
        return 'o wins.';
      case 'x':
        return 'x wins.';
      case '':
        return 'tie.';
    }
  }
  else {
    if (aiPlayer === '') {
      return game.turnPlayer === 'x' ? 'x move.' : 'o move.';
    } else {
      return game.turnPlayer === aiPlayer ? 'nonhuman move.' : 'human move.';
    }
  }
}

export function createDefaultGame(): Game {
  const cells = Array(9).fill('');
  
  const board: Board = { cells };
  const gameState: GameState = { isEnded: false, winner: ''};
  const turnPlayer = 'x';

  const game: Game = { board, gameState: gameState, turnPlayer, lastMove: undefined };

  return game;
}

export function evaluatePossiblePositions(game: Game): number[] {
  const result = Array(9).fill(0).map((_, i) => i)
    .filter(pos => game.board.cells[pos] === '');

  return result;
}