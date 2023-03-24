import { About } from '@/components/About'
import { Background } from '@/components/Background'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'

export default function Home() {
  return (
    <>
      <Meta />
      <Hero />
      <Background>
        <About />
      </Background>
    </>
  )
}
