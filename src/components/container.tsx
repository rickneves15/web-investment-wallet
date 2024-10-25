import { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col gap-y-8 bg-white px-6 pb-8 pt-5 md:px-10 md:pb-14">
      {children}
    </div>
  )
}
