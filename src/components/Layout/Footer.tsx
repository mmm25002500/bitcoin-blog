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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <hr className='border-[#E7E6F2] dark:border-1' />
      <div className="dark:bg-primary-black-300 px-5 pt-5 pb-[3.75rem] gap-8">

        {/* Link */}
        <div className='flex gap-6 justify-center pt-20'>
          <Link href='/Disclaimer' prefetch={false}>
            <p>聲明</p>
          </Link>
          <Link href='/PrivacyPolicy' prefetch={false}>
            <p>隱私權</p>
          </Link>
          <Link href='/aboutus' prefetch={false}>
            <p>關於</p>
          </Link>
          <Link href='/Post/Editor/Support' prefetch={false}>
            <p>支持</p>
          </Link>
        </div>

        {/* Icon */}
        <div className='mt-24'>
          <Icon
            icon_light={btc_icon_dark}
            icon_dark={btc_icon_light}
            className='mr-auto ml-auto w-[47px]'
          />
        </div>

        {/* Copyright */}
        <div className='flex flex-col gap-7 justify-center pt-20 mb-0'>
          <p className='text-neutral-600 dark:text-neutral-300 text-center'>©Bitcoin.zh</p>
          <div className='flex gap-6 text-neutral-600 dark:text-neutral-300 justify-center'>
            <p>2024</p>
            <p>v1.8.31.a1</p>
            <p>2140</p>
          </div>
        </div>
      </div>

        <div className="w-full h-full bg-primary-black-300 dark:bg-white md:pb-0">
          {
            theme === 'dark' ?
              <Image
                src={IMG_dark}
                alt={''}
                className='w-full h-full'
              />
              :
              <Image
                src={IMG}
                alt={''}
                className='w-full h-full'
              />
          }
      </div>
      {/* <div className='bg-gradient-to-b from-primary-black-300 via-neutral-white to-neutral-white dark:from-neutral-white dark:via-primary-black-300 dark:to-primary-black-300 from-5% via-50% to-95% h-32 lg:hidden' /> */}
    </>
  );
}

export default Footer;
