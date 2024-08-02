import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useTheme } from "next-themes";
import Image from 'next/image';
import Moon from '@/icons/moon.svg';
import light from '@/icons/light.svg';

const Themes = () => {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-[6.125rem] h-[2.5rem] rounded-full border-[1px] dark:border-0 p-1 bg-neutral-white border-neutral-200 dark:bg-[#6B6B6B] relative transition-colors duration-500 ease-in">
      {
        // 如果是 dark mode
        theme === 'dark' ? (
          <div
            className="rounded-full w-8 h-8 border-neutral-700 dark:bg-primary-black-300 relative dark:ml-[3.6rem] pointer-events-none transition-all duration-300 ease-out">
            <div className="flex items-center h-full">
              <Image
                src={light}
                alt="Images Not Found"
                className="w-[50%] h-[50%] mr-auto ml-auto inline-block align-middle">
              </Image>
            </div>
          </div>
        ) : (
          // 如果是 light mode
          <div
            className="rounded-full border-neutral-200 border-[1px] w-8 h-8 bg-neutral-white relative dark:ml-0 pointer-events-none transition-all duration-300 ease-out">
            <div className="flex items-center h-full">
              <Image
                src={Moon}
                alt="Images Not Found"
                className="w-[50%] h-[50%] mr-auto ml-auto inline-block align-middle">
              </Image>
            </div>
          </div>
        )
      }
    </button>
  )
}

export default Themes;
