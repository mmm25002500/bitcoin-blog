import type { CreateWalletData } from "@/types/Card/CreateButton";
import Icon from "../Icon";
import Card from "./Card";

const CreateWallet = (props: CreateWalletData) => {
	return (
		<Card
			className="
      pl-7 pr-3 pb-3 gap-8 w-full sm:w-[200px] md:w-[200px] lg:w-[300px] rounded-lg border justify-between

      h-[150px] sm:h-full
      sm:items-start

      /* Light Mode */
      bg-neutral-white
      border-neutral-200
      hover:bg-[#F8F9FB]
      hover:border-black
      hover:border-2

      /* Dark Mode */
      dark:bg-neutral-900
      dark:border-0
      dark:hover:border-[1px]
      dark:hover:border-white
      dark:hover:bg-black
      "
			onClick={() => props.onClick}
		>
			<Card.Infomation className="leading-normal py-3 items-start">
				<Card.Title
					text={props.title}
					className="mt-2 sm:mt-0 mb-2 text-sm font-medium leading-5 text-black dark:text-white"
				/>
				<Card.Description
					text={props.description}
					className="mb-3 font-medium text-[13px] leading-[15.85px] text-[#7A7E84] dark:text-neutral-300"
				/>
			</Card.Infomation>
			<Icon
				icon_light={props.photo_light}
				icon_dark={props.photo_dark}
				className="sm:place-self-end bg-[#F3F4F8] dark:bg-primary-black-300 object-cover rounded-xl py-[8px] px-[8px] h-[45px] w-[45px] sm:h-[60px] sm:w-[60px] relative top-[4.5rem] sm:top-0"
			/>
		</Card>
	);
};

export default CreateWallet;
