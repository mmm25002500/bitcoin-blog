import type { ReactNode } from "react";

// 用來定義 Radio 元件的類型
export interface RadioData {
	className?: string;
	children: ReactNode;
}

// 用來定義 Radio.Group 元件的類型
export interface RadioGroupData {
	name: string;
	className?: string;
	children: ReactNode[];
	selectedValue?: string | null;
	onChange?: (value: string) => void;
}

// 用來定義 Radio.Btn 元件的類型
export interface RadioBtnData {
	id: string;
	text: string;
	value: string;
	className?: string;
	name?: string;
	selectedValue?: string | null;
	onChange: (value: string) => void;
}
