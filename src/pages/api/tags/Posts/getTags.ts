import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

function getErrorMessage(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

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
				error: "Supabase environment variables are not set.",
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
		const { deduplicate } = req.query;
		const shouldDeduplicate = deduplicate !== "false"; // 預設 true

		const { data, error } = await supabase.from("Post").select("tags");

		if (error) {
			return res.status(500).json({ success: false, error: error.message });
		}

		if (!data) {
			return res.status(200).json({ success: true, tags: [] });
		}

		// 收集 tags
		const allTags: string[] = data.flatMap((row) => row.tags || []);

		// 是否去重
		const tags = shouldDeduplicate ? Array.from(new Set(allTags)) : allTags;

		return res.status(200).json({ success: true, tags });
	} catch (err: unknown) {
		return res
			.status(500)
			.json({ success: false, error: getErrorMessage(err) });
	}
}
