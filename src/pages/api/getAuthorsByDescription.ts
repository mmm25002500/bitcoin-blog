import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { text } = req.query;

	// 檢查 text 參數是否有效
	if (!text || typeof text !== "string") {
		return res.status(400).json({ error: "Invalid or missing text parameter" });
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
		// 從 Supabase 查詢作者，使用 ilike 進行模糊搜尋
		const { data: authors, error } = await supabase
			.from("author")
			.select("*")
			.ilike("description", `%${text}%`);

		if (error) {
			console.error("[ERR] 查詢作者失敗:", error.message);
			return res.status(500).json({ error: error.message });
		}

		// 組合完整的圖片 URL
		const authorsWithImageUrl = authors.map((author) => ({
			...author,
			image: author.image
				? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${author.image}`
				: "",
		}));

		// 回傳過濾後的作者資料
		res.status(200).json(authorsWithImageUrl);
	} catch (error) {
		console.error("Error accessing Supabase:", error);
		return res.status(500).json({ error: "Error accessing Supabase" });
	}
}
