import Link from 'next/link'
import { FC } from 'react'

import styles from './style.module.scss'

export const Nav: FC = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  )
}
