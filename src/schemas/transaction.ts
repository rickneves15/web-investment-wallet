import { z } from 'zod'

export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
}

export const transactionSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(TransactionType),
  quantity: z.number(),
  unitPrice: z.number(),
  transactionDate: z.date(),
})

export type Transaction = z.infer<typeof transactionSchema>
