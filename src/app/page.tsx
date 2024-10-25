import { HouseIcon } from 'lucide-react'

import { Breadcrumb } from '~/components/breadcrumb'
import { Container } from '~/components/container'
import { Footer } from '~/components/footer'

export default function Home() {
  return (
    <Container>
      <Breadcrumb title="Meus Investimentos" icon={HouseIcon} />
      <main className="inline-flex flex-1 items-center justify-center bg-white"></main>
      <Footer />
    </Container>
  )
}
