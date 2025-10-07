import calendarIcon from "@/icons/calendar.svg";
import shovelIcon from "@/icons/shovel.svg";
import boxIcon from "@/icons/box.svg";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import axios from "axios";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const [today, setToday] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Date - moved to useEffect to avoid hydration mismatch
	useEffect(() => {
		// 取得 UTC+8 台北時間
		const now = new Date();
		const utcTime = now.getTime();
		const localOffset = now.getTimezoneOffset() * 60000;
		const taipeiOffset = 8 * 60 * 60000;
		const taipeiDate = new Date(utcTime + localOffset + taipeiOffset);

		const year = taipeiDate.getFullYear();
		const month = taipeiDate.getMonth() + 1;
		const day = taipeiDate.getDate();
		const week = taipeiDate.getDay();
		const weekList = ["日", "一", "二", "三", "四", "五", "六"];
		setToday(`${year}.${month}.${day} 星期${weekList[week]}`);
	}, []);

	// Bitcoin Infomation
	const [hashRate, setHashRate] = useState<number | null>(null);
	const [blockHeight, setBlockHeight] = useState<number | null>(null);
	const [btc, setBtc] = useState<number | null>(null);

	// 傳到後端拿資料，用TAG篩選文章
	useEffect(() => {
		const fetchBitcoinStats = async () => {
			const response = await axios.get("/api/getBitcoinStats");
			setHashRate(response.data.hashrate_24h);
			setBlockHeight(response.data.blocks);
			setBtc(response.data.market_price_usd);
		};

		fetchBitcoinStats();
	}, []);

	// 格式化哈希率的函數
	const formatHashRate = (hashRate: number) => {
		if (hashRate >= 1e15) {
			return `${(hashRate / 1e15).toFixed(2)} PH/s`;
		}
		if (hashRate >= 1e12) {
			return `${(hashRate / 1e12).toFixed(2)} TH/s`;
		}
		return `${(hashRate / 1e9).toFixed(2)} GH/s`;
	};

	return (
		<>
			<nav className={"relative bg-white dark:bg-neutral-black z-40 w-full"}>
				<div className="mx-auto px-2 sm:px-16 sm:mx-auto">
					<div className="flex h-12 items-center gap-6 md:gap-0">
						{/* 日期 */}
						<div className="w-full flex items-center sm:grow sm:w-[50%]">
							<Icon
								icon_light={calendarIcon}
								className="h-5 block w-auto dark:invert"
							/>
							<p className="whitespace-nowrap ml-2">{today}</p>
						</div>

						{/* 右邊的資訊 - 手機版 */}
						<div className="flex gap-2 relative overflow-hidden">
							<Swiper
								slidesPerView={"auto"}
								spaceBetween={0}
								freeMode={true}
								modules={[FreeMode]}
								className="gradient-mask-r-[rgba(255,255,255)_40%,transparent_100%] xl:gradient-mask-r-[rgba(0,0,0)_100%]"
							>
								{/* BTC HashRate */}
								<SwiperSlide className="!w-auto">
									<div className="flex items-center w-full h-full">
										<Icon
											icon_light={shovelIcon}
											className="h-5 w-auto mr-2 dark:invert"
										/>
										<p className="text-black dark:text-white">
											Hash Rate
											<span className="text-black dark:text-white ml-2">
												{hashRate !== null
													? formatHashRate(hashRate)
													: "Loading..."}
											</span>
										</p>
										<div className="text-wireframe-700 dark:text-neutral-800">
											｜
										</div>
									</div>
								</SwiperSlide>

								{/* Block Height */}
								<SwiperSlide className="!w-auto">
									<div className="flex items-center h-full">
										<Icon
											icon_light={boxIcon}
											className="h-5 w-auto mr-2 dark:invert"
										/>
										<p className="text-black dark:text-white">
											Block Height{" "}
											{blockHeight !== null ? blockHeight : "Loading..."}
										</p>
										<div className="text-wireframe-700 dark:text-neutral-800">
											｜
										</div>
									</div>
								</SwiperSlide>

								{/* Price */}
								<SwiperSlide className="!w-auto">
									<div className="flex items-center">
										<p className="font-medium mr-2 text-lg">฿</p>
										<p className="text-black dark:text-white">
											Price {btc !== null ? btc : "Loading..."} USD
										</p>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>

				<div className="sm:hidden" id="mobile-menu" />
			</nav>
		</>
	);
};

export default Header;
