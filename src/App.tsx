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
  EASY,
  MEDIUM,
  HARD
}

function App() {
  const [view, setView] = useState<View>(View.HOME);
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>(AiDifficulty.NONE);

  function setGameMode(v: View, d?: AiDifficulty) {
    if (v === view) return; 
    setView(v);
    setAiDifficulty(d || AiDifficulty.NONE);
  }

  return (
    <>
      <div className='flex flex-col'>
        <HeaderComponent setGameMode={setGameMode} />
        { (view === View.SOLO || view === View.DUO) && <TicTacToeComponent aiDifficulty={aiDifficulty}/> }
      </div>
    </>
  )
}

export default App
