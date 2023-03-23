import { FC } from 'react'

import styles from './style.module.scss'
interface HeroProps {
  title?: string
}

export const Hero: FC<HeroProps> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.keyVisual}>/</span>
        {title}
      </h2>
    </div>
  )
}
