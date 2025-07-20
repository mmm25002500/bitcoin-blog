import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { AuthorData } from "../List/Author";

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
	ArticleName: string;
}

export interface categoryData {
	label?: string;
	title: string;
	folder: string;
	post: {
		title: string;
		filename: string;
		date: string;
		description: string;
		link: string;
		authorData: AuthorData;
	}[];
}
