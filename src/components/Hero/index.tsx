import { FC } from 'react'

import styles from './style.module.scss'
interface HeroProps {
  title?: string
  subtitle?: string
}

export const Hero: FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.keyVisual}>/</span>
        {title}
      </h2>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  )
}
