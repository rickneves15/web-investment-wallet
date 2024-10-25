'use client'

import { HouseIcon } from 'lucide-react'

import { Breadcrumb } from '~/components/breadcrumb'
import { Container } from '~/components/container'
import { ListAssets } from '~/components/dashboard/list-assets'
import { AssetsByTypeChart } from '~/components/dashboard/metrics/assets-by-type-chart'
import { MetricMonthlyTransactions } from '~/components/dashboard/metrics/metric-monthly-transactions'
import { MetricTotalAssets } from '~/components/dashboard/metrics/metric-total-assets'
import { MetricTotalGross } from '~/components/dashboard/metrics/metrics-total-gross'
import { Footer } from '~/components/footer'

export default function Home() {
  return (
    <Container>
      <Breadcrumb title="Meus Investimentos" icon={HouseIcon} />
      <main className="flex flex-col gap-8">
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <MetricTotalGross />
          <MetricTotalAssets />
          <MetricMonthlyTransactions />
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <AssetsByTypeChart />
          <ListAssets />
        </section>
      </main>
      <Footer />
    </Container>
  )
}
