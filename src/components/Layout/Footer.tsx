import Image from 'next/image';
import btc_icon_light from '@/icons/btc_footer_light.svg';
import btc_icon_dark from '@/icons/btc_footer_dark.svg';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// 切換圖片樣式
const Icon = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        <Image
          src={btc_icon_dark}
          alt="Icon Dark"
          className='mr-auto ml-auto'
        ></Image>
      ) : (
        <Image
          src={btc_icon_light}
          alt="Icon Light"
          className='mr-auto ml-auto'
        ></Image>
      )}
    </>
  )
}

const Footer = () => {
  return (
    <>
      <hr className='border-white dark:border-1 dark:border-[#E7E6F2]' />
      {/* figma: px-10 pt-10 */}
      <div className="h-[15.75rem] dark:bg-primary-black-300 px-5 pt-5 pb-[3.75rem] gap-8">
        {/* Icon */}
        <Icon></Icon>

        {/* Link */}
        {/* figma: gap-6 */}
        <div className='flex gap-6 justify-center pt-10'>
          <Link
            href='/'
            prefetch={false}
            className=""
          >
            <p>關於我們</p>
          </Link>
          <Link
            href='/'
            prefetch={false}
            className=""
          >
            <p>合作夥伴</p>
          </Link>
          <Link
            href='/'
            prefetch={false}
            className=""
          >
            <p>免責聲明</p>
          </Link>
          <Link
            href='/'
            prefetch={false}
            className=""
          >
            <p>隱私權政策</p>
          </Link>
        </div>

        {/* Copyright */}
        <div className='flex gap-3 justify-center pt-6'>
          <p className='text-neutral-600 dark:text-neutral-300'>© Bitcoin.zh 2140</p>
          <p className='text-neutral-300 dark:text-neutral-300 hidden sm:block'>|</p>
          <p className='text-neutral-600 dark:text-neutral-300 hidden sm:block'>All Rights Reserved</p>
        </div>
          <p className='flex text-neutral-600 dark:text-neutral-300 justify-center sm:hidden'>All Rights Reserved</p>
      </div>
    </>
  )
}

export default Footer;
