import { FC, ReactElement } from 'react'

import styles from './style.module.scss'

interface BackgroundProps {
  children: ReactElement
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return <div className={styles.backgroundColor}>{children}</div>
}
