import { StaticImageData } from "next/image";

export interface AvaterProps {
  src: string | StaticImageData;
  className?: string;
}
