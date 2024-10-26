import { z } from 'zod'

export const genericPaginationSchema = z.object({
  currentPage: z.number().min(1),
  lastPage: z.number().min(1),
  perPage: z.number().min(1),
  total: z.number().min(1),
  prev: z.string().url().nullable(),
  next: z.string().url().nullable(),
})

export type GenericPagination = z.infer<typeof genericPaginationSchema>
