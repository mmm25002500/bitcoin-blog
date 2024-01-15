import { useEffect, useState } from "react";

interface Props {
  type: "large" | "medium" | "small"
  theme: "primary" | "secondary" | "normal";
  className?: string;
}

const Button = (props: Props) => {
  const basicCSS = "border focus:outline-none focus:ring-4 font-medium rounded-[6.25rem] text-sm px-5 py-2.5 me-2 mb-2 w-[120px]" + " ";

  const [css, setCSS] = useState(basicCSS);

  useEffect(() => {
    switch (props.type) {
      case "large":
        setCSS(css + "pt-[9px] pr-[24px] pb-[9px] pl-[24px] h-[40px]");
        break;
      case "medium":
        setCSS(css + "pt-[5px] pr-[12px] pb-[5px] pl-[12px] h-[32px]");
        break;
      case "small":
        setCSS(css + "pt-[5px] pr-[8px] pb-[5px] pl-[8px] h-[28px]");
        break;
    }

    if (props.theme) {
      switch (props.theme) {
        case "primary":
          setCSS(css + "bg-primary-black-3");
          break;
        case "secondary":
          setCSS(css + "");
          break;
        case "normal":
          setCSS(css + "");
          break;
      }
    } else {
      setCSS(css  + " " + props.className);
    }
  }, [props.type, props.theme]);

	return (
		<>
      <button type="button" className={ css }>Button </button>
		</>
	)
}

export default Button;
