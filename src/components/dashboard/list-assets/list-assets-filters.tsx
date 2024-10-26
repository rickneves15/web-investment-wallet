import { Input } from '~/components/ui/input'

type ListAssetsFiltersProps = {
  search: string
  onSearch: (search: string) => void
}

export function ListAssetsFilters({
  search,
  onSearch,
}: ListAssetsFiltersProps) {
  return (
    <div className="flex">
      <Input
        id="search-input-assets"
        value={search}
        type="search"
        placeholder="Buscar ativo"
        className="h-8 w-52 rounded-lg bg-gray-50 shadow-inner"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
