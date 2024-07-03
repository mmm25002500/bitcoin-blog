import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { AuthorData } from "../List/Author";

export interface MoreInfoData {
  post: {
    source: MDXRemoteSerializeResult;
    frontMatter: {
      title: string;
      description: string;
      date: string;
      tags: string[];
    };
  };
  ArticalName: string;
}

export interface categoryData {
  title: string;
  folder: string;
  post: {
    title: string;
    filename: string;
    date: string;
    description: string;
    link: string;
    authorData: AuthorData
  }[];
}
