import "./style/main.css"
import  GameBanner  from "./components/gameBanner";
import BannerButton from "./components/bannerButton"
import TitleBanner from './components/titleBanner'
import Modal from './components/modal/index'
import logoImg  from "./imagens/Logo.svg"
import {useState, useEffect } from "react"
import * as Dialog from '@radix-ui/react-dialog'



interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
   ads:number;
  }
}
function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(()=>{
  fetchData()
  }, [])
  
  async function fetchData() {
  const res = await fetch("http://localhost:3333/games")
  const data = await res.json()  
  setGames(data)
  
}

  return (
    <div className="max-w-[944px] mx-auto flex flex-col items-center my-20">
     <img src={logoImg}  />
     <TitleBanner />

      <div className="grid grid-cols-6 gap-4 mt-10">

        {games && games.map((game)=>(
          <GameBanner
           key={game.id} 
           bannerUrl={game.bannerUrl} 
           title={game.title} 
           adsCount={game._count.ads}
          />
        ))}
            
      </div>
      <Dialog.Root>
      <BannerButton />
        <Modal /> 
      </Dialog.Root>
    </div>
  
  )
}

export default App
