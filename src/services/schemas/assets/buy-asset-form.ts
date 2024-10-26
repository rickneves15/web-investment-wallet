import { z } from 'zod'

import { reaisToDecimal } from '~/lib/currency'
import { isDateEqualOrAfterToday } from '~/lib/date'

export const buyAssetFormSchema = z.object({
  assetId: z.string().uuid(),
  date: z
    .date()
    .refine(
      (value) => isDateEqualOrAfterToday(value),
      'Data de compra deve maior ou igual que data atual',
    ),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
  unitPrice: z
    .string()
    .refine((value) => reaisToDecimal(value) > 0, 'Preço deve ser maior que 0'),
})

export type BuyAssetForm = z.infer<typeof buyAssetFormSchema>
