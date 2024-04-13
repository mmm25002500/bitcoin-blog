import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostProps } from "../Articals/Post";

// 多個文章
export interface MarkDownsProps {
  posts: {
    source: MDXRemoteSerializeResult;
    frontMatter: PostProps;
  }[];
}

export interface MarkDownProps {
  post: {
    source: MDXRemoteSerializeResult;
    frontMatter: PostProps;
  };
}
