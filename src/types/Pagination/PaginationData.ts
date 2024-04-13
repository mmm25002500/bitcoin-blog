export interface PaginationData {
  page: number;
  pageSize: number;
  link: string;
  className: string;
  onClick: (page: number) => void;
}
