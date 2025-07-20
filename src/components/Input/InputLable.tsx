import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import SearchBtn from "@/icons/SearchBtn.svg";
import type { InputLabelProps } from "@/types/Input/Input";
import clearIcon from "@/icons/clear.svg";
import Label from "../Label/Label";
import Image from "next/image";

const InputLabel = (props: InputLabelProps) => {
	const [contentTemp, setContentTemp] = useState("");
	const [content, setContent] = useState<string[]>(props.text);

	// 如果 props.text 有值，則將其設定為 content
	useEffect(() => {
		if (props.text) {
			setContent(props.text);
		}
	}, [props.text]);

	// 新增標籤
	const addContent = () => {
		if (contentTemp) {
			setContent([...content, contentTemp]);
			setContentTemp("");
		}
		props.onChange([...content, contentTemp]);
	};

	// 移除標籤
	const removeContent = (index: number) => {
		const newContent = content.filter((_, i) => i !== index);
		setContent(newContent);
		props.onChange(newContent);
	};

	return (
		<div
			className={`
        ${content.length > 2 ? "rounded-3xl" : "rounded-full"}
        border-0
        relative flex items-center
        focus:border-[1px]
        hover:border-[1px]
        focus:outline-none
        hover:outline-none

        /* Light Mode */
        text-neutral-700
        hover:border-neutral-600
        focus:border-neutral-600
        focus:bg-neutral-tone-700

        /* Dark Mode */
        dark:bg-neutral-900

        ${props.className}
    `}
		>
			{/* 圖標 */}
			{props.frontIcon && (
				<div className="flex-none ml-3">
					<Image src={props.icon} className="dark:invert-0 invert" alt={""} />
				</div>
			)}

			{/* 標籤 */}
			<div className="flex-grow flex flex-wrap items-center p-1">
				<div className="flex flex-wrap items-center gap-2 ml-2">
					{content.map((item, index) => (
						<Label
							key={item}
							text={item}
							onClick={() => removeContent(index)}
							className="dark:text-neutral-white dark:bg-primary-black-300 rounded-full"
						/>
					))}
				</div>

				{/* 輸入框 */}
				<input
					type="text"
					placeholder={props.placeholder}
					value={contentTemp}
					onChange={(e) => {
						setContentTemp(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.key === "Enter") addContent();
					}}
					className="flex-grow outline-none p-2.5 bg-transparent rounded-full w-[60%]"
				/>
			</div>

			{/* 清除按鈕 */}
			{content.length > 0 && (
				<div className="flex-none">
					<button
						type="button"
						onClick={() => setContent([])}
						className="
            rounded-full py-[9px] px-3
            text-sm font-medium
            text-black
            focus:outline-none
            dark:text-white
          "
					>
						<Icon icon_light={clearIcon} className="dark:invert" />
					</button>
				</div>
			)}

			{/* 按鈕 */}
			<div className="flex-none">
				<button
					type="button"
					onClick={props.onClick}
					className="
          rounded-full py-[9px] px-3 mr-2
          bg-primary-black-300
          text-sm font-medium
          hover:bg-gray-700
          focus:outline-none
          dark:bg-white
        "
				>
					<Image src={props.icon} className="dark:invert-0 invert" alt={""} />
				</button>
			</div>
		</div>
	);
};

export default InputLabel;
