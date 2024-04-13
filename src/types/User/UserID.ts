import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostProps } from "../Articals/Post";

// 你的页面props将包含多篇文章
export interface MarkDownProps {
  posts: {
    source: MDXRemoteSerializeResult;
    frontMatter: PostProps;
  }[];
}
