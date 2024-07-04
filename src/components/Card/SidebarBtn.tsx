import { CreateWalletData } from "@/types/Card/CreateButton";
import Icon from "../Icon";
import Card from "./Card";

const SidearBtn = (props: CreateWalletData) => {
  return (
    <Card
      className="
      flex items-center p-1 sm:p-3
      w-full gap-2 rounded-lg

      /* Light Mode */
      hover:bg-[#F8F9FB]

      /* Dark Mode */
      dark:hover:bg-black
      "
      onClick={() => props.onClick}
    >
      <Icon
        icon_light={props.photo_light}
        icon_dark={props.photo_dark}
        className="object-cover bg-[#F3F4F8] dark:bg-primary-black-300 rounded-xl py-[8px] px-[8px] h-[60px] w-[60px] relative mr-4"
      />
      <Card.Infomation
        className="leading-normal flex flex-col items-start text-left px-1"
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
    </Card>
  )
}

export default SidearBtn;
