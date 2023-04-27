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
      <a href="https://www.hakadori-soudan.com/aaa">リバースプロキシの確認</a>
      <a href="https://www.hakadori-soudan.com/recommended-no-code-tools">webサイトのコンテンツへ</a>
    </div>
  )
}
