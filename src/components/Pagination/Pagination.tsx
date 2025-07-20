import type { PaginationData } from "@/types/Pagination/PaginationData";

const Pagination = (props: PaginationData) => {
	// 生成分頁頁碼數組
	const generatePageNumbers = () => {
		const pages = [];
		pages.push(1); // 添加第一頁
		let hasLeftDots = false;
		let hasRightDots = false;

		for (let p = 2; p < props.pageSize; p++) {
			// 如果頁面處於分頁列表中間的三個頁碼
			if (p === props.page - 1 || p === props.page || p === props.page + 1) {
				pages.push(p);
			} else {
				// 如果頁面在當前頁左側且距離當前頁超過1頁，添加左邊的省略號
				if (p < props.page - 1 && !hasLeftDots) {
					pages.push(-1);
					hasLeftDots = true;
				}
				// 如果頁面在當前頁右側且距離當前頁超過1頁，添加右邊的省略號
				else if (p > props.page + 1 && !hasRightDots) {
					pages.push(-1);
					hasRightDots = true;
				}
			}
		}

		if (props.pageSize > 1) {
			pages.push(props.pageSize); // 添加最後一頁
		}

		return pages;
	};

	const pageNumbers = generatePageNumbers();

	return (
		<div className={`flex ${props.className}`}>
			{/* 左箭頭 */}
			<button
				type="button"
				onClick={() => props.onClick(Math.max(1, props.page - 1))}
				className="pt-1 pb-3 py-0.5 px-2.5 text-primary-black-300 dark:text-neutral-white disabled:text-primary-black-400 dark:disabled:text-neutral-600 hover:text-black-30 text-base font-medium leading-6"
				disabled={props.page === 1}
			>
				{"<"}
			</button>
			{/* 分頁頁碼 */}
			{pageNumbers.map((pageNum) =>
				pageNum === -1 ? (
					<span key={pageNum}>...</span>
				) : (
					<button
						type="button"
						key={pageNum}
						onClick={() => props.onClick(pageNum)}
						className={`pt-1 pb-3 py-0.5 px-2.5 active:border-b-2 active:border-neutral-black ${props.page === pageNum ? "dark:text-neutral-white text-primary-black-300" : "dark:text-neutral-400 text-neutral-600"}`}
					>
						{pageNum}
					</button>
				),
			)}
			{/* 右箭頭 */}
			<button
				type="button"
				onClick={() => props.onClick(Math.min(props.pageSize, props.page + 1))}
				className="pt-1 pb-3 py-0.5 px-2.5 text-primary-black-300 dark:text-neutral-white disabled:text-primary-black-400 dark:disabled:text-neutral-600 hover:text-black-30 text-base font-medium leading-6"
				disabled={props.page === props.pageSize}
			>
				{">"}
			</button>
		</div>
	);
};

export default Pagination;
