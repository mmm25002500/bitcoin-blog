import { LabelData } from "@/types/Label/Label";
import Image from "next/image";
import CloseIcon from "@/icons/close.svg";

const Label = (props: LabelData) => {
  return (
    <div className={ `flex ${ props.className }` }>
      <p className="text-sm leading-[22px] font-medium py-1 px-4">
        {props.text}
      </p>
      <button
        onClick={() => { console.log("clicked") }}
      >
        <Image
          src={CloseIcon}
          alt=""
          width={16}
          height={16}
        />
      </button>
    </div>
  )
}

export default Label;
