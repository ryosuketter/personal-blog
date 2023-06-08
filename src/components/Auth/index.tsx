import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { FC } from 'react'

import { Container } from '@/components/Container'
import { useAuth } from '@/features/stores/context/auth'
import { auth } from '@/lib/firebase/client'

import styles from './style.module.scss'

export const Auth: FC = () => {
  const user = useAuth()

  const handleClick = () => {
    signOut(auth)
      .then(() => alert('ログアウトしました'))
      .catch(() => alert('ログアウト失敗'))
  }

  return (
    <div className={styles.wrapper}>
      <Container large>
        <ul className={styles.list}>
          {!user ? (
            <>
              <li>
                <Link href="/signup" className={styles.link}>
                  sign up
                </Link>
              </li>
              <li>
                <Link href="/login" className={styles.link}>
                  login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => handleClick()}>ログアウト</button>
            </li>
          )}
        </ul>
      </Container>
    </div>
  )
}
