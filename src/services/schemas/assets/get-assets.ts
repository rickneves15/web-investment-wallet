import { z } from 'zod'

import { assetSchema } from '~/schemas/asset'

import { genericPaginationSchema } from '../generic-pagination'

export const getAssetsParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).default(5),
  search: z.coerce.string().nullable(),
})

export type GetAssetsParams = z.infer<typeof getAssetsParamsSchema>

export const getAssetsResponseSchema = genericPaginationSchema.extend({
  data: z.array(assetSchema),
})

export type GetAssetsResponse = z.infer<typeof getAssetsResponseSchema>
