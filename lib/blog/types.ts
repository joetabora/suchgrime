export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
  published: boolean
}

export interface BlogPost extends BlogPostMeta {
  content: string
}
