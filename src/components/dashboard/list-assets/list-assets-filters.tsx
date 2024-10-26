import { Input } from '~/components/ui/input'

type ListAssetsFiltersProps = {
  filter: string | null
  onFilter: (filter: string) => void
}

export function ListAssetsFilters({
  filter,
  onFilter,
}: ListAssetsFiltersProps) {
  return (
    <div className="flex">
      <Input
        value={filter ?? ''}
        type="search"
        placeholder="Buscar ativo"
        className="h-8 w-52 rounded-lg bg-gray-50 shadow-inner"
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  )
}
