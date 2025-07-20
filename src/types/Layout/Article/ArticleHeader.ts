import type { StaticImageData } from "next/image";

export interface ArticleHeaderProps {
	className?: string;
	title: string;
	subtitle: string;
	icon: string | StaticImageData;
}
