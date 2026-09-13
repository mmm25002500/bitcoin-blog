const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tjdnszvgfvxoxdangdhu.supabase.co",
				pathname: "/storage/v1/object/public/**",
			},
		],
	},
	async headers() {
		return [
			{
				// API 都是公開的讀取資料，讓 Vercel CDN 快取 60 秒，
				// 過期後先回舊資料、背景再更新，避免每個請求都打 Supabase / Blockchair
				source: "/api/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, s-maxage=60, stale-while-revalidate=300",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/Tag/News",
				destination: "/Tag/News/all",
				permanent: false,
			},
			{
				source: "/Tag/Post",
				destination: "/Tag/Post/all",
				permanent: false,
			},
			{
				source: "/Tag",
				destination: "/Tag/all",
				permanent: false,
			},
			{
				source: "/Search",
				destination: "/Search/Posters/標籤1",
				permanent: false,
			},
			{
				source: "/Search/:path",
				destination: "/Search/Posters/:path",
				permanent: false,
			},
			{
				source: "/Search/Posters",
				destination: "/Search/Posters/標籤1",
				permanent: false,
			},
			{
				source: "/Search/News",
				destination: "/Search/News/文字1",
				permanent: false,
			},
			{
				source: "/Search/Creators",
				destination: "/Search/Crators/%20",
				permanent: false,
			},
		];
	},

	webpack: (config, { isServer }) => {
		// 解決 PostCSS 錯誤
		config.resolve.alias.postcss = require.resolve("postcss");

		// 修復使用 fs 模塊的依賴
		if (!isServer) {
			config.resolve.fallback = { fs: false };
		}

		return config;
	},

	reactStrictMode: true,
};

module.exports = nextConfig;
