export interface HomePageSidebarProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  className?: string;
  // data: categoryData[];
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}
