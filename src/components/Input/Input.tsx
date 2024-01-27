import { InputData } from "@/types/Input/Input";
import { useState } from "react";

const Input = (props: InputData) => {

  const [content, setContent] = useState<string>("");

  return (
    <>
      <input
        type="text"
        placeholder={props.placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`
        rounded-full block p-2.5
        border-0

        focus:border-[1px]
        hover:border-[1px]
        focus:outline-none
        hover:outline-none

        /* Light Mode */
        text-neutral-700
        focus:border-neutral-600
        hover:border-neutral-600
        focus:bg-neutral-tone-700
        hover:bg-neutral-tone-700
        ${content ? "border-[1px] border-black" : ""}

        /* Dark Mode */
        `}
      />
    </>
  )
}

export default Input;
