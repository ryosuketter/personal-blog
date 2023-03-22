import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
