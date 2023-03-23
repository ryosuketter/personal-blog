import { FC } from 'react'

import { Logo } from '@/components/Logo'

import styles from './style.module.scss'

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
    </footer>
  )
}
