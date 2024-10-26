import { Skeleton } from '~/components/ui/skeleton'

export function SkeletonListAssets() {
  return (
    <div className="flex flex-col gap-y-4">
      
      <Skeleton className="h-8 w-52" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex w-full items-center gap-x-5">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-12" />
        </div>
      ))}
    </div>
  )
}
