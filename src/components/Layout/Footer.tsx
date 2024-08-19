import Image from 'next/image';
import btc_icon_light from '@/icons/btc_footer_light.svg';
import btc_icon_dark from '@/icons/btc_footer_dark.svg';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Icon from '@/components/Icon';
import IMG from '@/icons/examplePhoto/S__4964483.jpg';

const Footer = () => {
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
              className='mr-auto ml-auto mt-24'
            />
          </div>

          {/* Copyright */}
          <div className='flex flex-col gap-14 justify-center pt-10 pb-28'>
            <p className='text-neutral-600 dark:text-neutral-300 text-center'>
              © Bitcoin.zh <br />
            </p>
            <p className='ml-5 text-neutral-600 dark:text-neutral-300 text-center'>
              2140
            </p>
          </div>

        </div>
        <Image
          src={IMG}
          alt={''}
        />
    </>
  )
}

export default Footer;
