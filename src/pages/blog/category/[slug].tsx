import { GetStaticPropsContext } from 'next'

import { Auth } from '@/components/Auth'
import { Hero } from '@/components/Blog'
import { Posts } from '@/components/Blog'
import { Container } from '@/components/Container'
import { Meta } from '@/components/Meta'
import { getAllCategories, getPostsByCategory } from '@/lib/client'
import { Post } from '@/types/post'

type PostPreview = Pick<Post, 'title' | 'slug'>

type CategoryPageProps = {
  posts: PostPreview[]
  name: string
  slug: string
}

export default function Category({ posts, name, slug }: CategoryPageProps) {
  return (
    <>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <Hero title={slug} />
      <Container>
        <article>
          <h2 style={{ fontSize: 'var(--font-size-small-heading2)' }}>{name}の記事一覧</h2>
          <Posts posts={posts} />
        </article>
      </Container>
      <Auth />
    </>
  )
}

export const getStaticPaths = async () => {
  const categories = await getAllCategories()
  return {
    paths: categories.map((category) => `/blog/category/${category.slug}`),
    fallback: false
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string
  const categories = await getAllCategories()
  const category = categories.find((category) => category.slug === slug)

  if (!category) {
    return {
      notFound: true
    }
  }

  const posts = await getPostsByCategory(category.id)

  return {
    props: {
      posts: posts,
      name: category?.name,
      slug: category?.slug
    }
  }
}
