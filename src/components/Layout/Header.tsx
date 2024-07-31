import calendarIcon from '@/icons/calendar.svg';
import shovelIcon from '@/icons/shovel.svg';
import boxIcon from '@/icons/box.svg';
import btcIcon from '@/icons/btc.svg';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
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
      <nav className="bg-white dark:bg-neutral-black">
        <div className="mx-auto px-2 sm:px-6 lg:px-5">
          <div className="flex h-16 items-center">
            {/* 日期 */}
            <div className='w-full flex items-center sm:grow sm:w-auto'>
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
                className="bg-gradient-to-r from-black to-white inline-block text-transparent bg-clip-text"
              >
                {/* BTC HashRate */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center w-full">
                    <Icon
                      icon_light={shovelIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-neutral-800 dark:text-neutral-200'>
                      Hash Rate
                      <span className='text-black dark:text-white ml-2'>{hashRate !== null ? formatHashRate(hashRate) : 'Loading...'}</span>
                    </p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </div>
                </SwiperSlide>

                {/* Block Height */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center ">
                    <Icon
                      icon_light={boxIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>Block Height {blockHeight !== null ? blockHeight : 'Loading...'}</p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </div>
                </SwiperSlide>

                {/* Price */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center">
                    <Icon
                      icon_light={btcIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>Price {btc !== null ? btc : 'Loading...'} USD</p>
                  </div>
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
