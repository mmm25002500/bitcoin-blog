import Image from 'next/image';
import calendarIcon from '@/icons/calendar.svg';
import shovelIcon from '@/icons/shovel.svg';
import boxIcon from '@/icons/box.svg';
import btcIcon from '@/icons/btc.svg';
import { useTheme } from 'next-themes';
import { useState } from 'react';

// 切換圖片樣式
const Icon = (props: { icon: string, className: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        <Image
          src={props.icon}
          alt="Icon Dark"
          className={props.className + ' dark:invert'}
        ></Image>
      ) : (
        <Image
          src={props.icon}
          alt="Icon Light"
          className={props.className }
        ></Image>
      )}
    </>
  )
}

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
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Icon icon={calendarIcon} className="h-5 w-auto" />
              <p className='ml-2'>{today}</p>
            </div>
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <></>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3 items-center">
                <div className='flex gap-3 justify-center divide-x-2 divide-wireframe-700 dark:divide-neutral-800'>
                  <div className="relative flex items-center">
                    <Icon icon={shovelIcon} className="h-5 w-auto mr-2" />
                    <p className='text-neutral-800 dark:text-neutral-200'>
                      Hash Rate
                      <span className='text-black dark:text-white ml-2'>{hashRate} PH/s</span>
                    </p>
                  </div>
                  <div className="relative flex px-2 items-center">
                    <Icon icon={boxIcon} className="h-5 w-auto mr-2" />
                    <p className=''>Block Height {blockHeight}</p>
                  </div>
                  <div className="relative flex px-2 items-center">
                    <Icon icon={btcIcon} className="h-5 w-auto mr-2" />
                    <p className=''>BTC {btc}</p>
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
