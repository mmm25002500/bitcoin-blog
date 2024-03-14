import { AvaterProps } from "@/types/User/Avater";
import Icon from "../Icon";

const Avater = (props: AvaterProps) => {
  return (
    <>
      <Icon
        icon_light={props.src}
        className={`rounded-full w-[100px] h-[100px] ${props.className}`}
      />
    </>
  )
}

export default Avater;
