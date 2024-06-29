import { StaticImageData } from "next/image";

// Data
export interface AuthorData {
  fullname?: string;
  name?: string;
  img: string | StaticImageData;
  description?: string;
  posts?: number;
  id: string;
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
