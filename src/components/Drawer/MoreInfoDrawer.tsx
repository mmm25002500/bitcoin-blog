import React, { useEffect, useState } from "react";
import { Card, Drawer } from "@material-tailwind/react";
import type { SidebarProps } from "@/types/Drawer/MoreInfoDrawer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { categoryData } from "@/types/MoreInfo/MoreInfo";
import DownIcon from "@/icons/down.svg";

const MoreInfoDrawer = (props: SidebarProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(props.isDrawerOpen);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const router = useRouter();

	// 控制展開和收起
	const handleToggle = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	useEffect(() => {
		setIsDrawerOpen(props.isDrawerOpen);
	}, [props.isDrawerOpen]);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => {
		setIsDrawerOpen(false);
		props.setIsDrawerOpen(false);
	};

	return (
		<>
			<Drawer
				open={isDrawerOpen}
				onClose={closeDrawer}
				nonce={undefined}
				size={500}
				onResize={undefined}
				onResizeCapture={undefined}
				placement="bottom"
				className="text-white dark:bg-neutral-black"
				transition={{ type: "spring", duration: 0.3 }}
				overlayProps={{
					className: "fixed bg-neutral-black/50 backdrop-blur-none",
					onClick: closeDrawer,
				}}
			>
				<Card
					color="transparent"
					shadow={false}
					className="h-full w-full overflow-y-auto"
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
				>
					<p className="my-5 text-black dark:text-white text-center font-medium text-sm leading-[22px]">
						目錄
					</p>
					{/* 類別 */}

					<div className={`m-5 ${props.className}`}>
						{props.data.map((category: categoryData, index: number) => (
							<div
								key={category.title}
								className="border-b-[1px] border-[#E7E6F2] dark:border-neutral-800 p-2"
							>
								{category.label && (
									<p className="px-3 text-black dark:text-white text-sm mt-2">
										{category.label}
									</p>
								)}
								{/* 類別 */}
								<button
									type="button"
									className="text-neutral-black dark:text-neutral-white w-full text-left font-medium text-sm leading-[22px] px-3 py-2 cursor-pointer flex justify-between items-center"
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
										{category.post.map((post, postIndex) => (
											<li
												key={post.title}
												className={`py-2 ${props.path === `${post.filename}` ? "bg-neutral-100 text-neutral-black dark:bg-neutral-900 dark:text-neutral-white rounded-[4px]" : "text-neutral-800 dark:text-neutral-300"}`}
											>
												<button
													type="button"
													onClick={() => {
														props.onChange(post.filename);
														router.push(`/moreBTC/${post.filename}`);
														closeDrawer();
													}}
												>
													<span className="pl-4 font-normal text-sm leading-6 break-all block text-left">
														{post.title}
													</span>
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
				</Card>
			</Drawer>
		</>
	);
};

export default MoreInfoDrawer;
