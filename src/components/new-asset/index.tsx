import { useState } from 'react'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

import { NewAssetForm } from './new-asset-form'

export function NewAsset() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex justify-between rounded-xl border border-blue-400 bg-blue-400 text-xs font-semibold leading-tight text-white hover:bg-blue-400/90">
          <Plus className="size-4 bg-transparent" />
          Adicionar Ativo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Ativo</DialogTitle>
        </DialogHeader>

        <NewAssetForm onNewAsset={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
