import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MarkDownProperties {
	children: MDXRemoteSerializeResult | string;
	className?: string;
}
