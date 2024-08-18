export interface MenuData {
  className?: string;
  children: React.ReactNode;
};

export interface MenuListData {
  title: string;
  className?: string;
  children: React.ReactNode;
};

export interface MenuSubListData {
  name: string;
  link: string;
  className?: string;
};
