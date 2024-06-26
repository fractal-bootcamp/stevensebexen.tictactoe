import { AiDifficulty } from "../App";
import { TicTacToeTile } from "../tictactoe/board";
import { Game, getStateText } from "../tictactoe/game";

interface StatusBarProps {
  game: Game;
  aiDifficulty: AiDifficulty
  onRestartGame: () => void;
  aiPlayer: TicTacToeTile;
  showAnalysisTree: boolean;
  onShowAnalysisTreeInputChanged: () => void;
}
export default function StatusBar(props: StatusBarProps) {
  return (
    <div className='flex flex-1 flex-col items-center p-4'>
      <p className='text-4xl select-none text-center'>{getStateText(props.game, props.aiDifficulty === AiDifficulty.NONE ? '' : props.aiPlayer)}</p>
      {props.aiDifficulty === AiDifficulty.IMPOSSIBLE
        && <div className='flex flex-row gap-2'>
            <input type="checkbox" checked={props.showAnalysisTree} onChange={props.onShowAnalysisTreeInputChanged} />
            <p>show ai thought process.</p>
        </div>
      }
      {props.game.gameState.isEnded && <p className='text-2xl select-none cursor-pointer animate-restartGame text-center'
        onClick={props.onRestartGame}>click to restart.</p>}
    </div>
  );
}