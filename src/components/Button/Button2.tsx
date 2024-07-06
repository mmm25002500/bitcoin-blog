import { ButtonProps } from "@/types/Button/Button";
import { useEffect, useState } from "react";

const Button2 = (props: ButtonProps) => {
  const buttonType = props.type;
  const [buttonSize, setButtonSize] = useState('');

  useEffect(() => {
    if (buttonType === 'large') {
      setButtonSize('px-6 py-[9px]');
    } else if (buttonType === 'medium') {
      setButtonSize('px-3 py-[5px]');
    } else if (buttonType === 'small') {
      setButtonSize('px-2 py-[5px]');
    }
  }, [buttonType]);

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
      border-[1px] rounded-full min-w-32

      /* Light Mode (Secondary) */
      bg-white
      text-neutral-500
    border-neutral-500
      hover:bg-neutral-500
      hover:text-neutral-500
      disabled:text-primary-black-600
      disabled:border-primary-black-400
      disabled:bg-white

      active:bg-primary-black-200
      active:border-primary-black-600
      active:text-primary-black-600


      /* Dark Mode (Primary) */
      dark:bg-primary-black-300
      dark:text-white
    dark:border-primary-black-300
      dark:hover:bg-primary-black-200
      dark:disabled:text-white
      dark:disabled:bg-primary-black-400
      dark:active:text-white
      dark:active:bg-black

      /* Size */
      font-medium leading-6 ${buttonSize}
      ${props.className}
      `}
    >
      {props.children}
    </button>
  )
}
export default Button2;
