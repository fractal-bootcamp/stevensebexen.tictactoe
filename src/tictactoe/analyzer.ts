import { Game, applyMove, evaluatePossiblePositions } from "./game";

export interface GameTreeNode {
  game: Game;
  branches: GameTreeNode[];
}

export interface AnalysisTreeNode {
  game: Game;
  minimaxValue: number;
  branches: AnalysisTreeNode[];
  isMaximizing: boolean
}

const createGameTreeNode = (game: Game, branches: GameTreeNode[]): GameTreeNode => ({ game, branches });
const createAnalysisTreeNode = (game: Game, minimaxValue: number, branches: AnalysisTreeNode[], isMaximizing: boolean): AnalysisTreeNode => ({ game, minimaxValue, branches, isMaximizing });

export const createGameTree = (game: Game, depth: number): GameTreeNode => {
  if (depth <= 0 || game.gameState.isEnded) {
    const terminalNode = createGameTreeNode(game, []);
    return terminalNode;
  }
  const possiblePositions = evaluatePossiblePositions(game);
  const possibleGames = possiblePositions.map(position => applyMove(game, position, game.turnPlayer));
  const branches = possibleGames.map(game => createGameTree(game, depth - 1));
  const rootNode = createGameTreeNode(game, branches);
  return rootNode;
}

export const createAnalysisTree = (gameNode: GameTreeNode, depth: number, isMaximizing: boolean): AnalysisTreeNode => {
  const game = gameNode.game;

  if (game.gameState.isEnded) {
    switch (game.gameState.winner) {
      case 'x':
        return createAnalysisTreeNode(game, Infinity, [], isMaximizing)
      case 'o':
        return createAnalysisTreeNode(game, -Infinity, [], isMaximizing)
      default:
        return createAnalysisTreeNode(game, 0, [], isMaximizing)
    }
  }

  if (depth <= 0) return createAnalysisTreeNode(gameNode.game, 0, [], isMaximizing);

  const branches = gameNode.branches.map(branch => createAnalysisTree(branch, depth - 1, !isMaximizing));
  const branchValues = branches.map(branch => branch.minimaxValue);
  const minimaxValue = isMaximizing ? Math.max(...branchValues) : Math.min(...branchValues);

  return createAnalysisTreeNode(game, minimaxValue, branches, isMaximizing);
}