import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { filename } = req.query;

	if (!filename || typeof filename !== "string") {
		return res.status(400).json({ error: "缺少或無效的 filename 參數" });
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
		let post: any = null;
		let tableName: "Post" | "News" = "Post";
		let bucketName = "post.article";

		// 先從 Post 表查詢
		const { data: postData, error: postError } = await supabase
			.from("Post")
			.select("*")
			.eq("filename", `${filename}.md`)
			.single();

		if (postData && !postError) {
			post = postData;
			tableName = "Post";
			bucketName = "post.article";
		} else {
			// 如果 Post 找不到，查詢 News 表
			const { data: newsData, error: newsError } = await supabase
				.from("News")
				.select("*")
				.eq("filename", `${filename}.md`)
				.single();

			if (newsData && !newsError) {
				post = newsData;
				tableName = "News";
				bucketName = "news.article";
			}
		}

		if (!post) {
			console.error("[ERR] 找不到文章:", filename);
			return res.status(404).json({ error: "找不到文章" });
		}

		console.log("[INFO] 找到文章:", { filename: post.filename, type: tableName });

		// 從 Supabase Storage 下載 MD 檔案
		const filePath = post.filename;
		const { data: fileData, error: downloadError } = await supabase.storage
			.from(bucketName)
			.download(filePath);

		if (downloadError) {
			console.error("[ERR] 下載文章失敗:", downloadError);
			return res.status(404).json({ error: "找不到文章檔案" });
		}

		// 將 Blob 轉換為文字
		const fileContents = await fileData.text();

		// 使用 gray-matter 解析 frontmatter
		const { content } = matter(fileContents);

		// 查詢作者資料
		const { data: authorData, error: authorError } = await supabase
			.from("author")
			.select("*")
			.eq("id", post.author_id)
			.single();

		if (authorError) {
			console.error("[ERR] 查詢作者失敗:", authorError.message);
		}

		// 組合完整的圖片 URL
		const authorImageUrl = authorData?.image
			? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${authorData.image}`
			: "";

		const postImageUrl = post.img
			? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${tableName.toLowerCase()}.image/${post.img}`
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

		return res.status(200).json({
			content,
			data: {
				title: post.title,
				description: post.description,
				tags: post.tags || [],
				type: post.type || [],
				date: formatDate(post.created_at),
				image: postImageUrl,
			},
			authorData: authorData
				? {
						fullname: authorData.fullname,
						name: authorData.name,
						image: authorImageUrl,
						img: authorImageUrl,
						description: authorData.description,
						id: authorData.id,
					}
				: null,
			id: post.id,
			type: tableName,
		});
	} catch (error) {
		console.error("Error accessing Supabase:", error);
		return res.status(500).json({ error: "Error accessing Supabase" });
	}
}
