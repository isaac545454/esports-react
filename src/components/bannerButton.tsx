import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export default function bannerButton() {
  return (
    <div className="pt-1 bg-gradient self-stretch rounded-lg mt-8 overflow-hidden">
    <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
      <div>
          <strong className="text-2xl text-white font-black block">não encontrou seu duo?</strong>
          <span className="text-zinc-400 blocks">Publique um anúncio para encontrar novos players!</span>
      </div>
      <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600
       text-white rounded flex items-center gap-3">
      <MagnifyingGlassPlus size={24} />
        publicar anúncio
      </Dialog.Trigger>
    </div>
    </div>
  )
}
