'use client'

import { Ellipsis } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'
import { Asset } from '~/schemas/asset'

type ListAssetsItemActionsProps = {
  asset: Asset
}

export function ListAssetsItemActions({ asset }: ListAssetsItemActionsProps) {
  const {
    setAssetToBuy,
    setAssetToSell,
    setAssetToDelete,
    onToggleDeletingModal,
    onToggleBuyingModal,
    onToggleSellingModal,
  } = useListAssetsActions((state) => state)

  const handleToggleBuyingModal = () => {
    onToggleBuyingModal()
    setAssetToBuy(asset)
  }

  const handleToggleSellingModal = () => {
    onToggleSellingModal()
    setAssetToSell(asset)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-xl bg-[#e7eef8] hover:bg-[#e4eefc]">
            <Ellipsis className="size-3 bg-transparent stroke-neutral-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem onClick={handleToggleBuyingModal}>
            Nova Compra
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleSellingModal}>
            Nova Venda
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              onToggleDeletingModal()
              setAssetToDelete(asset.id)
            }}
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
