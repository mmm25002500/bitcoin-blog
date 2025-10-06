import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ success: false, error: "Method not allowed" });
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return res
			.status(500)
			.json({
				success: false,
				error: "Supabase environment variables are missing.",
			});
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return Object.entries(req.cookies).map(([name, value]) => ({
					name,
					value: value as string,
				}));
			},
			setAll(cookiesToSet) {
				for (const { name, value, options } of cookiesToSet) {
					res.setHeader(
						"Set-Cookie",
						`${name}=${value}; Path=${options?.path || "/"}; ${options?.httpOnly ? "HttpOnly;" : ""} ${options?.secure ? "Secure;" : ""} ${options?.sameSite ? `SameSite=${options.sameSite};` : ""}`,
					);
				}
			},
		},
	});

	// 1. 撈出作者清單
	const { data: authors, error: authorError } = await supabase
		.from("author")
		.select("*")
		.order("created_at", { ascending: false });

	if (authorError) {
		console.error("[ERR] 取得作者失敗", authorError.message);
		return res.status(500).json({ success: false, error: authorError.message });
	}

	// 2. 呼叫 get_news_count function
	const { data: newsCounts, error: newsError } =
		await supabase.rpc("get_news_counts");
	if (newsError) {
		console.error("[ERR] 取得 news count 失敗", newsError.message);
		return res.status(500).json({ success: false, error: newsError.message });
	}

	// 3. 呼叫 get_post_counts function
	const { data: postCounts, error: postError } =
		await supabase.rpc("get_post_counts");
	if (postError) {
		console.error("[ERR] 取得 post count 失敗", postError.message);
		return res.status(500).json({ success: false, error: postError.message });
	}

	// 4. 整合 post + news 數量
	const countsMap = new Map<string, number>();

	for (const item of newsCounts ?? []) {
		countsMap.set(
			item.author_id,
			(countsMap.get(item.author_id) ?? 0) + item.count,
		);
	}
	for (const item of postCounts ?? []) {
		countsMap.set(
			item.author_id,
			(countsMap.get(item.author_id) ?? 0) + item.count,
		);
	}

	// 5. 加入 postQuantity 至每位作者資料中,並組合完整圖片 URL
	const enrichedAuthors = authors.map((author) => ({
		...author,
		image: author.image
			? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${author.image}`
			: "",
		postQuantity: countsMap.get(author.id) ?? 0,
	}));

	return res.status(200).json({ success: true, data: enrichedAuthors });
}
