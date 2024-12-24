import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useTheme } from "next-themes";
import Image from 'next/image';
import Moon from '@/icons/moon.svg';
import light from '@/icons/light.svg';
import { ThemeProps } from "@/types/Layout/Theme";

const Themes = (props: ThemeProps) => {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`border-[1px] border-transparent font-medium rounded-xl hover:border-btc
        ${props.scrolled ?
          'text-sm px-5 py-2.5 me-2 pt-[8px] pr-[12px] pb-[8px] pl-[12px] h-[40px] w-[40px]' :
          'text-sm px-5 py-2.5 me-2 pt-[8px] pr-[12px] pb-[8px] pl-[12px] h-[40px] w-[40px]'}
        `}
    >
      {
        // 如果是 dark mode
        theme === 'dark' ? (
          <div
            className="dark:bg-primary-black-300 pointer-events-none transition-all duration-300 ease-out">
            <div className="flex items-center h-full">
              <Image
                src={light}
                alt="Images Not Found"
                className="mr-auto ml-auto inline-block align-middle">
              </Image>
            </div>
          </div>
        ) : (
          // 如果是 light mode
          <div
            className="bg-neutral-white relative pointer-events-none transition-all duration-300 ease-out">
            <div className="flex items-center h-full">
              <Image
                src={Moon}
                alt="Images Not Found"
                className="mr-auto ml-auto inline-block align-middle">
              </Image>
            </div>
          </div>
        )
      }
    </button>
  )
}

export default Themes;
