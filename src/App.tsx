import { useState } from 'react';
import './App.css'
import Header from './components/Header'
import TicTacToe from './components/TicTacToe'
import Intro from './components/Intro';

export enum View {
  HOME,
  SOLO,
  DUO
}

export enum AiDifficulty {
  NONE,
  POSSIBLE,
  IMPOSSIBLE
}

function App() {
  const [view, setView] = useState<View>(View.HOME);
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>(AiDifficulty.NONE);

  function setGameMode(v: View, d?: AiDifficulty) {
    setView(v);
    setAiDifficulty(d || AiDifficulty.NONE);
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Header setGameMode={setGameMode} />
        { (view === View.SOLO || view === View.DUO) && <TicTacToe aiDifficulty={aiDifficulty}/> }
        { (view === View.HOME) && <Intro />}
      </div>
    </>
  )
}

export default App
