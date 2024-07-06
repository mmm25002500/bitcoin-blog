export interface TabDataType {
  name: string;
  link: string;
}

export interface TabDataProps {
  data: TabDataType[];
  className?: string;
  selectedTab: string;
  onChange: (tabName: string) => void;
}
