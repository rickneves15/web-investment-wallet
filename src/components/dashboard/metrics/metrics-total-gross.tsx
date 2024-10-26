'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { CardMetric } from '~/components/card-metric'
import { formatCurrency } from '~/lib/currency'
import { getTotalGross } from '~/services/metrics'

export function MetricTotalGross() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-gross'],
    queryFn: getTotalGross,
  })

  const totalGross = useMemo(() => {
    return formatCurrency({
      amount: data?.totalGross || 0,
    })
  }, [data])

  return (
    <CardMetric title="Saldo bruto" isLoading={isLoading}>
      {totalGross}
    </CardMetric>
  )
}
