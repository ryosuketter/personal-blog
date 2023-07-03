import Image from 'next/image'

import { Auth } from '@/components/Auth'
import { Body, ConvertBody, Hero } from '@/components/Blog'
import { Container } from '@/components/Container'
import { Meta } from '@/components/Meta'
import { getPostBySlug } from '@/lib/client'
import { Post } from '@/types/post'

export default function Blog({ title, content, slug, eyecatch, category, publishDate }: Post) {
  // eslint-disable-next-line no-console
  console.log('category', category)

  return (
    <>
      <Meta pageTitle="Blog" pageDesc="会員限定のBlogの一覧です" />
      <Hero title={slug} publishDate={publishDate} />
      <Container>
        <article>
          <figure style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              style={{ width: 'auto', height: 'auto' }}
              src={eyecatch.url}
              alt=""
              width={eyecatch.width}
              height={eyecatch.height}
              sizes="(min-width: 1152px) 1152px, 100vw"
            />
          </figure>
          <h2 style={{ fontSize: 'var(--font-size-heading2)' }}>{title}</h2>
          <Body>
            <ConvertBody contentHTML={content} />
          </Body>
        </article>
      </Container>
      <Auth />
    </>
  )
}

export const getStaticProps = async () => {
  const slug = 'info'
  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title,
      content: post.content,
      slug: post.slug,
      eyecatch: post.eyecatch,
      category: post.category,
      publishDate: post.publishDate
    }
  }
}
