import Image from 'next/image';
import btc_icon_light from '@/icons/btc_footer_light.svg';
import btc_icon_dark from '@/icons/btc_footer_dark.svg';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Icon from '@/components/Icon';
import IMG from '@/icons/examplePhoto/S__4964483.jpg';
import IMG_dark from '@/icons/examplePhoto/S__4964504.jpg';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <hr className='border-[#E7E6F2] dark:border-1' />
      <div className="dark:bg-primary-black-300 px-5 pt-5 pb-[3.75rem] gap-8">

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
          <p className='text-neutral-600 dark:text-neutral-300 text-center'>© Bitcoin.zh</p>
          <div className='flex gap-6 text-neutral-600 dark:text-neutral-300 justify-center'>
            <p>2024</p>
            <p>v1.12.24.a1</p>
            <p>2140</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
