import { IconWithTextBtnProps } from "@/types/Button/IconWithTextBtn";

const IconWithTextBtn = (props: IconWithTextBtnProps) => {
  return (
    <>

    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
      rounded-full w-full

      /* Light Mode (Secondary) */
      bg-neutral-100
      text-neutral-black
      hover:bg-primary-black-500
      disabled:bg-white
      disabled:text-primary-black-400
      active:text-black
      active:bg-primary-black-500

      /* Dark Mode (Primary) */
      dark:bg-neutral-900
      dark:text-neutral-white
      dark:hover:bg-primary-black-200
      dark:disabled:text-white
      dark:disabled:bg-primary-black-400
      dark:active:text-white
      dark:active:bg-black

      /* Size */
      font-medium text-base leading-[22px] p-3 px-9 text-left ${props.className}
      `}
    >
      {props.children}
      </button>
    </>
  )
}

export default IconWithTextBtn;
