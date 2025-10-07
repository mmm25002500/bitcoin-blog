import type { StaticImageData } from "next/image";
import type { LawAuthorData } from "./Author";

export interface PostProps {
	title: string;
	description: string;
	tags: string[];
	img?: string | StaticImageData;
	image?: string | undefined;
	authorData: LawAuthorData;
	date: string;
	type: ["Post" | "News"];
	id?: string;
	idx?: number;
	onClick?: () => void;
	href?: string;
	className?: string;
}
