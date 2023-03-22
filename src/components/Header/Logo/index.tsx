import Link from 'next/link'
import { FC } from 'react'

import styles from './style.module.scss'

export const Logo: FC = () => {
  return (
    <Link href="/">
      <h1 className={styles.logo}>office Shimizu</h1>
    </Link>
  )
}
