import type { AuthorData } from "../List/Author";

export interface GetArticleLinkByFileName {
	title: string;
	date: string;
	description: string;
	link: string;
	authorData: AuthorData;
}
