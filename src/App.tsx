import { useState } from 'react';
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import TicTacToeComponent from './components/TicTacToeComponent'

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
        <HeaderComponent setGameMode={setGameMode} />
        { (view === View.SOLO || view === View.DUO) && <TicTacToeComponent aiDifficulty={aiDifficulty}/> }
      </div>
    </>
  )
}

export default App
