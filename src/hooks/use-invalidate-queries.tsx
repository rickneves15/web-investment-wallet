'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useInvalidateQueries() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 5
  const search = searchParams.get('search') ? searchParams.get('search') : null

  async function invalidate() {
    queryClient.invalidateQueries({ queryKey: ['metrics', 'total-gross'] })
    queryClient.invalidateQueries({ queryKey: ['metrics', 'total-assets'] })
    queryClient.invalidateQueries({
      queryKey: ['metrics', 'total-total-monthly-transactions'],
    })
    queryClient.invalidateQueries({
      queryKey: ['assets', page, perPage, search],
    })
  }

  return { invalidate }
}
