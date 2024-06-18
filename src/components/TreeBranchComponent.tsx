import { useState } from "react";
import { AnalysisTreeNode } from "../tictactoe/analyzer";

interface TreeBranchComponentProps {
  branch: AnalysisTreeNode
  depth: number
}
export default function TreeBranch(props: TreeBranchComponentProps) {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  return (
    <div className='flex flex-initial flex-col flex-1'>
      <div className="flex flex-row flex-0 basis-1 px-2 gap-2 border select-none" style={{ marginLeft: `${2*props.depth}rem` }} onClick={ () => setShowChildren(!showChildren) }>
        <p>{showChildren ? 'v' : '>'}</p>
        <p className="font-bold">{props.branch.game.lastMove}:</p>
        <p>{props.branch.minimaxValue}</p>
      </div>
      {showChildren
        && props.branch.branches.map(b =>
          <TreeBranch branch={b} depth={props.depth + 1} />
        )
      }
    </div>
  )
}