import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

type CardMetricProps = {
  title: string
  children: React.ReactNode
  isLoading?: boolean
}

export function CardMetric({
  title,
  children,
  isLoading = false,
}: CardMetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-xl font-bold leading-3 text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <span className="text-2xl font-bold leading-3 text-zinc-800">
          {isLoading ? <Skeleton className="h-5 w-52" /> : children}
        </span>
      </CardContent>
    </Card>
  )
}
