import closeIcon from "@/icons/close.svg";
import type { CloseProps } from "@/types/Button/Close";
import Image from "next/image";

const CloseBtn = (props: CloseProps) => {
	return (
		<>
			<button
				type="button"
				className="
      border focus:outline-none focus:ring-4 font-medium rounded-xl text-xl  p-2 h-[40px] w-[40px]

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
					src={closeIcon}
					alt="Images Not Found"
					className={`dark:invert w-5 max-w-sm ${props.className}`}
				/>
			</button>
		</>
	);
};

export default CloseBtn;
