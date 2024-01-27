import { useEffect, useState } from "react";

interface ButtonProps {
  type: "large" | "medium" | "small";
  theme: "primary" | "secondary" | "normal";
  className?: string;
}

/* Secondary 為 */

const Button = (props: ButtonProps) => {
  const basicCSS = "border focus:outline-none focus:ring-4 font-medium rounded-[6.25rem] text-sm px-5 py-2.5 me-2 mb-2 w-[120px] ";

  const [css, setCSS] = useState(basicCSS);

  useEffect(() => {
    let updatedCSS = basicCSS;

    // 三種大小
    switch (props.type) {
      case "large":
      updatedCSS += " pt-[9px] pr-[24px] pb-[9px] pl-[24px] h-[40px]";
      break;
      case "medium":
      updatedCSS += " pt-[5px] pr-[12px] pb-[5px] pl-[12px] h-[32px]";
      break;
      case "small":
      updatedCSS += " pt-[5px] pr-[8px] pb-[5px] pl-[8px] h-[28px]";
      break;
    }

    // 三種主題
    switch (props.theme) {
      case "primary":
        updatedCSS += " bg-primary-black-3";
        break;
      case "secondary":
        // Add secondary theme-specific styles here
        break;
      case "normal":
        // Add normal theme-specific styles here
        break;
    }

    // Add any additional class names provided
    if (props.className) {
      updatedCSS += ` ${props.className}`;
    }

    setCSS(updatedCSS);}, [props.type, props.theme, props.className]);

    return (
    <>
    <button type="button" className={css}>Button</button>
    </>
    );
  }
  export default Button;
