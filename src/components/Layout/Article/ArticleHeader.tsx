import Icon from "@/components/Icon";
import type { ArticleHeaderProps } from "@/types/Layout/Article/ArticleHeader";

const ArticleHeader = (props: ArticleHeaderProps) => {
	return (
		<div className="w-full bg-primary-black-500 dark:bg-neutral-900 flex">
			<div className="mx-auto md:px-28 w-full xl:w-[1280px] pl-7 sm:px-28 flex">
				<div className="flex-none place-self-center">
					<p className="font-medium text-2xl leading-9">{props.title}</p>
					<p className="font-bold text-[32px] leading-[48px]">
						{props.subtitle}
					</p>
				</div>
				<div className="grow" />
				<div className="flex-nonw">
					<Icon icon_light={props.icon} className="h-full w-auto" />
				</div>
			</div>
		</div>
	);
};

export default ArticleHeader;
