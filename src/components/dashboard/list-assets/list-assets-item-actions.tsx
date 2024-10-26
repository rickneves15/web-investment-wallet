import { Ellipsis } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export function ListAssetsItemActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-xl bg-[#e7eef8] hover:bg-[#e4eefc]">
          <Ellipsis className="size-3 bg-transparent stroke-neutral-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>Nova Compra</DropdownMenuItem>
        <DropdownMenuItem>Nova Venda</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
