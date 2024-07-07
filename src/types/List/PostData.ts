import { StaticImageData } from "next/image";
import { AuthorData } from "./Author";

export interface PostProps {
  title: string;
  description: string;
  tags: string[];
  img?: string | StaticImageData;
  image?: string | undefined;
  authorData?: AuthorData;
  date: string;
  type: ['Post' | 'News'];
  id?: string;
  idx?: number;
  onClick?: () => void;
  className?: string;
}
