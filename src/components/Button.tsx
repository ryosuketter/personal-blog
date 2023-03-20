import { FC } from 'react'

import styles from './Button.module.scss'

export const Button: FC = () => {
  return (
    <div className={styles.bgc}>
      <p className={styles.text}>button</p>
    </div>
  )
}
