import { CreateWalletData } from "@/types/Card/CreateButton";
import Icon from "../Icon";
import Card from "./Card";

const CreateWallet = (props: CreateWalletData) => {
  return (
    <Card
      className="
      grid grid-cols-1 sm:grid-cols-2 content-center py-10
      max-w-[248px] sm:max-w-xs gap-8 w-full rounded-lg border justify-between

      /*h-[150px] sm:h-full
      sm:items-center*/

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
      <Card.Infomation
        className="leading-normal flex flex-col items-start text-left px-7"
      >
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
        className="justify-self-end object-cover bg-[#F3F4F8] dark:bg-primary-black-300 rounded-xl py-[8px] px-[8px] h-[45px] w-[45px] sm:h-[60px] sm:w-[60px] relative mr-4"
      />
    </Card>
  )
}

export default CreateWallet;
