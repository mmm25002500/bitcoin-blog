import { AuthorData } from "../List/Author";

export interface GetArticalLinkByFileName {
  title: string;
  date: string;
  description: string;
  link: string;
  authorData: AuthorData
}
