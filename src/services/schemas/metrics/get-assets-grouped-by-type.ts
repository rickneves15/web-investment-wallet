import { z } from 'zod'

export const getAssetsByTypeResponseSchema = z.array(
  z.object({
    type: z.string(),
    total: z.number(),
  }),
)

export type GetAssetsByTypeResponse = z.infer<
  typeof getAssetsByTypeResponseSchema
>
