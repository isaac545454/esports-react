
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import { GameController, Check } from 'phosphor-react'
import Input from '../form'
import {useState, useEffect, FormEvent} from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

interface Game{
  id: string;
  title: string;
  
}

export default function  modal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [voice, setVoice] = useState(false)

  useEffect(()=>{
  fetchData()
  }, [])

  console.log(voice);
  
  
  async function fetchData() {
  const res = await fetch("http://localhost:3333/games")
  const data = await res.json()  
  setGames(data)
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) return alert("preencha todos os campos")
    if(!data.discord) return alert("preencha todos os campos")
    if(!data.yearsPlayin) return alert("preencha todos os campos")
    if(!data.hoursEnd) return alert("preencha todos os campos")
    if(!weekDays) return alert("preencha todos os campos")
    if(!data.hourStart) return alert("preencha todos os campos")
    

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
          name: data.name,
          yearsPlaying: Number(data.yearsPlayin),
           discord: data.discord,
           weekDays: weekDays.map(Number),
           hourStart: data.hourStart,
           hoursEnd: data.hoursEnd,
          useVoiceChannel: voice
  
      })
      alert("anuncio criado com sucesso")
    } catch (error) {
      alert("erro ao criar o anuncio")
      console.log(error);
      
    }
  
  }

  return(
  <Dialog.Portal>
  <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
  <Dialog.Content 
  className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
   <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
    <>
     <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">

        <div className="flex flex-col gap-2">
         <label
          htmlFor="game" 
          className="font-semibold">qual o game?
          </label> 
          <select
           name="game"
           id='game' 
           className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zine-500 appearance-none"
           defaultValue=""
           >
            <option disabled  value="">Selecione o game que deseja jogar</option>
            {games.map((game)=>( 
                <option key={game.id} value={game.id}>{game.title}</option>
                )
              )}
           </select>
        </div>

        <div className="flex flex-col gap-2">
           <label htmlFor="name" className="font-semibold" >seu nome (ou nickname)</label>
          
           <Input id="name" name="name"  placeholder="como te chamam no game"  />
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="flex flex-col gap-2">
           <label htmlFor="yearsPlaying">joga há quantos anos?</label>
           <Input 
           name="yearsPlayin"
           id="yearsPlaying" 
           type="number"
           placeholder="tudo bem ser zero" />
           
         </div>
         <div className="flex flex-col gap-2">
           <label htmlFor="discord">qual seu discord </label>
           <Input type="text" id="discord" name="discord" placeholder="Usuario" />
           
         </div>
        </div>

        <div className="flex gap-6"> 
         <div className="flex flex-col gap-2">
           <label htmlFor="weekDays">
             quando costuma jogar? 
           </label>
         
           <ToggleGroup.Root 
           onValueChange={setWeekDays}
           value={weekDays}
           type="multiple" 
           className="grid grid-cols-4 gap-2">

             <ToggleGroup.Item value="0"
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ?
              'bg-violet-600': ''}`} 
              title="domingo">
                D
                </ToggleGroup.Item>

             <ToggleGroup.Item value="1"
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ?
              'bg-violet-600': ''}`}
               title="segunda">
                S
                </ToggleGroup.Item>

             <ToggleGroup.Item
              value="2"
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ?
              'bg-violet-600': ''}`}
               title="terça">
                T
                </ToggleGroup.Item>

             <ToggleGroup.Item 
             value="3" 
            
             className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ?
             'bg-violet-600': ''}`}itle="quarta">
              Q
              </ToggleGroup.Item>

             <ToggleGroup.Item
              value="4"
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ?
              'bg-violet-600': ''}`}itle="quinta">
                Q
                </ToggleGroup.Item>

             <ToggleGroup.Item 
             value="5" 
             className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ?
              'bg-violet-600': ''}`}
             title="sexta">
              S
              </ToggleGroup.Item>

             <ToggleGroup.Item
              value="6" 
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ?
              'bg-violet-600': ''}`} 
              title="sabado">S</ToggleGroup.Item>
           </ToggleGroup.Root>
         
         </div>
         <div className="flex flex-col gap-2 flex-1">
           <label htmlFor="hourStart">qual horario do dia?</label>
           <div className="grid grid-cols-2 gap-2">
             <Input id="hourStart" name="hourStart" type="time" placeholder="de" />
             <Input id="hoursEnd" name="hoursEnd" type="time" placeholder="ate" />
           </div>
         </div>
        </div>   

        <label className="mt-2 flex items-center gap-2 text-sm ">
        <Checkbox.Root 
        className="w-6 h-6 rounded bg-zinc-900"
        checked={voice}
        onCheckedChange={()=>{
          setVoice(!voice)
        }}
        >
          <Checkbox.Indicator>
            <Check  className="w-6 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>

         Costumo me conectar ao chat de voz
        </label>

        <footer className="mt-4 flex justify-end gap-4">
         <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold 
         hover:bg-zinc-600">Cancelar</Dialog.Close>
         <button type="submit"
        className="bg-violet-500 px-5 h-12 rounded-md 
        font-semibold flex items-center gap-3 hover:bg-violet-600"
         >
           <GameController size={24} />
           encontrar duo
           </button>
        </footer>
     </form>
    </>
  </Dialog.Content>
</Dialog.Portal>)
}