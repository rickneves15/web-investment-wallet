import { reaisToDecimal } from '~/lib/currency'

import { api } from './api'
import { CreateAssetForm } from './schemas/assets/create-asset-form'
import {
  GetAssetsParams,
  getAssetsParamsSchema,
  GetAssetsResponse,
} from './schemas/assets/get-assets'

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
