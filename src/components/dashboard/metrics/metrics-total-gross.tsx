'use client'

import { useQuery } from '@tanstack/react-query'

import { CardMetric } from '~/components/card-metric'
import { formatCurrency } from '~/lib/currency'
import { getTotalGross } from '~/services/metrics'

export function MetricTotalGross() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-gross'],
    queryFn: getTotalGross,
  })

  return (
    <CardMetric title="Saldo bruto" isLoading={isLoading}>
      {formatCurrency({
        amount: data?.totalGross || 0,
      })}
    </CardMetric>
  )
}
