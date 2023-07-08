import Link from 'next/link'
import { FC } from 'react'

import { Category } from '@/types/post'

import styles from './style.module.scss'

interface CategoryListLinkProps {
  category: Category
}

export const CategoryListLink: FC<CategoryListLinkProps> = ({ category }) => {
  return (
    <Link href={`/blog/category/${category.slug}`}>
      <p className={styles.link}>{`${category.name}のカテゴリ一覧へ`}</p>
    </Link>
  )
}
