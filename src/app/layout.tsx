import type { Metadata } from 'next'
import { Quicksand, Roboto } from 'next/font/google'

import './globals.css'
import { ReactQueryProvider } from '~/providers/react-query-provider'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['500'],
})

export const metadata: Metadata = {
  title: 'Investment Wallet',
  description: 'Your investment wallet app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${roboto.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
