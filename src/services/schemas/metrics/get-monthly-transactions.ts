import { z } from 'zod'

export const getMonthlyTransactionsResponseSchema = z.object({
  buyTransactions: z.number(),
  sellTransactions: z.number(),
})

export type GetMonthlyTransactionsResponse = z.infer<
  typeof getMonthlyTransactionsResponseSchema
>
