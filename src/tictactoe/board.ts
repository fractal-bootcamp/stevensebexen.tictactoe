export type TicTacToeTile = 'x' | 'o' | '';

export interface Board {
  cells: TicTacToeTile[];
}

export interface BoardState {
  isEnded: boolean;
  winner: TicTacToeTile;
}

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function evaluateWinner(board: Board): TicTacToeTile {
  for (const line of lines) {
    const valueToCompare = board.cells[line[0]];
    if (valueToCompare === '') continue;
    if (line.every(index => board.cells[index] === valueToCompare)) return valueToCompare;
  }

  return '';
}

export function getBoardState(board: Board): BoardState {
  const winner = evaluateWinner(board);
  const isEnded = winner !== '' || board.cells.every(x => x !== '');
  return { isEnded, winner };
}
