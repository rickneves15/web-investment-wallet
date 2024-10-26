import { AvatarFallback } from '@radix-ui/react-avatar'

import { Avatar } from '~/components/ui/avatar'
import { AssetColorsChartType } from '~/constant/asset-type'
import { formatCurrency } from '~/lib/currency'
import { getFirstLetters } from '~/lib/string'
import { Asset } from '~/schemas/asset'

import { ListAssetsItemActions } from './list-assets-item-actions'

type ListAssetsItemProps = {
  asset: Asset
}

export function ListAssetsItem({ asset }: ListAssetsItemProps) {
  const avatarColorHex =
    AssetColorsChartType[asset.type as keyof typeof AssetColorsChartType]
  return (
    <div className="flex w-full items-center gap-x-5 bg-black/0">
      <Avatar
        className="flex w-[5%] items-center justify-center"
        style={{ backgroundColor: avatarColorHex }}
      >
        <AvatarFallback className="bg-transparent text-sm font-bold text-white">
          {getFirstLetters(asset.name)}
        </AvatarFallback>
      </Avatar>
      <span className="w-[25%] text-left text-base font-medium leading-none text-gray-700">
        {asset.name}
      </span>
      <span className="w-[30%] text-left text-base font-medium leading-normal text-gray-700">
        Saldo Atual:{' '}
        <span className="text-base font-bold leading-normal text-gray-700">
          {' '}
          {formatCurrency({
            amount: asset.totalInvested,
          })}
        </span>
      </span>
      <span className="w-[20%] text-base font-medium leading-normal text-gray-700">
        Quantidade:{' '}
        <span className="text-base font-bold leading-normal text-gray-700">
          {' '}
          {asset.quantity}
        </span>
      </span>
      <span className="w-[10%]">
        <ListAssetsItemActions />
      </span>
    </div>
  )
}
