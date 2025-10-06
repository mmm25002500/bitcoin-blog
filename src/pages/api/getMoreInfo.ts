import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";
import MoreInfo from "@/config/MoreInfo.json";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
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
		interface CategoryData {
			title: string;
			folder: string;
			label?: string;
			post: Array<{
				title: string;
				filename: string;
			}>;
		}

		// 取得所有作者資料
		const { data: authors, error: authorError } = await supabase
			.from("author")
			.select("*");

		if (authorError) {
			console.error("[ERR] 取得作者失敗:", authorError.message);
			return res.status(500).json({ error: authorError.message });
		}

		const authorMap = new Map(authors.map((a) => [a.id, a]));

		// 遍歷 MoreInfo.json 中的每個類別
		const result = await Promise.all(
			(MoreInfo as CategoryData[]).map(async (category) => {
				// 對每個類別中的每篇文章進行處理
				const posts = await Promise.all(
					category.post.map(async (post) => {
						// 從 Post 表查詢文章
						const { data: postData, error: postError } = await supabase
							.from("Post")
							.select("*")
							.eq("filename", `${post.filename}.md`)
							.single();

						if (postError || !postData) {
							console.warn(`[WARN] 找不到文章: ${post.filename}`);
							return null;
						}

						const author = authorMap.get(postData.author_id);
						const authorImageUrl = author?.image
							? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/author.image/${author.image}`
							: "";

						return {
							title: postData.title || post.title,
							filename: post.filename,
							authorData: author
								? {
										fullname: author.fullname,
										name: author.name,
										img: authorImageUrl,
										image: authorImageUrl,
										description: author.description,
										id: author.id,
									}
								: {
										id: postData.author_id,
									},
							date: postData.created_at || "",
							description: postData.description || "",
							link: postData.id, // 使用文章 ID 而不是 userID/filename
						};
					}),
				);

				return {
					...category,
					post: posts.filter((post) => post !== null), // 過濾掉未找到的文章
				};
			}),
		);

		res.status(200).json(result); // 回傳結果
	} catch (error) {
		console.error("Error accessing Supabase:", error);
		res.status(500).json({ error: "Error accessing Supabase" });
	}
}
