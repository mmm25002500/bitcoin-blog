// 文章底部按鈕（每篇 1～6 個，每排三個）
export interface ArticleButtonData {
	title: string;
	description: string;
	logo: string;
	link: string;
}

export interface ArticleButtonSectionProps {
	buttons?: ArticleButtonData[];
	className?: string;
}
