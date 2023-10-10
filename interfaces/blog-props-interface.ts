import { Blog } from './blog-interface'

export interface BlogProps {
  blogs: Blog[];
  blogImages: Map<string, string>;
}
