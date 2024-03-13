import { StaticImageData } from "next/image";

export interface ArticalHeaderProps {
  className?: string;
  title: string;
  subtitle: string;
  icon: string | StaticImageData;
}
