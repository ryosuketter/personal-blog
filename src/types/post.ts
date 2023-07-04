type Eyecatch = {
  url: string
  height: number
  width: number
}

export type Category = {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  name: string
  slug: string
}

export type Post = {
  title: string
  content: string
  slug: string
  publishDate: string
  eyecatch: Eyecatch
  category: Category
}
