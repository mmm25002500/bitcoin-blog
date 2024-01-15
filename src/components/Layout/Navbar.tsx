import Image from 'next/image';
import IconDark from '@/icons/icon_dark.svg';
import IconLight from '@/icons/icon_light.svg';
import { useTheme } from 'next-themes';

// 切換圖片樣式
const Icon = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        <Image
          src={IconDark}
          alt="Icon Dark"
        ></Image>
      ) : (
        <Image
          src={IconLight}
          alt="Icon Light"
        ></Image>
      )}
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <Icon></Icon>
    </>
  )
}

export default Navbar;
