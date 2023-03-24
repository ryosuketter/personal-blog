import icon from 'images/icon_400_400_monotone.png'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'

import styles from './style.module.scss'

export const About = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <Image src={icon} alt="Picture of the author" width={150} height={150} className={styles.image} />
          <h3 className={styles.name}>SHIMIZU RYOSUKE</h3>
          <p className={styles.nameSub}>志水亮介</p>
        </div>
        <div className={styles.career}>
          <p>1985年生まれ、愛知県名古屋市出身</p>
          <p>
            2006年にエンジニアとしてキャリアをスタートさせました。
            受託開発企業と自社開発企業にて経験を積み、プログラミング教育支援も行っています。
          </p>
        </div>
        <Link href="/projects" className={styles.link}>
          これまでのお仕事 →
        </Link>
      </div>
    </Container>
  )
}
