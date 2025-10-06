import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id, type } = req.query;

	if (!id || !type) {
		return res.status(400).json({ error: "缺少 id 或 type" });
	}

	if (type !== "Post" && type !== "News") {
		return res.status(400).json({ error: "type 必須是 Post 或 News" });
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
		// 根據 type 選擇對應的資料表
		const tableName = type === "Post" ? "Post" : "News";

		// 從資料庫查詢取得所有文章資料
		const { data: post, error: queryError } = await supabase
			.from(tableName)
			.select("*")
			.eq("id", id)
			.single();

		if (queryError || !post) {
			console.error("[ERR] 查詢文章失敗:", queryError?.message);
			return res.status(404).json({ error: "找不到文章" });
		}

		console.log("[INFO] 查詢到文章:", { author_id: post.author_id, filename: post.filename });

		// 根據 type 選擇對應的 bucket
		const bucketName = type === "Post" ? "post.article" : "news.article";
		const filePath = post.filename;

		console.log("[INFO] 嘗試下載檔案:", { bucketName, filePath });

		// 從 Supabase Storage 下載檔案
		const { data: fileData, error: downloadError } = await supabase.storage
			.from(bucketName)
			.download(filePath);

		if (downloadError) {
			console.error("[ERR] 下載文章失敗:", downloadError);
			console.error("[ERR] 錯誤詳情:", JSON.stringify(downloadError, null, 2));
			return res.status(404).json({ error: "找不到文章檔案", details: downloadError });
		}

		// 將 Blob 轉換為文字
		const fileContents = await fileData.text();

		// 使用 gray-matter 解析 frontmatter (如果 MD 有的話)
		const { content } = matter(fileContents);

		// 組合圖片完整 URL
		const imageBucket = type === "Post" ? "post.image" : "news.image";
		const imageUrl = post.img
			? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageBucket}/${post.img}`
			: "";

		// 格式化日期為 yyyy-MM-dd HH:mm
		const formatDate = (dateString: string) => {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			const hours = String(date.getHours()).padStart(2, "0");
			const minutes = String(date.getMinutes()).padStart(2, "0");
			return `${year}-${month}-${day} ${hours}:${minutes}`;
		};

		// 使用資料庫的資料作為 frontMatter，而不是 MD 檔案的
		const frontMatter = {
			title: post.title,
			description: post.description,
			tags: post.tags || [],
			type: post.type || [],
			date: formatDate(post.created_at),
			image: imageUrl,
			author_id: post.author_id,
		};

		return res.status(200).json({ content, data: frontMatter });
	} catch (error) {
		console.error("Error accessing Supabase Storage:", error);
		return res.status(500).json({ error: "Error accessing Supabase Storage" });
	}
}
