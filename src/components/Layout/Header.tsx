import calendarIcon from '@/icons/calendar.svg';
import shovelIcon from '@/icons/shovel.svg';
import boxIcon from '@/icons/box.svg';
import btcIcon from '@/icons/btc.svg';
import { useState } from 'react';
import Icon from '@/components/Icon';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode } from 'swiper/modules';

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
  const [hashRate, setHashRate] = useState(132442.1);
  const [blockHeight, setBlockHeight] = useState(40000);
  const [btc, setBtc] = useState(44000);

  return (
    <>
      <nav className="bg-white dark:bg-neutral-black">
        <div className="mx-auto px-2 sm:px-6 lg:px-5">
          <div className="flex h-16 items-center">
            {/* 日期 */}
            <div className="flex items-center sm:grow w-full sm:w-auto">
              <div className='w-full flex'>
                <Icon
                  icon_light={calendarIcon}
                  className="h-5 block w-auto dark:invert" />
                <p className='block ml-2'>{today}</p>
              </div>
            </div>

            {/* 右邊的資訊 - 手機版 */}
            <div className='sm:hidden relative w-full'>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                modules={[FreeMode]}
                className="bg-gradient-to-r from-black to-white inline-block text-transparent bg-clip-text"
              >
                {/* BTC Price */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center w-full">
                    <Icon
                      icon_light={shovelIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-neutral-800 dark:text-neutral-200'>
                      Hash Rate
                      <span className='text-black dark:text-white ml-2'>{hashRate} PH/s</span>
                    </p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </div>
                </SwiperSlide>

                {/* Hash Rate */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center ">
                    <Icon
                      icon_light={boxIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>Block Height {blockHeight}</p>
                    <div className='text-wireframe-700 dark:text-neutral-800'>｜</div>
                  </div>
                </SwiperSlide>

                {/* Block Height */}
                <SwiperSlide className="!w-auto">
                  <div className="flex items-center">
                    <Icon
                      icon_light={btcIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>BTC {btc}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* 右邊的資訊 - 電腦版*/}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:block">
              <div className="relative ml-3 items-center">
                <div className='flex gap-3 justify-center divide-x-2 divide-wireframe-700 dark:divide-neutral-800'>
                  {/* Hash Rate */}
                  <div className="relative flex items-center">
                    <Icon
                      icon_light={shovelIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-neutral-800 dark:text-neutral-200'>
                      Hash Rate
                      <span className='text-black dark:text-white ml-2'>{hashRate} PH/s</span>
                    </p>
                  </div>
                  {/* Block Height */}
                  <div className="relative flex px-2 items-center">
                    <Icon
                      icon_light={boxIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>Block Height {blockHeight}</p>
                  </div>
                  {/* BTC Price */}
                  <div className="relative flex px-2 items-center">
                    <Icon
                      icon_light={btcIcon}
                      className="h-5 w-auto mr-2 dark:invert" />
                    <p className='text-black dark:text-white'>BTC {btc}</p>
                  </div>
                </div>
              </div>
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
