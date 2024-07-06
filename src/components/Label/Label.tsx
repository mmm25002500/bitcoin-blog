import { LabelData } from "@/types/Label/Label";
import Image from "next/image";
import CloseIcon from "@/icons/close.svg";

const Label = (props: LabelData) => {
  return (
    <div className={ `flex ${ props.className } pr-2` }>
      <p className="text-sm leading-[22px] font-medium py-1 pl-3 pr-5">
        {props.text}
      </p>
      <button
        onClick={() => props.onClick && props.onClick()}
      >
        <Image
          src={CloseIcon}
          alt=""
          width={16}
          height={16}
          className="dark:invert invert-0"
        />
      </button>
    </div>
  )
}

export default Label;
