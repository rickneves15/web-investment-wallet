'use client'

import { PropsWithChildren, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {/* TODO: Remove this in production */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  )
}
