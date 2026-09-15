/**
 * 文章／新聞的網址：有自訂網址（slug）就用 slug，否則用編號。
 * 編號網址仍然有效，進去後會轉址到 slug。
 */
export function articleHref(
	type: string,
	post: { id?: string | number; slug?: string | null },
): string {
	const key = post.slug || post.id;
	return `/${type}/${encodeURIComponent(String(key ?? ""))}`;
}
