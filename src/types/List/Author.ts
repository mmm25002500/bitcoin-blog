import { StaticImageData } from "next/image";

// Data
export interface AuthorData {
  name: string;
  img: string | StaticImageData;
  description?: string;
  posts?: number;
}

// Components
export interface AuthorProps {
  img: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
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
