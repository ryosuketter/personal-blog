import Link from 'next/link'

import { Post } from '@/types/post'

import styles from './style.module.scss'

interface BlogProps {
  posts: Post[]
}

export const Posts = ({ posts }: BlogProps) => {
  return (
    <div className={styles.posts}>
      {posts.map(({ slug, title }) => (
        <article key={slug} className={styles.post}>
          <Link href={`/blog/${slug}`}>
            <h2 className={styles.text}>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  )
}
