'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { CardMetric } from '~/components/card-metric'
import { getMonthlyTransactions } from '~/services/metrics'

export function MetricMonthlyTransactions() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-monthly-transactions'],
    queryFn: getMonthlyTransactions,
  })

  const monthlyTransactions = useMemo(() => {
    return `${data?.buyTransactions ?? 0} compras - ${data?.sellTransactions ?? 0} vendas`
  }, [data])

  return (
    <CardMetric title="Movimentações no mês" isLoading={isLoading}>
      {monthlyTransactions}
    </CardMetric>
  )
}
