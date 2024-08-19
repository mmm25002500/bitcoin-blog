import Image from 'next/image';
import btc_icon_light from '@/icons/btc_footer_light.svg';
import btc_icon_dark from '@/icons/btc_footer_dark.svg';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Icon from '@/components/Icon';
import IMG from '@/icons/examplePhoto/S__4964483.jpg';
import IMG_dark from '@/icons/examplePhoto/S__4964504.jpg';
import { useEffect, useState } from 'react';

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null;
  return (
    <>
      <hr className='border-[#E7E6F2] dark:border-1' />
      {/* figma: px-10 pt-10 */}
      <div className="dark:bg-primary-black-300 px-5 pt-5 pb-[3.75rem] gap-8">

        {/* Link */}
        {/* figma: gap-6 */}
        <div className='flex gap-6 justify-center pt-20'>
          <Link
            href='/Disclaimer'
            prefetch={false}
            className=""
          >
            <p>聲明</p>
          </Link>
          <Link
            href='/PrivacyPolicy'
            prefetch={false}
            className=""
          >
            <p>隱私權</p>
          </Link>
          <Link
            href='/About'
            prefetch={false}
            className=""
          >
            <p>關於</p>
          </Link>
          <Link
            href='/'
            prefetch={false}
            className=""
          >
            <p>支持</p>
          </Link>
        </div>

        {/* Icon */}
        <div className='ml-5'>
          <Icon
            icon_light={btc_icon_dark}
            icon_dark={btc_icon_light}
            className='mr-auto ml-auto mt-24 w-14'
          />
        </div>

        {/* Copyright */}
        <div className='flex gap-14 justify-center pt-20 pb-20'>
          <p className='text-neutral-600 dark:text-neutral-300 text-center'>
            © Bitcoin.zh 2140
          </p>
        </div>

      </div>
      {
        theme === 'dark' ?
          <Image
            src={IMG_dark}
            alt={''}
          />
          :
          <Image
            src={IMG}
            alt={''}
          />
      }
    </>
  )
}

export default Footer;
