import { z } from 'zod'

import { reaisToDecimal } from '~/lib/currency'
import { isDateEqualOrAfterToday } from '~/lib/date'
import { AssetType } from '~/schemas/asset'

export const createAssetFormSchema = z.object({
  name: z.string().min(1, 'Ticker do ativo é obrigatório'),
  purchaseDate: z
    .date()
    .refine(
      (value) => isDateEqualOrAfterToday(value),
      'Data de compra deve maior ou igual que data atual',
    ),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
  quote: z
    .string()
    .refine((value) => reaisToDecimal(value) > 0, 'Preço deve ser maior que 0'),
  type: z.nativeEnum(AssetType),
})

export type CreateAssetForm = z.infer<typeof createAssetFormSchema>
