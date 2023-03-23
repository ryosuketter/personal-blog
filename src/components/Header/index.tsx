import { FC } from 'react'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Header/Logo'
import { Nav } from '@/components/Header/Nav'

import styles from './style.module.scss'

export const Header: FC = () => {
  return (
    <header>
      <Container large>
        <div className={styles.header}>
          <Logo />
          <Nav />
        </div>
      </Container>
    </header>
  )
}
