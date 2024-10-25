import { z } from 'zod'

export const getTotalGrossResponseSchema = z.object({
  totalGross: z.number(),
})

export type TotalGrossResponse = z.infer<typeof getTotalGrossResponseSchema>
