'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'

import { BuyAssetForm } from './buy-asset-form'

export function BuyAsset() {
  const { isBuyingModalOpen, onToggleBuyingModal } = useListAssetsActions(
    (state) => state,
  )

  return (
    <Dialog open={isBuyingModalOpen} onOpenChange={onToggleBuyingModal}>
      <DialogTrigger className="hidden">Nova Compra</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Compra</DialogTitle>
        </DialogHeader>

        <BuyAssetForm />
      </DialogContent>
    </Dialog>
  )
}
