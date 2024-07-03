import { categoryData } from "../MoreInfo/MoreInfo";

export interface SidebarProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  className?: string;
  data: categoryData[];
  path: string | string[] | undefined;
  onChange: (value: string) => void;
}
