'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'

import { SellAssetForm } from './sell-asset-form'

export function SellAsset() {
  const { isSellingModalOpen, onToggleSellingModal } = useListAssetsActions(
    (state) => state,
  )

  return (
    <Dialog open={isSellingModalOpen} onOpenChange={onToggleSellingModal}>
      <DialogTrigger className="hidden">Nova Venda</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Venda</DialogTitle>
        </DialogHeader>

        <SellAssetForm />
      </DialogContent>
    </Dialog>
  )
}
