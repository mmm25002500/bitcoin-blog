import type { ArticleButtonData } from "@/types/Article/ArticleButton";
import Image from "next/image";
import Link from "next/link";

// 樣式與首頁按鈕 (CreateButton) 一致，差別在 logo 來自資料庫（遠端圖片）
const CARD_CLASSNAME = `
flex flex-row items-center content-center py-2 max-w-xs gap-0 w-full rounded-lg border-[1px]

/* Light Mode */
bg-neutral-white
border-neutral-200
hover:bg-[#F8F9FB]
hover:border-black

/* Dark Mode */
dark:bg-neutral-900
dark:border-neutral-900
dark:hover:border-neutral-200
dark:hover:bg-black
`;

const ArticleButton = (props: ArticleButtonData & { className?: string }) => {
	// 由 API 組出的 supabase storage 網址走圖片最佳化；
	// 若 DB 直接存了其他來源的網址，就不經過最佳化，避免 domain 未設定而爆掉
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const optimized = Boolean(supabaseUrl) && props.logo.startsWith(supabaseUrl);

	const content = (
		<>
			<div className="leading-normal flex flex-col justify-between items-start text-left pl-5 grow">
				<p className="mt-0 mb-2 text-sm font-medium leading-5 text-black dark:text-white">
					{props.title}
				</p>
				<p className="font-medium text-[13px] leading-[15.85px] text-[#7A7E84] dark:text-neutral-300">
					{props.description}
				</p>
			</div>
			{props.logo && (
				<Image
					src={props.logo}
					alt={props.title}
					width={60}
					height={60}
					unoptimized={!optimized}
					className="justify-self-end object-contain bg-[#F3F4F8] dark:bg-primary-black-300 rounded-xl py-[8px] px-[8px] h-[60px] w-[60px] relative mr-4"
				/>
			)}
		</>
	);

	const className = `${CARD_CLASSNAME} ${props.className || ""}`;

	// 外部連結另開分頁，站內連結用 next/link
	if (/^https?:\/\//.test(props.link)) {
		return (
			<a
				href={props.link}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{content}
			</a>
		);
	}

	return (
		<Link href={props.link || "/"} className={className}>
			{content}
		</Link>
	);
};

export default ArticleButton;
