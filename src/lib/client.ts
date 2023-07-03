import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || ''
})

// 220p
export const getPostBySlug = async (slug: string) => {
  try {
    const post = await client.get({ endpoint: 'blogs', queries: { filters: `slug[equals]${slug}` } })
    return post.contents[0]
  } catch (error) {
    console.error('get post by slug error')
    console.error(error)
  }
}
