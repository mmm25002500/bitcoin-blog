import type { StaticImageData } from "next/image";

// Data
export interface AuthorData {
	fullname?: string;
	name?: string;
	img: string | StaticImageData;
	description?: string;
	posts?: number;
	id: string;
}

// Law Author Data
export interface LawAuthorData {
	fullname: string;
	name: string;
	image: string | StaticImageData;
	description: string;
	posts: number;
	id: string;
}

// Author Page Props
export interface AuthorPageProps {
	fullname: string;
	name: string;
	image: string | StaticImageData;
	description: string;
	posts: number;
	id: string;
	idx: number;
}

export interface AuthorNameProps {
	postCount?: number;
	className?: string;
	children?: React.ReactNode;
}

export interface AuthorDescriptionProps {
	className?: string;
	children?: React.ReactNode;
}
