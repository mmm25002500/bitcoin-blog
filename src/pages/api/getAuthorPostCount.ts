import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { author } = req.query;

	if (!author || typeof author !== "string") {
		return res.status(400).json({ error: "Invalid author parameter" });
	}

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
		// 查詢 Post 和 News 表，計算該作者的文章總數
		const [postResult, newsResult] = await Promise.all([
			supabase
				.from("Post")
				.select("id", { count: "exact", head: true })
				.eq("author_id", author),
			supabase
				.from("News")
				.select("id", { count: "exact", head: true })
				.eq("author_id", author),
		]);

		if (postResult.error) {
			console.error("[ERR] 查詢 Post 數量失敗:", postResult.error.message);
		}
		if (newsResult.error) {
			console.error("[ERR] 查詢 News 數量失敗:", newsResult.error.message);
		}

		const postCount = (postResult.count || 0) + (newsResult.count || 0);

		return res.status(200).json({ author, postCount });
	} catch (error) {
		console.error("Error accessing Supabase:", error);
		return res
			.status(404)
			.json({ error: "Author not found or no posts available" });
	}
}
