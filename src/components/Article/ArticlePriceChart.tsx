import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// 文章內文頂部的比特幣即時價格走勢圖（取代封面圖），與首頁行情同用 TradingView
const ArticlePriceChart = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.innerHTML = "";
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
		script.async = true;
		script.innerHTML = JSON.stringify({
			autosize: true,
			symbol: "BINANCE:BTCUSDT",
			interval: "D",
			timezone: "Asia/Taipei",
			theme: isDark ? "dark" : "light",
			style: "1",
			locale: "zh_TW",
			enable_publishing: false,
			withdateranges: true,
			hide_side_toolbar: true,
			hide_top_toolbar: false,
			calendar: false,
			studies: [],
			support_host: "https://www.tradingview.com",
		});
		container.appendChild(script);

		return () => {
			container.innerHTML = "";
		};
	}, [isDark]);

	// 與封面圖同樣 1200:630 比例，切換時版面不跳動
	return (
		<div className="w-full aspect-[1200/630] min-h-[320px]">
			<div className="tradingview-widget-container h-full" ref={containerRef} />
		</div>
	);
};

export default ArticlePriceChart;
