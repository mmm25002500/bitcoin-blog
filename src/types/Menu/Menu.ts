// export interface MenuData {
//   data: {
//     title: string;
//     subMenu: {
//       name: string;
//       link: string;
//     }[];
//   }[];
//   className?: string;
// };

// export interface MenuListData {
//   title: string;
//   children: React.ReactNode;
//   className?: string;
// };

// export interface MenuSubListData {
//   name: string;
//   link: string;
//   className?: string;
// };

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
