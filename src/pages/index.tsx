import { About } from '@/components/About'
import { Auth } from '@/components/Auth'
import { Background } from '@/components/Background'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'

export default function Home() {
  return (
    <>
      <Meta />
      <Hero />
      <Auth />
      <Background>
        <About />
      </Background>
    </>
  )
}
