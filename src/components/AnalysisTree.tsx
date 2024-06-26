import { AnalysisTreeNode } from "../tictactoe/analyzer";
import TreeBranch from "./TreeBranch";

interface AnalysisTreeProps {
  analysisTree: AnalysisTreeNode | undefined;
}
export default function AnalysisTree(props: AnalysisTreeProps) {
  return (
    <div className='flex flex-col flex-1 gap-0.5'>
      <p className='text-lg'>ai thought process.</p>
      {props.analysisTree?.branches.map(branch => 
        <TreeBranch key={branch.game.lastMove} branch={branch} depth={0} />
      )}
    </div>
  );
}