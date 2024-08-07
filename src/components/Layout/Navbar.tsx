import IconDark from '@/icons/icon_dark.svg';
import IconLight from '@/icons/icon_light.svg';
import Themes from '@/components/Layout/Themes';
import SearchBtn from '@/components/Button/SearchBtn';
import More from '@/components/Button/More';
import Icon from '@/components/Icon';
import HomePageSidebar from '../Sidebar/HomePageSidebar';
import { useState } from 'react';
import SidebarBtn from '../Card/SidebarBtn';
import HomePageSearchDrawer from '../Drawer/HomePageSearchDrawer';

// Light Mode
import CryptoWallet from "@/icons/HomePage/crypto_wallet.svg";
import BicNews from "@/icons/HomePage/bic-news.svg";
import blockchain from "@/icons/HomePage/blockchain.svg";
import coffee from "@/icons/HomePage/coffee.svg";
import BuyBic from "@/icons/HomePage/buy_bic.svg";
import Mining from "@/icons/HomePage/mining.svg";
import Social from "@/icons/HomePage/social.svg";
import UseBTC from "@/icons/HomePage/use_btc.svg";
import searchBtn from '@/icons/SearchBtn.svg';

// Dark Mode
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
import Twitter from "@/icons/HomePage/twitter.svg";
import Instagram from "@/icons/HomePage/ig.svg";
import Youtube from "@/icons/HomePage/yt.svg";
import Discord from "@/icons/HomePage/dc.svg";
import InputLabel from '../Input/InputLable';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchList, setSearchList] = useState<string[]>([]);

  const router = useRouter();

  // 處理搜尋
  const handleSearch = () => {
    const newPath = `/Search/Posters/${searchList.join(',')}`;
    if (router.asPath !== newPath) {
      router.push(newPath);
    }
  }

  const SocialMedia = [
    {
      title: "Facebook",
      link: "",
      icon: Facebook
    },
    {
      title: "Twitter",
      link: "",
      icon: Twitter
    },
    {
      title: "Instagram",
      link: "",
      icon: Instagram
    },
    {
      title: "Youtube",
      link: "",
      icon: Youtube
    },
    {
      title: "Discord",
      link: "",
      icon: Discord
    }
  ];

  return (
    <>
      <nav className="relative bg-white dark:bg-neutral-black">
        <div className="mx-auto px-2 sm:px-6 lg:px-5 z-20">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <button
                onClick={() => router.push("/")}
                className="flex flex-shrink-0 items-center">
                <Icon
                  icon_light={IconLight}
                  icon_dark={IconDark}
                  className="h-8 w-auto"
                />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* 切換主題 */}
              <div className="relative ml-3">
                <Themes></Themes>
              </div>
              {/* 搜尋 */}
              <div className="relative ml-3">
                <SearchBtn
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                />
              </div>
              {/* 更多 */}
              <div className="relative ml-3">
                <More
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Drawer */}
        <div className='absolute top-full left-0 right-0 z-10'>
          <HomePageSearchDrawer
            isDrawerOpen={isSearchOpen}
            setIsDrawerOpen={setIsSearchOpen}
            className='bg-white dark:bg-neutral-black p-5'
          >
            <div>
              <InputLabel
                placeholder={'請輸入內容'}
                icon={searchBtn}
                text={searchList}
                onClick={handleSearch}
                onChange={(searchText: string[]) => setSearchList(searchText)}
              />
            </div>
          </HomePageSearchDrawer>
        </div>

        {/* Sidebar */}
        <HomePageSidebar
          isDrawerOpen={isSidebarOpen}
          setIsDrawerOpen={setIsSidebarOpen}
          className=''
        >
          {/* List */}
          <div className='overflow-y-auto'>
            <SidebarBtn
              title="創建錢包"
              description="CreateWallet"
              photo_dark={CryptoWallet}
              photo_light={CryptoWallet_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="購買比特幣"
              description="Purchase BTC"
              photo_dark={BuyBic}
              photo_light={BuyBic_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="比特幣挖礦"
              description="BTC Mining"
              photo_dark={Mining}
              photo_light={Mining_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="使用比特幣"
              description="Used BTC"
              photo_dark={UseBTC}
              photo_light={UseBTC_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="加入社群"
              description="Join Community"
              photo_dark={Social}
              photo_light={Social_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="支持我們"
              description="Support us"
              photo_dark={coffee}
              photo_light={coffee_Dark}
              onClick={() => router.push("/")}
            />
            <SidebarBtn
              title="更多比特幣資訊"
              description="About BTC"
              photo_dark={BicNews}
              photo_light={BicNews_Dark}
              onClick={() => router.push("/MoreInfo/WhatIsBTC")}
            />
            <SidebarBtn
              title="其他區塊鏈資訊"
              description="About Blockchain"
              photo_dark={blockchain}
              photo_light={blockchain_Dark}
              onClick={() => router.push("/")}
            />
          </div>

          {/* Social Media */}
          <div className='absolute bottom-7 left-0 w-full'>
            <div className='flex justify-center space-x-6'>
              {SocialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
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
  )
}

export default Navbar;
