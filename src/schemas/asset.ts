import { z } from 'zod'

import { transactionSchema } from './transaction'

export enum AssetType {
  ACTION = 'action',
  REAL_ESTATE = 'real estate',
  FIXED_INCOME = 'fixed income',
  CRYPTOCURRENCY = 'cryptocurrency',
}

export const assetSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  purchaseDate: z.date(),
  quantity: z.number(),
  quote: z.number(),
  type: z.nativeEnum(AssetType),
  totalInvested: z.number(),
  transactions: z.array(transactionSchema),
})

export type Asset = z.infer<typeof assetSchema>
