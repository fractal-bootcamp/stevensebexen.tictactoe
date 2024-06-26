import { useEffect, useState } from "react";
import { Game, applyMove, createDefaultGame } from "../tictactoe/game";
import { TicTacToeTile } from "../tictactoe/board";
import { AiDifficulty } from "../App";
import { createAnalysisTree, createGameTree, AnalysisTreeNode } from "../tictactoe/analyzer";
import GameBoard from "./GameBoard";
import StatusBar from "./StatusBar";
import AnalysisTree from "./AnalysisTree";

interface TicTacToeProps {
  aiDifficulty: AiDifficulty
}

export default function TicTacToe(props: TicTacToeProps) {
  const [game, setGame] = useState<Game>(createDefaultGame());
  const [aiPlayer, setAiPlayer] = useState<TicTacToeTile>('o');
  const [analysisTree, setAnalysisTree] = useState<AnalysisTreeNode | undefined>(undefined);  // AI analysis tree for data visualization
  const [showAnalysisTree, setShowAnalysisTree] = useState<boolean>(false);

  function makeAiMove(): void {
    switch (props.aiDifficulty) {
      case AiDifficulty.POSSIBLE:
        const possiblePositions = Array.from(Array(9).keys()).filter(i => game.board.cells[i] === '');
        const result = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        setGame(applyMove(game, result, aiPlayer));
        break;
      case AiDifficulty.IMPOSSIBLE:
        const gameTree = createGameTree(game, 10);
        const isMaximizing = aiPlayer === 'x';
        const analysisTree = createAnalysisTree(gameTree, 10, isMaximizing);
        analysisTree.branches.sort((branchA, branchB) => {
          if (isMaximizing) {
            return branchA.minimaxValue > branchB.minimaxValue ? -1 : branchA.minimaxValue < branchB.minimaxValue ? 1 : 0;
          } else {
            return branchA.minimaxValue > branchB.minimaxValue ? 1 : branchA.minimaxValue < branchB.minimaxValue ? -1 : 0;
          }
        });
        setAnalysisTree(analysisTree);
        
        // Select a best move randomly; they are sorted by minimax value
        const bestMoves = analysisTree.branches.filter(branch => branch.minimaxValue === analysisTree.branches[0].minimaxValue);
        if (bestMoves.length === 0) return;  // This should only happen if analysis runs on a finished game.
        const chosenMove = analysisTree.branches[Math.floor(Math.random() * bestMoves.length)].game.lastMove;
        if (chosenMove === undefined) throw new Error('AI should not be choosing an undefined move.');
        setGame(applyMove(game, chosenMove, aiPlayer));
    }
  }

  // Check if AI should move
  useEffect(() => {
    if (props.aiDifficulty !== AiDifficulty.NONE && game.turnPlayer === aiPlayer) {
      setTimeout(() => {
        makeAiMove();
      }, 1000);
    }
  }, [game]);

  // Reset game on game mode switch
  useEffect(() => {
    setGame(createDefaultGame());
  }, [props.aiDifficulty]);

  function onCellClicked(pos: number) {
      if (props.aiDifficulty !== AiDifficulty.NONE && game.turnPlayer === aiPlayer) return;
      const newGame = applyMove(game, pos, game.turnPlayer);
      setGame(newGame);
  }

  function onRestartGame() {
    setAiPlayer(aiPlayer === 'x' ? 'o' : 'x');
    setGame(createDefaultGame());
  }

  function onShowAnalysisTreeInputChanged(): void {
    setShowAnalysisTree(!showAnalysisTree);
  }

  return (
    <div className='flex flex-col md:flex-row gap-2 px-2'>
      <div className='flex flex-1 flex-col gap-2 place-items-center'>
        <GameBoard onCellClicked={onCellClicked} game={game} />
        <StatusBar game={game} aiDifficulty={props.aiDifficulty} onRestartGame={onRestartGame} aiPlayer={aiPlayer}
          onShowAnalysisTreeInputChanged={onShowAnalysisTreeInputChanged} showAnalysisTree={showAnalysisTree} />
      </div>
      { showAnalysisTree && props.aiDifficulty === AiDifficulty.IMPOSSIBLE &&
        <AnalysisTree analysisTree={analysisTree} />
      }
    </div>
  );
}