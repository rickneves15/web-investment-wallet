'use client'

import { useQuery } from '@tanstack/react-query'

import { CardMetric } from '~/components/card-metric'
import { getTotalAssets } from '~/services/metrics'

export function MetricTotalAssets() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-assets'],
    queryFn: getTotalAssets,
  })

  return (
    <CardMetric title="Total de ativos" isLoading={isLoading}>
      {data?.totalAssets ?? 0}
    </CardMetric>
  )
}
