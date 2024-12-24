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
      <div className="dark:bg-primary-black-300 bg-white px-5 gap-8">
        {/* Copyright */}
        <div className='flex flex-col gap-2 justify-left mb-0'>
          <div className='flex gap-1 text-neutral-600 dark:text-neutral-300 justify-left text-[10px]'>
            <p>© Bitcoin.zh</p>
            <p>2140</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
