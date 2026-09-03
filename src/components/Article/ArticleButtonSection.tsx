import ArticleButton from "@/components/Card/ArticleButton";
import type { ArticleButtonSectionProps } from "@/types/Article/ArticleButton";

// 文章底部按鈕區塊：每排三個，有幾個就顯示幾個（最多 6 個）
const ArticleButtonSection = (props: ArticleButtonSectionProps) => {
	const buttons = (props.buttons || []).filter((btn) => btn?.title).slice(0, 6);

	if (buttons.length === 0) {
		return null;
	}

	return (
		<div
			className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 gap-y-5 w-full ${props.className || ""}`}
		>
			{buttons.map((btn, index) => (
				<ArticleButton
					key={`${btn.title}-${btn.link}-${index}`}
					title={btn.title}
					description={btn.description}
					logo={btn.logo}
					link={btn.link}
				/>
			))}
		</div>
	);
};

export default ArticleButtonSection;
