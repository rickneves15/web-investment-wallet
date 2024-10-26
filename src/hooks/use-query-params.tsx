import { useCallback } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

export const useQueryParams = () => {
  const searchParams = useSearchParams()!
  const pathname = usePathname()

  const setQueryParams = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      const newUrl = `${pathname}?${params.toString()}`
      window.history.replaceState(null, '', newUrl)
    },
    [pathname, searchParams],
  )

  return { setQueryParams }
}
