import { useState } from "react";
import Link from "next/link";
import type { MoreInfoSidebarProps } from "@/types/Sidebar/MoreInfoSidebar";
import type { categoryData } from "@/types/MoreInfo/MoreInfo";
import Image from "next/image";
import DownIcon from "@/icons/down.svg";

const Sidebar = (props: MoreInfoSidebarProps) => {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	// 控制展開和收起
	const handleToggle = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<div
			className={`border-t-[1px] border-[#E7E6F2] dark:border-neutral-800 ${props.className}`}
		>
			{props.data.map((category: categoryData, index: number) => (
				<div
					key={category.title}
					className="border-b-[1px] border-[#E7E6F2] dark:border-neutral-800 p-2"
				>
					{category.label && (
						<p className="px-3 text-black dark:text-white text-sm my-2">
							{category.label}
						</p>
					)}
					{/* 類別 */}
					<button
						type="button"
						className="w-full text-left font-medium text-sm leading-[22px] px-3 py-2 cursor-pointer flex justify-between items-center"
						onClick={() => handleToggle(index)}
					>
						{category.title}

						{/* 箭頭 */}
						<Image
							src={DownIcon}
							alt="Icon Dark"
							className={`transition-transform duration-200 dark:invert ${expandedIndex === index ? "transform rotate-180" : ""}`}
						/>
					</button>

					{/* 文章 */}
					{expandedIndex === index && (
						<ul className="pl-3">
							{category.post.map((post) => (
								<li
									key={post.title}
									className={`py-2 ${props.path === `${post.filename}` ? "bg-neutral-100 text-neutral-black dark:bg-neutral-900 dark:text-neutral-white rounded-[4px]" : "text-neutral-800 dark:text-neutral-300"}`}
								>
									<Link
										href={`/moreBTC/${post.filename}`}
										onClick={() => props.onChange(post.filename)}
									>
										<span className="pl-4 px-2 font-normal text-sm leading-6 break-all block text-justify">
											{post.title}
										</span>
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);
};

export default Sidebar;
