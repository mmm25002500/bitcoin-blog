import moreIcon from '@/icons/more.svg';
import { MoreProps } from '@/types/Button/More';
import Image from 'next/image';


// border focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 me-2 pt-[8px] pr-[12px] pb-[8px] pl-[12px] h-[40px] w-[40px]

// /* Light Mode */
// border-neutral-200
// hover:border-btc
// active:border-primary-black-300
// active:bg-primary-black-500

// /* Dark Mode */
// dark:border-neutral-700
// dark:bg-primary-black-300
// dark:hover:bg-primary-black-300
// dark:hover:border-btc
// dark:active:bg-primary-black-100

const More = (props: MoreProps) => {
  return (
    <>
      <button className="
      border focus:outline-none focus:ring-4 font-medium rounded-xl text-sm px-5 py-2.5 me-2 pt-[8px] pr-[12px] pb-[8px] pl-[12px] h-[40px] w-[40px]

      /* Light Mode */
      border-neutral-200
      hover:border-primary-black-300
      active:border-primary-black-300
      active:bg-primary-black-500

      /* Dark Mode */
      dark:border-neutral-700
      dark:bg-primary-black-300
      dark:hover:bg-primary-black-300
      dark:active:bg-primary-black-100
      "
      onClick={props.onClick}
      >
      <Image
        src={ moreIcon }
        alt="Images Not Found"
        className={`dark:invert ${props.className}`}
      />
      </button>
    </>
  );
}

export default More;
