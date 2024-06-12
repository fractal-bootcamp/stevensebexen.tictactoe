import { getBoardState } from "./board";
import { Game, applyMove, createDefaultGame } from "./game"

const game: Game = createDefaultGame();

const game0 = applyMove(game, 0, 'x');  // Valid
const game1 = applyMove(game0, 0, 'o'); // Invalid
const game2 = applyMove(game1, 2, 'o'); // Valid
const game3 = applyMove(game2, 4, 'x'); // Valid
const game4 = applyMove(game3, 1, 'o'); // Valid
const game5 = applyMove(game4, 8, 'x'); // Valid
const game6 = applyMove(game5, 3, 'o'); // Invalid

// console.log([game0, game1, game2, game3, game4, game5, game6].map(x => x.board.cells));
console.log(getBoardState(game6.board));