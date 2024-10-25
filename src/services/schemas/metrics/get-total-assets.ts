import { z } from 'zod'

export const getTotalAssetsResponseSchema = z.object({
  totalAssets: z.number(),
})

export type TotalAssetsResponse = z.infer<typeof getTotalAssetsResponseSchema>
