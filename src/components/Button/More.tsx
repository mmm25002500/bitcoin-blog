import moreIcon from "@/icons/more.svg";
import type { MoreProps } from "@/types/Button/More";
import Image from "next/image";

const More = (props: MoreProps) => {
	return (
		<>
			<button
				type="button"
				className="
      border focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 pt-[8px] pr-[12px] pb-[8px] pl-[12px] h-[40px] w-[40px]

      /* Light Mode */
      border-transparent
      hover:border-btc
      active:bg-primary-black-500

      /* Dark Mode */
      dark:bg-primary-black-300
      dark:hover:bg-primary-black-300
      dark:active:bg-primary-black-100
      "
				onClick={props.onClick}
			>
				<Image
					src={moreIcon}
					alt="Images Not Found"
					className={`dark:invert ${props.className}`}
				/>
			</button>
		</>
	);
};

export default More;
