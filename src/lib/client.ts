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

// 254p
export const getAllSlugs = async (limit = 100): Promise<{ slug: string }[]> => {
  try {
    const posts = await client.get({
      endpoint: 'blogs',
      queries: { limit, fields: 'title,slug', orders: '-publishDate' }
    })
    return posts.contents
  } catch (error) {
    console.error('get all slugs error')
    console.error(error)
    return []
  }
}

// 269p
export const getAllPosts = async (limit = 100): Promise<{ slug: string }[]> => {
  try {
    const posts = await client.get({
      endpoint: 'blogs',
      queries: { limit, fields: 'title,slug,eyecatch', orders: '-publishDate' }
    })
    return posts.contents
  } catch (error) {
    console.error('get all posts error')
    console.error(error)
    return []
  }
}
