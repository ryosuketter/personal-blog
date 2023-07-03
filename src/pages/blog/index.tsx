import { Auth } from '@/components/Auth'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'
import { getPostBySlug } from '@/lib/client'

export default function Blog() {
  return (
    <>
      <Meta pageTitle="Blog" pageDesc="会員限定のBlogの一覧です" />
      <Hero title="Blog" />
      <Auth />
    </>
  )
}

export const getStaticProps = async () => {
  const slug = 'info'
  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title
    }
  }
}
