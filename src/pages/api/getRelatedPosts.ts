import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { tag, exclude, mode = "all" } = req.query;

	if (!tag || typeof tag !== "string") {
		return res.status(400).json({ error: "缺少或無效的 tag 參數" });
	}

	const tagsArray: string[] = JSON.parse(tag);

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return res.status(500).json({
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

	try {
		let allPosts: any[] = [];

		// 根據 mode 決定要查詢哪些表
		const tablesToQuery =
			mode === "all" ? ["Post", "News"] : mode === "Post" ? ["Post"] : ["News"];

		// 取得所有作者資料
		const { data: authors, error: authorError } = await supabase
			.from("author")
			.select("*");

		if (authorError) {
			console.error("[ERR] 取得作者失敗", authorError.message);
			return res.status(500).json({ error: authorError.message });
		}

		// 建立作者 ID 到作者資料的映射
		const authorMap = new Map(authors.map((a) => [a.id, a]));

		// 查詢每個表
		for (const tableName of tablesToQuery) {
			// 使用 Supabase 的 overlaps 來查找包含任何指定標籤的文章
			const { data, error } = await supabase
				.from(tableName)
				.select("*")
				.overlaps("tags", tagsArray)
				.order("created_at", { ascending: false })
				.limit(100);

			if (error) {
				console.error(`[ERR] 查詢 ${tableName} 失敗:`, error.message);
				continue;
			}

			// 將資料轉換為前端需要的格式
			const formattedPosts =
				data
					?.filter((post) => {
						// 排除當前文章（現在直接比對 ID）
						return post.id !== exclude;
					})
					.map((post) => {
						const authorData = authorMap.get(post.author_id);
						// 組合完整的圖片 URL
						const authorImageUrl = authorData?.image
							? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${authorData.image}`
							: "";
						const postImageUrl = post.image
							? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${post.image}`
							: "";

						return {
							title: post.title,
							description: post.description,
							tags: post.tags || [],
							date: post.created_at,
							authorData: {
								fullname: authorData?.fullname || "",
								name: authorData?.name || "",
								description: authorData?.description || "",
								image: authorImageUrl,
								id: post.author_id,
								posts: 0,
							},
							type: [tableName as "Post" | "News"],
							image: postImageUrl,
							id: post.id,
						};
					}) || [];

			allPosts = [...allPosts, ...formattedPosts];
		}

		// 按日期排序
		allPosts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

		return res.status(200).json(allPosts);
	} catch (error) {
		console.error("Error accessing Supabase:", error);
		return res.status(500).json({ error: "Error accessing Supabase" });
	}
}
