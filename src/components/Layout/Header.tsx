import calendarIcon from '@/icons/calendar.svg';
import shovelIcon from '@/icons/shovel.svg';
import boxIcon from '@/icons/box.svg';
import btcIcon from '@/icons/btc.svg';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import axios from 'axios';

const Header = () => {

  // Date
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let week = date.getDay();
  let weekList = ['日', '一', '二', '三', '四', '五', '六'];
  let today = `${year}.${month}.${day} 星期${weekList[week]}`;

  // Bitcoin Infomation
  const [hashRate, setHashRate] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [btc, setBtc] = useState<number | null>(null);

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchBitcoinStats = async () => {
      const response = await axios.get('/api/getBitcoinStats');
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
    } else if (hashRate >= 1e12) {
      return `${(hashRate / 1e12).toFixed(2)} TH/s`;
    } else {
      return `${(hashRate / 1e9).toFixed(2)} GH/s`;
    }
  };

  return (
    <>
      <nav className="relative bg-white dark:bg-neutral-black z-40">
        <div className="mx-auto px-2 sm:px-6 md:pr-0 lg:px-5">
          <div className="flex h-16 items-center gap-6 md:gap-0">
            {/* 日期 */}
            <div className='w-full flex items-center sm:grow sm:w-[50%]'>
              <Icon
                icon_light={calendarIcon}
                className="h-5 block w-auto dark:invert" />
              <p className='whitespace-nowrap ml-2'>{today}</p>
            </div>

            {/* 右邊的資訊 - 手機版 */}
            <div className='flex gap-2 relative overflow-hidden'>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                modules={[FreeMode]}
                className="gradient-mask-r-[rgba(255,255,255)_40%,transparent_100%] xl:gradient-mask-r-[rgba(0,0,0)_100%]"
              >
                {/* BTC HashRate */}
                <SwiperSlide className="!w-auto">
                  <a href="" target="_blank" className="flex items-center w-full h-full">
                    <Icon
                      icon_light={shovelIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>
                      Hash Rate
                      <span className='text-black dark:text-white ml-2'>{hashRate !== null ? formatHashRate(hashRate) : 'Loading...'}</span>
                    </p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </a>
                </SwiperSlide>

                {/* Block Height */}
                <SwiperSlide className="!w-auto">
                  <a href="" target="_blank" className="flex items-center h-full">
                    <Icon
                      icon_light={boxIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>Block Height {blockHeight !== null ? blockHeight : 'Loading...'}</p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </a>
                </SwiperSlide>

                {/* Price */}
                <SwiperSlide className="!w-auto">
                  <a href="" target="_blank" className="flex items-center">
                    <p className='font-medium mr-2 text-lg'>
                      ฿
                    </p>
                    <p className='text-black dark:text-white'>Price {btc !== null ? btc : 'Loading...'} USD</p>
                  </a>
                </SwiperSlide>
              </Swiper>
            </div>

          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
        </div>
      </nav>

    </>
  )
}

export default Header;
