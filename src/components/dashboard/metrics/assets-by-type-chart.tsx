'use client'

import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import {
  Label,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts'
import { useWindowSize } from 'usehooks-ts'

import { Loader } from '~/components/loader'
import { TurnOffDefaultPropsWarning } from '~/components/turn-off-default-props-warning'
import { Card, CardContent } from '~/components/ui/card'
import {
  AssetColorsChartType,
  AssetLabelChartType,
} from '~/constant/asset-type'
import { formatCurrency } from '~/lib/currency'
import { cn } from '~/lib/utils'
import { getAssetsByType } from '~/services/metrics'

type CustomLegendProps = LegendProps & {
  isMobile: boolean
}

function CustomLegend(props: CustomLegendProps) {
  const { payload, isMobile } = props
  if (payload && payload.length) {
    return (
      <div
        className={cn('grid grid-cols-2 gap-y-4', {
          'mt-4': isMobile,
          'ml-4': !isMobile,
        })}
      >
        {payload?.map(({ value: label, color, payload }, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { total } = payload as any
          if (total) {
            return (
              <div key={`item-${index}`} className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-3">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-roboto text-xs font-medium text-black/40">
                    {
                      AssetLabelChartType[
                        label as keyof typeof AssetLabelChartType
                      ]
                    }
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="size-2 rounded-full" />
                  <span className="font-roboto text-base font-medium text-black/90">
                    {formatCurrency({
                      amount: total,
                    })}
                  </span>
                </div>
              </div>
            )
          }

          return null
        })}
      </div>
    )
  }

  return null
}

export function AssetsByTypeChart() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'assets-grouped-by-type'],
    queryFn: getAssetsByType,
  })

  const { width = 0 } = useWindowSize()
  const isMobile = width < 640

  const chartData = React.useMemo(() => {
    return (
      data?.map(({ type, total }) => ({
        type,
        total,
        fill: AssetColorsChartType[type as keyof typeof AssetColorsChartType],
      })) ?? []
    )
  }, [data])

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0)
  }, [chartData])

  return (
    <Card className="col-span-full max-h-[300px] xl:col-span-5">
      <TurnOffDefaultPropsWarning />
      <CardContent className="flex h-full w-full items-center justify-center p-4">
        {isLoading && !data ? (
          <Loader />
        ) : (
          <p className="text-xs font-medium text-black/40">
            Nenhum dado disponível
          </p>
        )}
        {data && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Legend
                wrapperStyle={{
                  width: isMobile ? 'auto' : 240,
                  height: isMobile ? 'auto' : 96,
                }}
                iconType="circle"
                verticalAlign={isMobile ? 'bottom' : 'middle'}
                align={isMobile ? 'center' : 'right'}
                iconSize={10}
                content={<CustomLegend isMobile={isMobile} />}
              />

              <Pie
                data={chartData}
                nameKey="type"
                dataKey="total"
                innerRadius="60%"
                outerRadius="100%"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-sm font-bold text-black"
                          >
                            {formatCurrency({ amount: totalAmount })}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
