import { ContactUSData } from "@/types/Card/ContactUS";
import Icon from "../Icon";
import Card from "./Card";

const ContactUS = (props: ContactUSData) => {
  return (
    <Card
      className="
       px-7 gap-8 w-full sm:w-full rounded-lg border items-center justify-between

      /* Light Mode */
      bg-neutral-white
      border-neutral-200
      hover:border-black
      hover:border-2

      /* Dark Mode */
      dark:bg-neutral-900
      dark:border-0
      dark:hover:bg-black
      "
      onClick={() => props.onClick}
    >
      <Card.Infomation
        className="leading-normal p-4 items-start"
      >
        <Card.Title
          text={props.title}
          className="mb-2 text-sm sm:text-base font-medium leading-5 sm:leading-6 text-neutral-800 dark:text-neutral-200"
        />
        <Card.Description
          text={props.description}
          className="mb-3 font-medium text-xl sm:text-2xl leading-[30px] sm:leading-9 text-gray-700 dark:text-white tracking-[.04rem]"
        />
      </Card.Infomation>
      <Icon
        icon_light={props.photo_light}
        icon_dark={props.photo_dark}
        className="object-cover rounded-t-lg h-auto w-[96px] sm:w-[100px]"
      />
    </Card>
  )
}

export default ContactUS;
