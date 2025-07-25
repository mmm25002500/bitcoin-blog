import IconDark from "@/icons/icon_dark.svg";
import IconLight from "@/icons/icon_light.svg";
import IconMiniDark from "@/icons/miniLogo_dark.png";
import IconMiniLight from "@/icons/miniLogo_light.png";
import Themes from "@/components/Layout/Themes";
import SearchBtn from "@/components/Button/SearchBtn";
import More from "@/components/Button/More";
import Icon from "@/components/Icon";
import HomePageSidebar from "../Sidebar/HomePageSidebar";
import { useEffect, useState } from "react";
import SidebarBtn from "../Card/SidebarBtn";
import HomePageSearchDrawer from "../Drawer/HomePageSearchDrawer";

// Light Mode
import Bitcoin_V2 from "@/icons/HomePage/biitcoin_v2.svg";
import CryptoWallet from "@/icons/HomePage/crypto_wallet.svg";
import BicNews from "@/icons/HomePage/bic-news.svg";
import blockchain from "@/icons/HomePage/blockchain.svg";
import coffee from "@/icons/HomePage/coffee.svg";
import BuyBic from "@/icons/HomePage/buy_bic.svg";
import Mining from "@/icons/HomePage/mining.svg";
import Social from "@/icons/HomePage/social.svg";
import UseBTC from "@/icons/HomePage/use_btc.svg";
import searchBtn from "@/icons/SearchBtn.svg";

// Dark Mode
import Bitcoin_V2_Dark from "@/icons/HomePage/biitcoin_v2_dark.svg";
import CryptoWallet_Dark from "@/icons/HomePage/crypto_wallet_dark.svg";
import BicNews_Dark from "@/icons/HomePage/bic-news_dark.svg";
import blockchain_Dark from "@/icons/HomePage/blockchain_dark.svg";
import coffee_Dark from "@/icons/HomePage/coffee_dark.svg";
import BuyBic_Dark from "@/icons/HomePage/buy_bic_dark.svg";
import Mining_Dark from "@/icons/HomePage/mining_dark.svg";
import Social_Dark from "@/icons/HomePage/social_dark.svg";
import UseBTC_Dark from "@/icons/HomePage/use_btc_dark.svg";

// Social Media
import Facebook from "@/icons/HomePage/fb.svg";
// import Twitter from "@/icons/HomePage/twitter.svg";
import Instagram from "@/icons/HomePage/ig.svg";
import Line from "@/icons/HomePage/line.svg";
import Spotify from "@/icons/HomePage/spotify.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Youtube from "@/icons/HomePage/yt.svg";
// import Discord from "@/icons/HomePage/dc.svg";
import InputLabel from "../Input/InputLable";
import { useRouter } from "next/router";
import { Card } from "@material-tailwind/react";
import Close from "../Button/Close";
import Link from "next/link";
import type { NavbarProps } from "@/types/Layout/Navbar";

const Navbar = (props: NavbarProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchList, setSearchList] = useState<string[]>([]);

	const router = useRouter();

	// 處理搜尋
	const handleSearch = () => {
		const newPath = `/Search/Posters/${searchList.join(",")}`;
		if (router.asPath !== newPath) {
			router.push(newPath);
		}
	};

	const SocialMedia = [
		{
			title: "Facebook",
			link: "https://www.facebook.com/groups/bitcoin.zh",
			icon: Facebook,
		},
		{
			title: "Instagram",
			link: "https://www.instagram.com/btc.org.tw?igsh=Y3N0M2FwczlmdWNi",
			icon: Instagram,
		},
		{
			title: "Line",
			link: "https://line.me/ti/g2/c_YhO-3X27xkIUHZyuzQDOJ4Czcdp7YLYUWYVw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
			icon: Line,
		},
		{
			title: "Spotify",
			link: "https://open.spotify.com/playlist/6KzP4Uh9UGq9Y6J1ePajMd?si=Zs2mHjz6R7yjYJzZ-TgjBg&pi=a--j0SIoEfTVic",
			icon: Spotify,
		},
	];

	const closeDrawer = () => {
		setIsSidebarOpen(false);
	};

	// console.log(isScrolled)

	return (
		<>
			<nav className={"relative bg-white dark:bg-neutral-black"}>
				<div
					className={`relative mx-auto px-2 z-40 bg-white dark:bg-neutral-black sm:mx-auto sm:px-16 ${props.scrolled ? "py-2" : "py-2"}`}
				>
					<div
						className={`relative flex items-center justify-between ${props.scrolled ? "h-8" : "h-12"}`}
					>
						{/* Logo */}
						<div className="flex flex-1 sm:items-stretch sm:justify-start">
							<Link
								href="/"
								onClick={() => router.push("/")}
								className="flex flex-shrink-0 items-center"
							>
								{props.scrolled ? (
									<Icon
										icon_light={IconMiniLight}
										icon_dark={IconMiniDark}
										className={"w-auto h-8"}
									/>
								) : (
									<Icon
										icon_light={IconLight}
										icon_dark={IconDark}
										className={"w-auto h-8"}
									/>
								)}
							</Link>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							{/* 切換主題 */}
							<div className="relative ml-3">
								<Themes scrolled={props.scrolled} />
							</div>
							{/* 搜尋 */}
							<div className="relative ml-3">
								<SearchBtn
									onClick={() => setIsSearchOpen(!isSearchOpen)}
									scrolled={props.scrolled}
								/>
							</div>
							{/* 更多 */}
							<div className="relative ml-3">
								<More
									onClick={() => setIsSidebarOpen(!isSidebarOpen)}
									scrolled={props.scrolled}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* <div
          className={`fixed h-full z-50 inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out ${isSearchOpen ? 'opacity-50' : 'opacity-0 pointer-events-none hidden'}`}
          onClick={() => setIsSearchOpen(false)}
        /> */}
				{/* Search Drawer */}
				<div
					className={`${isSearchOpen ? "absolute" : "block"} top-full left-0 right-0`}
				>
					<HomePageSearchDrawer
						isDrawerOpen={isSearchOpen}
						setIsDrawerOpen={setIsSearchOpen}
						className="bg-white dark:bg-neutral-black p-5"
					>
						{/* className={`fixed top-0 left-0 right-0 z-10 transform transition-transform duration-300 ease-in-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`} */}
						{/* <div className={`w-full bg-white dark:bg-neutral-black p-5 transform transition-transform ease-in-out  ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}> */}
						<InputLabel
							placeholder={"請輸入內容"}
							icon={searchBtn}
							text={searchList}
							onClick={handleSearch}
							onChange={(searchText: string[]) => setSearchList(searchText)}
						/>
						{/* </div> */}
					</HomePageSearchDrawer>
				</div>

				{/* Sidebar */}
				<HomePageSidebar
					isDrawerOpen={isSidebarOpen}
					setIsDrawerOpen={setIsSidebarOpen}
					className=""
				>
					<Card
						color="transparent"
						shadow={false}
						className="h-[93%] w-full p-4 overflow-y-auto"
						nonce={undefined}
						onResize={undefined}
						onResizeCapture={undefined}
						placeholder={undefined}
					>
						<p className="fixed z-40 right-5 bg-neutral-white dark:bg-neutral-black mt-2 sm:mt-3 sm:mr-5 sm:mb-2 text-right font-medium text-sm leading-[22px]">
							<Close className="" onClick={() => setIsSidebarOpen(false)} />
						</p>

						{/* 類別 */}
						<div className={"mx-5 mt-10"}>
							{/* List */}
							<SidebarBtn
								title="關於"
								description="About Bitcoin"
								photo_dark={Bitcoin_V2}
								photo_light={Bitcoin_V2_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/about");
								}}
							/>
							<SidebarBtn
								title="錢包"
								description="Wallet"
								photo_dark={CryptoWallet}
								photo_light={CryptoWallet_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Wallet");
								}}
							/>
							<SidebarBtn
								title="購買 比特幣"
								description="Purchase bitcoin"
								photo_dark={BuyBic}
								photo_light={BuyBic_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Buy");
								}}
							/>
							<SidebarBtn
								title="比特幣 挖礦"
								description="Bitcoin Mining"
								photo_dark={Mining}
								photo_light={Mining_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Mining");
								}}
							/>
							<SidebarBtn
								title="使用"
								description="Use bitcoin"
								photo_dark={UseBTC}
								photo_light={UseBTC_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Use");
								}}
							/>
							<SidebarBtn
								title="加入社群"
								description="Join Community"
								photo_dark={Social}
								photo_light={Social_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Join");
								}}
							/>
							<SidebarBtn
								title="支持我們"
								description="Support us"
								photo_dark={coffee}
								photo_light={coffee_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Post/Editor/Support");
								}}
							/>
							<SidebarBtn
								title="比特幣 更多資訊"
								description="more BTC"
								photo_dark={BicNews}
								photo_light={BicNews_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/moreBTC/about");
								}}
							/>
							<SidebarBtn
								title="其他新聞資訊"
								description="More info & news"
								photo_dark={blockchain}
								photo_light={blockchain_Dark}
								onClick={() => {
									closeDrawer();
									router.push("/Tag/News/all");
								}}
							/>
						</div>
					</Card>
					{/* Social Media */}
					<div className="absolute bottom-0 pb-5 py-2 left-0 w-full bg-neutral-white dark:bg-neutral-black">
						<div className="flex justify-center space-x-6">
							{SocialMedia.map((item, index) => (
								<a
									key={item.title}
									href={item.link}
									target="_blank"
									rel="noreferrer"
								>
									<Icon
										icon_light={item.icon}
										icon_dark={item.icon}
										className="h-6 w-6 invert dark:invert-0"
									/>
								</a>
							))}
						</div>
					</div>
				</HomePageSidebar>
			</nav>
		</>
	);
};

export default Navbar;
