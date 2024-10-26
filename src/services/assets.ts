import { api } from './api'
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
