import { eyecatchLocal } from 'lib/constants'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'

import { Auth } from '@/components/Auth'
import { Body, ConvertBody, Hero } from '@/components/Blog'
import { Container } from '@/components/Container'
import { Meta } from '@/components/Meta'
import { getAllSlugs, getPostBySlug } from '@/lib/client'
import { Post } from '@/types/post'

export default function Blog({ title, content, slug, eyecatch, category, publishDate }: Post) {
  // eslint-disable-next-line no-console
  console.log('category', category)

  return (
    <>
      <Meta
        pageTitle={title}
        pageDesc={title}
        pageImg={eyecatch.url}
        pageImgW={`${eyecatch.width}`}
        pageImgH={`${eyecatch.height}`}
      />
      <Hero title={slug} publishDate={publishDate} />
      <Container>
        <article style={{ marginBottom: 'var(--spacing-lg)' }}>
          <figure style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-sm)' }}>
            <Image
              style={{ width: 'auto', height: 'auto' }}
              src={eyecatch.url}
              alt=""
              width={eyecatch.width}
              height={eyecatch.height}
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority
            />
          </figure>
          <h2 style={{ fontSize: 'var(--font-size-heading2)', marginBottom: 'var(--spacing-md)' }}>{title}</h2>
          <Body>
            <ConvertBody contentHTML={content} />
          </Body>
        </article>
      </Container>
      <Auth />
    </>
  )
}

export const getStaticPaths = async () => {
  const slugs = await getAllSlugs()
  return {
    paths: slugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context?.params?.slug as string
  const post = await getPostBySlug(slug)
  const eyecatch = post.eyecatch ?? eyecatchLocal

  return {
    props: {
      title: post.title,
      content: post.content,
      slug: post.slug,
      eyecatch: eyecatch,
      category: post.category,
      publishDate: post.publishDate
    }
  }
}
