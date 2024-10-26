import { reaisToDecimal } from '~/lib/currency'

import { api } from './api'
import { BuyAssetForm } from './schemas/assets/buy-asset-form'
import { CreateAssetForm } from './schemas/assets/create-asset-form'
import {
  GetAssetsParams,
  getAssetsParamsSchema,
  GetAssetsResponse,
} from './schemas/assets/get-assets'
import { SellAssetForm } from './schemas/assets/sell-asset-form'

export async function getAssets(params: GetAssetsParams) {
  const { page, perPage, search } = getAssetsParamsSchema.parse(params)

  const response = await api.get<GetAssetsResponse>('/assets', {
    params: {
      page,
      perPage,
      search: search ?? undefined,
    },
  })

  return response.data
}

export async function createAsset(asset: CreateAssetForm) {
  const response = await api.post<GetAssetsResponse>('/assets', {
    name: asset.name,
    purchaseDate: asset.purchaseDate.toISOString(),
    quantity: Number(asset.quantity),
    quote: reaisToDecimal(asset.quote),
    type: asset.type,
  })

  return response.data
}

export async function deleteAsset(assetId: string) {
  await api.delete(`/assets/${assetId}`)
}

export async function buyAsset(asset: BuyAssetForm) {
  const response = await api.post<GetAssetsResponse>('/transactions/buy', {
    assetId: asset.assetId,
    date: asset.date.toISOString(),
    quantity: Number(asset.quantity),
    unitPrice: reaisToDecimal(asset.unitPrice),
  })

  return response.data
}

export async function sellAsset(asset: SellAssetForm) {
  const response = await api.post<GetAssetsResponse>('/transactions/sell', {
    assetId: asset.assetId,
    date: asset.date.toISOString(),
    quantity: Number(asset.quantity),
  })

  return response.data
}
