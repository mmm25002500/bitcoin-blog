import Image from 'next/image';
import IconDark from '@/icons/icon_dark.svg';
import IconLight from '@/icons/icon_light.svg';
import { useTheme } from 'next-themes';
import Themes from '@/components/Layout/Themes';
import SearchBtn from '@/components/Button/SearchBtn';
import More from '@/components/Button/More';
import Icon from '@/components/Icon';

const Navbar = () => {
  return (
    <>
      <nav className="bg-white dark:bg-neutral-black">
        <div className="mx-auto px-2 sm:px-6 lg:px-5">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <></>
            </div>
            {/* Logo */}
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Icon
                  icon_light={IconLight}
                  icon_dark={IconDark}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* 切換主題 */}
              <div className="relative ml-3">
                <Themes></Themes>
              </div>
              {/* 搜尋 */}
              <div className="relative ml-3">
                <SearchBtn></SearchBtn>
              </div>
              {/* 更多 */}
              <div className="relative ml-3">
                <More></More>
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

export default Navbar;
