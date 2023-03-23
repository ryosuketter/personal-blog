import { FC, ReactElement } from 'react'

import styles from './style.module.scss'

interface ContainerProps {
  children: ReactElement
  large?: boolean
}

export const Container: FC<ContainerProps> = ({ children, large = false }) => {
  return <div className={large ? styles.large : styles.default}>{children}</div>
}
