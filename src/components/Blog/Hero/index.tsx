import { FC } from 'react'

import { ConvertDate } from '@/components/ConvertDate'

import styles from './style.module.scss'

interface HeroProps {
  title?: string
  publishDate?: string
}

export const Hero: FC<HeroProps> = ({ title, publishDate = '' }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.keyVisual}>/</span>
        {title}
      </h2>
      {publishDate && <ConvertDate date={publishDate} className={styles.publishDate} />}
    </div>
  )
}
