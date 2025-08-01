import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { PostProps } from "../Article/Post";

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

export interface MarkDownDataProps {
	source: MDXRemoteSerializeResult;
	frontMatter: PostProps;
}

export interface NewsPostProps {
	id: string;
	title: string;
	description: string;
	tags: string[];
	date: string;
	source: string;
	authorData: {
		fullname: string;
		name: string;
		description: string;
		image: string;
		id: string;
	};
	type: ["Post" | "News"];
	img: string;
	image: string;
}

export interface NewsProps {
	posts: NewsPostProps[];
}
