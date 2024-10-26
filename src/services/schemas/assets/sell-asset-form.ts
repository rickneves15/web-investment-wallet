import { z } from 'zod'

import { isDateEqualOrAfterToday } from '~/lib/date'

export const sellAssetFormSchema = z.object({
  assetId: z.string().uuid(),
  date: z
    .date()
    .refine(
      (value) => isDateEqualOrAfterToday(value),
      'Data de compra deve maior ou igual que data atual',
    ),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
})

export type SellAssetForm = z.infer<typeof sellAssetFormSchema>
