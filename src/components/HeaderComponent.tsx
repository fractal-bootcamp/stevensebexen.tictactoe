import { AiDifficulty, View } from "../App"

interface HeaderComponentProps {
  setGameMode: (view: View, aiDifficulty?: AiDifficulty) => void
}

export default function HeaderComponent(props: HeaderComponentProps) {
  return (
    <div className='flex flex-row flex-none pt-4 pl-8 self-start items-end'>
      <div className='px-8  hover:bg-purple-200 rounded-md transition-colors duration-200'
        onClick = {() => props.setGameMode(View.HOME)}>
        <p className='text-4xl select-none'>tic tac toe.</p>
      </div>
      <div className='relative group px-8'>
        <p className='text-2xl select-none'>1human.</p>
        <div className='text-xl flex flex-1 gap-2 flex-col absolute top-full left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full'>
          <div className=''>
            <p className='px-2 py-0.5 mt-1 hover:bg-purple-200 rounded-md transition-colors duration-200 select-none'
              onClick={() => props.setGameMode(View.SOLO, AiDifficulty.EASY)}>easy.</p>
          </div>
          <div className=''>
            <p className='px-2 py-0.5 hover:bg-purple-200 rounded-md transition-colors duration-200 select-none'
              onClick={() => props.setGameMode(View.SOLO, AiDifficulty.MEDIUM)}>normal.</p>
          </div>
          <div className=''>
            <p className='px-2 py-0.5 hover:bg-purple-200 rounded-md transition-colors duration-200 select-none'
              onClick={() => props.setGameMode(View.SOLO, AiDifficulty.HARD)}>hard.</p>
          </div>
        </div>
      </div>
      <div className='px-8  hover:bg-purple-200 rounded-md transition-colors duration-200'
        onClick = {() => props.setGameMode(View.DUO)}>
        <p className='text-2xl select-none'>2human.</p>
      </div>
    </div>
  )
}