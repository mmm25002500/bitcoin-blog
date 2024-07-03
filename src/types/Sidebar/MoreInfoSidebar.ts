import { MoreInfoData, categoryData } from "../MoreInfo/MoreInfo";

export interface MoreInfoSidebarProps {
  data: categoryData[];
  path: string | string[] | undefined;
  onChange: (value: string) => void;
  className?: string;
}
