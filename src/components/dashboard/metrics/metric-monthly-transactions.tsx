'use client'

import { useQuery } from '@tanstack/react-query'

import { CardMetric } from '~/components/card-metric'
import { getMonthlyTransactions } from '~/services/metrics'

export function MetricMonthlyTransactions() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-gross'],
    queryFn: getMonthlyTransactions,
  })

  return (
    <CardMetric title="Movimentações no mês" isLoading={isLoading}>
      {`${data?.buyTransactions ?? 0} compras - ${data?.sellTransactions ?? 0} vendas`}
    </CardMetric>
  )
}
