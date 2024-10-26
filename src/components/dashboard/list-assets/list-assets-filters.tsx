'use client'

import { Input } from '~/components/ui/input'
import { useQueryParams } from '~/hooks/use-query-params'

export function ListAssetsFilters() {
  const { setQueryParams } = useQueryParams()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value ?? null
    setQueryParams('search', search)
  }

  return (
    <div className="flex">
      <Input
        type="search"
        placeholder="Buscar ativo"
        className="h-8 w-52 rounded-lg bg-gray-50 shadow-inner"
        onChange={handleSearch}
      />
    </div>
  )
}
