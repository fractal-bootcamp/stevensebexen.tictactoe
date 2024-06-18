import { useEffect, useState } from "react";
import { Game, applyMove, createDefaultGame, getStateText } from "../tictactoe/game";
import { TicTacToeTile } from "../tictactoe/board";
import { AiDifficulty } from "../App";
import { createAnalysisTree, createGameTree, AnalysisTreeNode } from "../tictactoe/analyzer";
import TreeBranchComponent from "./TreeBranchComponent";

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

  return (
    <div className='flex flex-row gap-2 px-2'>
      <div className='flex flex-1 flex-col gap-2 place-items-center'>
        <div className='flex flex-wrap h-96 w-96 flex-0'>
          {game.board.cells.map((cell, i) =>
            <div key={i}
            className='flex h-1/3 flex-none place-items-center place-content-center basis-1/3'
            style={{ borderWidth: getBorderStyle(i) }}
            onClick={() => {
              if (props.aiDifficulty !== AiDifficulty.NONE && game.turnPlayer === aiPlayer) return;
              const newGame = applyMove(game, i, game.turnPlayer);
              setGame(newGame);
            }}>
              <p className='text-6xl select-none'>{cell}</p>
            </div>
          )}
        </div>
        <div className='flex flex-1 flex-col items-center'>
          <p className='text-4xl select-none text-center'>{getStateText(game, props.aiDifficulty === AiDifficulty.NONE ? '' : aiPlayer)}</p>
          {props.aiDifficulty === AiDifficulty.IMPOSSIBLE
            && <div className='flex flex-row gap-2'>
                <input type="checkbox" checked={showAnalysisTree} onChange={() => setShowAnalysisTree(!showAnalysisTree)} />
                <p>show analysis.</p>
            </div>
          }
          {game.gameState.isEnded && <p className='text-2xl select-none cursor-pointer animate-restartGame text-center'
            onClick={() => {
              setAiPlayer(aiPlayer === 'x' ? 'o' : 'x');
              setGame(createDefaultGame());
            }}>click to restart.</p>}
        </div>
      </div>
      { showAnalysisTree
        && <div className='flex flex-col flex-1 gap-0.5'>
            {analysisTree?.branches.map(branch => 
              <TreeBranchComponent branch={branch} depth={0} />
            )}
          </div>
      }
    </div>
  );
}