import { ReactNode } from 'react'

import styles from './style.module.scss'

export const Body = ({ children }: { children: ReactNode }) => {
  return <div className={styles.stack}>{children}</div>
}
