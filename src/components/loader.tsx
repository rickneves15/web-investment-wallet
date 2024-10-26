import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex h-[240px] w-full items-center justify-center">
      <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
    </div>
  )
}
