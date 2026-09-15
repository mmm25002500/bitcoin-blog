import { createHash } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";

// Vercel 會把真實 IP 放在 x-forwarded-for 的第一個
function getClientIp(req: NextApiRequest): string | null {
	const forwarded = req.headers["x-forwarded-for"];
	const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
		?.split(",")[0]
		?.trim();
	const realIp = req.headers["x-real-ip"];

	return (
		first ||
		(typeof realIp === "string" ? realIp : null) ||
		req.socket.remoteAddress ||
		null
	);
}

/**
 * 登記訪客並回傳「你是第 N 個支持比特幣的用戶」的 N。
 * 每個 IP 算一次，只送加鹽雜湊到資料庫，不存原始 IP。
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// 每個人拿到的名次不同，不能被快取
	res.setHeader("Cache-Control", "private, no-store");

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const salt = process.env.VISITOR_HASH_SALT;
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!salt || !supabaseUrl || !supabaseAnonKey) {
		return res.status(500).json({ error: "訪客計數尚未設定" });
	}

	const ip = getClientIp(req);
	if (!ip) {
		return res.status(400).json({ error: "無法取得 IP" });
	}

	// IPv4 只有約 43 億種，沒加鹽的雜湊很容易被暴力還原
	const ipHash = createHash("sha256").update(`${salt}:${ip}`).digest("hex");

	try {
		const response = await fetch(
			`${supabaseUrl}/rest/v1/rpc/register_visitor`,
			{
				method: "POST",
				headers: {
					apikey: supabaseAnonKey,
					Authorization: `Bearer ${supabaseAnonKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ p_ip_hash: ipHash }),
			},
		);

		if (!response.ok) {
			console.error("[ERR] 訪客登記失敗:", response.status, await response.text());
			return res.status(502).json({ error: "訪客登記失敗" });
		}

		const number = Number(await response.json());
		return res.status(200).json({ number });
	} catch (error) {
		console.error("[ERR] 訪客登記失敗:", error);
		return res.status(500).json({ error: "訪客登記失敗" });
	}
}
