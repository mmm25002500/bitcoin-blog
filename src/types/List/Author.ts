import { StaticImageData } from "next/image";

export interface AuthorData {
  name: string;
  img: string | StaticImageData;
}
