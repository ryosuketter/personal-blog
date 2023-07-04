import Link from 'next/link'

import styles from './style.module.scss'

interface PostsProps {
  posts: {
    title: string
    slug: string
  }[]
}

export const Posts = ({ posts }: PostsProps) => {
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
