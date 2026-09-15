import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type PageRoute = { key: string; path: string };

// 後台「網址管理」的對照表，快取 60 秒，避免每個請求都查資料庫
const CACHE_MS = 60_000;
let cache: { routes: PageRoute[]; at: number } | null = null;

async function getRoutes(): Promise<PageRoute[]> {
	if (cache && Date.now() - cache.at < CACHE_MS) return cache.routes;

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!supabaseUrl || !supabaseAnonKey) return [];

	try {
		const res = await fetch(`${supabaseUrl}/rest/v1/PageRoute?select=key,path`, {
			headers: {
				apikey: supabaseAnonKey,
				Authorization: `Bearer ${supabaseAnonKey}`,
			},
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const rows: { key: string; path: string | null }[] = await res.json();
		const keys = new Set(rows.map((row) => row.key));

		// path 跟 key 相同等於沒改；path 撞到其他頁面的原始路徑會造成轉址迴圈，一律忽略
		const routes = rows.filter(
			(row): row is PageRoute =>
				!!row.path && row.path !== row.key && !keys.has(row.path),
		);

		cache = { routes, at: Date.now() };
		return routes;
	} catch (err) {
		console.error("[ERR] 讀取網址對照表失敗:", err);
		// 讀不到就沿用上一次的結果（第一次就失敗則完全不轉址），
		// 也一樣快取 60 秒，避免資料庫出問題時每個請求都重查
		const routes = cache?.routes ?? [];
		cache = { routes, at: Date.now() };
		return routes;
	}
}

const safeDecode = (value: string) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

export async function middleware(request: NextRequest) {
	const segments = request.nextUrl.pathname.split("/").slice(1);
	const [first = ""] = segments;

	// 首頁、public 底下的靜態檔（有副檔名）不處理
	if (!first || segments[segments.length - 1].includes(".")) {
		return NextResponse.next();
	}

	const routes = await getRoutes();
	if (routes.length === 0) return NextResponse.next();

	const segment = safeDecode(first);
	const rest = segments.slice(1);
	const tail = rest.length > 0 ? `/${rest.join("/")}` : "";

	// 自訂網址：內部改走原本的頁面，網址列維持自訂網址
	const custom = routes.find((route) => route.path === segment);
	if (custom) {
		const url = request.nextUrl.clone();
		url.pathname = `/${custom.key}${tail}`;
		return NextResponse.rewrite(url);
	}

	// 原本的網址：轉到自訂網址，舊連結和程式裡寫死的連結都還能用。
	// 用 307 而不是永久轉址，後台之後再改網址時瀏覽器才不會卡在舊的轉址
	const original = routes.find((route) => route.key === segment);
	if (original) {
		const url = request.nextUrl.clone();
		url.pathname = `/${encodeURIComponent(original.path)}${tail}`;
		return NextResponse.redirect(url, 307);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
