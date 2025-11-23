import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import IMG from "@/icons/examplePhoto/S__4964469.jpg";
import IMG2 from "@/icons/examplePhoto/S__4964468.jpg";
import IMG3 from "@/icons/examplePhoto/S__4988942.png";
import Right from "@/icons/right.svg";
import Icon from "../Icon";
import Button from "../Button/Button";

const SwiperSection = () => {
	const pagination = {
		clickable: true,
		bulletClass: "swiper-pagination-bullet custom-bullet", // 使用自定義樣式
		bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active", // 使用自定義樣式
		renderBullet: (index: number, className: string) =>
			`<span class="${className}"></span>`,
	};

	return (
		<div className="relative h-[500px]">
			{/* 預載入的 LCP 圖片 - 在初始 HTML 中渲染 */}
			<Image
				src={IMG}
				alt="比特幣 改變金融的貨幣"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-[rgba(19,21,25,0.5)]" />

			{/* Swiper 覆蓋在預載入圖片上 */}
			<div className="absolute inset-0">
				<Swiper
					pagination={pagination}
					modules={[Pagination]}
					className="h-[500px]"
				>
					<SwiperSlide>
						<div className="relative h-[500px]">
							<Image
								src={IMG}
								alt="比特幣 改變金融的貨幣"
								fill
								priority
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-[rgba(19,21,25,0.5)]" />
							<div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28 z-10">
								<p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
									比特幣 改變金融的貨幣
								</p>
								<p className="text-white font-normal text-lg leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
									了解比特幣 <br />
									以及正在改變的現代世界
								</p>
							</div>
							<Button
								type={"small"}
								onClick={() => console.log("test")}
								className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7 z-10"
							>
								<p>開始</p>
								<Icon
									icon_light={Right}
									icon_dark={Right}
									className="dark:invert"
								/>
							</Button>
						</div>
					</SwiperSlide>
			<SwiperSlide>
				<div className="relative h-[500px]">
					<Image
						src={IMG2}
						alt="比特幣 錢包"
						fill
						loading="lazy"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-[rgba(19,21,25,0.5)]" />
					<div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28 z-10">
						<p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
							比特幣 錢包
						</p>
						<p className="text-white font-normal text-lg leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
							進入資產安全自主 <br />
							最重要的第一步
						</p>
					</div>
					<Button
						type={"small"}
						onClick={() => console.log("test")}
						className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7 z-10"
					>
						<p>開始</p>
						<Icon
							icon_light={Right}
							icon_dark={Right}
							className="dark:invert"
						/>
					</Button>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="relative h-[500px]">
					<Image
						src={IMG3}
						alt="比特幣 購買"
						fill
						loading="lazy"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-[rgba(19,21,25,0.5)]" />
					<div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28 z-10">
						<p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
							比特幣 購買
						</p>
						<p className="text-white font-normal text-lg leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
							第一個比特幣 <br />
							選擇最安全的交易
						</p>
					</div>
					<Button
						type={"small"}
						onClick={() => console.log("test")}
						className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7 z-10"
					>
						<p>開始</p>
						<Icon
							icon_light={Right}
							icon_dark={Right}
							className="dark:invert"
						/>
					</Button>
				</div>
				</SwiperSlide>
			</Swiper>
			</div>
		</div>
	);
};

export default SwiperSection;
