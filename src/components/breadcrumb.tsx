import { ChevronRight, LucideIcon } from 'lucide-react'

type BreadcrumbProps = {
  title: string
  icon: LucideIcon
}

export function Breadcrumb({ title, icon: Icon }: BreadcrumbProps) {
  return (
    <div className="inline-flex w-full items-center justify-start gap-2 rounded-xl bg-white/50 px-4 py-3 shadow-xl">
      <Icon className="size-4 stroke-gray-700" />
      <ChevronRight className="size-4 stroke-zinc-700" />
      <span className="text-base font-semibold capitalize leading-normal text-gray-500 md:text-sm">
        {title}
      </span>
    </div>
  )
}
