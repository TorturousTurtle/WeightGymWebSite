import { Blog } from './blog-interface'

export interface BlogProps {
  blogs: Blog[];
  blogImages: { key: string; value: string }[];
}
