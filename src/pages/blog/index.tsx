import { Auth } from '@/components/Auth'
import { Posts } from '@/components/Blog'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'
import { getAllPosts } from '@/lib/client'
import { Post } from '@/types/post'

interface BlogProps {
  posts: Post[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Meta pageTitle="Blog" pageDesc="会員限定のBlogの一覧です" />
      <Hero title="Blog" />
      <Container>
        <Posts posts={posts} />
      </Container>
      <Auth />
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {
      posts: posts
    }
  }
}
