import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// 不需要結束標籤的 HTML。一般 Markdown 常寫 <br>、<hr>、<img ...>，
// 但 MDX 要求一定要關閉，否則整篇轉換失敗
const VOID_TAGS = /<(br|hr|img|input|meta|link|source|wbr)(\s[^<>]*?)?\s*\/?>/gi;

export function closeVoidTags(markdown: string): string {
	return markdown.replace(
		VOID_TAGS,
		(_match, tag: string, attrs = "") => `<${tag}${attrs.trimEnd()} />`,
	);
}

/**
 * 把文章內容轉成 MDX。轉換失敗時回傳原始字串，
 * MD 元件收到字串會改用一般 Markdown 顯示，不會讓整頁 404。
 */
export async function serializeMarkdown(
	content: string,
): Promise<MDXRemoteSerializeResult | string> {
	try {
		return await serialize(closeVoidTags(content));
	} catch (error) {
		console.error("[ERR] MDX 轉換失敗，改用一般 Markdown 顯示:", error);
		return content;
	}
}
