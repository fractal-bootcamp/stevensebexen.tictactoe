import { useState } from "react";
import { AnalysisTreeNode } from "../tictactoe/analyzer";

interface TreeBranchProps {
  branch: AnalysisTreeNode
  depth: number
}
export default function TreeBranch(props: TreeBranchProps) {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  return (
    <div className='flex flex-col flex-initial'>
      <div className="flex flex-row flex-0 basis-1 px-2 gap-2 border select-none" style={{ marginLeft: `${2*props.depth}rem` }} onClick={ () => setShowChildren(!showChildren) }>
        <p>{showChildren ? 'v' : '>'}</p>
        <p className="font-bold">{props.branch.game.lastMove}:</p>
        <p>{props.branch.minimaxValue}</p>
      </div>
      {showChildren
        && props.branch.branches.map(b =>
          <TreeBranch key={b.game.lastMove} branch={b} depth={props.depth + 1} />
        )
      }
    </div>
  )
}