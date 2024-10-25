import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export function ListAssets() {
  return (
    <Card className="col-span-full xl:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-xl font-bold leading-3 text-gray-500">
          Lista de ativos
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4"></CardContent>
    </Card>
  )
}
