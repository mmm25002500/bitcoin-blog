import { CreateWalletData } from "@/types/Card/CreateButton";
import Icon from "../Icon";
import Card from "./Card";

const CreateWallet = (props: CreateWalletData) => {
  return (
    <Card
      className={`
      flex items-center content-center py-2 max-w-xs gap-0 w-full rounded-lg border-[1px]

      /* Light Mode */
      bg-neutral-white
      border-neutral-200
      hover:bg-[#F8F9FB]
      hover:border-black

      /* Dark Mode */
      dark:bg-neutral-900
      dark:border-neutral-900
      dark:hover:border-neutral-200
      dark:hover:bg-black

      ${props.className}
      `}
      onClick={props.onClick}
    >
      <Card.Infomation
        className="leading-normal flex flex-col items-start text-left pl-5 grow"
      >
        <Card.Title
          text={props.title}
          className="mt-0 mb-2 text-sm font-medium leading-5 text-black dark:text-white"
        />
        <Card.Description
          text={props.description}
          className="font-medium text-[13px] leading-[15.85px] text-[#7A7E84] dark:text-neutral-300"
        />
      </Card.Infomation>
      <Icon
        icon_light={props.photo_light}
        icon_dark={props.photo_dark}
        className="justify-self-end object-cover bg-[#F3F4F8] dark:bg-primary-black-300 rounded-xl py-[8px] px-[8px] h-[60px] w-[60px] relative mr-4"
      />
    </Card>
  )
}

export default CreateWallet;
