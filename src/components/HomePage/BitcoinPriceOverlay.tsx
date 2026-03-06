import { useEffect, useState, useCallback, useRef } from "react";
import useSWR from "swr";
import type { BitcoinPriceOverlayProps, BitcoinStats } from "@/types/HomePage/BitcoinPriceOverlay";
import btc_icon_light from '@/icons/btc_footer_light.svg';
import btc_icon_dark from '@/icons/btc_footer_dark.svg';
import icon_dark from '@/icons/icon_dark.svg';
import icon_light from '@/icons/icon_light.svg';
import calendarIcon from "@/icons/calendar.svg";
import shovelIcon from "@/icons/shovel.svg";
import boxIcon from "@/icons/box.svg";
import Icon from "../Icon";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatHashRate(hashrate: string | number): string {
  const h = Number(hashrate);
  if (Number.isNaN(h)) return "N/A";
  const ehps = h / 1e18;
  return `${ehps.toFixed(2)} EH/s`;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function useBinancePrice(enabled: boolean) {
  const [price, setPrice] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    // 先用 REST API 取得即時價格，避免 WebSocket 連線前空白
    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .then((res) => res.json())
      .then((data) => {
        if (data.price) {
          setPrice((prev) => prev ?? Number.parseFloat(data.price));
        }
      })
      .catch(() => { });

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.c) {
        setPrice(Number.parseFloat(data.c));
      }
    };

    ws.onerror = () => {
      ws.close();
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [enabled]);

  return price;
}

const BitcoinPriceOverlay = ({ open, onClose }: BitcoinPriceOverlayProps) => {
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const tvContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDark, setIsDark] = useState(false);

  // 偵測 dark mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(document.documentElement.classList.contains("dark") || mq.matches);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { data } = useSWR<BitcoinStats>(
    open ? "/api/getBitcoinStats" : null,
    fetcher,
    { refreshInterval: 30000 }
  );

  const wsPrice = useBinancePrice(mounted);

  // TradingView widget embed
  useEffect(() => {
    const container = tvContainerRef.current;
    if (!mounted || !container) return;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BINANCE:BTCUSDT",
      interval: "60",
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
  }, [mounted, isDark]);

  // 價格完全來自 Binance（REST fallback + WebSocket 即時）
  const displayPrice = wsPrice;

  // 每分鐘更新時間
  useEffect(() => {
    if (!mounted) return;
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, [mounted]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setMounted(false);
      onClose();
    }, 400);
  }, [onClose]);

  // 當 open 變為 true 時，掛載組件並開始顯示
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    }
  }, [open]);

  // 監聽滾輪事件以支援往下滾動關閉
  useEffect(() => {
    if (!mounted || closing) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleClose();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [mounted, closing, handleClose]);

  // 監聽觸控事件以支援手機往下滑動關閉
  useEffect(() => {
    if (!mounted || closing) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 50) {
        handleClose();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mounted, closing, handleClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100]
        bg-white dark:bg-primary-black-300
        flex flex-col
        ${closing ? "animate-slideUp" : "animate-slideDown"}`}
    >
      <div className="px-6 py-6 md:px-10 md:py-8 flex flex-col h-full">

        {/* 頂部：品牌 + 價格 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* 左：icon + branding */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Icon
                icon_light={icon_light}
                icon_dark={icon_dark}
                className=''
              />
            </div>
            <div className="md:hidden">
              <Icon
                icon_light={btc_icon_dark}
                icon_dark={btc_icon_light}
                className='w-[47px]'
              />
            </div>
            <div>
              <p className="text-sm md:text-base">powered by</p>
              <p className="text-lg md:text-2xl font-bold">nowBTCprice.com</p>
            </div>
          </div>

          {/* 手機版-價格 */}
          <div className="flex items-baseline gap-2 md:hidden ">
            <span className="text-xl">$</span>
            <span className="text-5xl md:text-7xl font-bold">
              {displayPrice !== null
                ? formatPrice(displayPrice)
                : "---"}
            </span>
            <span className="text-2xl">USD</span>
          </div>
        </div>

        {/* 中間：圖表 flex-1 */}
        <div className="flex flex-col md:flex-row-reverse md:gap-32 h-full">
          <div className="md:flex-1 min-h-0 my-4 h-[400px] md:h-full">
            <div className="tradingview-widget-container h-full" ref={tvContainerRef}>
              <div className="tradingview-widget-container__widget h-full" />
            </div>
          </div>

          {/* 底部：日期/時間 + 統計表 */}
          <div className="flex flex-col-reverse md:flex-col gap-4 mt-auto mb-auto">
            {/* 比特幣價格 */}
            <div className="md:flex md:items-baseline gap-2 hidden">
              <span className="text-sm xl:text-xl">$</span>
              <span className="text-5xl lg:text-7xl xl:text-9xl font-bold">
                {displayPrice !== null
                  ? formatPrice(displayPrice)
                  : "---"}
              </span>
              <span className="text-2xl xl:text-4xl">USD</span>
            </div>
            <div className="flex flex-col-reverse md:flex-col items-center md:items-start">
              {/* 格式：星期 日期 星期幾，如: TUE 3 MAR */}
              <div className="flex items-center gap-2 text-2xl xl:text-4xl">
                <Icon
                  icon_light={calendarIcon}
                  className="h-5 hidden md:block w-auto dark:invert"
                />
                {/* 電腦版-日期*/}
                <div className="hidden md:block">
                  {`${now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()} ${now.getDate()} ${now.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}`}
                </div>
                {/* 手機版-日期 */}
                <div className="md:hidden">
                  {`${now.toLocaleDateString("en-US", { year: "numeric" }).toUpperCase()} ${now.toLocaleDateString("en-US", { month: "short" }).toUpperCase()} ${now.getDate()} ${now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}`}
                </div>
              </div>
              {/* 格式 小時:分鐘，小時為24小時制 */}
              <div className="flex items-center gap-2 text-6xl xl:text-8xl py-2">
                {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
              </div>
            </div>
            {/* 資訊 */}
            <table>
              <tbody className="text-xl xl:text-2xl">
                <tr>
                  <td className="flex items-center gap-1">
                    <Icon
                      icon_light={shovelIcon}
                      className="h-5 w-auto mr-2 dark:invert"
                    />
                    <span className="text-black dark:text-white font-bold">Hash Rate</span>
                  </td>
                  <td className="text-right">
                    {data?.hashrate_24h ? formatHashRate(data.hashrate_24h) : "---"}
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center gap-1">
                    <Icon
                      icon_light={boxIcon}
                      className="h-5 w-auto mr-2 dark:invert"
                    />
                    <span className="text-black dark:text-white font-bold">Block Height</span>
                  </td>
                  <td className="text-right">
                    <p>
                      {data?.best_block_height
                        ? data.best_block_height.toLocaleString()
                        : "---"}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center gap-3">
                    <p className="font-medium mr-2">฿</p>
                    <span className="text-black dark:text-white font-bold">BTC.D</span>
                  </td>
                  <td className="text-right">
                    <p>
                      {data?.market_dominance_percentage
                        ? `${data.market_dominance_percentage.toFixed(2)}%`
                        : "---"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinPriceOverlay;
